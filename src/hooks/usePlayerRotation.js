// ============================================================================
// 🔄 USE PLAYER ROTATION HOOK - Mouse-Based Player Facing Direction
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS HOOK:
// ✅ This handles player rotation based on mouse cursor position for aiming
// ✅ Integrates with useMouseControls for real-time mouse position tracking
// ✅ Currently used by Player component for character facing direction control
// ✅ Updates both Kinematic physics body rotation and atom state for other components
// ✅ Provides smooth mouse-look functionality for top-down shooting games
//
// 📊 WHAT USEPLAYERROTATION ACTUALLY DOES:
// - Mouse tracking: reads world mouse position from useMouseControls hook
// - Angle calculation: uses Math.atan2 to calculate facing angle toward mouse cursor
// - Kinematic rotation: applies rotation to cannon.js Kinematic body (code-controlled)
// - State synchronization: updates rotation atom via callback for other components
// - Game state gating: only processes rotation when game state is 'playing'
//
// 📊 WHAT USEPLAYERROTATION DOES NOT DO (happens elsewhere):
// - Mouse input detection: handled by useMouseControls hook (CURRENTLY USES THIS HOOK)
// - Player movement: handled by usePlayerMovement hook (uses keyboard input)
// - Camera following: handled by usePlayerCamera hook
// - Shooting direction: uses rotation data from this hook for projectile direction
// - Physics body creation: done in Player component with useBox from @react-three/cannon
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎯 ROTATION SYSTEM MODIFICATIONS:
// Since usePlayerRotation controls player facing direction, customization affects aiming and gameplay:
//
// 📝 ROTATION MECHANICS ADJUSTMENTS:
// - Add rotation smoothing/interpolation for less twitchy movement
// - Implement rotation speed limits or mouse sensitivity scaling
// - Add rotation constraints (limited turning angles, facing locks)
// - Include rotation momentum or inertia for more realistic feel
//
// 🎭 AIMING ENHANCEMENTS:
// - Add aim assist or target snapping for easier gameplay
// - Implement different aiming modes (free aim, snap to enemies, etc.)
// - Add crosshair prediction for moving targets
// - Include aim deadzone near player for reduced sensitivity
//
// 🔄 STATE MANAGEMENT:
// - api: Cannon.js physics body API for rotation control (required)
// - gameState: Current game state string ('playing', 'menu', etc.) for rotation gating (required)
// - onRotationChange: Callback function to update rotation atom for other components (required)
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/hooks/useMouseControls.js: Currently USED for mouse position (mousePosition)
// - src/components/Player.jsx: Currently USES this hook for rotation control
// - src/hooks/usePlayerShooting.js: Uses rotation data for projectile direction calculation
// - src/config/gameConfig.js: Could define mouse sensitivity and rotation settings
// - src/config/atoms/playerAtoms.js: playerRotationAtom updated via onRotationChange callback
//
// 🎭 ROTATION PROCESSING PIPELINE:
// 1. useMouseControls provides world mouse position { x, y, z }
// 2. useFrame hook runs every animation frame to process rotation
// 3. Game state checked - rotation only allowed during GAME_STATES.PLAYING
// 4. Mouse position checked - rotation only when mouse has moved (not null)
// 5. Angle calculated using Math.atan2(mousePosition.x, mousePosition.z) for facing direction
// 6. onRotationChange callback invoked to update rotation atom for other components
// 7. Kinematic body rotation applied via api.rotation.set(0, angle, 0)
//
// 🎨 COORDINATE SYSTEM:
// - Mouse X: Left (-) to Right (+) relative to screen/canvas center
// - Mouse Z: Forward (-) to Backward (+) relative to screen/canvas center  
// - Rotation Angle: Calculated in radians using atan2 for proper quadrant handling
// - Physics Rotation: Applied as Y-axis rotation (0, angle, 0) for top-down view
//
// 🔄 CURRENT USAGE IN CODEBASE:
// ============================================================================
//
// ✅ CURRENTLY USED BY: Player component
// ```javascript
// // In Player.jsx:
// usePlayerRotation(
//   api,                    // Physics body API for Kinematic rotation
//   gameState,              // Game state for rotation gating
//   setPlayerRotation       // Callback to update rotation atom
// );
// ```
//
// ✅ CURRENTLY USES: useMouseControls hook
// ```javascript
// // In this hook:
// const { mousePosition } = useMouseControls();
// ```
//
// ✅ ROTATION DATA USED BY: usePlayerShooting hook
// ```javascript
// // In usePlayerShooting.js:
// direction: [Math.sin(playerRotation), 0, Math.cos(playerRotation)]
// ```
//
// ✅ USES KINEMATIC BODY: Physics rotation applied to Kinematic body
// ```javascript
// // In this hook:
// api.rotation.set(0, angle, 0); // Y-axis rotation for top-down view
// ```
//
// ⚠️ IMPORTANT NOTES:
// - Hook uses useFrame from @react-three/fiber (runs every animation frame)
// - Rotation is applied to Kinematic physics body (code-controlled, not physics simulation)
// - Math.atan2 provides proper angle calculation handling all quadrants correctly
// - Y-axis rotation used for top-down view (0, angle, 0)
// - Rotation data shared with other components via atom callback system
// - Mouse position must not be null for rotation processing to occur
//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASES:
// ============================================================================
//
// 📝 ADD ROTATION SMOOTHING:
// ```javascript
// import { useRef } from 'react';
//
// export const usePlayerRotation = (api, gameState, onRotationChange) => {
//   const { mousePosition } = useMouseControls();
//   const currentAngle = useRef(0);
//   const ROTATION_SPEED = 5; // radians per second
//
//   useFrame((_, delta) => {
//     if (gameState !== GAME_STATES.PLAYING || !mousePosition) return;
//
//     const targetAngle = Math.atan2(mousePosition.x, mousePosition.z);
//     const angleDiff = targetAngle - currentAngle.current;
//     
//     // Handle angle wrapping (shortest rotation path)
//     const wrappedDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
//     
//     // Smooth interpolation toward target
//     currentAngle.current += wrappedDiff * ROTATION_SPEED * delta;
//     
//     onRotationChange(currentAngle.current);
//     api.rotation.set(0, currentAngle.current, 0);
//   });
// };
// ```
//
// 🎮 ADD MOUSE SENSITIVITY:
// ```javascript
// import { useAtom } from 'jotai';
// import { mouseSensitivityAtom } from '../config/atoms';
//
// export const usePlayerRotation = (api, gameState, onRotationChange) => {
//   const { mousePosition } = useMouseControls();
//   const [mouseSensitivity] = useAtom(mouseSensitivityAtom);
//
//   useFrame(() => {
//     if (gameState !== GAME_STATES.PLAYING || !mousePosition) return;
//
//     // Scale mouse position by sensitivity
//     const scaledX = mousePosition.x * mouseSensitivity;
//     const scaledZ = mousePosition.z * mouseSensitivity;
//     
//     const angle = Math.atan2(scaledX, scaledZ);
//     onRotationChange(angle);
//     api.rotation.set(0, angle, 0);
//   });
// };
// ```
//
// 🎨 ADD AIM DEADZONE:
// ```javascript
// export const usePlayerRotation = (api, gameState, onRotationChange) => {
//   const { mousePosition } = useMouseControls();
//   const DEADZONE_RADIUS = 2; // World units
//
//   useFrame(() => {
//     if (gameState !== GAME_STATES.PLAYING || !mousePosition) return;
//
//     // Calculate distance from center
//     const distance = Math.sqrt(mousePosition.x ** 2 + mousePosition.z ** 2);
//     
//     // Only rotate if outside deadzone
//     if (distance > DEADZONE_RADIUS) {
//       const angle = Math.atan2(mousePosition.x, mousePosition.z);
//       onRotationChange(angle);
//       api.rotation.set(0, angle, 0);
//     }
//   });
// };
// ```
//
// 📱 ADD TOUCH/MOBILE SUPPORT:
// ```javascript
// import { useTouchControls } from './useTouchControls';
//
// export const usePlayerRotation = (api, gameState, onRotationChange) => {
//   const { mousePosition } = useMouseControls();
//   const { touchPosition } = useTouchControls();
//   
//   useFrame(() => {
//     if (gameState !== GAME_STATES.PLAYING) return;
//
//     // Use touch position if available, otherwise mouse
//     const inputPosition = touchPosition || mousePosition;
//     if (!inputPosition) return;
//
//     const angle = Math.atan2(inputPosition.x, inputPosition.z);
//     onRotationChange(angle);
//     api.rotation.set(0, angle, 0);
//   });
// };
// ```
//
// 🔊 ADD ROTATION AUDIO:
// ```javascript
// import { playSound } from '../utils/audioManager';
//
// export const usePlayerRotation = (api, gameState, onRotationChange) => {
//   const { mousePosition } = useMouseControls();
//   const lastAngle = useRef(0);
//
//   useFrame(() => {
//     if (gameState !== GAME_STATES.PLAYING || !mousePosition) return;
//
//     const angle = Math.atan2(mousePosition.x, mousePosition.z);
//     const angleDiff = Math.abs(angle - lastAngle.current);
//     
//     // Play rotation sound for significant turns
//     if (angleDiff > 0.1) { // ~6 degrees
//       playSound('playerTurn', { volume: 0.2 });
//     }
//     
//     lastAngle.current = angle;
//     onRotationChange(angle);
//     api.rotation.set(0, angle, 0);
//   });
// };
// ```
//
// 🎯 ADD SNAP-TO-ENEMY AIMING:
// ```javascript
// export const usePlayerRotation = (api, gameState, onRotationChange, enemies = []) => {
//   const { mousePosition } = useMouseControls();
//   const SNAP_DISTANCE = 5; // World units
//
//   useFrame(() => {
//     if (gameState !== GAME_STATES.PLAYING || !mousePosition) return;
//
//     let targetAngle = Math.atan2(mousePosition.x, mousePosition.z);
//     
//     // Check for nearby enemies to snap to
//     const nearbyEnemies = enemies.filter(enemy => {
//       if (!enemy.position) return false;
//       const distance = Math.sqrt(enemy.position[0] ** 2 + enemy.position[2] ** 2);
//       return distance < SNAP_DISTANCE;
//     });
//     
//     if (nearbyEnemies.length > 0) {
//       // Snap to closest enemy
//       const closest = nearbyEnemies.reduce((prev, curr) => {
//         const prevDist = Math.sqrt(prev.position[0] ** 2 + prev.position[2] ** 2);
//         const currDist = Math.sqrt(curr.position[0] ** 2 + curr.position[2] ** 2);
//         return currDist < prevDist ? curr : prev;
//       });
//       
//       targetAngle = Math.atan2(closest.position[0], closest.position[2]);
//     }
//
//     onRotationChange(targetAngle);
//     api.rotation.set(0, targetAngle, 0);
//   });
// };
// ```
// ============================================================================

