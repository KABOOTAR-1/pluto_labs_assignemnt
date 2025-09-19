// ============================================================================
// 🖱️ USE MOUSE CONTROLS HOOK - Mouse Position and Click State Management
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS HOOK:
// ✅ This provides real-time mouse position tracking and click state for player controls
// ✅ Converts screen coordinates to world coordinates for 3D positioning
// ✅ Currently used by usePlayerRotation for player facing direction
// ✅ Tracks both mouse movement and click states for game interactions
// ✅ Integrates with @react-three/fiber for Three.js coordinate conversion
//
// 📊 WHAT USEMOUSECONTROLS ACTUALLY DOES:
// - Mouse tracking: captures mousemove events and converts to world coordinates
// - Coordinate conversion: transforms screen pixels to 3D world positions
// - Click detection: tracks mousedown/mouseup states for interaction
// - DOM integration: uses event.target.getBoundingClientRect() for positioning (not Three.js canvas bounds)
// - Event management: attaches global mouse listeners with proper cleanup
//
// 📊 WHAT USEMOUSECONTROLS DOES NOT DO (happens elsewhere):
// - Player rotation logic: handled by usePlayerRotation hook (CURRENTLY USES THIS HOOK)
// - Shooting logic: handled by usePlayerShooting hook (currently uses keyboard space)
// - Camera movement: not implemented (OrbitControls commented out in Scene.jsx)
// - UI interactions: handled by React event handlers on UI elements
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎯 MOUSE INPUT MODIFICATIONS:
// Since useMouseControls is the foundation of mouse input, customization affects all mouse interactions:
//
// 📝 COORDINATE CONVERSION ADJUSTMENTS:
// - Modify MOUSE_WORLD_SCALE (currently 0.02) to change mouse sensitivity
// - Add different scaling for X and Z axes for non-uniform sensitivity
// - Implement dead zones for reduced sensitivity near screen center
// - Add mouse acceleration curves for advanced control schemes
//
// 🎭 INTERACTION ENHANCEMENTS:
// - Add right-click detection for secondary actions
// - Track mouse wheel for zoom or weapon switching
// - Add click duration tracking for hold vs tap actions
// - Implement double-click detection for special abilities
//
// 🔄 STATE MANAGEMENT:
// - mousePosition: Object with world coordinates { x, y, z } or null
//   - x: Horizontal world position (left/right movement)
//   - y: Vertical world position (always 0 for top-down view)
//   - z: Depth world position (forward/backward movement)
// - isMouseDown: Boolean indicating if mouse button is currently pressed
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/hooks/usePlayerRotation.js: Currently USES mousePosition from this hook
// - src/hooks/usePlayerShooting.js: Currently uses keyboard space (could use mouse clicks)
// - src/components/Player.jsx: Integrates usePlayerRotation which uses this hook
// - src/components/Scene.jsx: Contains commented OrbitControls (could use mouse input)
// - src/config/gameConfig.js: Could define mouse sensitivity and control settings
//
// 🎭 MOUSE INPUT PROCESSING PIPELINE:
// 1. Browser fires mousemove/mousedown/mouseup events on window
// 2. useMouseControls captures events via global event listeners
// 3. Screen coordinates converted to canvas-relative coordinates
// 4. Canvas coordinates scaled to world coordinates using MOUSE_WORLD_SCALE
// 5. World position stored in React state as { x, y, z } object
// 6. usePlayerRotation hook reads mousePosition to calculate player facing angle
// 7. Player rotation applied via physics API in usePlayerRotation
//
// 🎨 COORDINATE SYSTEM:
// - Screen Origin: Top-left corner of browser window
// - Canvas Origin: Center of Three.js canvas (rect.width/2, rect.height/2)
// - World Origin: Center of 3D world (0, 0, 0)
// - Mouse Scaling: MOUSE_WORLD_SCALE = 0.02 (screen pixels to world units)
//
// 🖱️ CURRENT USAGE IN CODEBASE:
// ============================================================================
//
// ✅ CURRENTLY USED BY: usePlayerRotation hook
// ```javascript
// // In usePlayerRotation.js:
// const { mousePosition } = useMouseControls();
// const angle = Math.atan2(mousePosition.x, mousePosition.z);
// onRotationChange(angle);
// api.rotation.set(0, angle, 0);
// ```
//
// ❌ NOT CURRENTLY USED BY: usePlayerShooting (uses keyboard space instead)
// ❌ NOT CURRENTLY USED BY: Camera controls (OrbitControls commented out)
// ❌ NOT CURRENTLY USED BY: UI interactions (uses React event handlers)
//
// ⚠️ IMPORTANT NOTES:
// - Hook uses window-level event listeners (global mouse capture)
// - Requires @react-three/fiber context (useThree) to access canvas properties
// - Event listeners are cleaned up on component unmount to prevent memory leaks
// - Mouse position is null initially until first mouse movement
// - Coordinate conversion assumes top-down camera view (Y=0 for world coordinates)
// - Click state (isMouseDown) is currently not used by any consuming hooks
//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASES:
// ============================================================================
//
// 📝 ADJUST MOUSE SENSITIVITY:
// ```javascript
// const MOUSE_WORLD_SCALE = 0.01; // More precise (lower sensitivity)
// // or
// const MOUSE_WORLD_SCALE = 0.05; // More responsive (higher sensitivity)
// ```
//
// 🎮 ADD MOUSE SHOOTING:
// ```javascript
// // Modify usePlayerShooting to use mouse clicks instead of keyboard
// // In usePlayerShooting.js:
// import { useMouseControls } from './useMouseControls';
// 
// export const usePlayerShooting = (...) => {
//   const { isMouseDown } = useMouseControls();
//   // Use isMouseDown instead of space key for shooting
// };
// ```
//
// 🎨 ADD RIGHT-CLICK SUPPORT:
// ```javascript
// const [isRightMouseDown, setIsRightMouseDown] = useState(false);
//
// const handleMouseDown = (event) => {
//   if (event.button === 0) setIsMouseDown(true);      // Left click
//   if (event.button === 2) setIsRightMouseDown(true); // Right click
// };
//
// const handleMouseUp = (event) => {
//   if (event.button === 0) setIsMouseDown(false);
//   if (event.button === 2) setIsRightMouseDown(false);
// };
//
// // Prevent context menu on right-click
// const handleContextMenu = (event) => event.preventDefault();
//
// useEffect(() => {
//   window.addEventListener('contextmenu', handleContextMenu);
//   return () => window.removeEventListener('contextmenu', handleContextMenu);
// }, []);
//
// return { mousePosition, isMouseDown, isRightMouseDown };
// ```
//
// 🔄 ADD MOUSE WHEEL SUPPORT:
// ```javascript
// const [wheelDelta, setWheelDelta] = useState(0);
//
// const handleWheel = (event) => {
//   setWheelDelta(event.deltaY);
//   // Reset wheel delta after short delay
//   setTimeout(() => setWheelDelta(0), 100);
// };
//
// useEffect(() => {
//   window.addEventListener('wheel', handleWheel);
//   return () => window.removeEventListener('wheel', handleWheel);
// }, []);
//
// return { mousePosition, isMouseDown, wheelDelta };
// ```
//
// 📱 ADD TOUCH SUPPORT:
// ```javascript
// const handleTouchMove = (event) => {
//   if (event.touches.length > 0) {
//     const touch = event.touches[0];
//     const rect = event.target.getBoundingClientRect();
//     const x = touch.clientX - rect.left - rect.width / 2;
//     const y = touch.clientY - rect.top - rect.height / 2;
//     
//     const worldPositionX = x * MOUSE_WORLD_SCALE;
//     const worldPositionZ = y * MOUSE_WORLD_SCALE;
//     
//     setMousePosition({ x: worldPositionX, y: 0, z: worldPositionZ });
//   }
// };
//
// useEffect(() => {
//   window.addEventListener('touchmove', handleTouchMove);
//   return () => window.removeEventListener('touchmove', handleTouchMove);
// }, []);
// ```
//
// 🎯 ADD DEAD ZONE:
// ```javascript
// const handleMouseMove = (event) => {
//   const rect = event.target.getBoundingClientRect();
//   const x = event.clientX - rect.left - rect.width / 2;
//   const y = event.clientY - rect.top - rect.height / 2;
//
//   // Dead zone radius (pixels)
//   const DEAD_ZONE = 50;
//   const distance = Math.sqrt(x * x + y * y);
//   
//   if (distance < DEAD_ZONE) {
//     // Inside dead zone - no movement
//     setMousePosition({ x: 0, y: 0, z: 0 });
//     return;
//   }
//
//   // Outside dead zone - normal scaling
//   const MOUSE_WORLD_SCALE = 0.02;
//   const worldPositionX = x * MOUSE_WORLD_SCALE;
//   const worldPositionZ = y * MOUSE_WORLD_SCALE;
//
//   setMousePosition({ x: worldPositionX, y: 0, z: worldPositionZ });
// };
// ```
//
// 🔊 ADD CLICK AUDIO FEEDBACK:
// ```javascript
// import { playSound } from '../utils/audioManager';
//
// const handleMouseDown = () => {
//   setIsMouseDown(true);
//   playSound('mouseClick', { volume: 0.2 });
// };
// ```
// ============================================================================

import { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 🖱️ USE MOUSE CONTROLS HOOK - Mouse Position and Click State Management
 * =====================================================================
 *
 * @description Manages real-time mouse position tracking and click state for player controls
 * @returns {Object} Object containing mouse world position and click state
 *
 * 🎯 HOOK RESPONSIBILITIES:
 * - Track mouse movement and convert screen coordinates to world coordinates
 * - Monitor mouse click state for game interactions
 * - Use DOM getBoundingClientRect() for coordinate conversion (not Three.js canvas directly)
 * - Provide real-time input state for consuming hooks and components
 * - Clean up event listeners on component unmount
 *
 * 🖱️ RETURN VALUES:
 * - mousePosition: World coordinates { x, y, z } or null if no movement yet
 *   - x: Horizontal world position (left/right relative to screen center)
 *   - y: Vertical world position (always 0 for top-down view)
 *   - z: Depth world position (forward/backward relative to screen center)
 * - isMouseDown: Boolean indicating if mouse button is currently pressed
 *
 * 🎮 COORDINATE CONVERSION:
 * - Screen pixels converted to canvas-relative coordinates
 * - Canvas coordinates scaled to world coordinates using MOUSE_WORLD_SCALE (0.02)
 * - Canvas center becomes world origin (0, 0, 0)
 * - Mouse sensitivity controlled by MOUSE_WORLD_SCALE constant
 *
 * 🚀 CURRENT USAGE:
 * - usePlayerRotation: Uses mousePosition to calculate player facing direction
 * - Player rotation: Mouse position determines which direction player faces
 * - Click state: Currently tracked but not used by any consuming hooks
 *
 * 🔮 POTENTIAL USAGE:
 * - Mouse shooting: Could replace keyboard space bar for firing
 * - Camera controls: Could implement mouse-look or orbit controls
 * - UI interactions: Could handle 3D object selection and manipulation
 */
export const useMouseControls = () => {
  // 🖱️ MOUSE STATE - Position and click tracking
  const [mousePosition, setMousePosition] = useState(null); // World coordinates { x, y, z } or null
  const [isMouseDown, setIsMouseDown] = useState(false);    // Left mouse button state
  const { camera, size } = useThree();                     // Three.js canvas context

  /**
   * 🎧 MOUSE EVENT HANDLERS SETUP - Global mouse input capture
   * =========================================================
   * 
   * @description Sets up window-level event listeners for mouse input
   * @effects:
   * - Attaches mousemove, mousedown, mouseup listeners to window
   * - Converts screen coordinates to world coordinates on mouse movement
   * - Tracks mouse button press/release state
   * - Provides cleanup function to prevent memory leaks
   * - Re-runs when camera or canvas size changes
   */
  useEffect(() => {
    /**
     * 🔄 MOUSE MOVE HANDLER - Screen to World Coordinate Conversion
     * ============================================================
     * 
     * @param {MouseEvent} event - Browser mouse event object
     * @description Converts mouse screen position to 3D world coordinates
     * @effects:
     * - Gets mouse position relative to event target bounds (not necessarily canvas)
     * - Centers coordinates around target element middle (0,0 = element center)
     * - Scales pixel coordinates to world units using MOUSE_WORLD_SCALE
     * - Updates mousePosition state with world coordinates { x, y, z }
     * - Y coordinate always set to 0 for top-down view
     */
    const handleMouseMove = (event) => {
      // 📐 DOM BOUNDS CALCULATION - Get event target rectangle for coordinate conversion
      const rect = event.target.getBoundingClientRect();
      
      // 🎯 CENTER-RELATIVE COORDINATES - Convert to element-centered coordinates
      const x = event.clientX - rect.left - rect.width / 2;   // Horizontal offset from center
      const y = event.clientY - rect.top - rect.height / 2;   // Vertical offset from center

      // 🔧 SENSITIVITY SCALING - Convert pixels to world units
      const MOUSE_WORLD_SCALE = 0.02; // Adjust this value to change mouse-to-world sensitivity
      const worldPositionX = x * MOUSE_WORLD_SCALE;  // World X (left/right)
      const worldPositionZ = y * MOUSE_WORLD_SCALE;  // World Z (forward/backward)

      // 🌍 WORLD POSITION UPDATE - Store 3D coordinates for consuming hooks
      setMousePosition({ x: worldPositionX, y: 0, z: worldPositionZ });
    };

    /**
     * 🔽 MOUSE DOWN HANDLER - Click state activation
     * ==============================================
     * 
     * @description Handles mouse button press events
     * @effects:
     * - Sets isMouseDown to true for left mouse button
     * - Triggers re-render in consuming components
     * - Used for click-and-hold interactions
     */
    const handleMouseDown = () => {
      setIsMouseDown(true);
    };

    /**
     * 🔼 MOUSE UP HANDLER - Click state deactivation
     * ==============================================
     * 
     * @description Handles mouse button release events
     * @effects:
     * - Sets isMouseDown to false for left mouse button
     * - Triggers re-render in consuming components
     * - Completes click interaction cycle
     */
    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    // 🎯 GLOBAL EVENT ATTACHMENT - Capture mouse events at window level
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // 🧹 CLEANUP FUNCTION - Remove event listeners to prevent memory leaks
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [camera, size]); // Re-run when Three.js context changes

  // 🎯 RETURN MOUSE STATE - Provide current position and click state to consuming components
  return { mousePosition, isMouseDown };
};
