import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useCurrentEnvironment } from '../config/gameConfig';

const PostApocalypticParticles = () => {
  const dustRef = useRef();
  const sparksRef = useRef();
  const currentEnvironment = useCurrentEnvironment();

  // Generate dust particles
  const dustPositions = useMemo(() => {
    const positions = new Float32Array(1500); // 500 dust particles * 3 coordinates
    for (let i = 0; i < 500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200; // x
      positions[i * 3 + 1] = Math.random() * 15 + 1; // y (near ground)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200; // z
    }
    return positions;
  }, []);

  // Generate spark particles
  const sparkPositions = useMemo(() => {
    const positions = new Float32Array(600); // 200 spark particles * 3 coordinates
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 150; // x
      positions[i * 3 + 1] = Math.random() * 20 + 2; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 150; // z
    }
    return positions;
  }, []);

  // Generate colors for spark particles
  const sparkColors = useMemo(() => {
    const colors = new Float32Array(600); // 200 particles * 3 colors
    const sparkColorOptions = [
      new THREE.Color(0xFFFF00), // Yellow
      new THREE.Color(0xFF4500), // Orange-red
      new THREE.Color(0xFF6347), // Tomato red
    ];

    for (let i = 0; i < 200; i++) {
      const color = sparkColorOptions[Math.floor(Math.random() * sparkColorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return colors;
  }, []);

  // Animate particles
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (dustRef.current) {
      dustRef.current.rotation.y = time * 0.01;
      // Gentle dust movement
      dustRef.current.position.y = Math.sin(time * 0.2) * 0.2;
    }

    if (sparksRef.current) {
      sparksRef.current.rotation.x = time * 0.03;
      sparksRef.current.rotation.z = time * 0.02;
      // Sparkling effect
      sparksRef.current.position.y = Math.sin(time * 0.8) * 0.3 + 8;
    }
  });

  // Only render for post-apocalyptic theme
  if (currentEnvironment.name !== 'Post-Apocalyptic') {
    return null;
  }

  return (
    <group>
      {/* Dust particles */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={500}
            array={dustPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={1}
          color={0x8B7355}
          transparent
          opacity={0.4}
          sizeAttenuation={true}
        />
      </points>

      {/* Spark particles */}
      <points ref={sparksRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={200}
            array={sparkPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={200}
            array={sparkColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={2}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export default PostApocalypticParticles;