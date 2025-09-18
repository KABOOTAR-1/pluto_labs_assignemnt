import { atom } from 'jotai';
import { gameConfig, selectedThemeAtom } from './gameConfig';
import { THEMES, GAME_STATES } from './constants';

// Re-export for convenience
export { selectedThemeAtom, THEMES };

export const gameStateAtom = atom(GAME_STATES.MENU);

export const playerHealthAtom = atom(gameConfig.player.health);
export const playerPositionAtom = atom([0, 0, 0]);
export const playerRotationAtom = atom(0);

export const scoreAtom = atom(gameConfig.rules.initialScore);
export const enemiesKilledAtom = atom(0);

export const enemiesAtom = atom([]);

const createProjectilePool = (size = 15) => {
  const pool = [];
  for (let i = 0; i < size; i++) {
    pool.push({
      id: `proj-${i}`,
      type: 'bullet',
      position: [0, 0, 0],
      direction: [0, 0, 1],
      speed: 10,
      size: 0.1,
      damage: 10,
      color: '#ffffff',
      createdAt: 0,
      active: false,
    });
  }
  return pool;
};

export const projectilesAtom = atom(createProjectilePool());

// Utility to get an inactive projectile and activate it
export const activateProjectile = (projectiles, projectileData) => {
  const inactiveIndex = projectiles.findIndex(p => !p.active);
  if (inactiveIndex === -1) return projectiles; // No available projectiles

  const now = Date.now();
  const updatedProjectiles = [...projectiles];
  updatedProjectiles[inactiveIndex] = {
    ...updatedProjectiles[inactiveIndex],
    ...projectileData,
    id: `proj-${inactiveIndex}-${now}`,
    createdAt: now,
    active: true,
  };
  return updatedProjectiles;
};

// Utility to deactivate a projectile
export const deactivateProjectile = (projectiles, id) => {
  return projectiles.map(p => p.id === id ? { ...p, active: false } : p);
};

// Utility to activate or create an enemy
export const activateEnemy = (enemies, enemyData) => {
  const inactiveIndex = enemies.findIndex(e => !e.active);
  if (inactiveIndex !== -1) {
    // Reuse inactive enemy
    const now = Date.now();
    const updatedEnemies = [...enemies];
    updatedEnemies[inactiveIndex] = {
      ...updatedEnemies[inactiveIndex],
      ...enemyData,
      id: `enemy-${inactiveIndex}-${now}`,
      active: true,
    };
    return updatedEnemies;
  } else {
    // Create new enemy
    const now = Date.now();
    return [
      ...enemies,
      {
        ...enemyData,
        id: `enemy-${enemies.length}-${now}`,
        active: true,
      },
    ];
  }
};

// Utility to deactivate an enemy
export const deactivateEnemy = (enemies, id) => {
  return enemies.map(e => e.id === id ? { ...e, active: false } : e);
};
export const currentProjectileTypeAtom = atom('default');

export const runtimePlayerSpeedAtom = atom(gameConfig.player.speed);
export const runtimeProjectileSpeedAtom = atom(gameConfig.player.projectileSpeed);
export const runtimePlayerHealthAtom = atom(gameConfig.player.health);

export const showHUDAtom = atom(true);

// Settings atoms for configurable game values
export const playerSpeedSettingAtom = atom(gameConfig.player.speed);
export const playerHealthSettingAtom = atom(gameConfig.player.health);
export const playerFireRateSettingAtom = atom(gameConfig.player.fireRate);
export const enemySpeedMultiplierAtom = atom(1.0);
export const enemySpawnRateAtom = atom(1.0);
export const difficultyMultiplierAtom = atom(1.0);
export const maxEnemiesSettingAtom = atom(gameConfig.enemySettings.maxOnScreen);

export const resetGameAtom = atom(
  null,
  (get, set) => {
    set(gameStateAtom, GAME_STATES.PLAYING);
    set(playerHealthAtom, get(playerHealthSettingAtom));
    set(playerPositionAtom, gameConfig.player.initialPosition);
    set(playerRotationAtom, 0);
    set(scoreAtom, gameConfig.rules.initialScore);
    set(enemiesKilledAtom, 0);
    set(enemiesAtom, (prev) => prev.map(e => ({ ...e, active: false })));
    set(projectilesAtom, (prev) => prev.map(p => ({ ...p, active: false })));
    set(currentProjectileTypeAtom, 'default');
  }
);
