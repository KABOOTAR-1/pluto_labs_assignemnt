import React from "react";
import { GeometryRenderer } from "./GeometryRenderer";

export const BaseEnemyModel = ({ size, color, geometry = 'box' }) => {
  return (
    <mesh castShadow receiveShadow>
      <GeometryRenderer geometry={geometry} size={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};