// ============================================================================
// 📱 USE MOBILE CONTROLS HOOK - Mobile Input Bridge
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS HOOK:
// ✅ This bridges mobile UI components with shared input atoms
// ✅ Converts joystick coordinates to directional input atoms
// ✅ Handles shoot button presses with proper cooldown
// ✅ Uses same input atoms as keyboard controls for unified game logic
// ✅ Provides callbacks for MobileGameControls component
//
// 📊 WHAT USEMOBILECONTROLS ACTUALLY DOES:
// - Joystick handling: converts x/y coordinates to directional boolean states
// - Shoot handling: manages shoot button with cooldown and atom updates
// - State management: uses same Jotai atoms as keyboard controls
// - Threshold management: applies dead zones for joystick input
// - Integration: provides callbacks for existing MobileGameControls component
//
// 🎯 INTEGRATION WITH EXISTING COMPONENTS:
// - MobileGameControls.jsx: Uses callbacks from this hook
// - Player.jsx: Uses input atoms for movement and rotation
// - Same game logic: usePlayerMovement and usePlayerShooting work unchanged
//
// ============================================================================

import { useCallback, useRef } from 'react';
import { useAtom } from 'jotai';
import {
  forwardInputAtom,
  backwardInputAtom,
  leftInputAtom,
  rightInputAtom,
  primaryActionAtom,
  inputStateAtom,
  inputPositionAtom
} from '../config/atoms';

/**
 * 📱 USE MOBILE CONTROLS HOOK - Mobile Input Bridge
 * ================================================
 *
 * @description Bridges mobile UI components with input atoms, converting joystick/button events to shared input state
 * @returns {Object} Callbacks and state for MobileGameControls component
 *
 * 🎯 HOOK RESPONSIBILITIES:
 * - Convert joystick coordinates to directional input atoms
 * - Handle shoot button with proper cooldown timing
 * - Apply dead zones and thresholds for joystick input
 * - Provide callbacks compatible with existing MobileGameControls
 * - Share input atoms with keyboard controls for unified game logic
 */
export const useMobileControls = () => {
  // 🎮 INPUT STATE - Atom setters for each input (shared with keyboard)
  const [, setForward] = useAtom(forwardInputAtom);
  const [, setBackward] = useAtom(backwardInputAtom);
  const [, setLeft] = useAtom(leftInputAtom);
  const [, setRight] = useAtom(rightInputAtom);
  const [, setPrimaryAction] = useAtom(primaryActionAtom);
  const [, setInputPosition] = useAtom(inputPositionAtom);

  // 🔄 COMPOSITE STATE - Combined state object (shared with keyboard)
  const [inputState] = useAtom(inputStateAtom);

  // ⏰ COOLDOWN MANAGEMENT - Prevent rapid firing
  const shootCooldown = useRef(false);

  /**
   * 🕹️ JOYSTICK MOVE HANDLER - Convert Joystick Coordinates to Input Atoms
   * =====================================================================
   * 
   * @param {Object} evt - Joystick event with x/y coordinates (approximately -1 to 1)
   * @description Converts joystick movement to directional input atoms with dead zone
   */
  const handleMove = useCallback((evt) => {
    // The joystick already provides values in approximately -1 to 1 range
    const x = evt.x;
    const y = evt.y;
    
    // Apply dead zone threshold to prevent drift
    const threshold = 0.3;
    
    // Update directional atoms based on joystick position
    const forward = y > threshold;
    const backward = y < -threshold;
    const left = x < -threshold;
    const right = x > threshold;
    
    setForward(forward);    // Joystick up = forward
    setBackward(backward);  // Joystick down = backward  
    setLeft(left);          // Joystick left = left
    setRight(right);        // Joystick right = right
  }, [setForward, setBackward, setLeft, setRight]);

  /**
   * 🕹️ JOYSTICK STOP HANDLER - Reset All Movement When Joystick Released
   * ===================================================================
   */
  const handleStop = useCallback(() => {
    // Reset all movement atoms when joystick is released
    setForward(false);
    setBackward(false);
    setLeft(false);
    setRight(false);
  }, [setForward, setBackward, setLeft, setRight]);

  /**
   * 🎯 ROTATION JOYSTICK MOVE HANDLER - Convert Rotation Joystick to Input Position
   * =============================================================================
   *
   * @param {Object} evt - Rotation joystick event with x/y coordinates
   * @description Converts rotation joystick coordinates to input position for camera control
   * @note No stop handler - rotation is maintained when joystick is released
   */
  const handleRotate = useCallback((evt) => {
    // The joystick provides values in -1 to 1 range
    const x = evt.x;
    const y = evt.y;

    // Scale joystick to match mouse sensitivity (mouse pixels * 0.02 ≈ 4 units max)
    // Joystick -1 to 1 should map to similar range
    const factor = 4; // Adjust for desired sensitivity
    const worldPositionX = x * factor; // Left/right rotation
    const worldPositionZ = -y * factor; // Forward/backward rotation (inverted for correct direction)

    // Update input position atom for rotation control
    setInputPosition({ x: worldPositionX, y: 0, z: worldPositionZ });
  }, [setInputPosition]);


  /**
   * 🔫 SHOOT HANDLER - Handle Shoot Button Press with Cooldown
   * =========================================================
   */
  const handleShoot = useCallback(() => {
    // Prevent rapid firing during cooldown
    if (shootCooldown.current) return;
    
    // Activate shoot atom
    setPrimaryAction(true);
    
    // Set cooldown flag
    shootCooldown.current = true;
    
    // Reset shoot atom after brief activation (simulates key press/release)
    setTimeout(() => {
      setPrimaryAction(false);
    }, 50); // Brief activation like a key press
    
    // Reset cooldown after longer period to prevent spam
    setTimeout(() => {
      shootCooldown.current = false;
    }, 300); // Same cooldown as original MobileGameControls
  }, [setPrimaryAction]);

  /**
   * 📊 MOVEMENT STATE GETTER - Get Current Movement for Legacy Components
   * ===================================================================
   * 
   * @returns {Object} Current movement state as x/y coordinates
   * @description Provides movement state for components that still need coordinate-based input
   */
  const getCurrentMovement = useCallback(() => {
    const { forward, backward, left, right } = inputState;
    
    // Convert boolean states back to coordinates for legacy compatibility
    let x = 0;
    let y = 0;
    
    if (left) x -= 1;
    if (right) x += 1;
    if (forward) y += 1;
    if (backward) y -= 1;
    
    return { x, y };
  }, [inputState]);

  // 📱 RETURN INTERFACE - Callbacks compatible with MobileGameControls
  return {
    // 🕹️ Movement joystick callbacks
    onMove: handleMove,
    onStop: handleStop,

    // 🎯 Rotation joystick callbacks
    onRotate: handleRotate,

    // 🔫 Shoot callback
    onShoot: handleShoot,

    // 📊 Current state access
    inputState,
    getCurrentMovement,

    // 🔧 Direct atom access for advanced use cases
    atoms: {
      setForward,
      setBackward,
      setLeft,
      setRight,
      setPrimaryAction,
      setInputPosition,
    },
  };
};
