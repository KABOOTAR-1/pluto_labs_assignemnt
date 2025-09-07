import React from "react";
import { useBox } from "@react-three/cannon";
import { useEnemyChase } from "../../hooks/useEnemyChase";
import { useEnemyAttack } from "../../hooks/useEnemyAttack";
import { useEnemyCleanup } from "../../hooks/useEnemyCleanup";


export const BaseEnemy = ({
  id,
  position,
  size,
  color,
  speed,
  damage,
  onRemove,
  playerPosition,
  gameState,
  onPlayerDamage,
}) => {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: [size, size, size],
    linearDamping: 0.9,
    type: "Kinematic",
    name: `enemy-${id}`,
  }));

  // Hooks for enemy behavior
  useEnemyChase(api, position, speed, playerPosition, gameState);
  useEnemyAttack(position, size, damage, playerPosition, gameState, onPlayerDamage);
  useEnemyCleanup(position, id, onRemove);

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
