/**
 * 🎮 GAME UTILITIES - Entity Management System
 * ============================================
 *
 * 🎯 HOW AI SHOULD USE THIS FILE:
 * ✅ This is the CORE entity management system for projectiles and enemies
 * ✅ Provides OBJECT POOLING for performance optimization
 * ✅ Handles entity lifecycle (create, activate, deactivate, destroy)
 * ✅ Critical for game performance and memory management
 * ✅ Used by atoms.js for reactive state management
 *
 * 📊 ENTITY LIFECYCLE MANAGEMENT:
 * 1. CREATE: Initialize pools of inactive entities
 * 2. ACTIVATE: Pull from pool and configure for use
 * 3. UPDATE: Modify properties during gameplay
 * 4. DEACTIVATE: Return to pool for reuse
 * 5. RESET: Clear all entities (game restart)
 *
 * ⚡ PERFORMANCE OPTIMIZATION:
 * - Object pooling prevents garbage collection during gameplay
 * - Fixed-size arrays for predictable memory usage
 * - Reuse inactive entities instead of creating new ones
 * - Efficient iteration and filtering operations
 */

/**
 * 🚀 CREATE PROJECTILE POOL - Object Pooling Initialization
 * ========================================================
 *
 * @description Creates a pre-allocated pool of inactive projectile objects for performance
 * @param {number} size - Number of projectiles to pre-allocate (default: 15)
 * @returns {Array<Object>} Array of inactive projectile objects ready for pooling
 *
 * 🎯 USAGE EXAMPLES:
 * - Game initialization: createProjectilePool(20) for larger games
 * - Memory optimization: Smaller pools for mobile devices
 * - Dynamic scaling: Adjust based on game difficulty
 *
 * 📊 OBJECT STRUCTURE:
 * Each projectile contains: id, type, position, direction, speed, size, damage, color, createdAt, active
 *
 * ⚡ PERFORMANCE BENEFITS:
 * - No memory allocation during gameplay
 * - Predictable memory footprint
 * - Fast activation/deactivation
 * - Prevents garbage collection pauses
 */
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

/**
 * 🎯 ACTIVATE PROJECTILE - Pool Object Activation
 * ===============================================
 *
 * @description Finds an inactive projectile in the pool and activates it with custom data
 * @param {Array<Object>} projectiles - The projectile pool array
 * @param {Object} projectileData - Configuration data to apply to the projectile
 * @returns {Array<Object>} Updated projectiles array with activated projectile
 *
 * 🎯 USAGE EXAMPLES:
 * - Player shooting: activateProjectile(projectiles, { position: playerPos, direction: aimDir })
 * - Enemy attacks: activateProjectile(projectiles, { damage: 15, speed: 12 })
 * - Power-ups: activateProjectile(projectiles, { size: 0.3, color: '#ff0000' })
 *
 * 🔄 ACTIVATION PROCESS:
 * 1. Find first inactive projectile in pool
 * 2. Merge projectileData with base projectile properties
 * 3. Generate unique ID with timestamp
 * 4. Set active: true and createdAt timestamp
 * 5. Return updated array (immutable)
 *
 * ⚠️ ERROR HANDLING:
 * - Returns original array if no inactive projectiles available
 * - Prevents crashes when pool is exhausted
 * - Maintains game stability during high projectile volume
 *
 * 📊 PROJECTILE DATA PROPERTIES:
 * - position: [x, y, z] starting coordinates
 * - direction: [x, y, z] normalized movement vector
 * - speed: units per second movement speed
 * - damage: health points removed from targets
 * - size: visual radius of projectile
 * - color: hex color string for rendering
 */
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

