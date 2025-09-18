import React, { useEffect, useRef } from "react";
import { useBox } from "@react-three/cannon";
import { useEnemyChase } from "../../hooks/useEnemyChase";
import { useEnemyAttack } from "../../hooks/useEnemyAttack";
import { useEnemyCleanup } from "../../hooks/useEnemyCleanup";
import { useEnemyFacing } from "../../hooks/useEnemyFacing";
import { BaseModel } from "../GltfLoader/BaseModel";
import { BaseEnemyModel } from "../baseModel/BaseEnemyModel";


export const BaseEnemy = ({
  id,
  position,
  size,
  scale = [1, 1, 1],
  color,
  speed,
  damage,
  onRemove,
  playerPosition,
  gameState,
  onPlayerDamage,
  modelUrl,
  textureUrl,
  fallbackGeometry,
  facePlayer = false, // New optional prop to enable facing player
  worldBounds, // World bounds for cleanup
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
  useEnemyCleanup(currentPosition.current, id, onRemove, worldBounds);

  // Use the facing hook with physics API
  const facingRotation = useEnemyFacing(facePlayer, playerPosition, currentPosition.current)

  return (
    <group ref={ref}>
      <BaseModel
        url={modelUrl}
        textureUrl={textureUrl}
        fallbackComponent={BaseEnemyModel}
        size={size}
        color={color}
        fallbackGeometry={fallbackGeometry || 'box'}
        rotation={facePlayer ? facingRotation : [0, 0, 0]}
        scale={scale}
        centerModel={false}
      />
    </group>
  );
};
