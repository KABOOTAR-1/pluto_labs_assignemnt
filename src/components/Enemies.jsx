// ============================================================================
// 👹 ENEMIES COMPONENT - Enemy Management and Rendering System
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is the main enemy management system that renders all active enemies
// ✅ Handles enemy-to-player damage interactions and game over conditions
// ✅ Manages enemy lifecycle (spawning, updating, removal) via object pooling
// ✅ Supports multiple enemy types with theme-based configurations
//
// 📊 COMPONENT BEHAVIOR:
// - Renders all active enemies from the enemies array (object pool)
// - Maps enemy types to specific component implementations (FastEnemy, TankEnemy)
// - Applies theme-based configurations and user settings (speed multiplier)
// - Handles player damage when enemies attack (useEnemyAttack hook)
// - Manages enemy removal when defeated or out of bounds (useEnemyCleanup hook)
// - Integrates with enemy spawning system for continuous gameplay
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎨 VISUAL CUSTOMIZATION:
// ADD NEW:
// - Add new enemy types by creating new enemy components and adding to EnemyComponents
// - Include enemy death animations and particle effects
// - Add visual feedback for enemy damage (health bars, damage numbers)
// - Include enemy special abilities with visual indicators
// - Add boss enemies with unique appearances and behaviors
//
// MODIFY EXISTING:
// - Change enemy models by updating theme configurations in themes.js
// - Modify enemy colors, sizes, and scales via theme properties
// - Update enemy visual effects by modifying BaseEnemy component
// - Change fallback geometries for enemies without 3D models
//
// 🎮 FUNCTIONAL MODIFICATIONS:
// ADD NEW:
// - Add new enemy types with unique behaviors (flying, ranged, support)
// - Implement enemy special abilities (teleport, shield, heal)
// - Add enemy AI states (patrol, alert, aggressive, retreat)
// - Include enemy formations and group behaviors
// - Add enemy loot drops and reward systems
//
// MODIFY EXISTING:
// - Change enemy damage values by updating base configurations (ENEMY_BASES in baseConfigs.js)
// - Modify enemy health and speed by updating related base configurations (ENEMY_BASES in baseConfigs.js)
// - Update attack patterns by modifying useEnemyAttack hook
// - Change enemy movement by updating useEnemyChase hook
// - Adjust enemy cleanup boundaries via useEnemyCleanup hook
//
// 📱 ENEMY TYPES & BEHAVIORS:
// ============================================================================
//
// 🎯 CURRENT ENEMY TYPES (2 types available):
// - 'fast': Fast-moving, low-health enemies (speed: 4, health: 30, damage: 5)
// - 'tank': Slow-moving, high-health enemies (speed: 1.2, health: 90, damage: 20)
//
// 🔧 HOW TO ADD NEW ENEMY TYPE:
// =============================
// 
// STEP 1: Add to ENEMY_BASES (baseConfigs.js)
// ```javascript
// export const ENEMY_BASES = {
//   fast: { id: 'fast', speed: 4, health: 30, damage: 5, ... },
//   tank: { id: 'tank', speed: 1.2, health: 90, damage: 20, ... },
//   ranged: {  // NEW ENEMY TYPE
//     id: 'ranged',
//     speed: 2.5,
//     health: 50,
//     damage: 15,
//     size: 0.6,
//     points: 30,
//     spawnRate: 0.7
//   }
// };
// ```
//
// STEP 2: Add to theme configurations (themes.js)
// ```javascript
// themes.space.enemies.types = [
//   { ...ENEMY_BASES.fast, modelUrl: '/models/space/fastEnemy.glb', color: 0x00FFFF },
//   { ...ENEMY_BASES.tank, modelUrl: '/models/space/tankEnemy.glb', color: 0xFF00FF },
//   { ...ENEMY_BASES.ranged, modelUrl: '/models/space/rangedEnemy.glb', color: 0xFFFF00 } // NEW
// ];
// ```
//
// STEP 3: Create enemy component (src/components/enemies/RangedEnemy.jsx)
// ```javascript
// import React from "react";
// import { BaseEnemy } from "./BaseEnemy";
// 
// export const RangedEnemy = (props) => (
//   <BaseEnemy {...props} />
// );
// ```
//
// STEP 4: Register component in EnemyComponents map (this file)
// ```javascript
// const EnemyComponents = {
//   fast: FastEnemy,
//   tank: TankEnemy,
//   ranged: RangedEnemy,  // ADD NEW COMPONENT
// };
// ```
//
// 🎯 ENEMY TYPE PROPERTIES STRUCTURE:
// ===================================
// - id: Unique identifier ('fast', 'tank', 'ranged', etc.)
// - speed: Movement speed (units per second)
// - health: Hit points (how much damage enemy can take)
// - damage: Damage dealt to player on contact
// - size: Visual size/collision box size
// - points: Score awarded when enemy is defeated
// - spawnRate: How frequently this type spawns (0-1 scale)
//
// 🎨 THEME-SPECIFIC OVERRIDES:
// ============================
// Themes can override any base property:
// - modelUrl: 3D model file path
// - color: Fallback color if model fails
// - scale: Size multiplier [x, y, z]
// - facePlayer: Whether enemy rotates to face player
// - Any base property (speed, health, damage, etc.)
//
// ADD NEW:
// - Create ranged enemies that shoot projectiles at player
// - Add flying enemies that move in 3D space
// - Implement support enemies that buff other enemies
// - Add stealth enemies that become invisible periodically
// - Create explosive enemies that damage player and nearby enemies
//
// MODIFY EXISTING:
// - Update FastEnemy behavior by modifying its component or hooks
// - Change TankEnemy properties by updating theme configurations
// - Modify enemy facing behavior via useEnemyFacing hook
// - Update enemy spawn patterns in useEnemySpawner hook
//
// 🔄 STATE MANAGEMENT:
// - enemies: Array of enemy objects managed via object pooling (gameUtils.js)
// - enemySpeedMultiplierAtom: User-configurable speed multiplier from settings
// - useCurrentEnemies: Current theme's enemy type configurations
// - deactivateEnemy: Object pooling function for enemy cleanup
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/components/enemies/FastEnemy.jsx: Fast enemy type implementation
// - src/components/enemies/TankEnemy.jsx: Tank enemy type implementation
// - src/components/enemies/BaseEnemy.jsx: Core enemy functionality and rendering
// - src/hooks/useEnemyChase.js: Enemy movement and player following logic
// - src/hooks/useEnemyAttack.js: Enemy damage dealing and attack timing
// - src/hooks/useEnemyCleanup.js: Enemy removal when out of bounds
// - src/hooks/useEnemyFacing.js: Enemy rotation to face player
// - src/utils/gameUtils.js: Object pooling and enemy lifecycle management
// - src/config/themes/themes.js: Enemy configurations per theme
//
// 🎨 ENEMY COMPONENT DEPENDENCIES:
// - FastEnemy: Wrapper around BaseEnemy for fast enemy type
// - TankEnemy: Wrapper around BaseEnemy for tank enemy type
// - BaseEnemy: Core enemy component with physics, rendering, and behavior hooks
// - EnemyComponents: Map of enemy type IDs to their component implementations
//
// 🔗 HOOK DEPENDENCIES:
// - useEnemyChase: Moves enemies toward player position (in BaseEnemy)
// - useEnemyAttack: Handles collision detection and player damage (in BaseEnemy)
// - useEnemyCleanup: Removes enemies when they go out of bounds (in BaseEnemy)
// - useEnemyFacing: Rotates enemies to face player direction (in BaseEnemy)
//
// ⚠️ IMPORTANT NOTES:
// - Enemy array uses object pooling for performance (no garbage collection)
// - Enemy removal calls deactivateEnemy (returns to pool, doesn't delete)
// - Player damage triggers game over when health reaches 0
// - Enemy configs come from current theme and are cached for performance
// - Only active enemies are rendered (active: true)
// - Enemy speed is multiplied by user's speed multiplier setting
//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASES:
// ============================================================================
//
// 📝 ADD NEW ENEMY TYPE:
// 1. Create new enemy component (e.g., RangedEnemy.jsx)
// 2. Add to EnemyComponents map: ranged: RangedEnemy
// 3. Add enemy type to theme configurations in themes.js and in ENEMY_BASES in baseConfigs.js
// 4. Enemy spawner will automatically use new type
//
// 🎮 CHANGE ENEMY BEHAVIOR:
// Modify the hooks used in BaseEnemy component:
// - Movement: Update useEnemyChase hook
// - Attacks: Update useEnemyAttack hook
// - Cleanup: Update useEnemyCleanup hook
//
// 🎨 CHANGE ENEMY APPEARANCE:
// Update theme configurations:
// themes.space.enemies.types[0].modelUrl = 'new-enemy-model.glb'
// themes.space.enemies.types[0].color = 0xFF0000 (red)
//
// 📱 ADD BOSS ENEMIES:
// 1. Create BossEnemy component with special behaviors
// 2. Add boss: BossEnemy to EnemyComponents
// 3. Add boss type to theme with higher health/damage
// 4. Modify spawner to spawn bosses under special conditions
//
// ✏️ MODIFICATION EXAMPLES:
// ============================================================================
//
// 🏃‍♂️ CHANGE ENEMY SPEED:
// Modify enemySpeedMultiplierAtom or update theme configurations
//
// 💥 CHANGE ENEMY DAMAGE:
// Update damage property in theme enemy type configurations
//
// ❤️ CHANGE ENEMY HEALTH:
// Update health property in theme enemy type configurations
//
// 🎯 ADD ENEMY PROJECTILES:
// 1. Create shooting behavior hook
// 2. Add to BaseEnemy or create RangedEnemy component
// 3. Integrate with projectile system
//
// 🎨 ADD ENEMY VISUAL EFFECTS:
// Modify BaseEnemy to include particle effects or animations
//
// 🤖 ADD ENEMY AI STATES:
// Create state management in BaseEnemy for different behaviors
// ============================================================================

