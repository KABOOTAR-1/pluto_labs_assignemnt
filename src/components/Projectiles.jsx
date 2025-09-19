// ============================================================================
// 🚀 PROJECTILES COMPONENT - Projectile Management and Combat System
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is the main projectile management system that renders all active projectiles
// ✅ Handles projectile-to-enemy collision detection and damage calculations
// ✅ Manages projectile lifecycle (spawning, movement, collision, cleanup) via object pooling
// ✅ Has basic weapon switching foundation through projectile types (inventory management not yet implemented)
// ✅ Integrates with scoring system and enemy defeat mechanics
//
// 📊 COMPONENT BEHAVIOR:
// - Renders all active projectiles from the projectiles array (object pool)
// - Maps projectile types to specific component implementations (Bullet, etc.)
// - Handles collision detection between projectiles and enemies
// - Manages enemy health reduction and death when hit by projectiles
// - Updates game score and statistics when enemies are defeated
// - Manages projectile cleanup when they hit targets or expire
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎨 VISUAL CUSTOMIZATION:
// ADD NEW:
// - Add new projectile types with unique appearances in projectiles/ folder and add to ProjectileTypes map (laser, plasma, rockets)
// - Include projectile trail effects and particle systems
// - Add projectile impact animations and explosion effects
// - Include different projectile shapes (bullets, beams, orbs, arrows)
// - Add weapon-specific visual effects and sound integration
//
// MODIFY EXISTING:
// - Change projectile appearance by updating projectileConfig properties
// - Modify projectile colors, sizes, and glow effects via projectileConfig
// - Update projectile models by creating custom projectile components in projectiles/ folder 
// - Change collision visual feedback and hit effects
//
// 🎮 FUNCTIONAL MODIFICATIONS:
// ADD NEW:
// - Add piercing projectiles that can hit multiple enemies
// - Implement homing projectiles that track nearest enemies
// - Add explosive projectiles with area-of-effect damage
// - Include ricochet projectiles that bounce off walls
// - Add special ammo types (poison, freeze, electric)
// - Complete weapon switching UI and inventory management system
// - Add weapon upgrades and power-up systems
//
// MODIFY EXISTING:
// - Change projectile damage by updating projectileConfig.damage
// - Modify projectile speed via projectileConfig.speed
// - Update collision detection radius via projectileConfig.size
// - Change projectile physics by modifying BaseProjectile component
// - Adjust projectile lifetime and cleanup timing
//
// 📱 WEAPON TYPES & BEHAVIORS:
// ADD NEW:
// - Create rapid-fire weapons with smaller, faster projectiles
// - Add sniper weapons with high damage, slow fire rate
// - Implement shotgun-style weapons with multiple projectiles
// - Add energy weapons with different physics behaviors
// - Create magical projectiles with special effects
//
// MODIFY EXISTING:
// - Update Bullet behavior by modifying Bullet component or BaseProjectile
// - Change projectile movement patterns in BaseProjectile
// - Modify collision detection logic in BaseProjectile
// - Update projectile cleanup and lifetime management
//
// 🔄 STATE MANAGEMENT:
// - projectiles: Array of projectile objects managed via object pooling (gameUtils.js)
// - projectileConfig: Current weapon configuration (damage, speed, size, etc.)
// - useCurrentEnemies: Current theme's enemy type configurations for scoring
// - deactivateProjectile: Object pooling function for projectile cleanup
// - deactivateEnemy: Object pooling function for enemy cleanup when defeated
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/components/projectiles/Bullet.jsx: Basic bullet projectile implementation
// - src/components/projectiles/BaseProjectile.jsx: Core projectile functionality
// - src/data/projectileTypes.js: Projectile type configurations and properties
// - src/utils/gameUtils.js: Object pooling and projectile lifecycle management
// - src/config/gameConfig.js: Game rules and scoring multipliers
// - src/hooks/usePlayerShooting.js: Projectile spawning and weapon firing logic
//
// 🎨 PROJECTILE COMPONENT DEPENDENCIES:
// - Bullet: Basic projectile type (wrapper around BaseProjectile)
// - BaseProjectile: Core projectile component with physics, collision, and rendering
// - ProjectileTypes: Map of projectile type IDs to their component implementations
// - projectileConfig: Current weapon configuration from parent component
//
// 🔗 UTILITY DEPENDENCIES:
// - deactivateProjectile: Returns projectiles to object pool when hit/expired
// - deactivateEnemy: Returns enemies to object pool when defeated
// - useCurrentEnemies: Gets enemy type configurations for scoring calculations
// - gameConfig.rules.scoreMultiplier: Global score multiplier for points
//
// ⚠️ IMPORTANT NOTES:
// - Projectile array uses object pooling for performance (no garbage collection)
// - Projectile removal calls deactivateProjectile (returns to pool, doesn't delete)
// - Enemy defeat triggers score updates and statistics tracking
// - Collision detection happens in BaseProjectile component every frame
// - Only active projectiles are rendered (active: true)
// - Projectile properties come from projectileConfig passed from parent
//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASES:
// ============================================================================
//
// 📝 ADD NEW PROJECTILE TYPE:
// 1. Create new projectile component (e.g., LaserProjectile.jsx)
// 2. Add to ProjectileTypes map: laser: LaserProjectile
// 3. Add projectile type to projectileTypes.js configuration
// 4. Player shooting system will use new type when selected
//
// 🎮 COMPLETE WEAPON SWITCHING (Foundation exists, UI needed):
// 1. currentProjectileTypeAtom already exists and works
// 2. Scene.jsx already uses getProjectileType(currentProjectileType)
// 3. Add weapon selection UI to HUD or settings
// 4. Add keybindings for weapon switching (1, 2, 3 keys)
//
// 🎨 CHANGE PROJECTILE APPEARANCE:
// Update projectileConfig properties:
// projectileConfig.color = '#FF0000' (red projectiles)
// projectileConfig.size = 0.5 (larger projectiles)
// projectileConfig.emissiveIntensity = 0.8 (brighter glow)
//
// 📱 ADD EXPLOSIVE PROJECTILES:
// 1. Create ExplosiveProjectile component with area damage
// 2. Add explosive: ExplosiveProjectile to ProjectileTypes
// 3. Modify handleHit to damage multiple enemies in radius
// 4. Add explosion visual effects and particle systems
//
// ✏️ MODIFICATION EXAMPLES:
// ============================================================================
//
// 💥 CHANGE PROJECTILE DAMAGE:
// Modify projectileConfig.damage value passed from parent component
//
// 🏃‍♂️ CHANGE PROJECTILE SPEED:
// Modify projectileConfig.speed value passed from parent component
//
// 🎯 ADD PIERCING PROJECTILES:
// Modify handleHit to not deactivate projectile on first hit, allow multiple hits
//
// 🎨 ADD PROJECTILE TRAILS:
// Create custom projectile component with trail renderer or particle system
//
// 🔊 ADD SOUND EFFECTS:
// Add audio system integration to handleHit for impact sounds
//
// 🎮 ADD WEAPON INVENTORY (Not yet implemented):
// 1. Create weapon inventory atoms (owned weapons, ammo counts)
// 2. Add weapon pickup/unlock system
// 3. Add inventory UI and weapon switching controls
// 4. Implement ammo limitations and weapon availability
// ============================================================================

