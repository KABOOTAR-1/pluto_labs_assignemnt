// ============================================================================
// 🚀 BASE PROJECTILE COMPONENT - Core Projectile Physics and Rendering
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is the foundational component for all projectile types in the game
// ✅ Handles physics body creation, movement, collision detection, and rendering
// ✅ Uses Kinematic physics for code-controlled movement (not physics simulation)
// ✅ Provides collision detection with enemies and automatic cleanup systems
// ✅ Serves as base class for specific projectile types (Bullet, Laser, etc.)
//
// 📊 COMPONENT BEHAVIOR:
// - Creates spherical physics body using @react-three/cannon useSphere hook
// - Implements frame-by-frame movement using useFrame from @react-three/fiber
// - Performs manual collision detection with all enemies every frame (distance-based, not physics)
// - Automatically cleans up after 5 seconds to prevent memory leaks
// - Renders as glowing sphere with Three.js mesh and materials
// - Supports optional position update callbacks for tracking/effects
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎨 VISUAL CUSTOMIZATION:
// ADD NEW:
// - Add particle trails using Three.js particle systems or @react-three/drei Trail
// - Include impact animations with explosion effects on collision
// - Add custom geometries (cylinders for bullets, boxes for rockets)
// - Include animated textures or UV scrolling for energy effects
// - Add procedural glow effects with custom shaders
// - Include sound effects integration for firing and impact
//
// MODIFY EXISTING:
// - Change geometry from sphereGeometry to boxGeometry, cylinderGeometry, etc.
// - Update material from meshStandardMaterial to meshBasicMaterial for different lighting
// - Modify emissive properties for different glow intensities and colors
// - Change castShadow to receiveShadow or disable shadows for performance
// - Update size scaling for different projectile dimensions
//
// 🎮 FUNCTIONAL MODIFICATIONS:
// ADD NEW:
// - Add piercing projectiles that don't stop on first hit (modify collision logic)
// - Implement homing projectiles that track nearest enemy (modify movement calculation)
// - Add ricochet projectiles that bounce off walls (add boundary collision detection)
// - Include gravity effects for projectiles with parabolic trajectories
// - Add area-of-effect damage that affects multiple enemies in radius
// - Implement projectile splitting (one projectile becomes multiple on hit)
//
// MODIFY EXISTING:
// - Change physics type from 'Kinematic' to 'Dynamic' for physics-based movement
// - Update collision detection to use physics collision events instead of manual distance calculation
// - Modify movement calculation to include acceleration or deceleration
// - Change collision radius calculation for different hit detection behaviors
// - Update lifetime from fixed 5 seconds to variable based on projectile type
//
// 📱 PHYSICS & MOVEMENT:
// ADD NEW:
// - Add boundary checking to clean up projectiles that leave world bounds
// - Implement projectile curves and arcs with mathematical trajectory functions
// - Add wind resistance or drag effects for realistic physics
// - Include projectile spin and rotation during flight
// - Add collision with environment objects (walls, obstacles)
//
// MODIFY EXISTING:
// - Change movement from linear to curved using mathematical functions
// - Update speed calculation to include acceleration/deceleration over time
// - Modify direction vector to include vertical component for 3D trajectories
// - Change collision detection from 2D (x,z) to full 3D (x,y,z)
// - Update position updates to use physics forces instead of direct manipulation
//
// 🔄 STATE MANAGEMENT:
// - id: Unique identifier for projectile tracking and cleanup
// - position: Mutable [x,y,z] array updated every frame for movement
// - direction: Normalized vector [x,y,z] for movement direction
// - speed: Units per second movement velocity
// - enemies: Array of enemy objects for collision detection
// - onHit: Callback function for collision events and cleanup
// - onUpdate: Optional callback for position tracking and effects
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/components/projectiles/Bullet.jsx: Simple wrapper around BaseProjectile
// - src/components/Projectiles.jsx: Parent component that renders BaseProjectile instances
// - src/data/projectileTypes.js: Configuration for projectile properties
// - src/hooks/usePlayerShooting.js: Creates projectile data for BaseProjectile
// - src/utils/gameUtils.js: Object pooling system for projectile lifecycle
//
// ⚠️ IMPORTANT NOTES:
// - Physics body uses 'Kinematic' type so mass parameter is unused by physics engine
// - Collision detection is manual using distance calculation, not physics events
// - Position array is mutated directly for performance (not immutable)
// - Projectile automatically cleans up after 5 seconds to prevent memory leaks
// - Only checks collision with enemies, not with environment or other projectiles
// - Movement is linear and constant speed (no acceleration or physics forces)

import React, { useEffect } from 'react';
import { useSphere } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';

