// ============================================================================
// ⌨️ USE KEY CONTROLS HOOK - Keyboard Input Handler
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS HOOK:
// ✅ This handles keyboard input events and updates shared input atoms
// ✅ Handles both keydown and keyup events for smooth player movement
// ✅ Prevents default browser behavior for game keys (no page scrolling)
// ✅ Updates input atoms that are shared with mobile controls (future)
// ✅ Works alongside future useMobileControls hook (different input, same atoms)
//
// 📊 WHAT USEKEYCONTROLS ACTUALLY DOES:
// - Event listeners: attaches global keydown/keyup listeners to window object
// - Key mapping: maps WASD and arrow keys to directional boolean states
// - State management: uses Jotai atoms to track pressed/released key states globally
// - Event prevention: prevents default browser behavior for game-relevant keys
// - Cleanup: removes event listeners on component unmount to prevent memory leaks
//
// 📊 WHAT USEKEYCONTROLS DOES NOT DO (happens elsewhere):
// - Movement Logic: handled by usePlayerMovement hook
// - Shooting logic: handled by usePlayerShooting hook
// - Game state checking: consuming hooks check if game is in 'playing' state
// - Speed/timing: consuming hooks apply delta time and speed multipliers
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎯 INPUT SYSTEM MODIFICATIONS:
// Since useKeyControls is the foundation of keyboard input, customization affects all controls:
//
// 📝 ADD NEW KEY MAPPINGS:
// - Add new keys to the keys state object (e.g., shift, ctrl, tab)
// - Extend switch statements in handleKeyDown/handleKeyUp
// - Add new keys to preventDefault array for browser behavior control
// - Return new key states for consuming hooks to use
//
// 🎭 MODIFY KEY BINDINGS:
// - Change which physical keys map to which actions
// - Add alternative key bindings for accessibility
// - Support different keyboard layouts (AZERTY, QWERTZ, etc.)
// - Add customizable key binding system with user preferences
//
// 🔄 STATE MANAGEMENT:
// - Individual atoms for each input (reactive, global state):
//   - forwardInputAtom: Forward movement (keyboard, touch, gamepad)
//   - backwardInputAtom: Backward movement (keyboard, touch, gamepad)
//   - leftInputAtom: Left movement (keyboard, touch, gamepad)
//   - rightInputAtom: Right movement (keyboard, touch, gamepad)
//   - primaryActionAtom: Primary action (keyboard, touch, gamepad)
// - inputStateAtom: Combined object for backward compatibility
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/hooks/usePlayerMovement.js: Uses input atoms set by this hook
// - src/hooks/usePlayerShooting.js: Uses input atoms set by this hook
// - src/components/Player.jsx: Integrates both movement and shooting hooks
// - src/hooks/useMobileControls.js: Future mobile hook will set same atoms
// - src/config/gameConfig.js: Currently does NOT have key bindings (could add them)
// - src/config/settingsConfig.js: Currently does NOT have key binding settings (could add them)
//

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import {
  forwardInputAtom,
  backwardInputAtom,
  leftInputAtom,
  rightInputAtom,
  primaryActionAtom,
  inputStateAtom
} from '../config/atoms';

/**
 * ⌨️ USE KEY CONTROLS HOOK - Keyboard Input State Management
 * ========================================================
 *
 * @description Manages real-time keyboard input state for WASD and arrow key controls
 * @returns {Object} Object containing boolean states for each input (forward, backward, left, right, space)
 *
 * 🎯 HOOK RESPONSIBILITIES:
 * - Attach global keydown/keyup event listeners to window object
 * - Map WASD and arrow keys to input atoms (shared with mobile controls)
 * - Prevent default browser behavior for game-relevant keys
 * - Update shared input atoms that work across all input methods
 * - Clean up event listeners on component unmount
 *

 */
