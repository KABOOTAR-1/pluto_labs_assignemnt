import React, { useEffect, useRef } from "react";
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
  const currentPosition = useRef(position);
  
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: [size, size, size],
    linearDamping: 0.9,
    type: "Kinematic",
    name: `enemy-${id}`,
  }));

  useEffect(() => {
    const unsubscribe = api.position.subscribe((pos) => {
      currentPosition.current[0] = pos[0];
      currentPosition.current[1] = pos[1];
      currentPosition.current[2] = pos[2];
    });
    
    return unsubscribe;
  }, [api.position]);

  useEnemyChase(api, currentPosition.current, speed, playerPosition, gameState);
  useEnemyAttack(currentPosition.current, size, damage, playerPosition, gameState, onPlayerDamage);
  useEnemyCleanup(currentPosition.current, id, onRemove);

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
