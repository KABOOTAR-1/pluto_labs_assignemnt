// ============================================================================
// ⚔️ USE ENEMY ATTACK HOOK - Collision-based Combat System
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS HOOK:
// ✅ This handles enemy attack logic with collision detection and damage dealing
// ✅ Uses distance-based collision detection for player damage
// ✅ Currently used by BaseEnemy component for combat behavior
// ✅ Integrates with game state to only attack during active gameplay
// ✅ Provides attack cooldown to prevent damage spam
//
// 📊 WHAT USEENEMYATTACK ACTUALLY DOES:
// - Distance calculation: measures distance between enemy and player
// - Collision detection: checks if enemy is close enough to attack player
// - Damage dealing: calls onPlayerDamage callback when collision occurs
// - Attack cooldown: prevents multiple attacks in short succession (500ms cooldown)
// - Game state gating: only attacks during GAME_STATES.PLAYING
//
// 📊 WHAT USEENEMYATTACK DOES NOT DO (happens elsewhere):
// - Player health management: handled by usePlayerHealth hook
// - Physics collision: uses manual distance calculation, not physics events
// - Attack animations: no visual feedback for attacks (could be added)
// - Damage types: uses simple damage values (no elemental/special damage)
// - Player damage processing: handled by Player component and health system
//
// 🔄 STATE MANAGEMENT:
// - position: Current enemy position array [x, y, z] (required)
// - size: Enemy collision radius for attack range (required)
// - damage: Damage amount to deal to player (required)
// - playerPosition: Player position array [x, y, z] (required)
// - gameState: Current game state for attack gating (required)
// - onPlayerDamage: Callback function to deal damage to player (required)

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { GAME_STATES } from "../config/gameConfig";

/**
 * ⚔️ USE ENEMY ATTACK HOOK - Collision-based Combat System
 * =======================================================
 *
 * @description Handles enemy attack logic with collision detection and damage dealing
 * @param {Array} position - Current enemy position array [x, y, z] (required)
 * @param {number} size - Enemy collision radius for attack range (required)
 * @param {number} damage - Damage amount to deal to player (required)
 * @param {Array} playerPosition - Player position array [x, y, z] (required)
 * @param {string} gameState - Current game state for attack gating (required)
 * @param {Function} onPlayerDamage - Callback function to deal damage to player (required)
 * @returns {void} No return value - manages combat through side effects
 *
 * 🎯 HOOK RESPONSIBILITIES:
 * - Monitor distance between enemy and player positions
 * - Detect collision events based on size + 1 unit range
 * - Apply attack cooldown to prevent damage spam
 * - Invoke damage callback when collision occurs
 * - Gate attacks based on game state
 *
 * ⚔️ ATTACK MECHANICS:
 * - Detection: Distance-based collision (size + 1 unit range)
 * - Cooldown: 500ms between attacks to prevent spam
 * - Damage: Simple damage value passed to callback
 * - Gating: Only active during GAME_STATES.PLAYING
 * - Timing: Uses Date.now() for attack timing
 *
 * 🚀 CURRENT USAGE:
 * - BaseEnemy Component: Main enemy combat behavior system
 * - Distance Detection: Manual collision detection (not physics-based)
 * - Player Integration: Calls onPlayerDamage from Enemies component
 * - Combat System: Integrated with player health and game over mechanics
 */
export const useEnemyAttack = (
  position,
  size,
  damage,
  playerPosition,
  gameState,
  onPlayerDamage
) => {
  const lastAttack = useRef(0);

  useFrame(() => {
    if (gameState !== GAME_STATES.PLAYING) return;

    const dx = playerPosition[0] - position[0];
    const dz = playerPosition[2] - position[2];
    const distance = Math.sqrt(dx * dx + dz * dz);

    if (distance < size + 1) {
      const now = Date.now();
      if (now - lastAttack.current > 500) {
        lastAttack.current = now;
        onPlayerDamage(damage);
      }
    }
  });
};
