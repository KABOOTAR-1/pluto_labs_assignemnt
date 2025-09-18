import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCurrentEnvironment } from '../config/gameConfig';

const SpaceParticles = () => {
  const pointsRef = useRef();
  const currentEnvironment = useCurrentEnvironment();

  // Generate star positions
  const starPositions = useMemo(() => {
    const positions = new Float32Array(3000); // 1000 stars * 3 coordinates
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 400; // x
      positions[i * 3 + 1] = Math.random() * 100 + 20; // y (above ground)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400; // z
    }
    return positions;
  }, []);

  // Generate nebula positions
  const nebulaPositions = useMemo(() => {
    const positions = new Float32Array(1500); // 500 particles * 3 coordinates
    for (let i = 0; i < 500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200; // x
      positions[i * 3 + 1] = Math.random() * 50 + 10; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200; // z
    }
    return positions;
  }, []);

  // Animate stars (twinkling effect)
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  // Only render for space theme
  if (currentEnvironment.name !== 'Deep Space') {
    return null;
  }

  return (
    <group>
      {/* Stars */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={1000}
            array={starPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={2}
          color={0xffffff}
          transparent
          opacity={0.8}
          sizeAttenuation={false}
        />
      </points>

      {/* Nebula particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={500}
            array={nebulaPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={8}
          color={0x442266}
          transparent
          opacity={0.3}
          sizeAttenuation={true}
        />
      </points>
    </group>
  );
};

export default SpaceParticles;