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
// 🎭 CAMERA PROCESSING PIPELINE:
// 1. Kinematic physics body position updates trigger subscription callback
// 2. Position updates stored in prevPos and nextPos refs for interpolation
// 3. useFrame hook runs every animation frame for camera updates
// 4. Game state checked - camera only follows during GAME_STATES.PLAYING
// 5. Fixed timestep accumulator updated for consistent interpolation timing
// 6. Linear interpolation (lerp) calculated between previous and current positions
// 7. Camera position set to interpolated position plus configurable offset
// 8. Camera lookAt set to interpolated position for following behavior
// 9. Manual render call executed for camera control
//
// 🎨 COORDINATE SYSTEM:
// - Player Position: Tracked from Kinematic physics body position
// - Camera Offset: Added to player position for camera positioning
// - Default Offset: { x: 0, y: 15, z: 15 } for elevated behind-player view
// - LookAt Target: Player position with slight Y offset for better viewing angle
//
// 📹 CURRENT USAGE IN CODEBASE:
// ============================================================================
//
// ✅ CURRENTLY USED BY: Player component
// ```javascript
// // In Player.jsx:
// usePlayerCamera(
//   api,                           // Physics body API for position tracking
//   gameState,                     // Game state for camera gating
//   gameConfig.camera.offset       // Camera offset configuration
// );
// ```
//
// ✅ TRACKS KINEMATIC BODY: Subscribes to Kinematic physics body position
// ```javascript
// // In this hook:
// const unsubscribe = bodyApi.position.subscribe(([x, y, z]) => {
//   prevPos.current.copy(nextPos.current);
//   nextPos.current.set(x, y, z);
// });
// ```
//
// ✅ SMOOTH INTERPOLATION: Uses lerp for fluid camera movement
// ```javascript
// // In this hook:
// const interp = prevPos.current.clone().lerp(nextPos.current, alpha);
// camera.position.set(interp.x + offset.x, interp.y + offset.y, interp.z + offset.z);
// ```
//
// ⚠️ IMPORTANT NOTES:
// - Hook uses useFrame from @react-three/fiber (runs every animation frame)
// - Camera follows Kinematic physics body position (code-controlled movement)
// - Fixed timestep interpolation provides consistent camera behavior regardless of framerate
// - Manual rendering is performed for camera control (gl.render call)
// - Camera passes through objects (no collision detection implemented)
// - useFrame priority set to 1 for render order control
//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASES:
// ============================================================================
//
// 📝 ADD CAMERA SMOOTHING CONTROL:
// ```javascript
// export const usePlayerCamera = (bodyApi, gameState, offset = { x: 0, y: 15, z: 15 }, smoothing = 0.1) => {
//   // ... existing code ...
//   
//   useFrame((state, delta) => {
//     if (gameState !== GAME_STATES.PLAYING) return;
//
//     // Smooth camera following instead of fixed timestep
//     const targetPos = nextPos.current.clone().add(new THREE.Vector3(offset.x, offset.y, offset.z));
//     camera.position.lerp(targetPos, smoothing);
//     camera.lookAt(nextPos.current.x, nextPos.current.y + 1, nextPos.current.z);
//     
//     gl.render(scene, camera);
//   }, 1);
// };
// ```
//
// 🎮 ADD MOUSE CAMERA ROTATION:
// ```javascript
// import { useMouseControls } from './useMouseControls';
//
// export const usePlayerCamera = (bodyApi, gameState, offset = { x: 0, y: 15, z: 15 }) => {
//   const { mousePosition } = useMouseControls();
//   const cameraAngle = useRef(0);
//   
//   useFrame((state, delta) => {
//     if (gameState !== GAME_STATES.PLAYING) return;
//
//     // Rotate camera based on mouse position
//     if (mousePosition) {
//       cameraAngle.current = Math.atan2(mousePosition.x, mousePosition.z);
//     }
//     
//     const interp = prevPos.current.clone().lerp(nextPos.current, alpha);
//     
//     // Apply rotation to camera offset
//     const rotatedOffset = new THREE.Vector3(offset.x, offset.y, offset.z);
//     rotatedOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), cameraAngle.current);
//     
//     camera.position.set(interp.x + rotatedOffset.x, interp.y + rotatedOffset.y, interp.z + rotatedOffset.z);
//     camera.lookAt(interp.x, interp.y + 1, interp.z);
//     
//     gl.render(scene, camera);
//   }, 1);
// };
// ```
//
// 🎨 ADD CAMERA SHAKE:
// ```javascript
// import { useRef, useState } from 'react';
//
// export const usePlayerCamera = (bodyApi, gameState, offset = { x: 0, y: 15, z: 15 }) => {
//   const [shakeIntensity, setShakeIntensity] = useState(0);
//   const shakeDecay = useRef(0.95);
//   
//   // Expose shake function
//   const shake = (intensity) => setShakeIntensity(intensity);
//   
//   useFrame((state, delta) => {
//     if (gameState !== GAME_STATES.PLAYING) return;
//
//     const interp = prevPos.current.clone().lerp(nextPos.current, alpha);
//     
//     // Add camera shake
//     const shakeX = (Math.random() - 0.5) * shakeIntensity;
//     const shakeY = (Math.random() - 0.5) * shakeIntensity;
//     const shakeZ = (Math.random() - 0.5) * shakeIntensity;
//     
//     camera.position.set(
//       interp.x + offset.x + shakeX,
//       interp.y + offset.y + shakeY,
//       interp.z + offset.z + shakeZ
//     );
//     camera.lookAt(interp.x, interp.y + 1, interp.z);
//     
//     // Decay shake over time
//     setShakeIntensity(prev => prev * shakeDecay.current);
//     
//     gl.render(scene, camera);
//   }, 1);
//   
//   return { shake }; // Return shake function for external use
// };
// ```
//
// 📱 ADD ZOOM FUNCTIONALITY:
// ```javascript
// import { useMouseControls } from './useMouseControls';
//
// export const usePlayerCamera = (bodyApi, gameState, offset = { x: 0, y: 15, z: 15 }) => {
//   const { wheelDelta } = useMouseControls(); // Assuming wheel support added
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const MIN_ZOOM = 0.5;
//   const MAX_ZOOM = 3;
//   
//   useFrame((state, delta) => {
//     if (gameState !== GAME_STATES.PLAYING) return;
//
//     // Handle zoom input
//     if (wheelDelta !== 0) {
//       setZoomLevel(prev => Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev + wheelDelta * 0.001)));
//     }
//     
//     const interp = prevPos.current.clone().lerp(nextPos.current, alpha);
//     
//     // Apply zoom to camera offset
//     const zoomedOffset = {
//       x: offset.x * zoomLevel,
//       y: offset.y * zoomLevel,
//       z: offset.z * zoomLevel
//     };
//     
//     camera.position.set(interp.x + zoomedOffset.x, interp.y + zoomedOffset.y, interp.z + zoomedOffset.z);
//     camera.lookAt(interp.x, interp.y + 1, interp.z);
//     
//     gl.render(scene, camera);
//   }, 1);
// };
// ```
//
// 🔊 ADD CAMERA BOUNDARIES:
// ```javascript
// export const usePlayerCamera = (bodyApi, gameState, offset = { x: 0, y: 15, z: 15 }, boundaries = null) => {
//   useFrame((state, delta) => {
//     if (gameState !== GAME_STATES.PLAYING) return;
//
//     const interp = prevPos.current.clone().lerp(nextPos.current, alpha);
//     let cameraX = interp.x + offset.x;
//     let cameraY = interp.y + offset.y;
//     let cameraZ = interp.z + offset.z;
//     
//     // Apply camera boundaries
//     if (boundaries) {
//       cameraX = Math.max(boundaries.minX, Math.min(boundaries.maxX, cameraX));
//       cameraY = Math.max(boundaries.minY, Math.min(boundaries.maxY, cameraY));
//       cameraZ = Math.max(boundaries.minZ, Math.min(boundaries.maxZ, cameraZ));
//     }
//     
//     camera.position.set(cameraX, cameraY, cameraZ);
//     camera.lookAt(interp.x, interp.y + 1, interp.z);
//     
//     gl.render(scene, camera);
//   }, 1);
// };
// ```
//
// 🎯 ADD TOP-DOWN CAMERA MODE:
// ```javascript
// export const usePlayerCamera = (bodyApi, gameState, offset = { x: 0, y: 15, z: 15 }, mode = 'follow') => {
//   useFrame((state, delta) => {
//     if (gameState !== GAME_STATES.PLAYING) return;
//
//     const interp = prevPos.current.clone().lerp(nextPos.current, alpha);
//     
//     if (mode === 'topdown') {
//       // Pure top-down view
//       camera.position.set(interp.x, 20, interp.z);
//       camera.lookAt(interp.x, 0, interp.z);
//     } else {
//       // Standard follow mode
//       camera.position.set(interp.x + offset.x, interp.y + offset.y, interp.z + offset.z);
//       camera.lookAt(interp.x, interp.y + 1, interp.z);
//     }
//     
//     gl.render(scene, camera);
//   }, 1);
// };
// ```
// ============================================================================

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
 *
 * 📹 CAMERA MECHANICS:
 * - Following: Tracks Kinematic physics body position with smooth interpolation
 * - Interpolation: Uses lerp between previous and current positions for fluid movement
 * - Fixed Timestep: Implements 60fps fixed timestep for consistent camera behavior
 * - Offset: Configurable camera positioning relative to player
 * - Manual Render: Performs gl.render calls for camera control
 *
 * 🚀 CURRENT USAGE:
 * - Player Component: Main character camera following
 * - Position Source: Kinematic physics body position subscription
 * - Smooth Following: Fixed timestep interpolation for fluid camera movement
 * - Third-Person View: Elevated behind-player camera positioning
 *
 * 🔮 POTENTIAL ENHANCEMENTS:
 * - Mouse-controlled camera rotation
 * - Zoom in/out with mouse wheel
 * - Camera shake effects for impacts
 * - Camera collision detection
 * - Multiple camera modes (top-down, isometric, free-look)
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
