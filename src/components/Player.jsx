import React, { useEffect } from "react";
import { useBox } from "@react-three/cannon";
import { gameConfig } from "../config/gameConfig";
import { useAtom } from "jotai";
import { playerPositionAtom, playerRotationAtom, playerHealthAtom, gameStateAtom, projectilesAtom, currentProjectileTypeAtom } from "../config/atoms";
import { getProjectileType, projectileTypes } from "../data/projectileTypes";
import { usePlayerMovement } from "../hooks/usePlayerMovement";
import { usePlayerRotation } from "../hooks/usePlayerRotation";
import { usePlayerShooting } from "../hooks/usePlayerShooting";
import { usePlayerCamera } from "../hooks/usePlayerCamera";
import { usePlayerHealth } from "../hooks/usePlayerHealth";

const Player = () => {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: [0, 0.5, 0],
    args: [gameConfig.player.size, gameConfig.player.size, gameConfig.player.size],
    type: "Kinematic",
    name: "player",
  }));
  
  // Atom state
  const [playerPosition, setPlayerPosition] = useAtom(playerPositionAtom);
  const [playerRotation, setPlayerRotation] = useAtom(playerRotationAtom);
  const [playerHealth, setPlayerHealth] = useAtom(playerHealthAtom);
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const [, setProjectiles] = useAtom(projectilesAtom);
  const [, setCurrentProjectileType] = useAtom(currentProjectileTypeAtom);
  
  useEffect(() => {
    const unsubscribe = api.position.subscribe(v => {
      setPlayerPosition(v);
    });
    return unsubscribe;
  }, [api, setPlayerPosition]);

  const handleRotationChange = (angle) => {
    setPlayerRotation(angle);
  };

  const handleShoot = (projectile) => {
    setProjectiles(prev => [...prev, projectile]);
  };

  const handleHealthChange = (newHealth) => {
    setPlayerHealth(newHealth);
  };

  const handleGameOver = () => {
    setGameState("gameOver");
  };

  const firstProjectileId = projectileTypes[0]?.id;
  const selectedProjectileType = getProjectileType(firstProjectileId);
  
  setCurrentProjectileType(firstProjectileId);

  usePlayerMovement(api, playerPosition, gameState, handleGameOver);
  usePlayerRotation(api, gameState, handleRotationChange);
  usePlayerShooting(playerPosition, playerRotation, gameState, selectedProjectileType, handleShoot);
  usePlayerCamera(playerPosition, gameState);
  usePlayerHealth(ref, playerHealth, handleHealthChange, handleGameOver);

  return (
    <group>
      {/* Player Mesh */}
      <mesh ref={ref} castShadow receiveShadow>
        <boxGeometry args={[gameConfig.player.size, gameConfig.player.size, gameConfig.player.size]} />
        <meshStandardMaterial color={gameConfig.player.color} />
      </mesh>

      {/* Aiming Indicator */}
      <mesh
        position={[
          playerPosition[0] + Math.sin(playerRotation) * 1.5,
          0.1,
          playerPosition[2] + Math.cos(playerRotation) * 1.5,
        ]}
        castShadow
      >
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
};

export default Player;
