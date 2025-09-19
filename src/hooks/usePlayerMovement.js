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
// 🎭 MOVEMENT PROCESSING PIPELINE:
// 1. useKeyControls provides boolean states for directional keys (forward, backward, left, right)
// 2. useFrame hook runs every animation frame with delta time
// 3. Game state checked - movement only allowed during GAME_STATES.PLAYING
// 4. Movement speed calculated using playerSpeed * delta for frame-rate independence
// 5. New position calculated by adding movement vectors to current position
// 6. World boundary collision detection checks if new position is within bounds
// 7. If out of bounds: handleGameOver callback triggered (game ends)
// 8. If in bounds: velocity calculated and applied to physics body via api.velocity.set()
//
// 🎨 COORDINATE SYSTEM:
// - X-axis: Left (-) to Right (+) movement
// - Y-axis: Down (-) to Up (+) - not used for top-down movement
// - Z-axis: Forward (-) to Backward (+) movement (negative Z is "forward")
// - World bounds: minX, maxX, minZ, maxZ define playable area
//
// 🏃‍♂️ CURRENT USAGE IN CODEBASE:
// ============================================================================
//
// ✅ CURRENTLY USED BY: Player component
// ```javascript
// // In Player.jsx:
// usePlayerMovement(
//   api,                           // Physics body API
//   playerPosition,                // Current position
//   gameState,                     // Game state for movement gating
//   () => setGameState("gameOver"), // Boundary violation callback
//   playerSpeed,                   // Movement speed from settings
//   worldBounds                    // World boundaries for collision
// );
// ```
//
// ✅ CURRENTLY USES: useKeyControls hook
// ```javascript
// // In this hook:
// const { forward, backward, left, right } = useKeyControls();
// ```
//
// ⚠️ IMPORTANT NOTES:
// - Hook uses useFrame from @react-three/fiber (runs every animation frame)
// - Movement is frame-rate independent using delta time calculations
// - Physics body type should be "Kinematic" for code-controlled movement
// - Boundary checking triggers immediate game over (no collision response)
// - Y-axis movement not implemented (top-down 2D movement in 3D space)
// - Diagonal movement is NOT speed-normalized (moving diagonally is faster)
//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASES:
// ============================================================================
//
// 📝 ADD DIAGONAL MOVEMENT NORMALIZATION:
// ```javascript
// // After calculating x and z movement:
// const moveLength = Math.sqrt(x * x + z * z);
// if (moveLength > 0) {
//   const normalizedX = (x / moveLength) * moveSpeed;
//   const normalizedZ = (z / moveLength) * moveSpeed;
//   x = playerPosition[0] + normalizedX;
//   z = playerPosition[2] + normalizedZ;
// }
// ```
//
// 🎮 ADD MOVEMENT ACCELERATION:
// ```javascript
// const [velocity, setVelocity] = useState({ x: 0, z: 0 });
// const acceleration = 10; // units/second²
// const maxSpeed = playerSpeed;
// const friction = 8; // deceleration when no input
//
// // Apply acceleration based on input
// let targetVelX = 0, targetVelZ = 0;
// if (forward) targetVelZ = -maxSpeed;
// if (backward) targetVelZ = maxSpeed;
// if (left) targetVelX = -maxSpeed;
// if (right) targetVelX = maxSpeed;
//
// // Smooth velocity interpolation
// const newVelX = velocity.x + (targetVelX - velocity.x) * acceleration * delta;
// const newVelZ = velocity.z + (targetVelZ - velocity.z) * acceleration * delta;
//
// setVelocity({ x: newVelX, z: newVelZ });
// api.velocity.set(newVelX, 0, newVelZ);
// ```
//
// 🎨 ADD WALL SLIDING:
// ```javascript
// // Instead of game over on boundary hit:
// let newX = x, newZ = z;
//
// // Clamp to boundaries instead of triggering game over
// if (newX < worldBounds.minX) newX = worldBounds.minX;
// if (newX > worldBounds.maxX) newX = worldBounds.maxX;
// if (newZ < worldBounds.minZ) newZ = worldBounds.minZ;
// if (newZ > worldBounds.maxZ) newZ = worldBounds.maxZ;
//
// const velX = (newX - playerPosition[0]) / delta;
// const velZ = (newZ - playerPosition[2]) / delta;
// api.velocity.set(velX, 0, velZ);
// ```
//
// 📱 ADD MOBILE TOUCH SUPPORT:
// ```javascript
// import { useTouchControls } from './useTouchControls'; // Custom hook
//
// export const usePlayerMovement = (...params) => {
//   const { forward, backward, left, right } = useKeyControls();
//   const { touchForward, touchBackward, touchLeft, touchRight } = useTouchControls();
//
//   // Combine keyboard and touch inputs
//   const isForward = forward || touchForward;
//   const isBackward = backward || touchBackward;
//   const isLeft = left || touchLeft;
//   const isRight = right || touchRight;
//
//   // Use combined inputs in movement logic
// };
// ```
//
// 🔊 ADD MOVEMENT AUDIO:
// ```javascript
// import { playSound, stopSound } from '../utils/audioManager';
//
// useFrame((_, delta) => {
//   // ... existing movement logic ...
//
//   // Play footstep sounds when moving
//   const isMoving = forward || backward || left || right;
//   if (isMoving && gameState === GAME_STATES.PLAYING) {
//     playSound('footsteps', { loop: true, volume: 0.3 });
//   } else {
//     stopSound('footsteps');
//   }
// });
// ```
//
// 🎯 ADD MOVEMENT ZONES:
// ```javascript
// const checkMovementZone = (x, z) => {
//   // Different movement speeds in different areas
//   if (x > 10 && x < 20 && z > 5 && z < 15) {
//     return playerSpeed * 0.5; // Slow zone
//   }
//   if (x > -10 && x < -5) {
//     return playerSpeed * 1.5; // Fast zone
//   }
//   return playerSpeed; // Normal speed
// };
//
// useFrame((_, delta) => {
//   // ... game state check ...
//   
//   const currentSpeed = checkMovementZone(playerPosition[0], playerPosition[2]);
//   const moveSpeed = currentSpeed * delta;
//   
//   // ... rest of movement logic ...
// });
// ```
// ============================================================================

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
 * 🚀 CURRENT USAGE:
 * - Player Component: Main character movement control
 * - Input Source: useKeyControls hook for WASD/arrow key states
 * - Physics Integration: Cannon.js Kinematic body for smooth movement (code-controlled)
 * - Boundary System: World bounds checking with game over trigger
 *
 * 🔮 POTENTIAL ENHANCEMENTS:
 * - Diagonal movement speed normalization
 * - Movement acceleration and deceleration
 * - Wall sliding instead of hard boundary stops
 * - Movement zones with different speeds
 * - Audio feedback for footsteps and movement
 */
export const usePlayerMovement = (api, playerPosition, gameState, handleGameOver, playerSpeed = gameConfig.player.speed, worldBounds = gameConfig.world.bounds) => {
  // 🎮 INPUT STATE - Get current keyboard input states from useKeyControls
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
