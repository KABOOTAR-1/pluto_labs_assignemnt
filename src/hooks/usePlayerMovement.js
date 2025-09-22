// ============================================================================
// 🏃‍♂️ USE PLAYER MOVEMENT HOOK - WASD/Arrow Key Movement with Physics
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS HOOK:
// ✅ This handles all player movement mechanics using keyboard input and physics
// ✅ Integrates with useKeyControls for WASD/arrow key input processing
// ✅ Uses @react-three/cannon Kinematic body for smooth movement (code-controlled, not physics simulation)
// ✅ Currently used by Player component for character movement control
// ✅ Includes boundary checking and automatic game over on world exit
//
// 📊 WHAT USEPLAYERMOVEMENT ACTUALLY DOES:
// - Input processing: reads keyboard states from useKeyControls hook
// - Kinematic movement: applies velocity to cannon.js Kinematic body (code-controlled, not physics simulation)
// - Delta time calculation: ensures frame-rate independent movement speed
// - Boundary enforcement: checks world bounds and triggers game over on violation
// - Game state gating: only processes movement when game state is 'playing'
//
// 📊 WHAT USEPLAYERMOVEMENT DOES NOT DO (happens elsewhere):
// - Keyboard input detection: handled by useKeyControls hook (CURRENTLY USES THIS HOOK)
// - Player rotation: handled by usePlayerRotation hook (uses mouse input)
// - Camera following: handled by usePlayerCamera hook
// - Health management: handled by usePlayerHealth hook
// - Physics body creation: done in Player component with useBox from @react-three/cannon
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎯 MOVEMENT SYSTEM MODIFICATIONS:
// Since usePlayerMovement controls core player locomotion, customization affects gameplay feel:
//
// 📝 MOVEMENT MECHANICS ADJUSTMENTS:
// - Modify movement speed calculation (linear, acceleration-based, momentum)
// - Add diagonal movement speed normalization for consistent speed
// - Implement movement acceleration and deceleration for smoother feel
// - Add different movement speeds for different directions (strafe speed, etc.)
//
// 🎭 PHYSICS ENHANCEMENTS:
// - Add collision response for bouncing off world boundaries
// - Implement sliding along walls instead of hard stops
// - Add ground friction or ice physics effects
// - Include jump mechanics with gravity and landing
//
// 🔄 STATE MANAGEMENT:
// - api: Cannon.js physics body API for velocity control (required)
// - playerPosition: Current [x, y, z] coordinates from physics subscription (required)
// - gameState: Current game state string ('playing', 'menu', etc.) (required)
// - handleGameOver: Callback function to trigger when player exits world bounds (required)
// - playerSpeed: Movement speed in units/second (optional, defaults to gameConfig.player.speed)
// - worldBounds: World boundary object with minX, maxX, minZ, maxZ (optional, defaults to gameConfig.world.bounds)
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/hooks/useKeyControls.js: Currently USED for keyboard input (forward, backward, left, right)
// - src/components/Player.jsx: Currently USES this hook for player movement
// - src/config/gameConfig.js: Provides default playerSpeed and worldBounds
// - src/config/constants.js: Defines GAME_STATES.PLAYING for movement gating
// - src/config/atoms/settingsAtoms.js: basePlayerSpeedAtom affects movement speed
//

import { useFrame } from "@react-three/fiber";
import { gameConfig } from "../config/gameConfig";
import { GAME_STATES } from "../config/constants";
import { useKeyControls } from "../hooks/useKeyControls";

