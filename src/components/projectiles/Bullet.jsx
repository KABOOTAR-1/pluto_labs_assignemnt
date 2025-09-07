import React from 'react';
import { BaseProjectile } from './BaseProjectile';
import { getProjectileType } from '../../data/projectileTypes';
import { useAtomValue } from 'jotai';
import { currentProjectileTypeAtom } from '../../config/atoms';

export const Bullet = (props) => {
  const currentProjectileTypeId = useAtomValue(currentProjectileTypeAtom);
  const projectileConfig = getProjectileType(currentProjectileTypeId);
  
  return (
    <BaseProjectile 
      {...props} 
      size={projectileConfig.size}
      color={projectileConfig.color}
      speed={projectileConfig.speed}
      damage={projectileConfig.damage}
      emissiveIntensity={projectileConfig.emissiveIntensity}
      mass={projectileConfig.mass}
    />
  );
};
