
import { createProjectileConfig } from '../data/customProjectileConfigs.js';

export class ProjectileController {
  constructor() {
    this.projectiles = [];
    this.nextId = 1;
    this.activeWeapon = 'basic';
    this.difficulty = 'normal';
  }

  // Create a new projectile
  createProjectile(position, direction, typeId = 'bullet', customConfig = {}) {
    const projectileConfig = createProjectileConfig(typeId, this.activeWeapon, this.difficulty);
    
    const projectile = {
      id: this.nextId++,
      type: typeId,
      position: [...position], // Clone position array
      direction: [...direction], // Clone direction array
      createdAt: Date.now(),
      ...projectileConfig,
      ...customConfig // Allow override of any properties
    };

    this.projectiles.push(projectile);
    return projectile;
  }

  // Update projectile positions and handle physics
  updateProjectiles(deltaTime, enemies = []) {
    const results = {
      hits: [],
      expired: [],
      updated: []
    };

    this.projectiles = this.projectiles.filter(projectile => {
      // Check if projectile has expired
      const age = Date.now() - projectile.createdAt;
      if (age > projectile.lifetime) {
        results.expired.push(projectile.id);
        return false;
      }

      // Update position
      const movement = [
        projectile.direction[0] * projectile.speed * deltaTime,
        projectile.direction[1] * projectile.speed * deltaTime,
        projectile.direction[2] * projectile.speed * deltaTime
      ];

      projectile.position[0] += movement[0];
      projectile.position[1] += movement[1];
      projectile.position[2] += movement[2];

      // Check collisions with enemies
      const hitEnemies = this.checkCollisions(projectile, enemies);
      if (hitEnemies.length > 0) {
        hitEnemies.forEach(enemy => {
          results.hits.push({
            projectileId: projectile.id,
            enemyId: enemy.id,
            damage: projectile.damage,
            projectileType: projectile.type
          });
        });
        return false; // Remove projectile after hit
      }

      results.updated.push(projectile);
      return true;
    });

    return results;
  }

  // Check collisions between a projectile and enemies
  checkCollisions(projectile, enemies) {
    const hits = [];
    
    enemies.forEach(enemy => {
      if (!enemy.position) return;

      const dx = projectile.position[0] - enemy.position[0];
      const dz = projectile.position[2] - enemy.position[2];
      const distance = Math.sqrt(dx * dx + dz * dz);

      // Collision detection with combined radius
      const collisionRadius = projectile.size + (enemy.size || 0.5) * 2;
      if (distance < collisionRadius) {
        hits.push(enemy);
      }
    });

    return hits;
  }

  // Remove a specific projectile
  removeProjectile(projectileId) {
    this.projectiles = this.projectiles.filter(p => p.id !== projectileId);
  }

  // Get all active projectiles
  getProjectiles() {
    return [...this.projectiles]; // Return a copy
  }

  // Get projectile by ID
  getProjectile(id) {
    return this.projectiles.find(p => p.id === id);
  }

  // Clear all projectiles
  clearAll() {
    this.projectiles = [];
  }

  // Set active weapon loadout
  setWeapon(weaponType) {
    this.activeWeapon = weaponType;
  }

  // Set difficulty level
  setDifficulty(difficultyLevel) {
    this.difficulty = difficultyLevel;
  }

  // Get weapon info
  getWeaponInfo() {
    return {
      activeWeapon: this.activeWeapon,
      difficulty: this.difficulty,
      projectileCount: this.projectiles.length
    };
  }

  // Cleanup expired projectiles (alternative to automatic cleanup)
  cleanupExpired() {
    const now = Date.now();
    const initialCount = this.projectiles.length;
    
    this.projectiles = this.projectiles.filter(projectile => {
      const age = now - projectile.createdAt;
      return age <= projectile.lifetime;
    });

    return initialCount - this.projectiles.length; // Return number of cleaned up projectiles
  }

  // Get projectile statistics
  getStats() {
    const typeCount = {};
    this.projectiles.forEach(p => {
      typeCount[p.type] = (typeCount[p.type] || 0) + 1;
    });

    return {
      total: this.projectiles.length,
      byType: typeCount,
      oldestAge: this.projectiles.length > 0 
        ? Math.max(...this.projectiles.map(p => Date.now() - p.createdAt))
        : 0
    };
  }
}
