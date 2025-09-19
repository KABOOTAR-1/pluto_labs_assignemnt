// ============================================================================
// 🔫 USE PLAYER SHOOTING HOOK - Space Key Shooting with Fire Rate Control
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS HOOK:
// ✅ This handles all player shooting mechanics using keyboard input and fire rate limiting
// ✅ Integrates with useKeyControls for space bar input processing
// ✅ Currently used by Player component for projectile spawning control
// ✅ Includes fire rate limiting to prevent spam shooting
// ✅ Creates projectile data objects for spawning via callback
//
// 📊 WHAT USEPLAYERSHOOTING ACTUALLY DOES:
// - Input processing: reads space bar state from useKeyControls hook
// - Fire rate limiting: prevents shooting faster than configured rate using timestamps
// - Projectile data creation: builds complete projectile objects with position, direction, stats
// - Direction calculation: uses player rotation to determine projectile trajectory
// - Callback invocation: calls onShoot with projectile data for spawning
//
// 📊 WHAT USEPLAYERSHOOTING DOES NOT DO (happens elsewhere):
// - Keyboard input detection: handled by useKeyControls hook (CURRENTLY USES THIS HOOK)
// - Projectile physics: handled by BaseProjectile component (uses Kinematic bodies)
// - Projectile rendering: handled by Bullet/BaseProjectile components
// - Projectile collision: handled by Projectiles component with manual detection
// - Weapon switching: basic foundation exists but not fully implemented
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎯 SHOOTING SYSTEM MODIFICATIONS:
// Since usePlayerShooting controls projectile creation, customization affects combat mechanics:
//
// 📝 SHOOTING MECHANICS ADJUSTMENTS:
// - Modify fire rate calculation (burst fire, charge shots, cooldowns)
// - Add different shooting patterns (spread shots, aimed shots, auto fire)
// - Implement weapon recoil or accuracy degradation over time
// - Add ammunition system with reload mechanics
//
// 🎭 PROJECTILE ENHANCEMENTS:
// - Create multiple projectiles per shot (shotgun spread, multi-shot)
// - Add projectile inheritance from player velocity (moving while shooting)
// - Implement different projectile types based on weapon mode
// - Add projectile physics variations (arc shots, homing projectiles)
//
// 🔄 STATE MANAGEMENT:
// - playerPosition: Current [x, y, z] coordinates for projectile spawn location (required)
// - playerRotation: Current rotation angle in radians for projectile direction (required)
// - gameState: Current game state string ('playing', 'menu', etc.) for shooting gating (required)
// - projectileType: Weapon configuration object with speed, damage, size, color (required)
// - onShoot: Callback function to spawn projectiles in game world (required)
// - fireRate: Shots per second rate limiting (optional, defaults to gameConfig.player.fireRate)
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/hooks/useKeyControls.js: Currently USED for space bar input (space state)
// - src/components/Player.jsx: Currently USES this hook for shooting control
// - src/components/Projectiles.jsx: Receives projectile data via onShoot callback
// - src/components/projectiles/BaseProjectile.jsx: Renders individual projectiles with Kinematic bodies
// - src/data/projectileTypes.js: Defines weapon configurations and stats
// - src/config/gameConfig.js: Provides default fireRate setting
//
// 🎭 SHOOTING PROCESSING PIPELINE:
// 1. useKeyControls provides boolean state for space bar (space key pressed/released)
// 2. useFrame hook runs every animation frame to check shooting conditions
// 3. Game state checked - shooting only allowed during GAME_STATES.PLAYING
// 4. Space bar state checked - shooting only when space is pressed
// 5. Fire rate limiting checked using timestamps (prevents spam shooting)
// 6. Projectile direction calculated using Math.sin/cos of player rotation angle
// 7. Projectile data object created with position, direction, and weapon stats
// 8. onShoot callback invoked with projectile data for spawning in game world
// 9. Last shot timestamp updated to enforce fire rate limiting
//
// 🎨 PROJECTILE DATA STRUCTURE:
// ```javascript
// const projectileData = {
//   type: projectileType.id,           // Weapon type identifier
//   position: [...playerPosition],    // Spawn location [x, y, z]
//   direction: [Math.sin(rotation), 0, Math.cos(rotation)], // Movement vector
//   speed: projectileType.speed,      // Travel speed
//   size: projectileType.size,        // Collision radius
//   damage: projectileType.damage,    // Damage dealt to enemies
//   color: projectileType.color       // Visual color
// };
// ```
//
// 🔫 CURRENT USAGE IN CODEBASE:
// ============================================================================
//
// ✅ CURRENTLY USED BY: Player component
// ```javascript
// // In Player.jsx:
// usePlayerShooting(
//   playerPosition,                    // Current position for projectile spawn
//   playerRotation,                    // Current rotation for projectile direction
//   gameState,                         // Game state for shooting gating
//   selectedProjectileType,            // Current weapon configuration
//   onShoot,                           // Callback to spawn projectiles
//   playerFireRate                     // Fire rate from settings
// );
// ```
//
// ✅ CURRENTLY USES: useKeyControls hook
// ```javascript
// // In this hook:
// const { space } = useKeyControls();
// ```
//
// ✅ PROJECTILES USE KINEMATIC BODIES: BaseProjectile creates Kinematic physics bodies
// ```javascript
// // In BaseProjectile.jsx:
// const [ref, api] = useSphere(() => ({
//   mass, // Unused for Kinematic bodies
//   type: 'Kinematic', // Code-controlled movement, not physics simulation
//   // ...
// }));
// ```
//
// ⚠️ IMPORTANT NOTES:
// - Hook uses useFrame from @react-three/fiber (runs every animation frame)
// - Fire rate limiting uses Date.now() timestamps for precise timing control
// - Projectiles use Kinematic physics bodies (code-controlled, not physics simulation)
// - Direction calculation assumes standard rotation where 0 radians faces positive Z
// - Weapon switching foundation exists but inventory management not implemented
// - Space bar is currently the only shooting input (could be extended to mouse clicks)
//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASES:
// ============================================================================
//
// 📝 ADD MOUSE CLICK SHOOTING:
// ```javascript
// import { useMouseControls } from './useMouseControls';
//
// export const usePlayerShooting = (...params) => {
//   const { space } = useKeyControls();
//   const { isMouseDown } = useMouseControls();
//   
//   // Combine keyboard and mouse inputs
//   const isShooting = space || isMouseDown;
//   
//   useFrame(() => {
//     if (gameState !== GAME_STATES.PLAYING || !isShooting) return;
//     // ... rest of shooting logic
//   });
// };
// ```
//
// 🎮 ADD BURST FIRE MODE:
// ```javascript
// const [burstCount, setBurstCount] = useState(0);
// const [burstCooldown, setBurstCooldown] = useState(0);
// const BURST_SIZE = 3;
// const BURST_DELAY = 100; // ms between burst shots
// const BURST_COOLDOWN = 500; // ms between bursts
//
// useFrame(() => {
//   const now = Date.now();
//   
//   if (burstCooldown > 0 && now < burstCooldown) return;
//   
//   if (space && burstCount < BURST_SIZE) {
//     if (now - lastShot.current > BURST_DELAY) {
//       // Fire shot
//       onShoot(projectileData);
//       setBurstCount(prev => prev + 1);
//       lastShot.current = now;
//       
//       if (burstCount + 1 >= BURST_SIZE) {
//         setBurstCooldown(now + BURST_COOLDOWN);
//         setBurstCount(0);
//       }
//     }
//   }
// });
// ```
//
// 🎨 ADD SHOTGUN SPREAD:
// ```javascript
// const createSpreadShots = (centerDirection, spreadAngle, pelletCount) => {
//   const shots = [];
//   for (let i = 0; i < pelletCount; i++) {
//     const angle = (i / (pelletCount - 1) - 0.5) * spreadAngle;
//     const direction = [
//       Math.sin(playerRotation + angle),
//       0,
//       Math.cos(playerRotation + angle)
//     ];
//     shots.push({
//       ...projectileData,
//       direction,
//       damage: projectileData.damage / pelletCount // Spread damage
//     });
//   }
//   return shots;
// };
//
// // In shooting logic:
// const spreadShots = createSpreadShots(baseDirection, Math.PI / 6, 5);
// spreadShots.forEach(shot => onShoot(shot));
// ```
//
// 📱 ADD CHARGE SHOT SYSTEM:
// ```javascript
// const [chargeStartTime, setChargeStartTime] = useState(0);
// const [isCharging, setIsCharging] = useState(false);
//
// useFrame(() => {
//   if (space && !isCharging) {
//     setIsCharging(true);
//     setChargeStartTime(Date.now());
//   } else if (!space && isCharging) {
//     const chargeTime = Date.now() - chargeStartTime;
//     const chargeMultiplier = Math.min(chargeTime / 1000, 3); // Max 3x charge
//     
//     const chargedProjectile = {
//       ...projectileData,
//       damage: projectileData.damage * chargeMultiplier,
//       size: projectileData.size * (1 + chargeMultiplier * 0.5),
//       speed: projectileData.speed * (1 + chargeMultiplier * 0.3)
//     };
//     
//     onShoot(chargedProjectile);
//     setIsCharging(false);
//   }
// });
// ```
//
// 🔊 ADD SHOOTING AUDIO:
// ```javascript
// import { playSound } from '../utils/audioManager';
//
// // In shooting logic after onShoot:
// onShoot(projectileData);
// playSound('gunshot', { 
//   volume: 0.4,
//   pitch: 0.8 + Math.random() * 0.4 // Random pitch variation
// });
// lastShot.current = now;
// ```
//
// 🎯 ADD AMMUNITION SYSTEM:
// ```javascript
// import { useAtom } from 'jotai';
// import { currentAmmoAtom, maxAmmoAtom } from '../config/atoms';
//
// export const usePlayerShooting = (...params) => {
//   const [currentAmmo, setCurrentAmmo] = useAtom(currentAmmoAtom);
//   const [maxAmmo] = useAtom(maxAmmoAtom);
//   
//   useFrame(() => {
//     if (gameState !== GAME_STATES.PLAYING || !space || currentAmmo <= 0) return;
//     
//     // ... fire rate check ...
//     
//     if (now - lastShot.current > fireDelay) {
//       onShoot(projectileData);
//       setCurrentAmmo(prev => Math.max(0, prev - 1));
//       lastShot.current = now;
//     }
//   });
// };
// ```
// ============================================================================

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { gameConfig, GAME_STATES } from "../config/gameConfig";
import { useKeyControls } from "../hooks/useKeyControls";

