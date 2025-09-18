import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCurrentEnvironment } from '../config/gameConfig';

const CyberpunkParticles = () => {
  const neonPointsRef = useRef();
  const dataPointsRef = useRef();
  const currentEnvironment = useCurrentEnvironment();

  // Generate neon particle positions
  const neonPositions = useMemo(() => {
    const positions = new Float32Array(2400); // 800 particles * 3 coordinates
    for (let i = 0; i < 800; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 300; // x
      positions[i * 3 + 1] = Math.random() * 30 + 5; // y (floating in air)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 300; // z
    }
    return positions;
  }, []);

  // Generate data stream positions
  const dataPositions = useMemo(() => {
    const positions = new Float32Array(1200); // 400 particles * 3 coordinates
    for (let i = 0; i < 400; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200; // x
      positions[i * 3 + 1] = Math.random() * 40 + 2; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200; // z
    }
    return positions;
  }, []);

  // Generate colors for neon particles
  const neonColors = useMemo(() => {
    const colors = new Float32Array(2400); // 800 particles * 3 colors
    const neonColorOptions = [
      new THREE.Color(0x00ff00), // Green
      new THREE.Color(0xff0080), // Pink
      new THREE.Color(0x0080ff), // Blue
    ];

    for (let i = 0; i < 800; i++) {
      const color = neonColorOptions[Math.floor(Math.random() * neonColorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return colors;
  }, []);

  // Animate particles
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (neonPointsRef.current) {
      neonPointsRef.current.rotation.y = time * 0.02;
      // Add floating motion
      neonPointsRef.current.position.y = Math.sin(time * 0.5) * 0.5;
    }

    if (dataPointsRef.current) {
      dataPointsRef.current.rotation.x = time * 0.03;
      // Add upward data stream motion
      dataPointsRef.current.position.y = (time * 2) % 50;
    }
  });

  // Only render for cyberpunk theme
  if (currentEnvironment.name !== 'Cyberpunk 2077') {
    return null;
  }

  return (
    <group>
      {/* Neon particles */}
      <points ref={neonPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={800}
            array={neonPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={800}
            array={neonColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={3}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Data stream particles */}
      <points ref={dataPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={400}
            array={dataPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={1}
          color={0x00ffff}
          transparent
          opacity={0.9}
          sizeAttenuation={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export default CyberpunkParticles;