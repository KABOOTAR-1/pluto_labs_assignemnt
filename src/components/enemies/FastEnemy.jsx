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
//
// ⚠️ IMPORTANT NOTES:
// - FastEnemy contains NO custom logic - all behavior comes from BaseEnemy
// - Properties are determined by theme configuration, not component code
// - Component serves as type identifier for enemy spawning and recognition
// - All AI, physics, and rendering is handled by BaseEnemy component
// - Theme switching automatically updates FastEnemy appearance and properties
// - Spawning system uses component name to create appropriate enemy types
// - Object pooling system treats FastEnemy instances like any other enemy
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