// ============================================================================
// 🛡️ TANK ENEMY COMPONENT - Heavy, Durable Enemy Type
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is a specialized enemy type optimized for durability and damage
// ✅ Acts as a pure wrapper around BaseEnemy with no custom logic
// ✅ Gets its unique properties from theme configuration and ENEMY_BASES.tank
// ✅ Provides a distinct enemy archetype for challenging, high-value targets
// ✅ Used by enemy spawning system for creating slow but dangerous threats
//
// 📊 WHAT TANKENEMY ACTUALLY DOES:
// - Component delegation: passes all props directly to BaseEnemy without modification
// - Serves as wrapper: acts as named component that can be imported and mapped
// 
// 📊 WHAT TANKENEMY DOES NOT DO (happens elsewhere):
// - Type identification: done in Enemies.jsx via EnemyComponents mapping (tank: TankEnemy)
// - Theme integration: done in Enemies.jsx via useCurrentEnemies hook and config lookup
// - Spawning: done in useEnemySpawner.js which creates enemy objects with type: 'tank'
// - Object pooling: done in gameUtils.js activateEnemy/deactivateEnemy functions
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎯 WRAPPER COMPONENT MODIFICATIONS:
// Since TankEnemy is currently just a wrapper, any customization requires adding logic:
//
// 📝 ADD CUSTOM BEHAVIOR BEFORE PASSING TO BASEENEMY:
// - Modify props before passing to BaseEnemy (damage reduction, health boosts)
// - Add conditional rendering based on enemy state (health, damage taken)
// - Include wrapper-specific effects (armor plating, heavy footsteps, screen shake)
// - Implement prop validation or transformation logic
//
// 🎭 ADD VISUAL EFFECTS ALONGSIDE BASEENEMY:
// - Render additional components alongside BaseEnemy (armor effects, damage states)
// - Add tank-specific visual indicators (metallic sheen, sparks, smoke)
// - Include conditional rendering based on health or damage thresholds
//
// 🔄 STATE MANAGEMENT:
// - props: All properties passed through from parent components unchanged
// - BaseEnemy integration: Delegates all state management to BaseEnemy component
// - Theme configuration: Receives speed, health, damage from ENEMY_BASES.tank
// - Spawn system: Compatible with standard enemy spawning and pooling
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/components/enemies/BaseEnemy.jsx: Core enemy behavior and rendering
// - src/config/baseConfigs.js: ENEMY_BASES.tank configuration (speed: 1.2, health: 90, damage: 20)
// - src/config/themes/themes.js: Theme-specific tank enemy visual properties
// - src/components/Enemies.jsx: Enemy type mapping and component registration
// - src/hooks/useEnemySpawner.js: Spawning logic that creates TankEnemy instances
// - src/utils/gameUtils.js: Object pooling system for enemy lifecycle management
//
// 🎭 ENEMY TYPE ARCHITECTURE:
// - TankEnemy: Pure wrapper component with no custom logic
// - BaseEnemy: Handles all physics, AI, rendering, and lifecycle management
// - Theme system: Provides visual assets (models, textures, colors) per theme
// - Base configuration: ENEMY_BASES.tank defines core gameplay properties
// - Spawning system: Creates and manages TankEnemy instances via object pooling
//
// 🎨 TANK ENEMY PROPERTIES (from ENEMY_BASES.tank):
// - speed: 1.2 (slow, deliberate movement toward player)
// - health: 90 (high durability, takes many hits to kill)
// - damage: 20 (high damage per attack, very dangerous)
// - points: 25 (high score reward for difficulty)
// - spawnRate: 0.5 (spawns less frequently than fast enemies)
// - size: 0.6 (standard enemy collision size, same as fast enemy)
//
// 🔗 THEME INTEGRATION EXAMPLES:
// - Classic theme: Green box geometry for geometric tank enemy
// - Space theme: Large, armored spacecraft model with heavy plating
// - Post-apocalyptic theme: Heavily armored robot with weathered metal textures
// - Custom themes: Any heavily armored enemy model with appropriate scaling
//
// ⚠️ IMPORTANT NOTES:
// - TankEnemy contains NO custom logic - all behavior comes from BaseEnemy
// - Properties are determined by theme configuration, not component code
// - Component serves as type identifier for enemy spawning and recognition
// - All AI, physics, and rendering is handled by BaseEnemy component
// - Theme switching automatically updates TankEnemy appearance and properties
// - Spawning system uses component name to create appropriate enemy types
// - Object pooling system treats TankEnemy instances like any other enemy
// - Tank enemies are designed as high-value, high-threat targets for gameplay balance
//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASES:
// ============================================================================
//
// 📝 ADD CUSTOM TANK ENEMY BEHAVIOR:
// ```javascript
// export const TankEnemy = (props) => {
//   // Add armor-specific logic here
//   const enhancedProps = {
//     ...props,
//     damage: props.damage * 1.5, // 50% damage boost
//     onPlayerHit: (damage) => {
//       // Trigger screen shake or impact effects
//       console.log(`Tank enemy dealt ${damage} damage!`);
//     }
//   };
//   
//   return <BaseEnemy {...enhancedProps} />;
// };
// ```
//
// 🎮 ADD ARMOR VISUAL EFFECTS:
// ```javascript
// import { ArmorPlating } from '../effects/ArmorPlating';
// 
// export const TankEnemy = (props) => (
//   <>
//     <BaseEnemy {...props} />
//     <ArmorPlating health={props.health} maxHealth={90} />
//   </>
// );
// ```
//
// 🎨 ADD DAMAGE STATE RENDERING:
// ```javascript
// export const TankEnemy = (props) => {
//   const damageLevel = 1 - (props.health / 90); // 0 = no damage, 1 = critical
//   
//   return (
//     <BaseEnemy 
//       {...props}
//       color={damageLevel > 0.7 ? 0xFF4444 : props.color} // Red tint when heavily damaged
//       scale={damageLevel > 0.5 ? [1.1, 1.1, 1.1] : props.scale} // Slightly larger when damaged (swelling)
//     />
//   );
// };
// ```
//
// 📱 ADD PERFORMANCE OPTIMIZATION:
// ```javascript
// import { memo } from 'react';
// 
// export const TankEnemy = memo((props) => (
//   <BaseEnemy {...props} />
// ), (prevProps, nextProps) => {
//   // Custom comparison for tank enemy optimization
//   return prevProps.position === nextProps.position && 
//          prevProps.health === nextProps.health &&
//          prevProps.damage === nextProps.damage;
// });
// ```
//
// 🔊 ADD HEAVY MOVEMENT AUDIO:
// ```javascript
// import { useEffect } from 'react';
// import { playSound } from '../audio/soundManager';
// 
// export const TankEnemy = (props) => {
//   useEffect(() => {
//     playSound('tankEnemySpawn', { volume: 0.5 });
//     
//     // Play heavy footsteps periodically
//     const interval = setInterval(() => {
//       playSound('heavyFootstep', { volume: 0.3 });
//     }, 1000); // Every second
//     
//     return () => clearInterval(interval);
//   }, []);
//   
//   return <BaseEnemy {...props} />;
// };
// ```
//
// ⚔️ ADD DAMAGE RESISTANCE:
// ```javascript
// export const TankEnemy = (props) => {
//   const handleDamage = (incomingDamage) => {
//     // Tank enemies take 25% less damage
//     const reducedDamage = incomingDamage * 0.75;
//     return reducedDamage;
//   };
//   
//   return (
//     <BaseEnemy 
//       {...props}
//       onDamage={handleDamage}
//     />
//   );
// };
// ```
// ============================================================================