import { useFrame } from "@react-three/fiber";
import { GAME_STATES } from "../config/gameConfig";
import { useMouseControls } from "../hooks/useMouseControls";

/**
 * 🔄 USE PLAYER ROTATION HOOK - Mouse-Based Player Facing Direction
 * ================================================================
 *
 * @description Handles player rotation based on mouse cursor position for aiming and facing direction
 * @param {Object} api - Cannon.js physics body API for Kinematic rotation control (required)
 * @param {string} gameState - Current game state ('playing', 'menu', etc.) for rotation gating (required)
 * @param {Function} onRotationChange - Callback function to update rotation atom for other components (required)
 *
 * 🎯 HOOK RESPONSIBILITIES:
 * - Process mouse position from useMouseControls for rotation calculation
 * - Calculate facing angle using Math.atan2 for proper quadrant handling
 * - Apply rotation to Kinematic physics body (code-controlled, not physics simulation)
 * - Update rotation atom via callback for other components (shooting, etc.)
 * - Gate rotation processing to only occur during active gameplay
 *
 * 🔄 ROTATION MECHANICS:
 * - Input: Mouse cursor position in world coordinates
 * - Calculation: Math.atan2(mouseX, mouseZ) for facing angle
 * - Physics: Y-axis rotation applied to Kinematic body (0, angle, 0)
 * - Synchronization: Rotation shared with other components via atom callback
 * - No rotation smoothing (instant response to mouse movement)
 *
 * 🚀 CURRENT USAGE:
 * - Player Component: Main character facing direction control
 * - Input Source: useMouseControls hook for mouse world position
 * - Physics Integration: Kinematic body rotation (code-controlled)
 * - State Sharing: Rotation atom updated for shooting direction calculation
 *
 * 🔮 POTENTIAL ENHANCEMENTS:
 * - Rotation smoothing and interpolation
 * - Mouse sensitivity and deadzone support
 * - Aim assist and snap-to-enemy functionality
 * - Touch/mobile input support
 * - Audio feedback for rotation changes
 */
