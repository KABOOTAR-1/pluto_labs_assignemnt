// ============================================================================
// 📹 USE PLAYER CAMERA HOOK - Smooth Camera Following with Interpolation
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS HOOK:
// ✅ This handles smooth camera following for the player character with interpolation
// ✅ Integrates with Kinematic physics body position updates for smooth tracking
// ✅ Currently used by Player component for third-person camera control
// ✅ Includes fixed timestep interpolation for consistent camera movement
// ✅ Provides configurable camera offset for different viewing angles
//
// 📊 WHAT USEPLAYERCAMERA ACTUALLY DOES:
// - Position tracking: subscribes to Kinematic physics body position updates
// - Smooth interpolation: uses lerp between previous and current positions for fluid movement
// - Fixed timestep: implements fixed timestep interpolation for consistent camera behavior
// - Camera positioning: applies configurable offset for third-person view positioning
// - Manual rendering: performs manual render calls for camera control
//
// 📊 WHAT USEPLAYERCAMERA DOES NOT DO (happens elsewhere):
// - Player movement: handled by usePlayerMovement hook (Kinematic body movement)
// - Camera input: no user camera controls (could be extended for mouse look)
// - Physics body creation: done in Player component with useBox from @react-three/cannon
// - Game state management: receives game state but doesn't modify it
// - Collision detection: camera passes through objects (no camera collision)
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎯 CAMERA SYSTEM MODIFICATIONS:
// Since usePlayerCamera controls camera positioning, customization affects player view and experience:
//
// 📝 CAMERA MECHANICS ADJUSTMENTS:
// - Modify camera offset for different viewing angles (top-down, isometric, third-person)
// - Add camera smoothing parameters for different follow speeds
// - Implement camera constraints (boundaries, height limits, rotation limits)
// - Include camera shake effects for impacts or explosions
//
// 🎭 CAMERA ENHANCEMENTS:
// - Add mouse-controlled camera rotation around player
// - Implement zoom in/out functionality with mouse wheel
// - Add camera collision detection to prevent clipping through walls
// - Include different camera modes (fixed, follow, free-look)
//
// 🔄 STATE MANAGEMENT:
// - bodyApi: Cannon.js physics body API for position subscription (required)
// - gameState: Current game state string ('playing', 'menu', etc.) for camera gating (required)
// - offset: Camera offset object with x, y, z properties (optional, defaults to { x: 0, y: 15, z: 15 })
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/components/Player.jsx: Currently USES this hook for camera control
// - src/config/gameConfig.js: Provides default camera offset configuration
// - src/config/constants.js: Defines GAME_STATES.PLAYING for camera gating
// - src/hooks/useMouseControls.js: Could be used for camera rotation controls
// - src/components/Scene.jsx: Sets up Three.js Canvas with initial camera configuration
//

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GAME_STATES } from "../config/gameConfig";

/**
 * 📹 USE PLAYER CAMERA HOOK - Smooth Camera Following with Interpolation
 * =====================================================================
 *
 * @description Handles smooth camera following for the player character with fixed timestep interpolation
 * @param {Object} bodyApi - Cannon.js physics body API for position subscription (required)
 * @param {string} gameState - Current game state ('playing', 'menu', etc.) for camera gating (required)
 * @param {Object} offset - Camera offset object with x, y, z properties (optional, defaults to { x: 0, y: 15, z: 15 })
 *
 * 🎯 HOOK RESPONSIBILITIES:
 * - Subscribe to Kinematic physics body position updates for tracking
 * - Implement smooth camera interpolation using fixed timestep for consistent behavior
 * - Apply configurable camera offset for third-person view positioning
 * - Perform manual rendering for camera control and smooth following
 * - Gate camera updates to only occur during active gameplay

 */
export const usePlayerCamera = (bodyApi, gameState, offset = { x: 0, y: 15, z: 15 }) => {
  // 🎥 THREE.JS CONTEXT - Access camera, renderer, and scene for manual control
  const { camera, gl, scene } = useThree();

  // 📍 POSITION TRACKING - Store previous and current positions for smooth interpolation
  const prevPos = useRef(new THREE.Vector3());  // Previous frame position
  const nextPos = useRef(new THREE.Vector3());  // Current frame position

  // ⏱️ FIXED TIMESTEP - Implement consistent camera behavior regardless of framerate
  const accumulator = useRef(0);                // Time accumulator for fixed timestep
  const fixedStep = 1 / 60;                     // 60fps fixed timestep

  /**
   * 🔗 POSITION SUBSCRIPTION - Subscribe to Kinematic physics body position updates
   * ==============================================================================
   * 
   * @description Sets up subscription to physics body position changes for camera tracking
   * @effects:
   * - Subscribes to bodyApi.position updates from Kinematic physics body
   * - Stores position updates in prevPos and nextPos refs for interpolation
   * - Provides cleanup function to unsubscribe on component unmount
   * - Runs once on mount and cleans up on unmount or bodyApi change
   */
  useEffect(() => {
    // 📡 POSITION SUBSCRIPTION - Listen to Kinematic physics body position updates
    const unsubscribe = bodyApi.position.subscribe(([x, y, z]) => {
      prevPos.current.copy(nextPos.current);  // Store previous position for interpolation
      nextPos.current.set(x, y, z);           // Update current position from physics body
    });
    
    // 🧹 CLEANUP - Unsubscribe from position updates to prevent memory leaks
    return unsubscribe;
  }, [bodyApi.position]);

  /**
   * 🎬 CAMERA FRAME LOOP - Process camera following every animation frame
   * ====================================================================
   * 
   * @description Runs every frame to update camera position with smooth interpolation
   * @param {Object} state - Three.js frame state (unused)
   * @param {number} delta - Time elapsed since last frame in seconds
   * @effects:
   * - Checks game state and exits early if not playing
   * - Updates fixed timestep accumulator for consistent interpolation
   * - Calculates interpolation alpha for smooth position blending
   * - Sets camera position with offset and lookAt target
   * - Performs manual render for camera control
   */
  useFrame((state, delta) => {
    // 🚫 CAMERA GATING - Only update camera during active gameplay
    if (gameState !== GAME_STATES.PLAYING) return;

    // ⏰ FIXED TIMESTEP ACCUMULATION - Maintain consistent camera behavior
    accumulator.current = Math.min(accumulator.current + delta, fixedStep);
    const alpha = accumulator.current / fixedStep;  // Interpolation factor (0-1)

    // 🔄 SMOOTH INTERPOLATION - Blend between previous and current positions
    const interp = prevPos.current.clone().lerp(nextPos.current, alpha);

    // 📹 CAMERA POSITIONING - Set camera position with configurable offset
    camera.position.set(
      interp.x + offset.x,  // X position with offset
      interp.y + offset.y,  // Y position with offset (elevation)
      interp.z + offset.z   // Z position with offset (distance behind player)
    );
    
    // 🎯 CAMERA TARGETING - Point camera at player position with slight Y offset
    camera.lookAt(interp.x, interp.y + 1, interp.z);

    // 🖼️ MANUAL RENDER - Perform render call for camera control
    gl.render(scene, camera);
  }, 1); // Priority 1 for render order control
};
