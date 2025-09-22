/**
 * 💎 BASE COLLECTIBLE COMPONENT - Core Health Collectible System
 * ============================================================
 *
 * 🎯 HOW AI SHOULD USE THIS COMPONENT:
 * ✅ This is the foundation for all collectible types in the game
 * ✅ Handles physics, collision detection, and visual effects
 * ✅ Integrates with theme system for visual customization
 * ✅ Uses object pooling for performance optimization
 * ✅ Provides smooth rotation animation and particle effects
 *
 * 🔄 COLLECTIBLE LIFECYCLE:
 * 1. Spawn: Activated from pool at enemy defeat location
 * 2. Active: Visible in world, rotating, checking for player collision
 * 3. Collected: Player touches collectible, heals player, deactivates
 * 4. Expired: Times out after lifetime, returns to pool
 *
 * 📊 COLLISION DETECTION:
 * - Uses distance-based collision (not physics events)
 * - Checks distance between collectible and player each frame
 * - Configurable collection radius for accessibility
 * - Manual collision for consistent performance
 *
 * 🎨 VISUAL FEATURES:
 * - Smooth rotation animation for visual appeal
 * - Theme-based model loading with fallback geometry
 * - Emissive materials for glowing effect
 * - Particle effects on collection (future enhancement)
 *
 * ⚡ PERFORMANCE OPTIMIZATIONS:
 * - Object pooling prevents garbage collection
 * - Efficient distance calculations
 * - Conditional rendering based on active state
 * - Minimal state updates during animation
 */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAtom } from 'jotai';
import {
  collectiblesAtom
} from '../../config/atoms';
import { useCurrentTheme } from '../../config/gameConfig';
import { BaseModel } from '../GltfLoader/BaseModel';
import { deactivateCollectible } from '../../utils/gameUtils';

/**
 * 💊 BASE COLLECTIBLE COMPONENT - Health Restoration System
 * =======================================================
 *
 * @param {Object} props - Collectible configuration
 * @param {string} props.id - Unique collectible identifier
 * @param {Array<number>} props.position - World position [x, y, z]
 * @param {number} props.healAmount - Health points to restore (default: 25)
 * @param {number} props.spawnTime - When collectible was created (timestamp)
 * @param {number} props.lifetime - How long collectible stays active (ms, default: 15000)
 * @param {number} props.collectionRadius - Distance for player collection (default: 1.5)
 * @param {number} props.rotationSpeed - Rotation animation speed (default: 2)
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Render 3D collectible model with theme integration
 * - Animate rotation for visual appeal
 * - Detect player collision for collection
 * - Heal player when collected
 * - Handle lifetime expiration
 * - Update game statistics
 * - Return to object pool when done
 *
 * 🔄 FRAME LOOP OPERATIONS:
 * 1. Update rotation animation
 * 2. Check lifetime expiration
 * 3. Calculate distance to player
 * 4. Handle collection if player is close enough
 * 5. Apply healing and update statistics
 * 6. Deactivate collectible after collection/expiration
 */
export const BaseCollectible = ({
  id,
  position,
  spawnTime,
  lifetime = 15000,
  rotationSpeed = 2,
  collectibleType = 'health' // Type of collectible (health, speed, damage, shield)
}) => {
  const meshRef = useRef();
  const theme = useCurrentTheme();

  // Game state atoms for lifetime management
  const [, setCollectibles] = useAtom(collectiblesAtom);

  // Get collectible configuration from theme based on type
  const collectibleConfig = theme.collectibles?.[collectibleType] || {
    modelUrl: null,
    fallbackGeometry: 'octahedron',
    material: {
      color: 0x76FF03,
      emissive: 0x76FF03,
      emissiveIntensity: 0.6
    }
  };

  /**
   * 🔄 FRAME UPDATE LOOP - Animation and Lifetime Management
   * =======================================================
   *
   * @description Handles per-frame updates for collectible visual behavior
   * @param {Object} state - Three.js frame state
   * @param {number} delta - Time since last frame (seconds)
   *
   * 🎯 FRAME OPERATIONS:
   * 1. Rotation Animation: Smooth spinning for visual appeal
   * 2. Lifetime Check: Remove expired collectibles
   * 3. Collection: Handled by useCollectibleCollector hook
   *
   * ⚡ PERFORMANCE CONSIDERATIONS:
   * - Minimal calculations per frame
   * - Early return for expired collectibles
   * - Collection logic separated to dedicated hook
   */
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // 🔄 Animate rotation for visual appeal
    meshRef.current.rotation.y += rotationSpeed * delta;
    meshRef.current.rotation.x += rotationSpeed * 0.5 * delta;

    // ⏰ Check if collectible has expired
    const currentTime = Date.now();
    if (currentTime - spawnTime > lifetime) {
      setCollectibles(prev => deactivateCollectible(prev, id));
      return;
    }
  });

  /**
   * 🎨 COLLECTIBLE RENDERING - 3D Model with Theme Integration
   * ========================================================
   *
   * @description Renders the collectible using theme-based configuration
   *
   * 🎭 VISUAL FEATURES:
   * - Theme-based model loading (GLTF/GLB files)
   * - Fallback geometry for missing models
   * - Emissive materials for glowing effect
   * - Smooth rotation animation
   * - Consistent scaling across themes
   *
   * 🔧 THEME INTEGRATION:
   * - Uses theme.collectibles.healthPowerup configuration
   * - Supports custom models, colors, and materials
   * - Fallback to geometric shapes if models fail
   * - Maintains visual consistency with game theme
   */
  return (
    <group position={position} ref={meshRef}>
      <BaseModel
        modelUrl={collectibleConfig.modelUrl}
        fallbackGeometry={collectibleConfig.fallbackGeometry}
        scale={[0.8, 0.8, 0.8]} // Slightly smaller than other collectibles
        material={{
          color: collectibleConfig.material.color,
          emissive: collectibleConfig.material.emissive,
          emissiveIntensity: collectibleConfig.material.emissiveIntensity,
          transparent: collectibleConfig.material.transparent || true,
          opacity: collectibleConfig.material.opacity || 0.9
        }}
      />

      {/* 💫 Optional: Add glow effect ring */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.2, 16]} />
        <meshBasicMaterial
          color={collectibleConfig.material.emissive}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};