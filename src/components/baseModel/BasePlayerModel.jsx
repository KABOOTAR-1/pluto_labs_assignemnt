import React from "react";
import { GeometryRenderer } from "./GeometryRenderer";

export const BasePlayer = ({ size = 1, color = "#00ff00", geometry = 'box' }) => {
  return (
    <>
      <mesh castShadow receiveShadow>
        <GeometryRenderer geometry={geometry} size={size} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh
        position={[0, 0.1, 1.5]}
        rotation={[-Math.PI / 2, -Math.PI, Math.PI]}
        castShadow
      >
        <coneGeometry args={[0.1, 0.3, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>
    </>
  );
};
