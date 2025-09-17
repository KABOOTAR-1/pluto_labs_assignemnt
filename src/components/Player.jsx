import React, { useEffect } from "react";
import { useBox } from "@react-three/cannon";
import { useAtom } from "jotai";
import {
  playerPositionAtom,
  playerRotationAtom,
  playerHealthAtom,
  gameStateAtom,
  projectilesAtom,
  currentProjectileTypeAtom,
  activateProjectile,
  playerSpeedSettingAtom,
  playerFireRateSettingAtom,
} from "../config/atoms";
import { getProjectileType, projectileTypes } from "../data/projectileTypes";
import { gameConfig } from "../config/gameConfig";
import { usePlayerMovement } from "../hooks/usePlayerMovement";
import { usePlayerRotation } from "../hooks/usePlayerRotation";
import { usePlayerShooting } from "../hooks/usePlayerShooting";
import { usePlayerCamera } from "../hooks/usePlayerCamera";
import { usePlayerHealth } from "../hooks/usePlayerHealth";
import { BaseModel } from "./GltfLoader/BaseModel";
import { BasePlayer } from "./player/basePlayer";

const initialPosition = gameConfig.player.initialPosition;
const initialRotation = gameConfig.player.initialRotation;
const initialVelocity = gameConfig.player.initialVelocity; 

export default function Player() {


  const [ref, api] = useBox(() => ({
    mass: 1,
    type: "Kinematic",
    args: [gameConfig.player.size, gameConfig.player.size, gameConfig.player.size],
    position: initialPosition,
    name: "player",
  }));

  const [playerPosition, setPlayerPosition] = useAtom(playerPositionAtom);
  const [playerRotation, setPlayerRotation] = useAtom(playerRotationAtom);
  const [playerHealth, setPlayerHealth] = useAtom(playerHealthAtom);
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const [, setProjectiles] = useAtom(projectilesAtom);
  const [, setCurrentProjectileType] = useAtom(currentProjectileTypeAtom);
  const [playerSpeed] = useAtom(playerSpeedSettingAtom);
  const [playerFireRate] = useAtom(playerFireRateSettingAtom);

  // Sync position
  useEffect(() => {
      if(!initialPosition || !initialRotation || !initialVelocity) return;
      if(gameState == "playing" || gameState== "settings") return;
      console.log("Initial Position:", initialPosition);
      api.position.set(...initialPosition);
      api.rotation.set(...initialRotation);
      api.velocity.set(...initialVelocity);
  }, [gameState, api]);

  useEffect(() => {
    const unsub = api.position.subscribe((pos) => setPlayerPosition(pos));
    return unsub;
  }, [api.position, setPlayerPosition]);


  // Initialize projectile type
  useEffect(() => {
    const firstId = projectileTypes[0]?.id;
    setCurrentProjectileType(firstId);
  }, [setCurrentProjectileType]);
  const selectedProjectileType = getProjectileType(projectileTypes[0]?.id);

  // Game hooks
  usePlayerMovement(api, playerPosition, gameState, () => setGameState("gameOver"), playerSpeed);
  usePlayerRotation(api, gameState, setPlayerRotation);
  usePlayerShooting(
    playerPosition,
    playerRotation,
    gameState,
    selectedProjectileType,
    (projData) => setProjectiles((prev) => activateProjectile(prev, projData)),
    playerFireRate
  );
  usePlayerHealth(ref, playerHealth, (h) => setPlayerHealth(h), () => setGameState("gameOver"));
  usePlayerCamera(api, gameState, gameConfig.camera.offset);
  return (
    <group ref={ref}>
  <BaseModel 
    url={null} 
    fallbackComponent={BasePlayer} 
    size={gameConfig.player.size} 
    color={gameConfig.player.color} 
  />
</group>
  );
}
