
import { projectileTypes } from './projectileTypes.js';

export const weaponLoadouts = {
  basic: {
    name: 'Basic Weapon',
    projectileType: 'bullet',
    fireRate: 2, // shots per second
    description: 'Standard starting weapon'
  },

};

export const difficultyModifiers = {
  easy: {
    damageMultiplier: 1.5,
    speedMultiplier: 1.2,
    description: 'Increased damage and speed for easier gameplay'
  },
  
  normal: {
    damageMultiplier: 1.0,
    speedMultiplier: 1.0,
    description: 'Standard projectile stats'
  },
  
  hard: {
    damageMultiplier: 0.8,
    speedMultiplier: 0.9,
    description: 'Reduced damage and speed for challenge'
  }
};

export const createProjectileConfig = (typeId, loadout = 'basic', difficulty = 'normal') => {
  const baseType = projectileTypes.find(t => t.id === typeId);
  const weaponConfig = weaponLoadouts[loadout];
  const difficultyMod = difficultyModifiers[difficulty];
  
  if (!baseType) {
    console.warn(`Projectile type '${typeId}' not found, using bullet`);
    return createProjectileConfig('bullet', loadout, difficulty);
  }
  
  return {
    ...baseType,
    damage: Math.round(baseType.damage * difficultyMod.damageMultiplier),
    speed: baseType.speed * difficultyMod.speedMultiplier,
    fireRate: weaponConfig.fireRate,
    weaponName: weaponConfig.name
  };
};