import { useAtom } from "jotai";
import { FastEnemy } from "./enemies/FastEnemy";
import { TankEnemy } from "./enemies/TankEnemy";
import { useCurrentEnemies } from "../config/gameConfig";
import { deactivateEnemy } from "../utils/gameUtils";
import { enemySpeedMultiplierAtom } from "../config/atoms";

/**
 * 🗂️ ENEMY COMPONENT REGISTRY - Type to Component Mapping
 * ======================================================
 *
 * @description Maps enemy type IDs to their React component implementations
 * @type {Object} Key-value pairs of enemy type ID to component
 *
 * 🎯 USAGE:
 * - Used to dynamically render correct component based on enemy.type
 * - Allows easy addition of new enemy types without modifying core logic
 * - Supports theme-based enemy variety
 *
 * 🔧 TO ADD NEW ENEMY TYPE:
 * 1. Create new enemy component (e.g., RangedEnemy.jsx)
 * 2. Import: import { RangedEnemy } from "./enemies/RangedEnemy";
 * 3. Add to map: ranged: RangedEnemy,
 * 4. Add type to theme configurations in themes.js
 */
const EnemyComponents = {
  fast: FastEnemy,    // Fast-moving, low-health enemies
  tank: TankEnemy,    // Slow-moving, high-health enemies
};

