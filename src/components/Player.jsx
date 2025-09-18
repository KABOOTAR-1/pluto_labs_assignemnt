import React, { useEffect } from "react";
import { useBox } from "@react-three/cannon";
import { useAtom } from "jotai";
import {
  playerPositionAtom,
  playerRotationAtom,
  playerSpeedSettingAtom,
  playerFireRateSettingAtom,
  playerHealthSettingAtom,
} from "../config/atoms";
import { gameConfig, useCurrentPlayerConfig } from "../config/gameConfig";
import { usePlayerMovement } from "../hooks/usePlayerMovement";
import { usePlayerRotation } from "../hooks/usePlayerRotation";
import { usePlayerShooting } from "../hooks/usePlayerShooting";
import { usePlayerCamera } from "../hooks/usePlayerCamera";
import { usePlayerHealth } from "../hooks/usePlayerHealth";
import { BaseModel } from "./GltfLoader/BaseModel";
import { BasePlayer } from "./baseModel/BasePlayerModel";


  const initialPosition = gameConfig.player.initialPosition;
  const initialRotation = gameConfig.player.initialRotation;
  const initialVelocity = gameConfig.player.initialVelocity;
  
export default function Player({ worldBounds, playerPosition, playerHealth, gameState, setGameState, setPlayerHealth, selectedProjectileType, onShoot }) {
  const playerConfig = useCurrentPlayerConfig();

  const [ref, api] = 
  useBox(() => ({
    mass: 1,
    type: "Kinematic",
    args: [playerConfig.size || gameConfig.player.size, playerConfig.size || gameConfig.player.size, playerConfig.size || gameConfig.player.size],
    position: initialPosition,
    name: "player",
  }));

  const [, setPlayerPosition] = useAtom(playerPositionAtom);
  const [playerRotation, setPlayerRotation] = useAtom(playerRotationAtom);
  // playerHealth and gameState are now props
  const [playerSpeed] = useAtom(playerSpeedSettingAtom);
  const [playerFireRate] = useAtom(playerFireRateSettingAtom);
  const [playerHealthSetting] = useAtom(playerHealthSettingAtom);

  // Sync position
  useEffect(() => {
      if(!initialPosition || !initialRotation || !initialVelocity) return;
      if(gameState === "playing" || gameState === "settings") return;
      console.log("Initial Position:", initialPosition);
      api.position.set(...initialPosition);
      api.rotation.set(...initialRotation);
      api.velocity.set(...initialVelocity);
  }, [gameState, api]);

  useEffect(() => {
    const unsub = api.position.subscribe((pos) => setPlayerPosition(pos));
    return unsub;
  }, [api.position, setPlayerPosition]);


  // Update player health when health setting changes
  useEffect(() => {
    setPlayerHealth((currentHealth) => {
      // If current health is less than the new max, increase it
      if (currentHealth < playerHealthSetting) {
        return playerHealthSetting;
      }
      // If current health exceeds the new max, cap it
      if (currentHealth > playerHealthSetting) {
        return playerHealthSetting;
      }
      // Otherwise keep current health
      return currentHealth;
    });
  }, [playerHealthSetting, setPlayerHealth]);

  // Game hooks
  usePlayerMovement(api, playerPosition, gameState, () => setGameState("gameOver"), playerSpeed, worldBounds);
  usePlayerRotation(api, gameState, setPlayerRotation);
  usePlayerShooting(
    playerPosition,
    playerRotation,
    gameState,
    selectedProjectileType,
    onShoot,
    playerFireRate
  );
  usePlayerHealth(ref, playerHealth, (h) => setPlayerHealth(h), () => setGameState("gameOver"));
  usePlayerCamera(api, gameState, gameConfig.camera.offset);
  return (
    <group ref={ref}>
      <BaseModel
        url={playerConfig.modelUrl}
        fallbackComponent={BasePlayer}
        size={playerConfig.size || gameConfig.player.size}
        color={playerConfig.color || gameConfig.player.color}
        fallbackGeometry={playerConfig.fallbackGeometry || 'box'}
        rotation={playerConfig.rotation || [0, -Math.PI, 0]}
        scale={playerConfig.scale || [1, 1, 1]}
        centerModel={false}
      />
    </group>
  );
}