export const usePlayerRotation = (api, gameState, onRotationChange) => {
  // 🖱️ MOUSE INPUT - Get current mouse world position from useMouseControls
  const { mousePosition } = useMouseControls();

  /**
   * 🎬 ROTATION FRAME LOOP - Process rotation every animation frame
   * ==============================================================
   * 
   * @description Runs every frame to calculate and apply player rotation based on mouse position
   * @effects:
   * - Checks game state and mouse position for rotation conditions
   * - Calculates facing angle using Math.atan2 for proper quadrant handling
   * - Updates rotation atom via callback for other components to use
   * - Applies rotation to Kinematic physics body for visual representation
   */
  useFrame(() => {
    // 🚫 ROTATION GATING - Only process rotation during active gameplay with valid mouse position
    if (gameState !== GAME_STATES.PLAYING || !mousePosition) return;

    // 📐 ANGLE CALCULATION - Calculate facing direction toward mouse cursor
    const angle = Math.atan2(mousePosition.x, mousePosition.z);
    
    // 📡 STATE SYNCHRONIZATION - Update rotation atom for other components (shooting, etc.)
    onRotationChange(angle);
    
    // 🔄 KINEMATIC ROTATION - Apply Y-axis rotation to physics body (code-controlled)
    api.rotation.set(0, angle, 0); // Y-axis rotation for top-down view
  });
};
