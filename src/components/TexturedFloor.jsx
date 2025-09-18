import React from 'react';
import { usePlane } from '@react-three/cannon';
import { MeshReflectorMaterial, useTexture } from '@react-three/drei';
import { gameConfig } from '../config/gameConfig';

const TexturedFloor = ({ groundConfig, worldSize }) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    type: 'Static'
  }));

  const texturePath = groundConfig.texture;
  const groundTexture = useTexture(texturePath);

  // Configure texture
  if (groundTexture) {
    groundTexture.wrapS = groundTexture.wrapT = 1000; // Repeat texture
    groundTexture.repeat.set(worldSize / 10, worldSize / 10); // Scale texture to fit world size
  }

  return (
    <mesh
      ref={ref}
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[worldSize * 2, worldSize * 2]} />
      {groundConfig.material === 'reflector' || !groundConfig.material ? (
        <MeshReflectorMaterial
          color={groundConfig.color || gameConfig.world.floorColor}
          roughness={groundConfig.roughness || 0.7}
          blur={[1000, 1000]}
          mixBlur={30}
          mixStrength={80}
          metalness={groundConfig.metalness || 0.1}
          map={groundTexture}
        />
      ) : (
        <meshStandardMaterial
          color={groundConfig.color || gameConfig.world.floorColor}
          roughness={groundConfig.roughness || 0.8}
          metalness={groundConfig.metalness || 0.2}
          map={groundTexture}
        />
      )}
    </mesh>
  );
};

export default TexturedFloor;