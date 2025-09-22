// ============================================================================
// 👹 BASE ENEMY COMPONENT - Foundational Enemy Entity with Physics and AI
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is the foundational component for all enemy types in the game
// ✅ Provides complete enemy behavior through modular hook-based architecture
// ✅ Handles physics body, AI behaviors (chase, attack, cleanup), and rendering
// ✅ Uses BaseModel for flexible GLTF/fallback rendering with theme support
// ✅ Serves as base class for specific enemy types (FastEnemy, TankEnemy, etc.)
//
// 📊 WHAT BASEENEMY ACTUALLY DOES:
// - Physics body creation: uses useBox from @react-three/cannon for collision detection
// - Position tracking: subscribes to physics position updates via useRef for performance
// - AI behavior integration: uses 4 specialized hooks (chase, attack, cleanup, facing) for modular enemy behaviors
// - Player interaction: handles chase behavior and collision-based damage dealing
// - World boundary cleanup: safety mechanism to remove enemies if they somehow get outside bounds
// - Visual rendering: delegates to BaseModel for GLTF models or fallback geometry
// - Player-facing rotation: optional behavior to make enemies face the player
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎨 VISUAL CUSTOMIZATION:
// ADD NEW:
// - Add death animations by extending BaseModel with animation support
// - Include damage state visual feedback (color changes, material effects)
// - Add particle effects for enemy spawning, damage, or death
// - Implement enemy status indicators (health bars, state icons)
// - Add dynamic lighting effects (glowing eyes, energy fields)
// - Include shadow and outline effects for different enemy states
//
// MODIFY EXISTING:
// - Change fallback geometry from box to sphere, cylinder, or custom shapes
// - Update color schemes and material properties for different themes
// - Modify scale and size parameters for different enemy variants
// - Change rotation behavior to face away from player or use custom angles
// - Update model centering behavior for different enemy types
//
// 🎮 FUNCTIONAL MODIFICATIONS:
// ADD NEW:
// - Add damage resistance/vulnerability system (health is already managed in Projectiles.jsx)
// - Implement different AI states (patrol, alert, flee, aggressive)
// - Add ranged attack capabilities with projectile spawning
// - Include special abilities (teleport, shield, area damage)
// - Add enemy formation and group behavior patterns
// - Implement enemy spawning effects and entrance animations
//
// MODIFY EXISTING:
// - Change chase behavior to use pathfinding or obstacle avoidance
// - Update attack patterns (melee combos, charge attacks, area effects)
// - Modify cleanup boundaries for different world sizes or enemy types
// - Change physics body to Dynamic type to enable real physics (mass, forces, collisions)
// - Update damage dealing frequency and collision detection radius
//
// 📱 PHYSICS & PERFORMANCE:
// ADD NEW:
// - Add physics-based knockback effects when taking damage
// - Implement enemy collision avoidance to prevent clustering
// - Add terrain following for ground-based enemies
// - Include gravity effects for flying vs ground enemies
// - Add physics-based death effects (ragdoll, explosion force)
// - Implement LOD (Level of Detail) based on distance from player
//
// MODIFY EXISTING:
// - Optimize position tracking to reduce useRef updates
// - Change physics body type from Kinematic to Dynamic to enable real physics simulation
// - Update collision detection to use physics events instead of distance checks
// - Modify cleanup frequency to improve performance with many enemies
// - Change velocity calculations for more realistic movement
//
// 🔄 STATE MANAGEMENT:
// - id: Unique enemy identifier for tracking and removal
// - position: Initial spawn position [x, y, z]
// - currentPosition: Real-time position tracking via physics subscription
// - size: Enemy collision box dimensions and attack radius
// - speed: Movement speed multiplier for chase behavior
// - damage: Damage dealt to player on collision
// - gameState: Current game state to pause/resume behaviors
// - facePlayer: Boolean flag to enable player-facing rotation
// - facingRotation: Calculated rotation values from useEnemyFacing hook
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/hooks/useEnemyChase.js: Chase behavior and movement logic
// - src/hooks/useEnemyAttack.js: Collision detection and damage dealing
// - src/hooks/useEnemyCleanup.js: World boundary checking and removal
// - src/hooks/useEnemyFacing.js: Player-facing rotation calculations
// - src/components/baseModel/BaseEnemyModel.jsx: Fallback geometry rendering
// - src/components/GltfLoader/BaseModel.jsx: GLTF model loading and rendering
// - src/config/themes/themes.js: Enemy configurations and visual properties
//
// ⚠️ IMPORTANT NOTES:
// - Physics body uses Kinematic type - movement is code-controlled, not physics-based
// - Position tracking uses useRef for performance - avoids re-renders on every frame
// - Attack system uses distance-based collision detection, not physics collision events
// - Cleanup system is a safety mechanism to prevent memory leaks from enemies that somehow get out-of-bounds
// - Facing rotation is optional and calculated every frame when enabled
// - All AI behaviors are paused when gameState is not 'playing'
// - Enemy configuration comes from theme system, not hardcoded values

import React, { useEffect, useRef } from "react";
import { useBox } from "@react-three/cannon";
import { useEnemyChase } from "../../hooks/useEnemyChase";
import { useEnemyAttack } from "../../hooks/useEnemyAttack";
import { useEnemyCleanup } from "../../hooks/useEnemyCleanup";
import { useEnemyFacing } from "../../hooks/useEnemyFacing";
import { BaseModel } from "../GltfLoader/BaseModel";
import { BaseEnemyModel } from "../baseModel/BaseEnemyModel";