/**
 * 🚀 BASE PROJECTILE COMPONENT - Core Projectile Physics and Rendering
 * ===================================================================
 *
 * @description Foundational component for all projectile types with physics, collision, and rendering
 * @param {string} id - Unique identifier for projectile tracking and cleanup
 * @param {Array<number>} position - Mutable [x,y,z] position array updated every frame
 * @param {Array<number>} direction - Normalized [x,y,z] direction vector for movement
 * @param {number} speed - Movement speed in units per second
 * @param {number} size - Projectile radius for collision detection and visual size
 * @param {string|number} color - Projectile color (hex string or Three.js color)
 * @param {number} damage - Damage dealt to enemies on collision
 * @param {number} mass - Physics body mass (unused for Kinematic bodies)
 * @param {number} emissiveIntensity - Glow intensity for visual effects (0-1)
 * @param {Array<Object>} enemies - Array of enemy objects for collision detection
 * @param {Function} onHit - Callback function called on collision or timeout: (id, enemyId, damage)
 * @param {Function} onUpdate - Optional callback for position tracking: (id, position)
 * @returns {JSX.Element} Three.js mesh with physics body and collision detection
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Create spherical physics body using useSphere from @react-three/cannon
 * - Implement frame-by-frame movement using useFrame from @react-three/fiber
 * - Perform collision detection with enemies using distance calculations
 * - Automatically clean up after 5 seconds using setTimeout
 * - Render glowing sphere with Three.js mesh and materials
 * - Sync physics body position with visual representation
 *
 * 🎨 PHYSICS INTEGRATION:
 * - useSphere creates collision-enabled physics body with specified mass and size
 * - 'Kinematic' type means physics engine doesn't control movement (code-controlled)
 * - api.position.set() syncs visual position with physics body every frame
 * - Physics body enables collision detection but mass is ignored for Kinematic type
 */
export const BaseProjectile = ({
  id,
  position,
  direction,
  speed,
  size,
  color,
  damage,
  mass = 0.1,
  emissiveIntensity = 0.5,
  enemies,
  onHit,
  onUpdate
}) => {
  // 🔮 PHYSICS BODY CREATION
  // Creates spherical physics body with Kinematic control (code-controlled movement)
  const [ref, api] = useSphere(() => ({
    mass,                          // Physics mass (unused for Kinematic bodies)
    position,                      // Initial [x,y,z] position
    args: [size],                  // Sphere radius for collision detection
    type: 'Kinematic',            // Code-controlled movement (not physics simulation)
  }));

  // 🎮 GAME LOOP - Movement, Collision, and Position Updates
  useFrame((_, delta) => {
    // 🏃‍♂️ MOVEMENT CALCULATION - Frame-rate independent linear movement
    const movement = [
      direction[0] * speed * delta,    // X-axis movement based on direction and speed
      direction[1] * speed * delta,    // Y-axis movement (usually 0 for ground-level)
      direction[2] * speed * delta,    // Z-axis movement based on direction and speed
    ];

    // 📍 POSITION UPDATES - Mutate position array directly for performance
    position[0] += movement[0];        // Update X coordinate
    position[1] += movement[1];        // Update Y coordinate  
    position[2] += movement[2];        // Update Z coordinate

    // 🔄 PHYSICS SYNC - Update physics body position to match logical position
    api.position.set(position[0], position[1], position[2]);

    // 📡 OPTIONAL TRACKING - Call onUpdate callback if provided for effects/tracking
    if (onUpdate) {
      onUpdate(id, position);
    }

    // 💥 COLLISION DETECTION - Check collision with all active enemies
    enemies.forEach((enemy) => {
      // 🚫 SKIP INVALID ENEMIES - Skip enemies without position data
      if (!enemy.position) return;

      // 📏 DISTANCE CALCULATION - 2D distance between projectile and enemy (ignores Y-axis)
      const dx = position[0] - enemy.position[0];    // X-axis distance
      const dz = position[2] - enemy.position[2];    // Z-axis distance  
      const distance = Math.sqrt(dx * dx + dz * dz); // Euclidean distance

      // 🎯 COLLISION RADIUS - Combined radius of projectile and enemy for hit detection
      const collisionRadius = size + (enemy.size || 0.5) * 2;
      
      // 💥 COLLISION DETECTED - Call onHit callback with collision information
      if (distance < collisionRadius) {
        onHit(id, enemy.id, damage);
      }
    });
  });

  // ⏰ AUTOMATIC CLEANUP - Prevent memory leaks with 5-second timeout
  useEffect(() => {
    // 🗑️ TIMEOUT CLEANUP - Call onHit with null enemy after 5 seconds
    const timeout = setTimeout(() => onHit(id, null, 0), 5000);
    
    // 🧹 CLEANUP FUNCTION - Clear timeout if component unmounts early
    return () => clearTimeout(timeout);
  }, [id, onHit]);

  // 🎨 VISUAL RENDERING - Three.js mesh with glowing sphere appearance
  return (
    <mesh ref={ref} castShadow>
      {/* 📐 GEOMETRY - Spherical shape with specified radius */}
      <sphereGeometry args={[size]} />
      
      {/* 🎨 MATERIAL - PBR material with color and emissive glow */}
      <meshStandardMaterial
        color={color}                           // Base color of the projectile
        emissive={color}                        // Emissive color (makes it glow)
        emissiveIntensity={emissiveIntensity}   // Glow intensity (0 = no glow, 1 = full glow)
      />
    </mesh>
  );
};
