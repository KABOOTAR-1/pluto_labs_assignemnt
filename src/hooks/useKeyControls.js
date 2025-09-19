// ============================================================================
// ⌨️ USE KEY CONTROLS HOOK - Keyboard Input State Management
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS HOOK:
// ✅ This provides real-time keyboard input state for WASD and arrow key controls
// ✅ Handles both keydown and keyup events for smooth player movement
// ✅ Prevents default browser behavior for game keys (no page scrolling)
// ✅ Used by usePlayerMovement and usePlayerShooting for input processing
// ✅ Returns boolean states for each directional input and space bar
//
// 📊 WHAT USEKEYCONTROLS ACTUALLY DOES:
// - Event listeners: attaches global keydown/keyup listeners to window object
// - Key mapping: maps WASD and arrow keys to directional boolean states
// - State management: uses React useState to track pressed/released key states
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
// - keys: Object containing boolean states for each input
//   - forward: W key or Up arrow (boolean)
//   - backward: S key or Down arrow (boolean)
//   - left: A key or Left arrow (boolean)
//   - right: D key or Right arrow (boolean)
//   - space: Spacebar for shooting (boolean)
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/hooks/usePlayerMovement.js: Uses forward, backward, left, right states
// - src/hooks/usePlayerShooting.js: Uses space state for firing projectiles
// - src/components/Player.jsx: Integrates both movement and shooting hooks
// - src/config/gameConfig.js: Currently does NOT have key bindings (could add them)
// - src/config/settingsConfig.js: Currently does NOT have key binding settings (could add them)
//
// 🎭 INPUT PROCESSING PIPELINE:
// 1. Browser fires keydown/keyup events for physical key presses
// 2. useKeyControls captures events via window event listeners
// 3. Key codes mapped to semantic actions (forward, backward, etc.)
// 4. Boolean states updated in React state via setState
// 5. Consuming hooks (usePlayerMovement, usePlayerShooting) read boolean states
// 6. Physics and game logic applied based on current input states
//
// 🎨 KEY MAPPING STRUCTURE:
// - WASD Keys: Primary movement controls (W=forward, A=left, S=backward, D=right)
// - Arrow Keys: Alternative movement controls (same mapping as WASD)
// - Spacebar: Primary action key (shooting, jumping, etc.)
// - Prevented Keys: All game keys prevent default browser behavior
//
// ⚠️ IMPORTANT NOTES:
// - Hook uses window-level event listeners (global keyboard capture)
// - Event listeners are cleaned up on component unmount to prevent memory leaks
// - Keys remain "pressed" until keyup event fires (not single-press detection)
// - preventDefault() stops browser scrolling/navigation for game keys
// - State updates are batched by React for performance optimization
// - Hook provides real-time input state, not input events or callbacks
// - KEY BINDINGS ARE CURRENTLY HARDCODED (WASD + arrows + space) - see customization below
//
// 🎯 KEY BINDING CONFIGURATION SYSTEM (NOT YET IMPLEMENTED):
// ============================================================================
//
// 🚫 CURRENT STATE: Key bindings are hardcoded in switch statements
// ✅ RECOMMENDED IMPLEMENTATION: Add configurable key binding system
//
// 📝 WHERE TO ADD KEY BINDING CONFIGURATIONS:
// 
// STEP 1: Add to gameConfig.js:
// ```javascript
// export const gameConfig = {
//   // ... existing config ...
//   keyBindings: {
//     forward: ['w', 'ArrowUp'],
//     backward: ['s', 'ArrowDown'], 
//     left: ['a', 'ArrowLeft'],
//     right: ['d', 'ArrowRight'],
//     shoot: [' '], // space
//     sprint: ['Shift'],
//     reload: ['r', 'R'],
//     interact: ['e', 'E'],
//     menu: ['Escape']
//   }
// };
// ```
//
// STEP 2: Add to settingsConfig.js for user customization:
// ```javascript
// export const settingsConfig = {
//   // ... existing settings ...
//   controls: {
//     keyBindings: {
//       label: 'Key Bindings',
//       description: 'Customize keyboard controls',
//       // Settings UI would show key binding editor
//       settings: {
//         forward: { label: 'Move Forward', default: ['w', 'ArrowUp'] },
//         backward: { label: 'Move Backward', default: ['s', 'ArrowDown'] },
//         left: { label: 'Move Left', default: ['a', 'ArrowLeft'] },
//         right: { label: 'Move Right', default: ['d', 'ArrowRight'] },
//         shoot: { label: 'Shoot', default: [' '] }
//       }
//     }
//   }
// };
// ```
//
// STEP 3: Add atoms to settingsAtoms.js:
// ```javascript
// // Key binding atoms for user preferences
// export const keyBindingsAtom = atom(gameConfig.keyBindings);
//
// // Individual key binding atoms for specific actions
// export const forwardKeysAtom = atom(['w', 'ArrowUp']);
// export const backwardKeysAtom = atom(['s', 'ArrowDown']);
// export const leftKeysAtom = atom(['a', 'ArrowLeft']);
// export const rightKeysAtom = atom(['d', 'ArrowRight']);
// export const shootKeysAtom = atom([' ']);
// ```
//
// STEP 4: Modify useKeyControls to use configurable bindings:
// ```javascript
// export const useKeyControls = () => {
//   const [keyBindings] = useAtom(keyBindingsAtom);
//   
//   const handleKeyDown = (e) => {
//     if (keyBindings.forward.includes(e.key)) {
//       setKeys(prev => ({ ...prev, forward: true }));
//     }
//     if (keyBindings.backward.includes(e.key)) {
//       setKeys(prev => ({ ...prev, backward: true }));
//     }
//     // ... continue for all actions
//   };
// };
// ```
//
// STEP 5: Add key binding editor to SettingsScreen.jsx:
// ```javascript
// const KeyBindingEditor = ({ action, currentKeys, onKeysChange }) => {
//   // UI for recording new key presses and updating bindings
//   // Shows current keys as buttons/chips
//   // Allows adding/removing keys for each action
// };
// ```
//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASES:
// ============================================================================
//
// 📝 ADD SPRINT KEY (SHIFT):
// ```javascript
// const [keys, setKeys] = useState({
//   forward: false, backward: false, left: false, right: false,
//   space: false, sprint: false  // ADD SPRINT KEY
// });
//
// // In handleKeyDown:
// case 'Shift':
//   setKeys(prev => ({ ...prev, sprint: true }));
//   break;
//
// // In handleKeyUp:
// case 'Shift':
//   setKeys(prev => ({ ...prev, sprint: false }));
//   break;
//
// // Add to preventDefault array:
// if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'a', 's', 'd', 'Shift'].includes(e.key)) {
// ```
//
// 🎮 ADD ALTERNATIVE KEY BINDINGS:
// ```javascript
// // Support both WASD and IJKL for different hand positions
// case 'i': case 'ArrowUp': case 'w':
//   setKeys(prev => ({ ...prev, forward: true }));
//   break;
// case 'k': case 'ArrowDown': case 's':
//   setKeys(prev => ({ ...prev, backward: true }));
//   break;
// case 'j': case 'ArrowLeft': case 'a':
//   setKeys(prev => ({ ...prev, left: true }));
//   break;
// case 'l': case 'ArrowRight': case 'd':
//   setKeys(prev => ({ ...prev, right: true }));
//   break;
// ```
//
// 🎨 ADD ACTION KEYS:
// ```javascript
// const [keys, setKeys] = useState({
//   forward: false, backward: false, left: false, right: false,
//   space: false, reload: false, interact: false, menu: false
// });
//
// // In switch statements:
// case 'r': case 'R':
//   setKeys(prev => ({ ...prev, reload: true }));
//   break;
// case 'e': case 'E':
//   setKeys(prev => ({ ...prev, interact: true }));
//   break;
// case 'Escape':
//   setKeys(prev => ({ ...prev, menu: true }));
//   break;
// ```
//
// 📱 ADD MOBILE COMPATIBILITY CHECK:
// ```javascript
// export const useKeyControls = () => {
//   const [keys, setKeys] = useState({
//     forward: false, backward: false, left: false, right: false, space: false
//   });
//
//   // Skip keyboard setup on mobile devices
//   const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
//
//   useEffect(() => {
//     if (isMobile) return; // Don't attach keyboard listeners on mobile
//
//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('keyup', handleKeyUp);
//     };
//   }, []);
//
//   return keys;
// };
// ```
//
// 🔊 ADD KEY PRESS AUDIO FEEDBACK:
// ```javascript
// import { playSound } from '../utils/audioManager';
//
// const handleKeyDown = (e) => {
//   // Play key press sound for movement keys
//   if (['w', 'a', 's', 'd', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
//     playSound('keyPress', { volume: 0.1 });
//   }
//
//   // Existing key handling logic...
// };
// ```
//
// 🎯 ADD DEBUG MODE:
// ```javascript
// export const useKeyControls = (debug = false) => {
//   const [keys, setKeys] = useState({
//     forward: false, backward: false, left: false, right: false, space: false
//   });
//
//   const handleKeyDown = (e) => {
//     if (debug) {
//       console.log('Key pressed:', e.key);
//     }
//
//     // Existing key handling logic...
//   };
//
//   // Debug output
//   if (debug) {
//     console.log('Current keys:', keys);
//   }
//
//   return keys;
// };
// ```
//
// ⚡ ADD KEY COMBINATION SUPPORT:
// ```javascript
// const [keys, setKeys] = useState({
//   forward: false, backward: false, left: false, right: false,
//   space: false, ctrl: false, shift: false, alt: false
// });
//
// const handleKeyDown = (e) => {
//   // Track modifier keys
//   if (e.ctrlKey) setKeys(prev => ({ ...prev, ctrl: true }));
//   if (e.shiftKey) setKeys(prev => ({ ...prev, shift: true }));
//   if (e.altKey) setKeys(prev => ({ ...prev, alt: true }));
//
//   // Existing key handling logic...
// };
//
// // Usage in consuming hooks:
// const { forward, ctrl, shift } = useKeyControls();
// const moveSpeed = forward ? (shift ? 2.0 : 1.0) : 0; // Sprint with Shift
// ```
// ============================================================================

