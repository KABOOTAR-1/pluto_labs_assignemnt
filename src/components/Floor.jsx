import React from 'react';
import { usePlane } from '@react-three/cannon';
import { MeshReflectorMaterial } from '@react-three/drei';
import { gameConfig, useCurrentEnvironment } from '../config/gameConfig';

const Floor = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    type: 'Static'
  }));

  const currentEnvironment = useCurrentEnvironment();
  const worldSize = gameConfig.world.size;

  const groundConfig = currentEnvironment.ground || {};

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
        />
      ) : (
        <meshStandardMaterial
          color={groundConfig.color || gameConfig.world.floorColor}
          roughness={groundConfig.roughness || 0.8}
          metalness={groundConfig.metalness || 0.2}
        />
      )}
    </mesh>
  );
};

export default Floor;
