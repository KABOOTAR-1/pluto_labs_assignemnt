// ============================================================================
// 💎 COLLECTIBLE STATE ATOMS - Health Collectible System
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ These atoms manage health collectibles in the game world
// ✅ Collectibles spawn randomly and heal the player when collected
// ✅ Uses object pooling for performance optimization
// ✅ Integrates with existing theme system for visual customization
//
// 🔄 COLLECTIBLE LIFECYCLE:
// 1. Spawn: Random chance when enemies are defeated
// 2. Active: Visible in world, rotating for visual appeal
// 3. Collected: Player touches collectible, heals player
// 4. Inactive: Returned to pool for reuse
//
// 📊 COLLECTIBLE OBJECT STRUCTURE:
// {
//   id: unique identifier,
//   active: boolean (in use or pooled),
//   position: [x, y, z] world coordinates,
//   rotation: current rotation for animation,
//   healAmount: health points to restore,
//   spawnTime: when collectible was created,
//   lifetime: how long collectible stays active
// }
// ============================================================================

import { atom } from 'jotai';
import { createCollectiblePool } from '../../utils/gameUtils';

/**
 * 💎 COLLECTIBLES ATOM - Active Collectible Collection
 * ==================================================
 *
 * @description Array of all collectibles currently in the game world
 * @type {Array<Object>} - Collectible objects with position, rotation, heal amount
 * @default Empty array (no collectibles initially)
 *
 * 🎯 USAGE EXAMPLES:
 * ```javascript
 * const [collectibles, setCollectibles] = useAtom(collectiblesAtom);
 *
 * // Add new collectible
 * setCollectibles(prev => [...prev, newCollectible]);
 *
 * // Remove collected collectible
 * setCollectibles(prev => prev.filter(c => c.id !== collectedId));
 * ```
 *
 * 🔄 OBJECT POOLING:
 * - Uses object pool for performance (no garbage collection)
 * - Collectibles are marked active/inactive instead of created/destroyed
 * - Pool is pre-allocated at game start for consistent performance
 *
 * 📊 COLLECTIBLE PROPERTIES:
 * - id: Unique identifier for tracking
 * - active: Whether collectible is currently in world
 * - position: [x, y, z] world coordinates
 * - rotation: Current rotation for spinning animation
 * - healAmount: Health points restored when collected
 * - spawnTime: Timestamp when collectible was activated
 * - lifetime: How long collectible stays in world (ms)
 */
export const collectiblesAtom = atom(createCollectiblePool(20)); // Pre-allocate 20 collectibles

/**
 * 🎲 COLLECTIBLE SPAWN SETTINGS - Configuration Atoms
 * =================================================
 *
 * @description User-configurable settings for collectible spawning behavior
 * @type {number} - Probability and timing values
 *
 * 🎯 SPAWN MECHANICS:
 * - spawnChanceAtom: Probability (0-1) that defeating enemy spawns collectible
 * - spawnDelayAtom: Minimum time (ms) between collectible spawns
 * - maxActiveCollectiblesAtom: Maximum collectibles that can exist simultaneously
 *
 * 🔧 BALANCING GUIDE:
 * - Higher spawnChance = easier game (more healing)
 * - Lower spawnDelay = more frequent collectibles
 * - Higher maxActive = more collectibles on screen
 */
export const collectibleSpawnChanceAtom = atom(0.15); // 15% chance per enemy defeat
export const collectibleSpawnDelayAtom = atom(3000); // 3 seconds minimum between spawns
export const maxActiveCollectiblesAtom = atom(3); // Maximum 3 collectibles on screen

/**
 * ⏰ COLLECTIBLE TIMING - Spawn Control Atoms
 * =========================================
 *
 * @description Timing controls for collectible spawn management
 * @type {number} - Timestamp values for spawn control
 *
 * 🎯 TIMING MECHANICS:
 * - lastSpawnTimeAtom: When the last collectible was spawned
 * - Used to enforce minimum delay between spawns
 * - Prevents collectible spam and maintains game balance
 */
export const lastCollectibleSpawnTimeAtom = atom(0); // Timestamp of last spawn

/**
 * 📊 COLLECTIBLE STATISTICS - Collection Tracking
 * =============================================
 *
 * @description Statistics for collectible collection and usage
 * @type {number} - Counter values for player statistics
 *
 * 🎯 STATISTICS TRACKED:
 * - collectiblesCollectedAtom: Total collectibles collected this game
 * - totalHealthRestoredAtom: Total health points restored by collectibles
 * - Used for end-game statistics and achievement systems
 */
export const collectiblesCollectedAtom = atom(0); // Total collected this game
export const totalHealthRestoredAtom = atom(0); // Total health restored