import { useState, useEffect } from 'react';

/**
 * ⌨️ USE KEY CONTROLS HOOK - Keyboard Input State Management
 * ========================================================
 *
 * @description Manages real-time keyboard input state for WASD and arrow key controls
 * @returns {Object} Object containing boolean states for each input key
 *
 * 🎯 HOOK RESPONSIBILITIES:
 * - Attach global keydown/keyup event listeners to window object
 * - Map WASD and arrow keys to semantic directional boolean states
 * - Prevent default browser behavior for game-relevant keys
 * - Provide real-time input state for consuming hooks and components
 * - Clean up event listeners on component unmount
 *
 * ⌨️ KEY MAPPINGS:
 * - forward: W key or Up arrow (movement toward top of screen)
 * - backward: S key or Down arrow (movement toward bottom of screen)
 * - left: A key or Left arrow (movement toward left side of screen)
 * - right: D key or Right arrow (movement toward right side of screen)
 * - space: Spacebar (primary action key for shooting)
 *
 * 🎮 INPUT PROCESSING:
 * - Keydown: Sets corresponding boolean state to true
 * - Keyup: Sets corresponding boolean state to false
 * - Multiple keys: Can be pressed simultaneously for diagonal movement
 * - Browser prevention: Stops page scrolling and navigation for game keys
 *
 * 🚀 USAGE PATTERNS:
 * - Player Movement: usePlayerMovement hook consumes directional states
 * - Player Shooting: usePlayerShooting hook consumes space state
 * - Real-time Input: States update immediately on key press/release
 * - Game Integration: Used by Player component through other hooks
 */
