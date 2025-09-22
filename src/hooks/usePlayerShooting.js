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


import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { GAME_STATES } from "../config/gameConfig";
import { useKeyControls } from "../hooks/useKeyControls";

/**
 * 🔫 USE PLAYER SHOOTING HOOK - Space Key Shooting with Fire Rate Control
 * ======================================================================
 *
 * @description Handles all player shooting mechanics using keyboard input and fire rate limiting
 * @param {Array<number>} playerPosition - Current [x, y, z] coordinates for projectile spawn location (required)
 * @param {number} playerRotation - Current rotation angle in radians for projectile direction (required)
 * @param {string} gameState - Current game state ('playing', 'menu', etc.) for shooting gating (required)
 * @param {Object} projectileType - Weapon configuration object with speed, damage, size, color, fireRate (required)
 * @param {Function} onShoot - Callback function to spawn projectiles in game world (required)
 * @param {number} fireRateMultiplier - Multiplier for projectile fire rate (optional, defaults to 1.0)
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
export const usePlayerShooting = (playerPosition, playerRotation, gameState, projectileType, onShoot, fireRateMultiplier = 1.0) => {
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
    const fireRate = projectileType.fireRate * fireRateMultiplier;
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
