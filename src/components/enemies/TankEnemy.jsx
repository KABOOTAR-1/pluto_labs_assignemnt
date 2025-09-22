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