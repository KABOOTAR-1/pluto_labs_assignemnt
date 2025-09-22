// ============================================================================
// 🎮 INPUT STATE ATOMS - Multi-Platform Input Management
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ These atoms track real-time input state across all input methods (keyboard, touch, gamepad)
// ✅ Components and hooks can subscribe to these for reactive input handling
// ✅ Provides centralized input state that multiple systems can access
// ✅ Use for movement, shooting, and any input-based interactions
// ✅ Input-agnostic: works with keyboard keys, mobile touch controls, gamepad buttons
//
// 📊 INPUT CATEGORIES:
// - Movement: forwardInputAtom, backwardInputAtom, leftInputAtom, rightInputAtom
// - Actions: primaryActionAtom (shooting/primary action)
//
// 🔄 LIFECYCLE: Updated by input event handlers (keyboard, touch, etc.), consumed by gameplay hooks
// 🎮 MULTI-PLATFORM: Supports keyboard (WASD/arrows), mobile (touch controls), gamepad (future)
// ============================================================================

import { atom } from 'jotai';

/**
 * ⬆️ FORWARD INPUT ATOM - Forward Movement Input
 * ==============================================
 *
 * @description Tracks whether forward movement input is currently active
 * @type {boolean} - true when forward input is detected from any source
 * @default false
 *
 * 🎯 USAGE EXAMPLES:
 * - Movement system uses this for forward motion
 * - UI can show movement indicators
 * - Input recording/replay systems
 * - Accessibility overlays
 *
 * 🎮 INPUT SOURCES:
 * - Keyboard: W key, Up arrow
 * - Mobile: Forward touch button/swipe
 * - Gamepad: Left stick up, D-pad up (future)
 */
export const forwardInputAtom = atom(false);

/**
 * ⬇️ BACKWARD INPUT ATOM - Backward Movement Input
 * ===============================================
 *
 * @description Tracks whether backward movement input is currently active
 * @type {boolean} - true when backward input is detected from any source
 * @default false
 *
 * 🎯 USAGE EXAMPLES:
 * - Movement system uses this for backward motion
 * - Combat system for retreating mechanics
 * - UI movement indicators
 *
 * 🎮 INPUT SOURCES:
 * - Keyboard: S key, Down arrow
 * - Mobile: Backward touch button/swipe
 * - Gamepad: Left stick down, D-pad down (future)
 */
export const backwardInputAtom = atom(false);

/**
 * ⬅️ LEFT INPUT ATOM - Left Movement Input
 * =======================================
 *
 * @description Tracks whether left movement input is currently active
 * @type {boolean} - true when left input is detected from any source
 * @default false
 *
 * 🎯 USAGE EXAMPLES:
 * - Movement system uses this for leftward motion
 * - Strafing mechanics
 * - UI navigation
 *
 * 🎮 INPUT SOURCES:
 * - Keyboard: A key, Left arrow
 * - Mobile: Left touch button/swipe
 * - Gamepad: Left stick left, D-pad left (future)
 */
export const leftInputAtom = atom(false);

/**
 * ➡️ RIGHT INPUT ATOM - Right Movement Input
 * =========================================
 *
 * @description Tracks whether right movement input is currently active
 * @type {boolean} - true when right input is detected from any source
 * @default false
 *
 * 🎯 USAGE EXAMPLES:
 * - Movement system uses this for rightward motion
 * - Strafing mechanics
 * - UI navigation
 *
 * 🎮 INPUT SOURCES:
 * - Keyboard: D key, Right arrow
 * - Mobile: Right touch button/swipe
 * - Gamepad: Left stick right, D-pad right (future)
 */
export const rightInputAtom = atom(false);

/**
 * 🚀 PRIMARY ACTION ATOM - Primary Action Input
 * ============================================
 *
 * @description Tracks whether primary action input is currently active
 * @type {boolean} - true when primary action input is detected from any source
 * @default false
 *
 * 🎯 USAGE EXAMPLES:
 * - Shooting system uses this for firing projectiles
 * - Jump mechanics (if implemented)
 * - Primary interaction button
 * - UI confirmations
 *
 * 🎮 INPUT SOURCES:
 * - Keyboard: Spacebar
 * - Mobile: Shoot/action touch button
 * - Gamepad: A button, right trigger (future)
 */
export const primaryActionAtom = atom(false);
/**
 * 🎯 INPUT POSITION ATOM - Input Position for Camera Rotation and Aiming
 * ====================================================================
 *
 * @description Tracks input position for camera rotation and player aiming
 * @type {Object|null} - World coordinates { x, y, z } or null if no input
 * @default null
 *
 * 🎯 USAGE EXAMPLES:
 * - Camera rotation based on input position
 * - Player facing direction and aiming
 * - UI interaction positioning
 * - Input visualization
 *
 * 🎮 INPUT SOURCES:
 * - Mouse: mousemove events
 * - Mobile: Rotation joystick coordinates
 * - Converted to world coordinates for consistent handling
 *
 * 🌍 COORDINATE SYSTEM:
 * - x: Horizontal world position (left/right relative to input center)
 * - y: Vertical world position (always 0 for top-down view)
 * - z: Depth world position (forward/backward relative to input center)
 */
export const inputPositionAtom = atom(null);

/**
 * 🎮 COMPOSITE INPUT ATOM - All Inputs Combined

/**
 *  COMPOSITE INPUT ATOM - All Inputs Combined
 * ============================================
 *
 * @description Derived atom that combines all input states into a single object
 * @type {Object} - Object with boolean properties for each input
 * @returns {{ forward: boolean, backward: boolean, left: boolean, right: boolean, space: boolean }}
 *
 * 🎯 USAGE EXAMPLES:
 * - Components that need all input states at once
 * - Input debugging and visualization
 * - Recording input sequences
 * - Cross-platform input handling
 *
 * 🔄 REACTIVE UPDATES:
 * - Automatically updates when any individual input atom changes
 * - Provides efficient way to subscribe to all input changes
 * - Works with any input source (keyboard, touch, gamepad)
 *
 * 📱 CROSS-PLATFORM COMPATIBILITY:
 * - Same interface regardless of input method
 * - Mobile touch controls map to same properties
 * - Future gamepad support uses same structure
 */
export const inputStateAtom = atom((get) => ({
  forward: get(forwardInputAtom),
  backward: get(backwardInputAtom),
  left: get(leftInputAtom),
  right: get(rightInputAtom),
  space: get(primaryActionAtom),
}));
