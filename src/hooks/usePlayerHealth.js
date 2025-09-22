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
