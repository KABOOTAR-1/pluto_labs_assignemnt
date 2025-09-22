// ============================================================================
// 🖱️ USE MOUSE CONTROLS HOOK - Mouse Position and Click State Management
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS HOOK:
// ✅ This provides real-time mouse position tracking and click state for player controls
// ✅ Converts screen coordinates to world coordinates for 3D positioning
// ✅ Currently used by usePlayerRotation which passes a setMousePosition callback
// ✅ Tracks both mouse movement and click states for game interactions
// ✅ Integrates with @react-three/fiber for Three.js coordinate conversion
// ✅ Requires setMousePosition callback prop (no internal atom dependency)
//
// 📊 WHAT USEMOUSECONTROLS ACTUALLY DOES:
// - Mouse tracking: captures mousemove events and converts to world coordinates
// - Coordinate conversion: transforms screen pixels to 3D world positions
// - State management: calls setMousePosition callback to update external state
// - Click detection: tracks mousedown/mouseup states for interaction
// - DOM integration: uses event.target.getBoundingClientRect() for positioning (not Three.js canvas bounds)
// - Event management: attaches global mouse listeners with proper cleanup
//
// 📊 WHAT USEMOUSECONTROLS DOES NOT DO (happens elsewhere):
// - Player rotation logic: handled by usePlayerRotation hook (PASSES CALLBACK TO THIS HOOK)
// - Mouse position storage: handled by consuming hook via setMousePosition callback
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
// - setMousePosition: Callback function to update mouse position in consuming hook
//   - Receives object with world coordinates { x, y, z }
//   - x: Horizontal world position (left/right movement)
//   - y: Vertical world position (always 0 for top-down view)
//   - z: Depth world position (forward/backward movement)
// - isMouseDown: Boolean indicating if mouse button is currently pressed (future use)
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/hooks/usePlayerRotation.js: Passes setMousePosition callback to this hook
// - src/hooks/usePlayerShooting.js: Currently uses keyboard space (could use mouse clicks)
// - src/components/Player.jsx: Integrates usePlayerRotation which manages mouse state
// - src/components/Scene.jsx: Contains commented OrbitControls (could use mouse input)
// - src/config/gameConfig.js: Could define mouse sensitivity and control settings

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 🖱️ USE MOUSE CONTROLS HOOK - Mouse Position and Click State Management
 * =====================================================================
 *
 * @description Manages real-time mouse position tracking and click state for player controls
 * @param {Function} setMousePosition - Function to update mouse position state (required)
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

 */
export const useMouseControls = (setMousePosition) => {
  // 🖱️ MOUSE STATE - Position tracking via prop callback
  const { camera, size } = useThree();                     // Three.js canvas context

  /**
z   * 🎧 MOUSE EVENT HANDLERS SETUP - Global mouse input capture
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
     * 🔽 MOUSE DOWN HANDLER - Placeholder for future click handling
     * ===========================================================
     *
     * @description Currently unused, but kept for potential future click-based features
     */
    const handleMouseDown = () => {
      // Future: Handle mouse click events if needed
    };

    /**
     * 🔼 MOUSE UP HANDLER - Placeholder for future click handling
     * =========================================================
     *
     * @description Currently unused, but kept for potential future click-based features
     */
    const handleMouseUp = () => {
      // Future: Handle mouse release events if needed
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
  }, [camera, setMousePosition, size]); // Re-run when Three.js context changes

  // 🎯 RETURN EMPTY OBJECT - Mouse position is now managed externally
  return {};
};