export const useKeyControls = () => {
  // 🎮 INPUT STATE - Boolean flags for each supported key
  const [keys, setKeys] = useState({
    forward: false,    // W key or Up arrow - move toward top of screen
    backward: false,   // S key or Down arrow - move toward bottom of screen
    left: false,       // A key or Left arrow - move toward left side of screen
    right: false,      // D key or Right arrow - move toward right side of screen
    space: false,      // Spacebar - primary action (shooting)
  });

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
    
    // 🔤 KEY MAPPING - Convert physical keys to semantic actions
    switch (e.key) {
      case 'ArrowUp':   // Arrow key alternative
      case 'w':         // Primary WASD binding
        setKeys(prev => ({ ...prev, forward: true }));
        break;
      case 'ArrowDown': // Arrow key alternative  
      case 's':         // Primary WASD binding
        setKeys(prev => ({ ...prev, backward: true }));
        break;
      case 'ArrowLeft': // Arrow key alternative
      case 'a':         // Primary WASD binding
        setKeys(prev => ({ ...prev, left: true }));
        break;
      case 'ArrowRight':// Arrow key alternative
      case 'd':         // Primary WASD binding
        setKeys(prev => ({ ...prev, right: true }));
        break;
      case ' ':         // Spacebar for primary action
        setKeys(prev => ({ ...prev, space: true }));
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
    // 🔤 KEY RELEASE MAPPING - Convert physical key releases to semantic action resets
    switch (e.key) {
      case 'ArrowUp':   // Arrow key alternative
      case 'w':         // Primary WASD binding
        setKeys(prev => ({ ...prev, forward: false }));
        break;
      case 'ArrowDown': // Arrow key alternative
      case 's':         // Primary WASD binding
        setKeys(prev => ({ ...prev, backward: false }));
        break;
      case 'ArrowLeft': // Arrow key alternative
      case 'a':         // Primary WASD binding
        setKeys(prev => ({ ...prev, left: false }));
        break;
      case 'ArrowRight':// Arrow key alternative
      case 'd':         // Primary WASD binding
        setKeys(prev => ({ ...prev, right: false }));
        break;
      case ' ':         // Spacebar for primary action
        setKeys(prev => ({ ...prev, space: false }));
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