import React from "react";
import { BaseEnemy } from "./BaseEnemy";

/**
 * 🛡️ TANK ENEMY COMPONENT - Heavy, Durable Enemy Type
 * ==================================================
 *
 * @description Specialized enemy type optimized for durability and high damage
 * @param {Object} props - All enemy properties passed through to BaseEnemy
 * @returns {JSX.Element} BaseEnemy component with tank enemy configuration
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Serve as named wrapper for tank enemy type identification
 * - Pass all props directly to BaseEnemy without modification
 * - Provide component identity for enemy spawning and type recognition
 * - Enable theme-based configuration through enemy type mapping
 *
 * 🛡️ TANK ENEMY CHARACTERISTICS (from ENEMY_BASES.tank):
 * - Low Speed: 1.2 units/second (slow, deliberate movement)
 * - High Health: 90 hit points (very durable, requires sustained fire)
 * - High Damage: 20 damage per attack (extremely dangerous on contact)
 * - High Reward: 25 points when defeated (premium target)
 * - Low Spawn Rate: 0.5 (spawns less frequently, special encounters)
 * - Standard Size: 0.6 collision radius (same physical size as fast enemy)
 *
 * 🎮 GAMEPLAY ROLE:
 * - Tank Enemy: High-value target that requires tactical approach
 * - Damage Dealer: Single contact can severely harm or kill player
 * - Obstacle: Slow movement creates territorial control challenges
 * - Resource Sink: Requires multiple shots, tests ammo management
 * - Priority Target: High points reward makes them worth focusing
 * - Boss-lite: Mini-boss encounters that break up fast enemy swarms
 *
 * 🎨 THEME-BASED APPEARANCE:
 * - Classic: Green box geometry (geometric theme, distinct from red fast enemies)
 * - Space: Large, heavily armored spacecraft with thick plating
 * - Post-apocalyptic: Massive armored robot with battle-worn textures
 * - Custom: Any heavily armored model defined in theme configuration
 *
 * 🚀 USAGE PATTERNS:
 * - Enemy Data Creation: useEnemySpawner creates enemy data objects with type: 'tank'
 * - Object Pooling: Enemy data managed through gameUtils enemy pooling system
 * - Component Mapping: Enemies.jsx maps enemy.type to TankEnemy component via EnemyComponents
 * - Theme System: Visual properties loaded from current theme configuration
 * - Balance System: Lower spawn rate compensates for higher individual threat
 */
export const TankEnemy = (props) => (
  <BaseEnemy
    {...props}
  />
);