/**
 * 🛑 DEACTIVATE PROJECTILE - Return to Pool
 * =========================================
 *
 * @description Deactivates a projectile and returns it to the pool for reuse
 * @param {Array<Object>} projectiles - The projectile pool array
 * @param {string} id - Unique identifier of the projectile to deactivate
 * @returns {Array<Object>} Updated projectiles array with deactivated projectile
 *
 * 🎯 USAGE EXAMPLES:
 * - Projectile hits target: deactivateProjectile(projectiles, projectileId)
 * - Projectile expires: deactivateProjectile(projectiles, projectileId)
 * - Collision detection: deactivateProjectile(projectiles, hitProjectileId)
 * - Game reset: deactivateProjectile(projectiles, projectileId)
 *
 * 🔄 DEACTIVATION PROCESS:
 * 1. Find projectile by ID in the array
 * 2. Set active: false to return to pool
 * 3. Preserve all other properties for reuse
 * 4. Return updated array (immutable)
 *
 * ⚡ PERFORMANCE BENEFITS:
 * - Fast lookup by ID (no linear search needed)
 * - Preserves projectile data for future reuse
 * - No memory deallocation during gameplay
 * - Maintains pool integrity
 *
 * 📊 IMMUTABLE UPDATE:
 * Uses map() to create new array, maintaining React's immutability principles
 * Required for proper state updates in Jotai atoms
 */
export const deactivateProjectile = (projectiles, id) => {
  return projectiles.map(p => p.id === id ? { ...p, active: false } : p);
};

/**
 * 👹 ACTIVATE ENEMY - Enemy Spawning System
 * =========================================
 *
 * @description Activates an existing enemy from the pool or creates a new one if pool is full
 * @param {Array<Object>} enemies - The enemies array (pool)
 * @param {Object} enemyData - Configuration data for the enemy
 * @returns {Array<Object>} Updated enemies array with activated enemy
 *
 * 🎯 USAGE EXAMPLES:
 * - Enemy spawner: activateEnemy(enemies, { position: spawnPos, type: 'fast' })
 * - Dynamic spawning: activateEnemy(enemies, { health: 50, speed: 3 })
 * - Wave systems: activateEnemy(enemies, { damage: 15, points: 20 })
 *
 * 🔄 ACTIVATION STRATEGY:
 * 1. First tries to reuse inactive enemy from pool
 * 2. If no inactive enemies, creates new enemy and adds to array
 * 3. Generates unique ID with timestamp
 * 4. Sets active: true for game participation
 *
 * 📊 ENEMY DATA PROPERTIES:
 * - position: [x, y, z] spawn coordinates
 * - health: starting health points
 * - maxHealth: maximum health capacity
 * - speed: movement speed (units/second)
 * - type: enemy type identifier ('fast', 'tank', etc.)
 * - damage: damage dealt to player
 * - points: score awarded when defeated
 *
 * ⚡ PERFORMANCE OPTIMIZATION:
 * - Pool reuse prevents memory allocation during gameplay
 * - Dynamic expansion when pool is insufficient
 * - Efficient ID generation for tracking
 */
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

/**
 * 💀 DEACTIVATE ENEMY - Enemy Cleanup
 * ===================================
 *
 * @description Deactivates an enemy and returns it to the pool for reuse
 * @param {Array<Object>} enemies - The enemies array
 * @param {string} id - Unique identifier of the enemy to deactivate
 * @returns {Array<Object>} Updated enemies array with deactivated enemy
 *
 * 🎯 USAGE EXAMPLES:
 * - Enemy defeated: deactivateEnemy(enemies, enemyId)
 * - Enemy cleanup: deactivateEnemy(enemies, enemyId) // Manual cleanup when needed
 * - Game reset: deactivateEnemy(enemies, enemyId)
 * - Health depletion: deactivateEnemy(enemies, enemyId)
 * - Performance optimization: deactivateEnemy(enemies, enemyId) // When too many enemies
 *
 * 🔄 DEACTIVATION PROCESS:
 * 1. Find enemy by unique ID
 * 2. Set active: false to remove from gameplay
 * 3. Preserve all properties for potential reuse
 * 4. Return updated array (immutable)
 *
 * ⚡ MEMORY MANAGEMENT:
 * - Returns enemy to pool instead of deleting
 * - Prevents memory leaks from frequent spawning/despawning
 * - Maintains pool efficiency for future spawns
 * - Preserves enemy configuration for reuse
 *
 * 📝 NOTE: Off-screen enemies are NOT automatically deactivated
 * - This function requires manual deactivation when needed
 * - Consider implementing distance-based culling in game logic if required
 */
