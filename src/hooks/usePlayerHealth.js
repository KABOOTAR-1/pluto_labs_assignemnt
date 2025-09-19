// ============================================================================
// ❤️ USE PLAYER HEALTH HOOK - Health Management and Damage System
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS HOOK:
// ✅ This handles player health management and damage processing for combat system
// ✅ Attaches takeDamage function to physics mesh ref for collision-based damage
// ✅ Currently used by Player component for health and game over mechanics
// ✅ Integrates with enemy attack systems through mesh function attachment
// ✅ Provides callback-based health updates and game over detection
//
// 📊 WHAT USEPLAYERHEALTH ACTUALLY DOES:
// - Damage processing: creates takeDamage function for health reduction calculations
// - Health validation: checks for game over conditions when health reaches zero
// - Callback integration: invokes onHealthChange and onGameOver callbacks for state updates
// - Mesh attachment: attaches takeDamage function to physics mesh ref for enemy access
// - Game over detection: automatically triggers game over when health drops to zero or below
//
// 📊 WHAT USEPLAYERHEALTH DOES NOT DO (happens elsewhere):
// - Health rendering: handled by HealthBar UI component
// - Damage detection: handled by enemy attack systems and collision detection
// - Health regeneration: not implemented (could be added)
// - Physics body creation: done in Player component with useBox from @react-three/cannon
// - Health settings: managed by settings atoms and configuration systems
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎯 HEALTH SYSTEM MODIFICATIONS:
// Since usePlayerHealth controls player survival, customization affects gameplay difficulty and mechanics:
//
// 📝 HEALTH MECHANICS ADJUSTMENTS:
// - Add health regeneration over time or with pickups
// - Implement damage reduction or armor systems
// - Add invincibility frames after taking damage
// - Include different damage types (fire, poison, etc.) with different effects
//
// 🎭 DAMAGE ENHANCEMENTS:
// - Add damage indicators or screen effects when taking damage
// - Implement critical hit detection with increased damage
// - Add damage over time effects (bleeding, poison, etc.)
// - Include damage mitigation based on player equipment or abilities
//
// 🔄 STATE MANAGEMENT:
// - ref: React ref to physics mesh for function attachment (required)
// - playerHealth: Current health value for damage calculations (required)
// - onHealthChange: Callback function to update health state (required)
// - onGameOver: Callback function to trigger game over state (required)
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/components/Player.jsx: Currently USES this hook for health management
// - src/hooks/useEnemyAttack.js: Calls takeDamage function attached to player mesh
// - src/components/ui/HealthBar.jsx: Displays current health value
// - src/config/atoms/playerAtoms.js: Manages health state atoms
// - src/config/gameConfig.js: Defines base health values and settings
//
// 🎭 HEALTH PROCESSING PIPELINE:
// 1. Enemy attack systems detect collision with player physics body
// 2. Enemy calls ref.current.takeDamage(damageAmount) on player mesh
// 3. takeDamage function calculates new health value (current - damage)
// 4. onHealthChange callback invoked to update health atom state
// 5. Health validation checks if new health is zero or below
// 6. If health <= 0: onGameOver callback invoked to trigger game over state
// 7. Health UI components automatically update from atom state changes
//
// 🎨 DAMAGE CALCULATION:
// - Simple Subtraction: newHealth = currentHealth - damageAmount
// - No Damage Mitigation: Full damage applied (could be extended)
// - Integer Health: No fractional health values
// - Immediate Effect: Damage applied instantly (no damage over time)
//
// ❤️ CURRENT USAGE IN CODEBASE:
// ============================================================================
//
// ✅ CURRENTLY USED BY: Player component
// ```javascript
// // In Player.jsx:
// usePlayerHealth(
//   ref,                           // Physics body ref for function attachment
//   playerHealth,                  // Current health value
//   (h) => setPlayerHealth(h),     // Health update callback
//   () => setGameState("gameOver") // Game over callback
// );
// ```
//
// ✅ FUNCTION ATTACHMENT: takeDamage attached to physics mesh ref
// ```javascript
// // In this hook:
// if (ref?.current) {
//   ref.current.takeDamage = takeDamage; // Attach function to mesh for enemy access
// }
// ```
//
// ✅ USED BY ENEMIES: Enemy attack systems call takeDamage function
// ```javascript
// // In useEnemyAttack.js:
// if (playerRef?.current?.takeDamage) {
//   playerRef.current.takeDamage(damage); // Deal damage to player
// }
// ```
//
// ⚠️ IMPORTANT NOTES:
// - Hook attaches takeDamage function directly to physics mesh ref
// - Function attachment happens every render (could be optimized with useCallback)
// - Health validation triggers immediate game over on zero health
// - No damage mitigation or armor system implemented
// - No invincibility frames or damage cooldown system
// - Damage is applied instantly without animation or delay
//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASES:
// ============================================================================
//
// 📝 ADD HEALTH REGENERATION:
// ```javascript
// import { useEffect } from 'react';
//
// export const usePlayerHealth = (ref, playerHealth, onHealthChange, onGameOver, maxHealth = 100, regenRate = 1) => {
//   const takeDamage = (amount) => {
//     const newHealth = Math.max(0, playerHealth - amount);
//     onHealthChange(newHealth);
//     if (newHealth <= 0) onGameOver();
//   };
//
//   // Health regeneration over time
//   useEffect(() => {
//     if (playerHealth > 0 && playerHealth < maxHealth) {
//       const regenInterval = setInterval(() => {
//         onHealthChange(prev => Math.min(maxHealth, prev + regenRate));
//       }, 1000); // Regenerate every second
//       
//       return () => clearInterval(regenInterval);
//     }
//   }, [playerHealth, maxHealth, regenRate, onHealthChange]);
//
//   if (ref?.current) {
//     ref.current.takeDamage = takeDamage;
//   }
// };
// ```
//
// 🎮 ADD INVINCIBILITY FRAMES:
// ```javascript
// import { useRef } from 'react';
//
// export const usePlayerHealth = (ref, playerHealth, onHealthChange, onGameOver, invincibilityTime = 1000) => {
//   const lastDamageTime = useRef(0);
//
//   const takeDamage = (amount) => {
//     const now = Date.now();
//     
//     // Check invincibility frames
//     if (now - lastDamageTime.current < invincibilityTime) {
//       return; // Still invincible, ignore damage
//     }
//     
//     lastDamageTime.current = now;
//     const newHealth = Math.max(0, playerHealth - amount);
//     onHealthChange(newHealth);
//     if (newHealth <= 0) onGameOver();
//   };
//
//   if (ref?.current) {
//     ref.current.takeDamage = takeDamage;
//     ref.current.isInvincible = () => Date.now() - lastDamageTime.current < invincibilityTime;
//   }
// };
// ```
//
// 🎨 ADD DAMAGE EFFECTS:
// ```javascript
// import { playSound, showDamageEffect } from '../utils/gameEffects';
//
// export const usePlayerHealth = (ref, playerHealth, onHealthChange, onGameOver) => {
//   const takeDamage = (amount, damageType = 'normal') => {
//     const newHealth = Math.max(0, playerHealth - amount);
//     
//     // Visual and audio effects
//     playSound('playerHurt', { volume: 0.5 });
//     showDamageEffect(amount, damageType);
//     
//     // Screen shake for significant damage
//     if (amount >= 20) {
//       // Trigger camera shake (would need camera shake system)
//     }
//     
//     onHealthChange(newHealth);
//     if (newHealth <= 0) {
//       playSound('playerDeath', { volume: 0.8 });
//       onGameOver();
//     }
//   };
//
//   if (ref?.current) {
//     ref.current.takeDamage = takeDamage;
//   }
// };
// ```
//
// 📱 ADD ARMOR SYSTEM:
// ```javascript
// export const usePlayerHealth = (ref, playerHealth, onHealthChange, onGameOver, armor = 0) => {
//   const takeDamage = (amount, damageType = 'physical') => {
//     let finalDamage = amount;
//     
//     // Apply armor reduction for physical damage
//     if (damageType === 'physical') {
//       finalDamage = Math.max(1, amount - armor); // Minimum 1 damage
//     }
//     
//     const newHealth = Math.max(0, playerHealth - finalDamage);
//     onHealthChange(newHealth);
//     if (newHealth <= 0) onGameOver();
//   };
//
//   if (ref?.current) {
//     ref.current.takeDamage = takeDamage;
//   }
// };
// ```
//
// 🔊 ADD DAMAGE VALIDATION:
// ```javascript
// export const usePlayerHealth = (ref, playerHealth, onHealthChange, onGameOver) => {
//   const takeDamage = (amount) => {
//     // Validate damage amount
//     if (typeof amount !== 'number' || amount < 0) {
//       console.warn('Invalid damage amount:', amount);
//       return;
//     }
//     
//     // Validate current health
//     if (playerHealth <= 0) {
//       console.warn('Player already dead, ignoring damage');
//       return;
//     }
//     
//     const newHealth = Math.max(0, playerHealth - amount);
//     onHealthChange(newHealth);
//     if (newHealth <= 0) onGameOver();
//   };
//
//   if (ref?.current) {
//     ref.current.takeDamage = takeDamage;
//   }
// };
// ```
//
// 🎯 ADD DAMAGE HISTORY TRACKING:
// ```javascript
// import { useRef } from 'react';
//
// export const usePlayerHealth = (ref, playerHealth, onHealthChange, onGameOver) => {
//   const damageHistory = useRef([]);
//
//   const takeDamage = (amount, source = 'unknown') => {
//     // Track damage for analytics
//     damageHistory.current.push({
//       amount,
//       source,
//       timestamp: Date.now(),
//       healthBefore: playerHealth,
//       healthAfter: Math.max(0, playerHealth - amount)
//     });
//     
//     // Keep only recent damage history (last 10 hits)
//     if (damageHistory.current.length > 10) {
//       damageHistory.current.shift();
//     }
//     
//     const newHealth = Math.max(0, playerHealth - amount);
//     onHealthChange(newHealth);
//     if (newHealth <= 0) onGameOver();
//   };
//
//   if (ref?.current) {
//     ref.current.takeDamage = takeDamage;
//     ref.current.getDamageHistory = () => [...damageHistory.current]; // Expose for debugging
//   }
// };
// ```
// ============================================================================

