// ============================================================================
// 🔄 USE PLAYER ROTATION HOOK - Mouse-Based Player Facing Direction
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS HOOK:
// ✅ This handles player rotation based on mouse cursor position for aiming
// ✅ Manages mouse position state internally and integrates with useMouseControls
// ✅ Currently used by Player component for character facing direction control
// ✅ Updates both Kinematic physics body rotation and calls callback for other components
// ✅ Provides smooth mouse-look functionality for top-down shooting games
// ✅ Requires mobilePosition prop from component (no internal atom dependency)
//
// 📊 WHAT USEPLAYERROTATION ACTUALLY DOES:
// - Mouse tracking: manages mouse position state and passes setter to useMouseControls
// - Mobile input: receives mobile position from component props (no atom dependency)
// - Angle calculation: uses Math.atan2 to calculate facing angle toward input position
// - Kinematic rotation: applies rotation to cannon.js Kinematic body (code-controlled)
// - State synchronization: calls onRotationChange callback for other components
// - Game state gating: only processes rotation when game state is 'playing'
//
// 📊 WHAT USEPLAYERROTATION DOES NOT DO (happens elsewhere):
// - Mouse input detection: handled by useMouseControls hook (receives setter from this hook)
// - Mobile input management: handled by component (passes mobilePosition as prop)
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
// - onRotationChange: Callback function to update rotation state for other components (required)
// - mobilePosition: Mobile joystick position from component props (required)
// - mousePosition: Managed internally via useState (no atom dependency)
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/hooks/useMouseControls.js: Receives setMousePosition callback from this hook
// - src/components/Player.jsx: Passes mobilePosition prop and manages rotation state
// - src/hooks/usePlayerShooting.js: Uses rotation data for projectile direction calculation
// - src/config/gameConfig.js: Could define mouse sensitivity and rotation settings
// - src/config/atoms/playerAtoms.js: playerRotationAtom updated via onRotationChange callback
//
// 🎭 ROTATION PROCESSING PIPELINE:
// 1. Component passes mobilePosition prop and manages mouse position via internal state
// 2. useMouseControls receives setMousePosition callback to update internal state
// 3. useFrame hook runs every animation frame to process rotation
// 4. Game state checked - rotation only allowed during GAME_STATES.PLAYING
// 5. Input priority: mobilePosition takes precedence over mousePosition
// 6. Angle calculated using Math.atan2(inputPosition.x, inputPosition.z) for facing direction
// 7. onRotationChange callback invoked to update rotation state for other components
// 8. Kinematic body rotation applied via api.rotation.set(0, angle, 0)
//
// 🎨 COORDINATE SYSTEM:
// - Mouse X: Left (-) to Right (+) relative to screen/canvas center
// - Mouse Z: Forward (-) to Backward (+) relative to screen/canvas center  
// - Rotation Angle: Calculated in radians using atan2 for proper quadrant handling
// - Physics Rotation: Applied as Y-axis rotation (0, angle, 0) for top-down view


import { useRef, useState } from 'react';
import { useFrame } from "@react-three/fiber";
import { GAME_STATES } from "../config/gameConfig";
import { useMouseControls } from "../hooks/useMouseControls";

/**
 * 🔄 USE PLAYER ROTATION HOOK - Multi-Platform Player Facing Direction
 * ===================================================================
 *
 * @description Handles player rotation based on mouse cursor or mobile joystick for aiming and facing direction
 * @param {Object} api - Cannon.js physics body API for Kinematic rotation control (required)
 * @param {string} gameState - Current game state ('playing', 'menu', etc.) for rotation gating (required)
 * @param {Function} onRotationChange - Callback function to update rotation atom for other components (required)
 * @param {Object} mobilePosition - Mobile joystick position { x, y, z } or null (required)
 *
 * 🎯 HOOK RESPONSIBILITIES:
 * - Process input position from mouse or mobile joystick for rotation calculation
 * - Calculate facing angle using Math.atan2 for proper quadrant handling
 * - Apply smooth rotation interpolation to prevent jerky movement
 * - Apply rotation to Kinematic physics body (code-controlled, not physics simulation)
 * - Update rotation atom via callback for other components (shooting, etc.)
 * - Gate rotation processing to only occur during active gameplay
 *
 * 🔄 ROTATION MECHANICS:
 * - Input: Mouse cursor position or mobile joystick position in world coordinates
 * - Priority: Mobile input takes precedence over mouse when available
 * - Calculation: Math.atan2(inputX, inputZ) for facing angle
 * - Smoothing: Angle interpolation with shortest path calculation for natural rotation
 * - Physics: Y-axis rotation applied to Kinematic body (0, angle, 0)
 * - Synchronization: Rotation shared with other components via atom callback
 */
export const usePlayerRotation = (api, gameState, onRotationChange, mobilePosition) => {
  // 🖱️ MOUSE INPUT - Manage mouse position state and pass setter to useMouseControls
  const [mousePosition, setMousePosition] = useState(null);
  useMouseControls(setMousePosition);

  // 🔄 SMOOTH ROTATION - Current angle for interpolation
  const currentAngle = useRef(0);
  const lerpFactor = 0.1; // Adjust for rotation smoothness (0.1 = smooth, 1.0 = instant)

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
    // 🚫 ROTATION GATING - Only process rotation during active gameplay
    if (gameState !== GAME_STATES.PLAYING) return;

    // 🎯 INPUT PRIORITY - Use mobile input if available, otherwise use mouse
    const inputPosition = mobilePosition || mousePosition;
    
    // Skip if no input available
    if (!inputPosition) return;

    // 📐 TARGET ANGLE CALCULATION - Calculate desired facing direction toward input position
    const targetAngle = Math.atan2(inputPosition.x, inputPosition.z);

    // 🔄 ANGLE DIFFERENCE CALCULATION - Find shortest path between angles
    let angleDiff = targetAngle - currentAngle.current;
    
    // Normalize angle difference to [-π, π] for shortest rotation path
    while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
    while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

    // 🔄 SMOOTH INTERPOLATION - Lerp using normalized angle difference
    currentAngle.current += angleDiff * lerpFactor;
    
    // Normalize current angle to [0, 2π] for consistency
    currentAngle.current = ((currentAngle.current % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);

    // 📡 STATE SYNCHRONIZATION - Update rotation atom for other components (shooting, etc.)
    onRotationChange(currentAngle.current);

    // 🔄 KINEMATIC ROTATION - Apply smoothed Y-axis rotation to physics body
    api.rotation.set(0, currentAngle.current, 0); // Y-axis rotation for top-down view
  });
};