/**
 * 🔫 USE PLAYER SHOOTING HOOK - Space Key Shooting with Fire Rate Control
 * ======================================================================
 *
 * @description Handles all player shooting mechanics using keyboard input and fire rate limiting
 * @param {Array<number>} playerPosition - Current [x, y, z] coordinates for projectile spawn location (required)
 * @param {number} playerRotation - Current rotation angle in radians for projectile direction (required)
 * @param {string} gameState - Current game state ('playing', 'menu', etc.) for shooting gating (required)
 * @param {Object} projectileType - Weapon configuration object with speed, damage, size, color (required)
 * @param {Function} onShoot - Callback function to spawn projectiles in game world (required)
 * @param {number} fireRate - Shots per second rate limiting (optional, defaults to gameConfig.player.fireRate)
 *
 * 🎯 HOOK RESPONSIBILITIES:
 * - Process space bar input from useKeyControls for shooting trigger
 * - Apply fire rate limiting using timestamps to prevent spam shooting
 * - Calculate projectile direction based on player rotation angle
 * - Create complete projectile data objects with position, direction, and weapon stats
 * - Invoke callback to spawn projectiles with Kinematic physics bodies
 *
 * 🔫 SHOOTING MECHANICS:
 * - Input: Space bar for shooting trigger (could be extended to mouse)
 * - Fire Rate: Timestamp-based limiting (shots per second)
 * - Direction: Calculated using Math.sin/cos of player rotation
 * - Projectiles: Spawn with Kinematic bodies (code-controlled movement)
 * - No ammunition system (unlimited ammo currently)
 *
 * 🚀 CURRENT USAGE:
 * - Player Component: Main character shooting control
 * - Input Source: useKeyControls hook for space bar state
 * - Projectile Creation: Creates data objects for Kinematic projectile spawning
 * - Fire Rate Control: Settings-based rate limiting system
 *
 * 🔮 POTENTIAL ENHANCEMENTS:
 * - Mouse click shooting support
 * - Burst fire and charge shot modes
 * - Shotgun spread patterns
 * - Ammunition and reload systems
 * - Audio feedback integration
 */
