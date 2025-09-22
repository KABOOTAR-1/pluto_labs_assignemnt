// ============================================================================
// 🧑‍🚀 PLAYER STATE ATOMS - Player Character Management
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ These atoms track the player's current state during gameplay
// ✅ Components subscribe to these for real-time player information
// ✅ Modify these when implementing player mechanics (health, movement, etc.)
// ✅ Use for power-ups, damage, position tracking, and player statistics
//
// 📊 ATOM CATEGORIES:
// - Position & Movement: playerPositionAtom, playerRotationAtom
// - Health & Damage: activePlayerHealthAtom
// - Combat: currentProjectileTypeAtom
//
// 🔄 LIFECYCLE: Reset on game start, updated during gameplay
// ============================================================================

import { atom } from 'jotai';
import { gameConfig } from '../gameConfig';


/**
 * 📍 PLAYER POSITION ATOM - 3D World Coordinates
 * =============================================
 *
 * @description Player's current location in the 3D game world
 * @type {Array<number>} - [x, y, z] coordinates in world space
 * @default [0, 0, 0] - Center of map at ground level
 *
 * 🎯 USAGE EXAMPLES:
 * - Updated by movement system based on player input
 * - Used by camera to follow player
 * - Enemy AI uses this for targeting
 * - Collision detection references this position
 *
 * 📐 COORDINATE SYSTEM:
 * - X: Left (-) to Right (+)
 * - Y: Down (-) to Up (+) - usually 0 for ground level
 * - Z: Back (-) to Forward (+)
 */
export const playerPositionAtom = atom([0, 0, 0]);

/**
 * 🔄 PLAYER ROTATION ATOM - Facing Direction
 * =========================================
 *
 * @description Player's current rotation angle in radians
 * @type {number} - Rotation around Y-axis in radians
 * @default 0 - Facing positive Z direction
 *
 * 🎯 USAGE EXAMPLES:
 * - Updated by mouse look or keyboard input
 * - Determines shooting direction
 * - Affects player model orientation
 * - Used for camera-relative movement
 *
 * 📐 ROTATION VALUES:
 * - 0: Facing forward (positive Z)
 * - π/2 (1.57): Facing right (positive X)
 * - π (3.14): Facing backward (negative Z)
 * - -π/2 (-1.57): Facing left (negative X)
 */
export const playerRotationAtom = atom(0);

/**
 * 🚀 PROJECTILE TYPE ATOM - Weapon Selection
 * ==========================================
 *
 * @description Currently selected projectile type for player attacks
 * @type {string} - ID from projectileTypes.js ('default', custom types)
 * @default 'default' - Basic projectile
 *
 * 🎯 USAGE EXAMPLES:
 * - Changed when player picks up different weapons
 * - Affects projectile appearance, damage, and behavior
 * - UI shows current weapon selection
 * - Shooting system uses this to create correct projectile
 *
 * 🔧 PROJECTILE TYPES:
 * - 'default': Basic projectile (yellow, 30 damage)
 * - Can be extended with custom projectile types
 */
export const currentProjectileTypeAtom = atom('default');



/**
 * ❤️ PLAYER HEALTH ATOM - Core Health Management
 * =============================================
 *
 * @description Current player health during gameplay
 * @type {number} - Current health value (can exceed max with power-ups)
 * @default gameConfig.player.health (typically 100)
 *
 * 🎯 USAGE EXAMPLES:
 * - Decreases when player takes damage from enemies
 * - Increases when collecting health pickups or power-ups
 * - Can temporarily exceed max health with power-ups
 * - Game ends when this reaches 0
 * - HUD displays this value to player
 *
 * ❤️ HEALTH MECHANICS:
 * - Normal range: 0 to maxHealth
 * - Power-up range: maxHealth to maxHealth * 1.5
 * - Death trigger: <= 0
 * - Healing: +25, +50, or full restore
 * - Reset to max health at game start
 */
export const activePlayerHealthAtom = atom(gameConfig.player.health);