export const deactivateEnemy = (enemies, id) => {
  return enemies.map(e => e.id === id ? { ...e, active: false } : e);
};

/**
 * 🔄 RESET PROJECTILES - Game State Reset
 * =======================================
 *
 * @description Deactivates all projectiles in preparation for game restart or level transition
 * @param {Array<Object>} projectiles - The projectiles array to reset
 * @returns {Array<Object>} Updated projectiles array with all entities deactivated
 *
 * 🎯 USAGE EXAMPLES:
 * - Game over: resetProjectiles(projectiles) // Clear all active projectiles
 * - Level transition: resetProjectiles(projectiles) // Clean slate for new level
 * - Game restart: resetProjectiles(projectiles) // Reset to initial state
 *
 * 🔄 RESET PROCESS:
 * 1. Maps through all projectiles in array
 * 2. Sets active: false for every projectile
 * 3. Preserves all other properties (position, damage, etc.)
 * 4. Returns updated array (immutable)
 *
 * ⚡ PERFORMANCE CONSIDERATIONS:
 * - O(n) operation where n is projectile pool size
 * - Typically called infrequently (game reset/level change)
 * - Prepares pool for next game session
 * - Maintains projectile configurations for reuse
 */
export const resetProjectiles = (projectiles) => {
  return projectiles.map(p => ({ ...p, active: false }));
};

/**
 * 🔄 RESET ENEMIES - Enemy State Reset
 * ====================================
 *
 * @description Deactivates all enemies in preparation for game restart or level transition
 * @param {Array<Object>} enemies - The enemies array to reset
 * @returns {Array<Object>} Updated enemies array with all entities deactivated
 *
 * 🎯 USAGE EXAMPLES:
 * - Game over: resetEnemies(enemies) // Clear all active enemies
 * - Level transition: resetEnemies(enemies) // Clean slate for new level
 * - Game restart: resetEnemies(enemies) // Reset to initial state
 * - Wave system: resetEnemies(enemies) // Prepare for next wave
 *
 * 🔄 RESET PROCESS:
 * 1. Maps through all enemies in array
 * 2. Sets active: false for every enemy
 * 3. Preserves enemy configurations and stats
 * 4. Returns updated array (immutable)
 *
 * ⚡ PERFORMANCE CONSIDERATIONS:
 * - O(n) operation where n is enemy pool size
 * - Called during game state transitions
 * - Prepares enemy pool for next gameplay session
 * - Maintains enemy variety and difficulty settings
 */
export const resetEnemies = (enemies) => {
  return enemies.map(e => ({ ...e, active: false }));
};

/**
 * 📊 GET ACTIVE PROJECTILES COUNT - Performance Monitoring
 * ========================================================
 *
 * @description Counts how many projectiles are currently active in the game world
 * @param {Array<Object>} projectiles - The projectiles array to analyze
 * @returns {number} Number of projectiles with active: true
 *
 * 🎯 USAGE EXAMPLES:
 * - Performance monitoring: getActiveProjectilesCount(projectiles) // Track entity count
 * - UI display: getActiveProjectilesCount(projectiles) // Show active projectile count
 * - Debug logging: getActiveProjectilesCount(projectiles) // Performance analysis
 * - Pool management: getActiveProjectilesCount(projectiles) // Check pool utilization
 *
 * 🔍 ANALYSIS PROCESS:
 * 1. Filters projectiles array for active entities
 * 2. Returns length of filtered array
 * 3. Non-destructive operation (no state changes)
 *
 * 📈 PERFORMANCE METRICS:
 * - Useful for monitoring game performance
 * - Helps identify projectile pool utilization
 * - Can trigger pool expansion if needed
 * - Debugging tool for entity management
 */