/**
 * 👹 ENEMIES COMPONENT - Enemy Management and Rendering System
 * ===========================================================
 *
 * @description Main component that manages and renders all active enemies in the game
 * @param {Array<Object>} enemies - Array of enemy objects from object pool
 * @param {Function} setEnemies - Function to update enemies array state
 * @param {Array<number>} playerPosition - Current player position [x, y, z]
 * @param {Function} setPlayerHealth - Function to update player health
 * @param {string} gameState - Current game state ('playing', 'menu', etc.)
 * @param {Function} setGameState - Function to change game state
 * @param {Object} worldBounds - World boundary limits for enemy cleanup
 * @returns {JSX.Element} Fragment containing all active enemy components
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Render all active enemies from the enemies array
 * - Apply theme-based enemy configurations
 * - Handle enemy-to-player damage interactions
 * - Manage enemy removal when defeated or out of bounds
 * - Apply user settings (speed multiplier) to enemy behavior
 *
 * 🔄 ENEMY LIFECYCLE:
 * 1. Enemies spawned by EnemySpawner component
 * 2. Added to enemies array via object pooling (activateEnemy)
 * 3. Rendered here if active: true
 * 4. Removed via removeEnemy when defeated/cleanup
 * 5. Returned to pool via deactivateEnemy (not deleted)
 */
