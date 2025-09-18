import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCurrentEnvironment } from '../config/gameConfig';

const MedievalParticles = () => {
  const firefliesRef = useRef();
  const magicRef = useRef();
  const currentEnvironment = useCurrentEnvironment();

  // Generate firefly positions
  const fireflyPositions = useMemo(() => {
    const positions = new Float32Array(1800); // 600 fireflies * 3 coordinates
    for (let i = 0; i < 600; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 250; // x
      positions[i * 3 + 1] = Math.random() * 20 + 3; // y (floating near ground)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 250; // z
    }
    return positions;
  }, []);

  // Generate magic particle positions
  const magicPositions = useMemo(() => {
    const positions = new Float32Array(900); // 300 particles * 3 coordinates
    for (let i = 0; i < 300; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 150; // x
      positions[i * 3 + 1] = Math.random() * 25 + 5; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 150; // z
    }
    return positions;
  }, []);

  // Generate colors for magic particles
  const magicColors = useMemo(() => {
    const colors = new Float32Array(900); // 300 particles * 3 colors
    const magicColorOptions = [
      new THREE.Color(0x9370DB), // Medium purple
      new THREE.Color(0xDA70D6), // Orchid
      new THREE.Color(0xFF69B4), // Hot pink
    ];

    for (let i = 0; i < 300; i++) {
      const color = magicColorOptions[Math.floor(Math.random() * magicColorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return colors;
  }, []);

  // Animate particles
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (firefliesRef.current) {
      firefliesRef.current.rotation.y = time * 0.01;
      // Gentle floating motion for fireflies
      firefliesRef.current.position.y = Math.sin(time * 0.3) * 0.3;
    }

    if (magicRef.current) {
      magicRef.current.rotation.x = time * 0.02;
      magicRef.current.rotation.z = time * 0.015;
      // Magical swirling motion
      magicRef.current.position.y = Math.sin(time * 0.2) * 0.5 + 10;
    }
  });

  // Only render for medieval theme
  if (currentEnvironment.name !== 'Medieval Fantasy') {
    return null;
  }

  return (
    <group>
      {/* Fireflies */}
      <points ref={firefliesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={600}
            array={fireflyPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={2}
          color={0xFFFF00}
          transparent
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>

      {/* Magic particles */}
      <points ref={magicRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={300}
            array={magicPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={300}
            array={magicColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={3}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export default MedievalParticles;