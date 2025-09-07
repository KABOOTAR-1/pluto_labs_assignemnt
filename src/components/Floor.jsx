import React from 'react';
import { usePlane } from '@react-three/cannon';
import { MeshReflectorMaterial } from '@react-three/drei';
import { gameConfig } from '../config/gameConfig';

const Floor = () => {
  const [ref] = usePlane(() => ({ 
    rotation: [-Math.PI / 2, 0, 0], 
    position: [0, 0, 0],
    type: 'Static'
  }));
  
  const worldSize = gameConfig.world.size;

  return (
    <mesh 
      ref={ref} 
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]} 
    >
      <planeGeometry args={[worldSize * 2, worldSize * 2]} />
      <MeshReflectorMaterial
        color={gameConfig.world.floorColor}
        roughness={0.7}
        blur={[1000, 1000]}
        mixBlur={30}
        mixStrength={80}
        metalness={0.1}
      />
    </mesh>
  );
};

export default Floor;
