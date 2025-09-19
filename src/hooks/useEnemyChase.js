// ============================================================================
// 🏃‍♂️ USE ENEMY CHASE HOOK - Simple Player Pursuit with Kinematic Movement
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS HOOK:
// ✅ This handles simple enemy chase behavior using Kinematic physics bodies
// ✅ Calculates direction vectors and applies velocity for smooth movement
// ✅ Currently used by BaseEnemy component for enemy chase behavior
// ✅ Integrates with game state to only chase during active gameplay
// ✅ Provides normalized movement vectors for consistent enemy speed
//
// 📊 WHAT USEENEMYCHASE ACTUALLY DOES:
// - Direction calculation: computes direction vector from enemy to player
// - Distance calculation: measures distance between enemy and player positions
// - Velocity application: sets Kinematic body velocity for movement
// - Speed normalization: ensures consistent movement speed regardless of distance
// - Game state gating: only chases during GAME_STATES.PLAYING
//
// 📊 WHAT USEENEMYCHASE DOES NOT DO (happens elsewhere):
// - Physics body creation: done in BaseEnemy component with useBox
// - Collision detection: handled by enemy attack systems
// - Enemy rendering: handled by BaseEnemy and enemy type components
// - Pathfinding: uses direct line movement (no obstacle avoidance)
// - Attack behavior: handled by useEnemyAttack hook
//
// 🔄 STATE MANAGEMENT:
// - api: Cannon.js physics body API for velocity control (required)
// - position: Current enemy position array [x, y, z] (required)
// - speed: Enemy movement speed multiplier (required)
// - playerPosition: Player position array [x, y, z] (required)
// - gameState: Current game state for movement gating (required)

import { useFrame } from "@react-three/fiber";
import { GAME_STATES } from "../config/constants";

/**
 * 🏃‍♂️ USE ENEMY CHASE HOOK - Simple Player Pursuit with Kinematic Movement
 * ========================================================================
 *
 * @description Handles simple enemy chase behavior using Kinematic physics bodies
 * @param {Object} api - Cannon.js physics body API for velocity control (required)
 * @param {Array} position - Current enemy position array [x, y, z] (required)
 * @param {number} speed - Enemy movement speed multiplier (required)
 * @param {Array} playerPosition - Player position array [x, y, z] (required)
 * @param {string} gameState - Current game state for movement gating (required)
 * @returns {void} No return value - manages enemy movement through side effects
 *
 * 🎯 HOOK RESPONSIBILITIES:
 * - Calculate direction vector from enemy to player
 * - Apply normalized velocity to Kinematic physics body
 * - Handle edge cases (zero distance, same position)
 * - Gate movement based on game state
 * - Provide smooth, consistent enemy movement
 *
 * 🏃‍♂️ CHASE MECHANICS:
 * - Movement: Direct line pursuit toward player position
 * - Physics: Uses Kinematic body velocity for code-controlled movement
 * - Speed: Consistent movement speed regardless of distance
 * - Gating: Only active during GAME_STATES.PLAYING
 * - Direction: Normalized vector for smooth movement
 *
 * 🚀 CURRENT USAGE:
 * - BaseEnemy Component: Main enemy AI behavior system
 * - Kinematic Physics: Uses velocity API for movement control
 * - Game State Integration: Respects gameplay state for movement
 * - Enemy Types: Used by all enemy types (FastEnemy, TankEnemy, etc.)
 */
export const useEnemyChase = (api, position, speed, playerPosition, gameState) => {
  useFrame(() => {
    if (gameState !== GAME_STATES.PLAYING) return;
    //console.log("Enemy chasing player:", position, playerPosition);
    const dirX = playerPosition[0] - position[0];
    const dirZ = playerPosition[2] - position[2];
    const distance = Math.sqrt(dirX * dirX + dirZ * dirZ);
    if (distance === 0)
      { 
        api.velocity.set(0, 0, 0);
        return};

    const nx = dirX / distance;
    const nz = dirZ / distance;
    api.velocity.set(nx * speed, 0, nz * speed);
  });
};
