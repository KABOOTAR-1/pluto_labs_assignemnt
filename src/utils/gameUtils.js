/**
 * Game utility functions for managing projectiles and enemies
 * Moved from atoms.js to separate concerns
 */

// Create a pool of inactive projectiles
export const createProjectilePool = (size = 15) => {
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

// Utility to reset all projectiles to inactive state
export const resetProjectiles = (projectiles) => {
  return projectiles.map(p => ({ ...p, active: false }));
};

// Utility to reset all enemies to inactive state
export const resetEnemies = (enemies) => {
  return enemies.map(e => ({ ...e, active: false }));
};

// Utility to get active projectiles count
export const getActiveProjectilesCount = (projectiles) => {
  return projectiles.filter(p => p.active).length;
};

// Utility to get active enemies count
export const getActiveEnemiesCount = (enemies) => {
  return enemies.filter(e => e.active).length;
};

// Utility to find enemy by ID
export const findEnemyById = (enemies, id) => {
  return enemies.find(e => e.id === id);
};

// Utility to find projectile by ID
export const findProjectileById = (projectiles, id) => {
  return projectiles.find(p => p.id === id);
};