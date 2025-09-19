// ============================================================================
// 🎯 USE ENEMY FACING HOOK - Player-Oriented Rotation System
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS HOOK:
// ✅ This handles enemy rotation to face the player for visual feedback
// ✅ Calculates Y-axis rotation based on player position
// ✅ Currently used by BaseEnemy component for optional facing behavior
// ✅ Provides smooth rotation updates for enemy orientation
// ✅ Uses Three.js vector math for accurate direction calculation
//
// 📊 WHAT USEENEMYFACING ACTUALLY DOES:
// - Direction calculation: computes direction vector from enemy to player
// - Rotation calculation: converts direction to Y-axis rotation angle
// - Distance checking: only rotates if player is far enough away (0.5+ units)
// - State management: maintains facing rotation state for rendering
// - Frame updates: recalculates rotation every animation frame
//
// 📊 WHAT USEENEMYFACING DOES NOT DO (happens elsewhere):
// - Movement: handled by useEnemyChase hook
// - Physics rotation: this is visual rotation only, not physics body rotation
// - Attack behavior: handled by useEnemyAttack hook
// - Model rendering: handled by BaseModel component
//
// 🔄 STATE MANAGEMENT:
// - facePlayer: Boolean flag to enable/disable facing behavior (required)
// - playerPosition: Player position array [x, y, z] (required)
// - currentPosition: Current enemy position array [x, y, z] (required)
// - Returns: facingRotation array [x, y, z] for visual rotation

import { useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * 🎯 USE ENEMY FACING HOOK - Player-Oriented Rotation System
 * =========================================================
 *
 * @description Handles enemy rotation to face the player for visual feedback
 * @param {boolean} facePlayer - Boolean flag to enable/disable facing behavior (required)
 * @param {Array} playerPosition - Player position array [x, y, z] (required)
 * @param {Array} currentPosition - Current enemy position array [x, y, z] (required)
 * @returns {Array} facingRotation array [x, y, z] for visual rotation
 *
 * 🎯 HOOK RESPONSIBILITIES:
 * - Calculate direction vector from enemy to player position
 * - Convert direction to Y-axis rotation angle for facing
 * - Maintain rotation state for visual rendering
 * - Handle distance checking to prevent jitter at close range
 * - Provide smooth rotation updates every frame
 *
 * 🎯 FACING MECHANICS:
 * - Direction: Uses Three.js Vector3 for direction calculation
 * - Rotation: Y-axis rotation only (enemies face player horizontally)
 * - Distance Check: Only rotates if distance > 0.5 units to prevent jitter
 * - Visual Only: This is rendering rotation, not physics body rotation
 * - Frame Updates: Recalculates every animation frame for smooth tracking
 *
 * 🚀 CURRENT USAGE:
 * - BaseEnemy Component: Optional facing behavior (facePlayer prop)
 * - Visual Enhancement: Makes enemies appear more aware of player
 * - Rotation State: Returns rotation array for BaseModel component
 * - Three.js Integration: Uses Vector3 math for accurate calculations
 */
export const useEnemyFacing = (facePlayer, playerPosition, currentPosition) => {
  const [facingRotation, setFacingRotation] = useState([0, 0, 0])

  useFrame(() => {
    if (!facePlayer || !playerPosition || !currentPosition) return

    const enemyPos = new THREE.Vector3(...currentPosition)
    const playerPos = new THREE.Vector3(...playerPosition)
    const distance = enemyPos.distanceTo(playerPos)

    if (distance > 0.5) {
      // Calculate direction vector from enemy to player
      const direction = new THREE.Vector3()
        .subVectors(playerPos, enemyPos)
        .normalize()

      // Calculate Y rotation angle to face the player
      const yRotation = Math.atan2(direction.x, direction.z)

      // Only rotate around Y axis, set X and Z to 0
      // Add 180 degrees (Math.PI) to face away from player
      setFacingRotation([
        0,  // No X rotation
        yRotation,  // Y rotation + 180° to face away
        0   // No Z rotation
      ])
    }
  })

  return facingRotation
}