export const useKeyControls = () => {
  // 🎮 INPUT STATE - Atom-based reactive state for each supported input
  const [, setForward] = useAtom(forwardInputAtom);
  const [, setBackward] = useAtom(backwardInputAtom);
  const [, setLeft] = useAtom(leftInputAtom);
  const [, setRight] = useAtom(rightInputAtom);
  const [, setSpace] = useAtom(primaryActionAtom);
  
  // 🔄 COMPOSITE STATE - Combined state object for backward compatibility
  const [keys] = useAtom(inputStateAtom);

  /**
   * 🔽 KEY DOWN HANDLER - Process key press events
   * ===============================================
   * 
   * @param {KeyboardEvent} e - Browser keyboard event object
   * @description Handles keydown events and updates corresponding boolean states
   * @effects:
   * - Prevents default browser behavior for game keys (no page scrolling)
   * - Maps physical keys to semantic action states
   * - Updates React state to trigger re-renders in consuming components
   * - Supports both WASD and arrow key layouts simultaneously
   */
  const handleKeyDown = (e) => {
    // 🚫 BROWSER BEHAVIOR PREVENTION - Stop page scrolling and navigation
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'a', 's', 'd'].includes(e.key)) {
      e.preventDefault();
    }
    
    // 🔤 KEY MAPPING - Convert physical keys to semantic actions using atoms
    switch (e.key) {
      case 'ArrowUp':   // Arrow key alternative
      case 'w':         // Primary WASD binding
        setForward(true);
        break;
      case 'ArrowDown': // Arrow key alternative  
      case 's':         // Primary WASD binding
        setBackward(true);
        break;
      case 'ArrowLeft': // Arrow key alternative
      case 'a':         // Primary WASD binding
        setLeft(true);
        break;
      case 'ArrowRight':// Arrow key alternative
      case 'd':         // Primary WASD binding
        setRight(true);
        break;
      case ' ':         // Spacebar for primary action
        setSpace(true);
        break;
      default:
        break;          // Ignore unrecognized keys
    }
  };

  /**
   * 🔼 KEY UP HANDLER - Process key release events
   * ==============================================
   * 
   * @param {KeyboardEvent} e - Browser keyboard event object
   * @description Handles keyup events and resets corresponding boolean states
   * @effects:
   * - Maps physical key releases to semantic action state resets
   * - Updates React state to stop ongoing actions (movement, shooting)
   * - Ensures clean state when keys are released
   * - Supports both WASD and arrow key layouts simultaneously
   */
  const handleKeyUp = (e) => {
    // 🔤 KEY RELEASE MAPPING - Convert physical key releases to semantic action resets using atoms
    switch (e.key) {
      case 'ArrowUp':   // Arrow key alternative
      case 'w':         // Primary WASD binding
        setForward(false);
        break;
      case 'ArrowDown': // Arrow key alternative
      case 's':         // Primary WASD binding
        setBackward(false);
        break;
      case 'ArrowLeft': // Arrow key alternative
      case 'a':         // Primary WASD binding
        setLeft(false);
        break;
      case 'ArrowRight':// Arrow key alternative
      case 'd':         // Primary WASD binding
        setRight(false);
        break;
      case ' ':         // Spacebar for primary action
        setSpace(false);
        break;
      default:
        break;          // Ignore unrecognized keys
    }
  };

  /**
   * 🎧 EVENT LISTENER SETUP - Attach global keyboard handlers
   * =========================================================
   * 
   * @description Sets up window-level event listeners for keyboard input
   * @effects:
   * - Attaches keydown and keyup listeners to window object (global capture)
   * - Ensures keyboard input works regardless of focus state
   * - Provides cleanup function to prevent memory leaks
   * - Runs once on component mount, cleans up on unmount
   */
  useEffect(() => {
    // 🎯 GLOBAL EVENT ATTACHMENT - Capture keyboard events at window level
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 🧹 CLEANUP FUNCTION - Remove event listeners to prevent memory leaks
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []); // Empty dependency array - setup once on mount

  // 🎯 RETURN INPUT STATE - Provide current key states to consuming components
  return keys;
};
