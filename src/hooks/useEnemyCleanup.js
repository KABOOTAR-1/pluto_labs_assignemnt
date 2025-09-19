// ============================================================================
// 🧹 USE ENEMY CLEANUP HOOK - World Boundary Safety System
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS HOOK:
// ✅ This handles enemy cleanup when they go out of world boundaries
// ✅ Acts as a safety mechanism to prevent enemies from getting lost
// ✅ Currently used by BaseEnemy component for boundary enforcement
// ✅ Provides automatic cleanup to maintain game performance
// ✅ Uses world bounds to determine when enemies should be removed
//
// 📊 WHAT USEENEMYCLEANUP ACTUALLY DOES:
// - Boundary checking: monitors enemy position against world bounds
// - Automatic removal: calls onRemove callback when enemy goes out of bounds
// - Performance safety: prevents enemies from wandering infinitely
// - Frame-by-frame monitoring: checks position every animation frame
//
// 📊 WHAT USEENEMYCLEANUP DOES NOT DO (happens elsewhere):
// - Enemy spawning: handled by useEnemySpawner hook
// - Normal enemy removal: handled by combat system in Projectiles component
// - Physics body cleanup: handled by object pooling system
// - Enemy AI behavior: handled by chase, attack, and facing hooks
//
// 🔄 STATE MANAGEMENT:
// - position: Current enemy position array [x, y, z] (required)
// - id: Unique enemy identifier for removal (required)
// - onRemove: Callback function to remove enemy from game (required)
// - worldBounds: World boundary object with minX, maxX, minZ, maxZ (optional, has defaults)

import { useFrame } from "@react-three/fiber";

/**
 * 🧹 USE ENEMY CLEANUP HOOK - World Boundary Safety System
 * ========================================================
 *
 * @description Handles enemy cleanup when they go out of world boundaries
 * @param {Array} position - Current enemy position array [x, y, z] (required)
 * @param {string|number} id - Unique enemy identifier for removal (required)
 * @param {Function} onRemove - Callback function to remove enemy from game (required)
 * @param {Object} worldBounds - World boundary object with minX, maxX, minZ, maxZ (optional, defaults provided)
 * @returns {void} No return value - manages cleanup through side effects
 *
 * 🎯 HOOK RESPONSIBILITIES:
 * - Monitor enemy position against world boundaries
 * - Detect when enemies go out of bounds
 * - Invoke removal callback for boundary violations
 * - Provide safety net for enemy AI edge cases
 * - Maintain game performance by preventing lost enemies
 *
 * 🧹 CLEANUP MECHANICS:
 * - Boundary Check: X and Z coordinates checked against world bounds
 * - Safety Mechanism: Prevents enemies from getting stuck outside playable area
 * - Performance: Automatic cleanup maintains object pool efficiency
 * - Monitoring: Frame-by-frame position checking
 * - Removal: Uses onRemove callback to deactivate enemy in object pool
 *
 * 🚀 CURRENT USAGE:
 * - BaseEnemy Component: Safety mechanism for all enemy types
 * - Boundary Enforcement: Ensures enemies stay within playable area
 * - Object Pool Integration: Uses onRemove to deactivate enemies
 * - Performance Safety: Prevents infinite enemy wandering
 */
export const useEnemyCleanup = (
  position,
  id,
  onRemove,
  worldBounds = { minX: -40, maxX: 40, minZ: -40, maxZ: 40 }
) => {
  useFrame(() => {
    if (position[0] < worldBounds.minX || position[0] > worldBounds.maxX ||
        position[2] < worldBounds.minZ || position[2] > worldBounds.maxZ) {
      onRemove(id);
    }
  });
};