/**
 * 🏃‍♂️ USE PLAYER MOVEMENT HOOK - WASD/Arrow Key Movement with Physics
 * ===================================================================
 *
 * @description Handles all player movement mechanics using keyboard input and cannon.js physics
 * @param {Object} api - Cannon.js physics body API for velocity control (required)
 * @param {Array<number>} playerPosition - Current [x, y, z] coordinates from physics subscription (required)
 * @param {string} gameState - Current game state ('playing', 'menu', etc.) for movement gating (required)
 * @param {Function} handleGameOver - Callback function triggered when player exits world bounds (required)
 * @param {number} playerSpeed - Movement speed in units/second (optional, defaults to gameConfig.player.speed)
 * @param {Object} worldBounds - World boundary object with minX, maxX, minZ, maxZ (optional, defaults to gameConfig.world.bounds)
 *
 * 🎯 HOOK RESPONSIBILITIES:
 * - Process keyboard input from useKeyControls for directional movement
 * - Apply Kinematic movement using cannon.js velocity control (code-controlled, not physics)
 * - Ensure frame-rate independent movement using delta time calculations
 * - Enforce world boundaries and trigger game over on violation
 * - Gate movement processing to only occur during active gameplay
 *
 * 🎮 MOVEMENT MECHANICS:
 * - Forward/Backward: Z-axis movement (negative Z is forward)
 * - Left/Right: X-axis movement (negative X is left)
 * - No Y-axis movement (top-down 2D movement in 3D space)
 * - Diagonal movement is faster (no speed normalization)
 * - Instant velocity changes (no acceleration/deceleration)
 *
 */
export const usePlayerMovement = (api, playerPosition, gameState, handleGameOver, playerSpeed = gameConfig.player.speed, worldBounds = gameConfig.world.bounds) => {
  // 🎮 INPUT STATE - Get current input states from useKeyControls (works with keyboard AND mobile)
  const { forward, backward, left, right } = useKeyControls();

  /**
   * 🎬 MOVEMENT FRAME LOOP - Process movement every animation frame
   * ==============================================================
   * 
   * @description Runs every frame to process player movement based on input and physics
   * @param {Object} _ - Three.js frame state (unused)
   * @param {number} delta - Time elapsed since last frame in seconds
   * @effects:
   * - Checks game state and exits early if not playing
   * - Calculates frame-rate independent movement speed
   * - Processes keyboard input to determine new position
   * - Enforces world boundaries and triggers game over if violated
   * - Applies calculated velocity to physics body for smooth movement
   */
  useFrame((_, delta) => {
    // 🚫 GAME STATE GATING - Only process movement during active gameplay
    if (gameState !== GAME_STATES.PLAYING) return;

    // ⏱️ FRAME-RATE INDEPENDENCE - Calculate movement distance based on time elapsed
    const moveSpeed = playerSpeed * delta;
    
    // 📍 CURRENT POSITION - Get starting coordinates for movement calculation
    let x = playerPosition[0];  // Current X coordinate (left/right)
    let z = playerPosition[2];  // Current Z coordinate (forward/backward)

    // 🎯 INPUT PROCESSING - Apply movement based on keyboard input
    if (forward) z -= moveSpeed;   // Move forward (negative Z direction)
    if (backward) z += moveSpeed;  // Move backward (positive Z direction)
    if (left) x -= moveSpeed;      // Move left (negative X direction)
    if (right) x += moveSpeed;     // Move right (positive X direction)

    // 🚧 BOUNDARY ENFORCEMENT - Check if new position is within world limits
    if (x < worldBounds.minX || x > worldBounds.maxX || z < worldBounds.minZ || z > worldBounds.maxZ) {
      // ☠️ BOUNDARY VIOLATION - Trigger game over when player exits world
      handleGameOver();
      return; // Exit early to prevent further processing
    }
    
    // 🏃‍♂️ VELOCITY CALCULATION - Convert position change to velocity for physics
    const velX = (x - playerPosition[0]) / delta;  // X velocity (units/second)
    const velZ = (z - playerPosition[2]) / delta;  // Z velocity (units/second)
    
    // ⚡ PHYSICS APPLICATION - Apply calculated velocity to cannon.js body
    api.velocity.set(velX, 0, velZ);  // Y velocity always 0 for top-down movement
  });
};