/**
 * ❤️ USE PLAYER HEALTH HOOK - Health Management and Damage System
 * ==============================================================
 *
 * @description Handles player health management and damage processing for combat system
 * @param {Object} ref - React ref to physics mesh for function attachment (required)
 * @param {number} playerHealth - Current health value for damage calculations (required)
 * @param {Function} onHealthChange - Callback function to update health state (required)
 * @param {Function} onGameOver - Callback function to trigger game over state (required)
 *
 * 🎯 HOOK RESPONSIBILITIES:
 * - Create takeDamage function for health reduction and game over detection
 * - Attach takeDamage function to physics mesh ref for enemy access
 * - Validate health values and trigger game over when health reaches zero
 * - Invoke callbacks for health updates and game state changes
 * - Provide direct damage interface for collision-based combat system
 *
 * ❤️ HEALTH MECHANICS:
 * - Damage: Simple subtraction (newHealth = current - damage)
 * - Game Over: Triggered when health drops to zero or below
 * - Instant Effect: Damage applied immediately with no delay
 * - No Mitigation: Full damage applied (no armor or resistance)
 * - Callback Integration: Health changes propagated via callback system
 *
 * 🚀 CURRENT USAGE:
 * - Player Component: Main character health management
 * - Enemy Integration: takeDamage function called by enemy attack systems
 * - Mesh Attachment: Function attached to physics body ref for collision access
 * - State Management: Health updates propagated through callback system
 *
 * 🔮 POTENTIAL ENHANCEMENTS:
 * - Health regeneration over time
 * - Invincibility frames after damage
 * - Armor and damage mitigation systems
 * - Visual and audio damage effects
 * - Damage history tracking and analytics
 */
export const usePlayerHealth = (ref, playerHealth, onHealthChange, onGameOver) => {
  /**
   * 💥 DAMAGE PROCESSING FUNCTION - Handle player damage and health reduction
   * ========================================================================
   * 
   * @param {number} amount - Damage amount to subtract from current health
   * @description Processes damage dealt to player and handles game over conditions
   * @effects:
   * - Calculates new health value by subtracting damage from current health
   * - Invokes onHealthChange callback to update health state
   * - Checks for game over condition and triggers onGameOver callback if health <= 0
   * - Applied instantly with no damage mitigation or delay
   */
  const takeDamage = (amount) => {
    // 🧮 DAMAGE CALCULATION - Simple subtraction with no mitigation
    const newHealth = playerHealth - amount;
    
    // 📡 HEALTH UPDATE - Invoke callback to update health state
    onHealthChange(newHealth);
    
    // ☠️ GAME OVER CHECK - Trigger game over if health drops to zero or below
    if (newHealth <= 0) onGameOver();
  };

  // 🔗 FUNCTION ATTACHMENT - Attach takeDamage to physics mesh ref for enemy access
  if (ref?.current) {
    ref.current.takeDamage = takeDamage;
  }
};