import React from 'react';
import { gameConfig, useCurrentEnemies } from '../config/gameConfig';
import { Bullet } from './projectiles/Bullet';
import { deactivateProjectile, deactivateEnemy } from '../utils/gameUtils';

/**
 * 🗂️ PROJECTILE COMPONENT REGISTRY - Type to Component Mapping
 * ===========================================================
 *
 * @description Maps projectile type IDs to their React component implementations
 * @type {Object} Key-value pairs of projectile type ID to component
 *
 * 🎯 USAGE:
 * - Used to dynamically render correct component based on projectile.type
 * - Allows easy addition of new projectile types without modifying core logic
 * - Supports weapon switching and projectile variety
 *
 * 🔧 TO ADD NEW PROJECTILE TYPE:
 * 1. Create new projectile component (e.g., LaserProjectile.jsx)
 * 2. Import: import { LaserProjectile } from "./projectiles/LaserProjectile";
 * 3. Add to map: laser: LaserProjectile,
 * 4. Add type to projectileTypes.js configuration
 * 
 * 🎯 CURRENT PROJECTILE TYPES (1 type available):
 * - 'bullet': Basic bullet projectile (default type)
 */
const ProjectileTypes = {
  bullet: Bullet,    // Basic bullet projectile (wrapper around BaseProjectile)
};

/**
 * 🚀 PROJECTILES COMPONENT - Projectile Management and Combat System
 * =================================================================
 *
 * @description Main component that manages and renders all active projectiles in the game
 * @param {Array<Object>} projectiles - Array of projectile objects from object pool
 * @param {Function} setProjectiles - Function to update projectiles array state
 * @param {Array<Object>} enemies - Array of enemy objects for collision detection
 * @param {Function} setEnemies - Function to update enemies array state
 * @param {Function} setScore - Function to update player score
 * @param {Function} setEnemiesKilled - Function to update enemies killed counter
 * @param {Object} projectileConfig - Current weapon configuration (damage, speed, size, etc.)
 * @returns {JSX.Element} Fragment containing all active projectile components
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Render all active projectiles from the projectiles array
 * - Handle collision detection between projectiles and enemies
 * - Manage enemy health reduction and death when hit
 * - Update game score and statistics when enemies are defeated
 * - Manage projectile cleanup when they hit targets or expire
 * - Apply weapon configurations to projectile behavior
 *
 * 🔄 PROJECTILE LIFECYCLE:
 * 1. Projectiles spawned by usePlayerShooting hook
 * 2. Added to projectiles array via object pooling (activateProjectile)
 * 3. Rendered here if active: true
 * 4. Collision detection handled in BaseProjectile component
 * 5. Removed via handleHit when they hit targets or expire
 * 6. Returned to pool via deactivateProjectile (not deleted)
 */
