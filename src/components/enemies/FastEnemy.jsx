// ============================================================================
// 🏃‍♂️ FAST ENEMY COMPONENT - Quick, Agile Enemy Type
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is a specialized enemy type optimized for speed and agility
// ✅ Acts as a pure wrapper around BaseEnemy with no custom logic
// ✅ Gets its unique properties from theme configuration and ENEMY_BASES.fast
// ✅ Provides a distinct enemy archetype for balanced gameplay variety
// ✅ Used by enemy spawning system for creating fast-moving threats
//
// 📊 WHAT FASTENEMY ACTUALLY DOES:
// - Component delegation: passes all props directly to BaseEnemy without modification
// - Serves as wrapper: acts as named component that can be imported and mapped
// 
// 📊 WHAT FASTENEMY DOES NOT DO (happens elsewhere):
// - Type identification: done in Enemies.jsx via EnemyComponents mapping (fast: FastEnemy)
// - Theme integration: done in Enemies.jsx via useCurrentEnemies hook and config lookup
// - Spawning: done in useEnemySpawner.js which creates enemy objects with type: 'fast'
// - Object pooling: done in gameUtils.js activateEnemy/deactivateEnemy functions
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎯 WRAPPER COMPONENT MODIFICATIONS:
// Since FastEnemy is currently just a wrapper, any customization requires adding logic:
//
// 📝 ADD CUSTOM BEHAVIOR BEFORE PASSING TO BASEENEMY:
// - Modify props before passing to BaseEnemy (speed boosts, damage multipliers)
// - Add conditional rendering based on enemy state (health, distance to player)
// - Include wrapper-specific effects (trails, particles, sounds)
// - Implement prop validation or transformation logic
//
// 🎭 ADD VISUAL EFFECTS ALONGSIDE BASEENEMY:
// - Render additional components alongside BaseEnemy (particle effects, UI elements)
// - Add speed-specific visual indicators (trails, glows, motion blur)
// - Include conditional rendering based on speed or health thresholds
//
// 🔄 STATE MANAGEMENT:
// - props: All properties passed through from parent components unchanged
// - BaseEnemy integration: Delegates all state management to BaseEnemy component
// - Theme configuration: Receives speed, health, damage from ENEMY_BASES.fast
// - Spawn system: Compatible with standard enemy spawning and pooling
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/components/enemies/BaseEnemy.jsx: Core enemy behavior and rendering
// - src/config/baseConfigs.js: ENEMY_BASES.fast configuration (speed: 4, health: 30, damage: 5)
// - src/config/themes/themes.js: Theme-specific fast enemy visual properties
// - src/components/Enemies.jsx: Enemy type mapping and component registration
// - src/hooks/useEnemySpawner.js: Spawning logic that creates FastEnemy instances
// - src/utils/gameUtils.js: Object pooling system for enemy lifecycle management
//
// 🎭 ENEMY TYPE ARCHITECTURE:
// - FastEnemy: Pure wrapper component with no custom logic
// - BaseEnemy: Handles all physics, AI, rendering, and lifecycle management
// - Theme system: Provides visual assets (models, textures, colors) per theme
// - Base configuration: ENEMY_BASES.fast defines core gameplay properties
// - Spawning system: Creates and manages FastEnemy instances via object pooling
//
// 🎨 FAST ENEMY PROPERTIES (from ENEMY_BASES.fast):
// - speed: 4 (fast movement toward player)
// - health: 30 (low durability, easy to kill)
// - damage: 5 (low damage per attack)
// - points: 15 (moderate score reward)
// - spawnRate: 1.0 (normal spawn frequency)
// - size: 0.6 (standard enemy collision size)
//
// 🔗 THEME INTEGRATION EXAMPLES:
// - Classic theme: Red sphere geometry for geometric fast enemy
// - Space theme: Small, agile spacecraft model with energy effects
// - Post-apocalyptic theme: Fast scavenger robot with worn textures
// - Custom themes: Any fast-moving enemy model with appropriate scaling
//
// ⚠️ IMPORTANT NOTES:
// - FastEnemy contains NO custom logic - all behavior comes from BaseEnemy
// - Properties are determined by theme configuration, not component code
// - Component serves as type identifier for enemy spawning and recognition
// - All AI, physics, and rendering is handled by BaseEnemy component
// - Theme switching automatically updates FastEnemy appearance and properties
// - Spawning system uses component name to create appropriate enemy types
// - Object pooling system treats FastEnemy instances like any other enemy
//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASES:
// ============================================================================
//
// 📝 ADD CUSTOM FAST ENEMY BEHAVIOR:
// ```javascript
// export const FastEnemy = (props) => {
//   // Add speed-specific logic here
//   const enhancedProps = {
//     ...props,
//     speed: props.speed * 1.2, // 20% speed boost
//     onPlayerNear: (distance) => {
//       if (distance < 5) {
//         // Trigger dash attack
//       }
//     }
//   };
//   
//   return <BaseEnemy {...enhancedProps} />;
// };
// ```
//
// 🎮 ADD SPEED TRAIL EFFECTS:
// ```javascript
// import { SpeedTrail } from '../effects/SpeedTrail';
// 
// export const FastEnemy = (props) => (
//   <>
//     <BaseEnemy {...props} />
//     <SpeedTrail position={props.position} speed={props.speed} />
//   </>
// );
// ```
//
// 🎨 ADD CONDITIONAL RENDERING:
// ```javascript
// export const FastEnemy = (props) => {
//   const isHighSpeed = props.speed > 3;
//   
//   return (
//     <BaseEnemy 
//       {...props}
//       color={isHighSpeed ? 0xFF4444 : props.color} // Red tint for high speed
//       scale={isHighSpeed ? [0.8, 0.8, 0.8] : props.scale} // Smaller when faster
//     />
//   );
// };
// ```
//
// 📱 ADD PERFORMANCE OPTIMIZATION:
// ```javascript
// import { memo } from 'react';
// 
// export const FastEnemy = memo((props) => (
//   <BaseEnemy {...props} />
// ), (prevProps, nextProps) => {
//   // Custom comparison for fast enemy optimization
//   return prevProps.position === nextProps.position && 
//          prevProps.health === nextProps.health;
// });
// ```
//
// 🔊 ADD AUDIO INTEGRATION:
// ```javascript
// import { useEffect } from 'react';
// import { playSound } from '../audio/soundManager';
// 
// export const FastEnemy = (props) => {
//   useEffect(() => {
//     playSound('fastEnemySpawn', { volume: 0.3 });
//   }, []);
//   
//   return <BaseEnemy {...props} />;
// };
// ```
// ============================================================================