const Enemies = ({
  enemies,
  setEnemies,
  playerPosition,
  setPlayerHealth,
  gameState,
  setGameState,
  worldBounds
}) => {
  // ⚙️ USER SETTINGS
  // Speed multiplier from settings screen (affects all enemy movement)
  const [enemySpeedMultiplier] = useAtom(enemySpeedMultiplierAtom);
  
  // 🎨 THEME CONFIGURATION
  // Current theme's enemy type definitions (models, stats, behaviors)
  const currentEnemies = useCurrentEnemies();

  /**
   * 🗑️ ENEMY REMOVAL HANDLER - Object Pool Deactivation
   * ===================================================
   *
   * @description Deactivates an enemy and returns it to the object pool
   * @param {string} id - Unique identifier of the enemy to remove
   * @effects:
   * - Sets enemy.active = false (returns to pool)
   * - Preserves enemy data for future reuse
   * - Maintains object pool efficiency
   * - Called by useEnemyCleanup and combat systems
   *
   * 🎯 TRIGGERS:
   * - Enemy defeated by player projectiles
   * - Enemy goes out of world bounds (useEnemyCleanup)
   * - Manual enemy removal (admin/debug commands)
   * - Game reset or level transition
   */
  const removeEnemy = (id) => {
    setEnemies((prev) => deactivateEnemy(prev, id));
  };

  /**
   * 💥 PLAYER DAMAGE HANDLER - Enemy Attack Processing
   * =================================================
   *
   * @description Processes damage dealt to player by enemy attacks
   * @param {number} damage - Amount of health to subtract from player
   * @effects:
   * - Reduces player health by damage amount
   * - Triggers game over if health reaches 0 or below
   * - Called by useEnemyAttack hook when enemies collide with player
   *
   * 🎯 DAMAGE SOURCES:
   * - Enemy collision attacks (useEnemyAttack hook)
   * - Enemy projectiles (if implemented)
   * - Environmental enemy hazards
   * - Special enemy abilities
   */
  const handlePlayerDamage = (damage) => {
    setPlayerHealth((h) => {
      const newHealth = h - damage;
      if (newHealth <= 0) setGameState("gameOver");
      return newHealth;
    });
  };

  // 🗂️ ENEMY CONFIGURATION CACHE - Performance Optimization
  // Creates lookup map of enemy type ID to configuration for fast access
  // Avoids repeated array searches during enemy rendering
  const enemyConfigs = currentEnemies.types.reduce((acc, type) => {
    acc[type.id] = type;
    return acc;
  }, {});

  // 🎯 ACTIVE ENEMY FILTERING - Only render enemies participating in gameplay
  // Filters out inactive enemies (those returned to object pool)
  const activeEnemies = enemies.filter(e => e.active);

  // 🎨 RENDER ACTIVE ENEMIES
  return (
    <>
      {activeEnemies.map((enemy) => {
        // 🔍 COMPONENT LOOKUP - Find correct enemy component for this type
        const EnemyComponent = EnemyComponents[enemy.type];
        if (!EnemyComponent) {
          console.warn(`No component found for enemy type: ${enemy.type}`);
          return null;
        }
        
        // 🔍 CONFIG LOOKUP - Get theme configuration for this enemy type
        const config = enemyConfigs[enemy.type];
        if (!config) {
          console.warn(`No config found for enemy type: ${enemy.type}`);
          return null;
        }
        
        // 🎭 ENEMY COMPONENT RENDERING - Dynamic enemy instantiation
        return (
          <EnemyComponent
            key={enemy.id}                                           // Unique React key for rendering optimization
            {...enemy}                                               // Enemy instance data (id, position, health, etc.)
            {...config}                                              // Theme configuration (modelUrl, color, damage, etc.)
            speed={config.speed * enemySpeedMultiplier}             // Apply user speed multiplier setting
            onRemove={removeEnemy}                                   // Callback for enemy cleanup/defeat
            playerPosition={playerPosition}                          // Player position for chasing/attacking
            gameState={gameState}                                    // Game state for behavior gating
            onPlayerDamage={handlePlayerDamage}                      // Callback for dealing damage to player
            worldBounds={worldBounds}                                // World boundaries for cleanup
          />
        );
      })}
    </>
  );
};

export default Enemies;