const Projectiles = ({
  projectiles,
  setProjectiles,
  enemies,
  setEnemies,
  setScore,
  setEnemiesKilled,
  projectileConfig
}) => {
  // 🎨 THEME CONFIGURATION
  // Current theme's enemy type definitions for scoring calculations
  const currentEnemies = useCurrentEnemies();

  /**
   * 💥 PROJECTILE HIT HANDLER - Collision and Damage Processing
   * =========================================================
   *
   * @description Handles projectile collisions with enemies and manages combat resolution
   * @param {string} projectileId - Unique identifier of the projectile that hit
   * @param {string|null} enemyId - Unique identifier of the enemy hit (null for timeout/cleanup)
   * @param {number} damage - Amount of damage to deal to the enemy
   * @effects:
   * - Deactivates the projectile (returns to object pool)
   * - Reduces enemy health by damage amount
   * - Awards score points if enemy is defeated
   * - Updates enemies killed counter
   * - Deactivates enemy if health reaches 0 or below
   *
   * 🎯 COLLISION SOURCES:
   * - Projectile-enemy collision (BaseProjectile collision detection)
   * - Projectile timeout/expiration (BaseProjectile useEffect cleanup after 5 seconds)
   * - Manual projectile cleanup (boundary checking NOT YET IMPLEMENTED)
   *
   * 🏆 SCORING SYSTEM:
   * - Points awarded based on enemy type configuration
   * - Score multiplied by gameConfig.rules.scoreMultiplier
   * - Different enemy types award different point values
   * - Statistics tracking for enemies killed counter
   */
  const handleHit = (projectileId, enemyId, damage) => {
    // 🗑️ PROJECTILE CLEANUP - Always deactivate projectile on hit or timeout
    setProjectiles(prev => deactivateProjectile(prev, projectileId));

    // 🎯 EARLY EXIT - No enemy hit (timeout cleanup)
    if (!enemyId) return;

    // 💥 ENEMY DAMAGE PROCESSING
    setEnemies(prevEnemies => {
      // 🔍 FIND TARGET ENEMY
      const enemyIndex = prevEnemies.findIndex(e => e.id === enemyId);
      if (enemyIndex === -1) return prevEnemies; // Enemy not found (already removed)

      const enemy = prevEnemies[enemyIndex];

      // 🚫 DOUBLE-HIT PROTECTION - Skip if enemy already defeated
      if (!enemy.active) return prevEnemies;

      // 💔 CALCULATE NEW HEALTH
      const newHealth = enemy.health - damage;

      if (newHealth <= 0) {
        // 💀 ENEMY DEFEATED - Award points and update statistics
        const enemyType = currentEnemies.types.find(t => t.id === enemy.type);
        const points = enemyType ? enemyType.points : 10; // Fallback points if type not found
        setScore(s => s + points * gameConfig.rules.scoreMultiplier);
        setEnemiesKilled(k => k + 1);

        // 🗑️ REMOVE DEFEATED ENEMY - Return to object pool
        return deactivateEnemy(prevEnemies, enemyId);
      } else {
        // 🩹 ENEMY DAMAGED - Update health but keep alive
        return prevEnemies.map(e =>
          e.id === enemyId ? { ...e, health: newHealth } : e
        );
      }
    });
  };

  // 🎯 ACTIVE PROJECTILE FILTERING - Only render projectiles participating in gameplay
  // Filters out inactive projectiles (those returned to object pool)
  const activeProjectiles = projectiles.filter(p => p.active);

  // 🎨 RENDER ACTIVE PROJECTILES
  return (
    <>
      {activeProjectiles.map(proj => {
        // 🔍 COMPONENT LOOKUP - Find correct projectile component for this type
        const ProjectileComponent = ProjectileTypes[proj.type] || ProjectileTypes.bullet;
        
        // 🚀 PROJECTILE COMPONENT RENDERING - Dynamic projectile instantiation
        return (
          <ProjectileComponent
            key={proj.id}                                           // Unique React key for rendering optimization
            {...proj}                                               // Projectile instance data (id, position, direction, etc.)
            size={projectileConfig.size}                           // Projectile visual size and collision radius
            color={projectileConfig.color}                         // Projectile color and appearance
            speed={projectileConfig.speed}                         // Movement speed (units per second)
            damage={projectileConfig.damage}                       // Damage dealt to enemies on hit
            emissiveIntensity={projectileConfig.emissiveIntensity} // Glow intensity for visual effects
            mass={projectileConfig.mass}                           // Physics mass (passed to cannon physics body, but projectiles use Kinematic type so mass is unused)
            enemies={enemies}                                       // Enemy array for collision detection
            onHit={handleHit}                                       // Callback for collision/timeout handling
          />
        );
      })}
    </>
  );
};

export default Projectiles;