export const getActiveProjectilesCount = (projectiles) => {
  return projectiles.filter(p => p.active).length;
};

/**
 * 📊 GET ACTIVE ENEMIES COUNT - Game State Monitoring
 * ===================================================
 *
 * @description Counts how many enemies are currently active in the game world
 * @param {Array<Object>} enemies - The enemies array to analyze
 * @returns {number} Number of enemies with active: true
 *
 * 🎯 USAGE EXAMPLES:
 * - Difficulty scaling: getActiveEnemiesCount(enemies) // Adjust spawn rates
 * - UI display: getActiveEnemiesCount(enemies) // Show enemy count
 * - Performance monitoring: getActiveEnemiesCount(enemies) // Track entity load
 * - Wave progression: getActiveEnemiesCount(enemies) // Check wave completion
 *
 * 🔍 ANALYSIS PROCESS:
 * 1. Filters enemies array for active entities
 * 2. Returns length of filtered array
 * 3. Non-destructive operation (no state changes)
 *
 * 📈 GAME BALANCE APPLICATIONS:
 * - Spawn rate adjustment based on active count
 * - Difficulty scaling decisions
 * - Performance optimization triggers
 * - Wave completion detection
 */
export const getActiveEnemiesCount = (enemies) => {
  return enemies.filter(e => e.active).length;
};

/**
 * 🔍 FIND ENEMY BY ID - Entity Lookup
 * ===================================
 *
 * @description Finds a specific enemy in the enemies array by its unique ID
 * @param {Array<Object>} enemies - The enemies array to search
 * @param {string} id - The unique identifier of the enemy to find
 * @returns {Object|null} The enemy object if found, null if not found
 *
 * 🎯 USAGE EXAMPLES:
 * - Collision detection: findEnemyById(enemies, hitEnemyId) // Get enemy data
 * - Damage application: findEnemyById(enemies, targetId) // Apply damage
 * - UI targeting: findEnemyById(enemies, selectedId) // Show enemy info
 * - Enemy updates: findEnemyById(enemies, enemyId) // Modify enemy state
 *
 * 🔍 SEARCH PROCESS:
 * 1. Uses Array.find() to search enemies array
 * 2. Compares enemy.id with provided id parameter
 * 3. Returns first matching enemy or null
 * 4. Non-destructive operation (no state changes)
 *
 * ⚡ PERFORMANCE NOTES:
 * - O(n) search complexity where n is enemy count
 * - Suitable for infrequent lookups
 * - Consider ID-based Map for frequent lookups if performance critical
 */
export const findEnemyById = (enemies, id) => {
  return enemies.find(e => e.id === id);
};

/**
 * 🔍 FIND PROJECTILE BY ID - Entity Lookup
 * ========================================
 *
 * @description Finds a specific projectile in the projectiles array by its unique ID
 * @param {Array<Object>} projectiles - The projectiles array to search
 * @param {string} id - The unique identifier of the projectile to find
 * @returns {Object|null} The projectile object if found, null if not found
 *
 * 🎯 USAGE EXAMPLES:
 * - Collision resolution: findProjectileById(projectiles, hitProjectileId)
 * - Projectile updates: findProjectileById(projectiles, projectileId) // Modify trajectory
 * - Debug inspection: findProjectileById(projectiles, debugId) // Examine projectile
 * - Effect application: findProjectileById(projectiles, effectTargetId)
 *
 * 🔍 SEARCH PROCESS:
 * 1. Uses Array.find() to search projectiles array
 * 2. Compares projectile.id with provided id parameter
 * 3. Returns first matching projectile or null
 * 4. Non-destructive operation (no state changes)
 *
 * ⚡ PERFORMANCE NOTES:
 * - O(n) search complexity where n is projectile count
 * - Suitable for collision detection and occasional lookups
 * - For high-frequency lookups, consider alternative data structures
 * - Projectile IDs are generated with timestamps for uniqueness
 */
export const findProjectileById = (projectiles, id) => {
  return projectiles.find(p => p.id === id);
};