export const usePlayerShooting = (playerPosition, playerRotation, gameState, projectileType, onShoot, fireRate = gameConfig.player.fireRate) => {
  // 🎮 INPUT STATE - Get current space bar state from useKeyControls
  const { space } = useKeyControls();

  // ⏱️ FIRE RATE LIMITING - Track last shot timestamp to enforce rate limiting
  const lastShot = useRef(0);

  /**
   * 🎬 SHOOTING FRAME LOOP - Process shooting every animation frame
   * =============================================================
   * 
   * @description Runs every frame to check shooting conditions and spawn projectiles
   * @effects:
   * - Checks game state and space bar input for shooting conditions
   * - Enforces fire rate limiting using timestamp comparison
   * - Calculates projectile direction based on player rotation
   * - Creates complete projectile data object with all necessary properties
   * - Invokes onShoot callback to spawn projectile with Kinematic physics body
   * - Updates last shot timestamp for next fire rate check
   */
  useFrame(() => {
    // 🚫 SHOOTING GATING - Only allow shooting during active gameplay with space pressed
    if (gameState !== GAME_STATES.PLAYING || !space) return;

    // ⏰ TIMESTAMP CHECKING - Get current time for fire rate calculations
    const now = Date.now();
    const fireDelay = 1000 / fireRate; // Convert shots/second to milliseconds between shots

    // 🔫 FIRE RATE ENFORCEMENT - Check if enough time has passed since last shot
    if (now - lastShot.current > fireDelay) {
      // 🎯 PROJECTILE DATA CREATION - Build complete projectile object for spawning
      const projectileData = {
        type: projectileType.id,                                    // Weapon type identifier
        position: [...playerPosition],                              // Spawn location (copy to avoid reference issues)
        direction: [Math.sin(playerRotation), 0, Math.cos(playerRotation)], // Movement vector based on player facing
        speed: projectileType.speed,                                // Travel speed from weapon config
        size: projectileType.size,                                  // Collision radius from weapon config
        damage: projectileType.damage,                              // Damage dealt to enemies from weapon config
        color: projectileType.color,                                // Visual color from weapon config
      };

      // 🚀 PROJECTILE SPAWNING - Invoke callback to create projectile with Kinematic body
      onShoot(projectileData);
      
      // 📝 TIMESTAMP UPDATE - Record shot time for fire rate limiting
      lastShot.current = now;
    }
  });
};
