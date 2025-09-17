import React from "react";

export const BaseEnemyModel = ({ size, color }) => {
  return (
    <mesh castShadow receiveShadow>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};