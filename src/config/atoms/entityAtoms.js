// ============================================================================
// 👹 ENTITY STATE ATOMS - Game Object Management
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ These atoms manage all dynamic game entities (enemies, projectiles)
// ✅ Critical for game simulation and rendering performance
// ✅ Use for spawning, updating, and removing game objects
// ✅ Components subscribe to these for real-time entity information
//
// 📊 ENTITY LIFECYCLE:
// 1. SPAWN: Add to array with initial properties
// 2. UPDATE: Modify position, health, state during gameplay
// 3. DESPAWN: Remove from array when destroyed/dead
//
// 🔄 PERFORMANCE: Arrays are used for efficient iteration and updates
// ============================================================================

import { atom } from 'jotai';
import { createProjectilePool } from '../../utils/gameUtils';

/**
 * 👹 ENEMIES ATOM - Active Enemy Entity Management
 * ===============================================
 *
 * @description Array containing all currently active enemies in the game world
 * @type {Array<Object>} - Array of enemy objects with properties:
 *   - id: Unique identifier
 *   - position: [x, y, z] coordinates
 *   - health: Current health points
 *   - maxHealth: Maximum health capacity
 *   - speed: Movement speed
 *   - type: Enemy type ('fast', 'tank', etc.)
 *   - active: Boolean flag for alive/dead state
 *   - rotation: Current facing direction
 *   - targetPosition: Where enemy is moving toward
 * @default [] (empty array, no enemies at start)
 *
 * 🎯 USAGE EXAMPLES:
 * - Enemy spawner adds new enemies to this array
 * - Collision detection iterates through active enemies
 * - Rendering system draws all enemies in this array
 * - AI system updates enemy positions and behaviors
 * - Cleanup removes dead enemies (active: false)
 *
 * 📊 ENTITY STRUCTURE EXAMPLE:
 * ```javascript
 * {
 *   id: 'enemy_123',
 *   position: [10, 0, 5],
 *   health: 50,
 *   maxHealth: 50,
 *   speed: 4,
 *   type: 'fast',
 *   active: true,
 *   rotation: 0,
 *   targetPosition: [0, 0, 0] // Player position
 * }
 * ```
 *
 * ⚡ PERFORMANCE NOTES:
 * - Keep array size reasonable (maxEnemiesSettingAtom)
 * - Inactive enemies should be removed or marked inactive
 * - Position updates happen every frame for smooth movement
 */
export const enemiesAtom = atom([]);

/**
 * 🚀 PROJECTILES ATOM - Bullet/Projectile Management
 * =================================================
 *
 * @description Array of all active projectiles using object pooling for performance
 * @type {Array<Object>} - Pre-allocated array of projectile objects with properties:
 *   - id: Unique identifier
 *   - position: [x, y, z] current coordinates
 *   - velocity: [x, y, z] movement direction and speed
 *   - active: Boolean flag for live/dead state
 *   - damage: Damage dealt on impact
 *   - lifetime: Time remaining before auto-despawn
 *   - owner: Who fired this projectile ('player' or enemy ID)
 *   - type: Projectile type ID from projectileTypes.js
 * @default createProjectilePool() (pre-allocated inactive projectiles)
 *
 * 🎯 USAGE EXAMPLES:
 * - Player shooting activates projectiles from the pool
 * - Enemy attacks spawn projectiles toward player
 * - Physics system updates positions based on velocity
 * - Collision detection checks projectile hits
 * - Lifetime countdown despawns old projectiles
 *
 * 📊 OBJECT POOLING BENEFITS:
 * - No garbage collection during gameplay
 * - Fixed memory usage regardless of projectile count
 * - Fast activation/deactivation of projectiles
 * - Predictable performance under load
 *
 * 🔄 PROJECTILE LIFECYCLE:
 * 1. INACTIVE: Available in pool, waiting to be fired
 * 2. ACTIVE: Moving through world, dealing damage
 * 3. EXPIRED: Lifetime reached, returned to pool
 * 4. COLLISION: Hit target, returned to pool
 *
 * ⚡ PERFORMANCE OPTIMIZATION:
 * - Pre-allocated array prevents memory allocation during gameplay
 * - Reuse inactive projectiles instead of creating new ones
 * - Fixed-size pool prevents memory leaks
 * - Efficient iteration for physics/collision updates
 */
export const projectilesAtom = atom(createProjectilePool());