import React from "react";
import { BaseEnemy } from "./BaseEnemy";

/**
 * 🏃‍♂️ FAST ENEMY COMPONENT - Quick, Agile Enemy Type
 * ==================================================
 *
 * @description Specialized enemy type optimized for speed and agility
 * @param {Object} props - All enemy properties passed through to BaseEnemy
 * @returns {JSX.Element} BaseEnemy component with fast enemy configuration
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Serve as named wrapper for fast enemy type identification
 * - Pass all props directly to BaseEnemy without modification
 * - Provide component identity for enemy spawning and type recognition
 * - Enable theme-based configuration through enemy type mapping
 *
 * 🏃‍♂️ FAST ENEMY CHARACTERISTICS (from ENEMY_BASES.fast):
 * - High Speed: 4 units/second (fast movement toward player)
 * - Low Health: 30 hit points (easy to kill, glass cannon)
 * - Low Damage: 5 damage per attack (not very dangerous individually)
 * - Moderate Reward: 15 points when defeated
 * - Normal Spawn Rate: 1.0 (appears frequently in enemy waves)
 * - Standard Size: 0.6 collision radius (same as other enemy types)
 *
 * 🎮 GAMEPLAY ROLE:
 * - Pressure Enemy: Forces player to stay mobile and aware
 * - Swarm Threat: Dangerous in groups, manageable individually
 * - Early Game: Common enemy type for building player skills
 * - Speed Challenge: Tests player reaction time and aiming
 * - Resource Management: Low health makes them efficient to eliminate
 *
 * 🎨 THEME-BASED APPEARANCE:
 * - Classic: Red sphere geometry (geometric theme)
 * - Space: Small, agile spacecraft with energy effects
 * - Post-apocalyptic: Fast scavenger robot with weathered textures
 * - Custom: Any fast-moving model defined in theme configuration
 *
 * 🚀 USAGE PATTERNS:
 * - Enemy Data Creation: useEnemySpawner creates enemy data objects with type: 'fast'
 * - Object Pooling: Enemy data managed through gameUtils enemy pooling system
 * - Component Mapping: Enemies.jsx maps enemy.type to FastEnemy component via EnemyComponents
 * - Theme System: Visual properties loaded from current theme configuration
 */
export const FastEnemy = (props) => (
  <BaseEnemy
    {...props}
  />
);