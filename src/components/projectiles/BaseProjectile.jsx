import React, { useEffect } from 'react';
import { useSphere } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';

export const BaseProjectile = ({
  id,
  position,
  direction,
  speed,
  size,
  color,
  damage,
  mass = 0.1,
  emissiveIntensity = 0.5,
  enemies,
  onHit,
  onUpdate
}) => {
  const [ref, api] = useSphere(() => ({
    mass,
    position,
    args: [size],
    type: 'Kinematic',
  }));

  useFrame((_, delta) => {
    const movement = [
      direction[0] * speed * delta,
      direction[1] * speed * delta,
      direction[2] * speed * delta,
    ];

    position[0] += movement[0];
    position[1] += movement[1];
    position[2] += movement[2];

    api.position.set(position[0], position[1], position[2]);

    if (onUpdate) {
      onUpdate(id, position);
    }

    enemies.forEach((enemy) => {
      if (!enemy.position) return;

      const dx = position[0] - enemy.position[0];
      const dz = position[2] - enemy.position[2];
      const distance = Math.sqrt(dx * dx + dz * dz);

      const collisionRadius = size + (enemy.size || 0.5) * 0.5;
      if (distance < collisionRadius) {
        onHit(id, enemy.id, damage);
      }
    });
  });

  useEffect(() => {
    const timeout = setTimeout(() => onHit(id, null, 0), 5000);
    return () => clearTimeout(timeout);
  }, [id, onHit]);

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[size]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
};