/**
 * 👹 BASE ENEMY COMPONENT - Foundational Enemy Entity with Physics and AI
 * =====================================================================
 *
 * @description Core enemy component providing physics, AI behaviors, and rendering for all enemy types
 * @param {string} id - Unique enemy identifier for tracking and removal
 * @param {Array<number>} position - Initial spawn position as [x, y, z]
 * @param {number} size - Enemy collision box size and attack radius (optional - calculated from scale if not provided)
 * @param {Array<number>} scale - Model scaling as [x, y, z] (default: [1, 1, 1]) - Also determines collision size
 * @param {string|number} color - Enemy color for fallback geometry rendering
 * @param {number} speed - Movement speed multiplier for chase behavior
 * @param {number} damage - Damage dealt to player on collision
 * @param {Function} onRemove - Callback to remove enemy from game (called with id)
 * @param {Array<number>} playerPosition - Current player position for AI targeting
 * @param {string} gameState - Current game state to control behavior activation
 * @param {Function} onPlayerDamage - Callback to damage player (called with damage amount)
 * @param {string} modelUrl - Optional GLTF model URL for 3D rendering
 * @param {string} textureUrl - Optional texture URL for model override
 * @param {string} fallbackGeometry - Geometry type for fallback rendering ('box', 'sphere', etc.)
 * @param {boolean} facePlayer - Whether enemy should rotate to face player (default: false)
 * @param {Object} worldBounds - World boundaries for cleanup {minX, maxX, minZ, maxZ}
 * @returns {JSX.Element} Three.js group with physics body and rendered model
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Create physics body using @react-three/cannon for collision detection
 * - Calculate dynamic collision size from scale maximum (Math.max(...scale))
 * - Track real-time position via physics subscription for custom chasing behavior hooks
 * - Integrate 4 specialized AI behavior hooks (chase, attack, cleanup, facing)
 * - Handle player collision detection and damage dealing with attack cooldown
 * - Provide automatic cleanup when enemy moves outside world boundaries
 * - Render enemy using BaseModel with GLTF support and fallback geometry
 * - Calculate and apply player-facing rotation when facePlayer is enabled
 */
export const BaseEnemy = ({
  id,
  position,
  size,
  scale = [1, 1, 1],
  color,
  speed,
  damage,
  onRemove,
  playerPosition,
  gameState,
  onPlayerDamage,
  modelUrl,
  textureUrl,
  fallbackGeometry,
  facePlayer = false, // New optional prop to enable facing player
  worldBounds, // World bounds for cleanup
}) => {
  // 📏 DYNAMIC SIZE CALCULATION - Calculate collision size from scale maximum
  const dynamicSize = Math.max(...scale);

  const actualSize = size || dynamicSize; // Use provided size or calculate from scale
  
  // 📍 POSITION TRACKING - UseRef for performance, avoids re-renders on position updates
  const currentPosition = useRef(position);
  
  // ⚛️ PHYSICS BODY CREATION - Kinematic body for code-controlled movement
  const [ref, api] = useBox(() => ({
    mass: 1,                    // Physics mass (unused for Kinematic bodies)
    position,                   // Initial spawn position [x, y, z]
    args: [actualSize, actualSize, actualSize], // Collision box dimensions (matches visual scale)
    linearDamping: 0.9,         // Physics damping (unused for Kinematic bodies)
    type: "Kinematic",          // Code-controlled movement (not physics simulation)
    name: `enemy-${id}`,        // Unique identifier for physics debugging
  }));

  // 🔄 POSITION SUBSCRIPTION - Real-time position tracking for AI hooks
  useEffect(() => {
    const unsubscribe = api.position.subscribe((pos) => {
      currentPosition.current[0] = pos[0];  // Update X coordinate
      currentPosition.current[1] = pos[1];  // Update Y coordinate
      currentPosition.current[2] = pos[2];  // Update Z coordinate
    });
    
    return unsubscribe; // Cleanup subscription on unmount
  }, [api.position]);

  // 🤖 AI BEHAVIOR INTEGRATION - Modular hook-based enemy behaviors
  useEnemyChase(api, currentPosition.current, speed, playerPosition, gameState);
  useEnemyAttack(currentPosition.current, actualSize, damage, playerPosition, gameState, onPlayerDamage);
  useEnemyCleanup(currentPosition.current, id, onRemove, worldBounds);

  // 🎯 PLAYER-FACING ROTATION - Optional behavior to make enemy face player
  const facingRotation = useEnemyFacing(facePlayer, playerPosition, currentPosition.current)

  // 🎭 VISUAL RENDERING - BaseModel handles GLTF models and fallback geometry
  return (
    <group ref={ref}>
      <BaseModel
        url={modelUrl}                                    // GLTF model URL (optional)
        textureUrl={textureUrl}                          // Texture override URL (optional)
        fallbackComponent={BaseEnemyModel}               // Fallback component for geometry rendering
        size={actualSize}                                // Size for fallback geometry (matches collision box)
        color={color}                                    // Color for fallback materials
        fallbackGeometry={fallbackGeometry || 'box'}    // Geometry type (box, sphere, etc.)
        rotation={facePlayer ? facingRotation : [0, 0, 0]} // Apply facing rotation if enabled
        scale={scale}                                    // Model scaling [x, y, z]
        centerModel={false}                              // Don't center model (use original positioning)
      />
    </group>
  );
};
