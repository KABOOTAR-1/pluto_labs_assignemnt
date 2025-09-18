import { useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

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

