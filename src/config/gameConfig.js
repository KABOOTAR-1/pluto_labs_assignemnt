// ============================================================================
// 🎮 GAME CONFIGURATION - Central Game Settings Management
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is the central hub for all game configuration and theme management
// ✅ Contains the main gameConfig object that combines all settings
// ✅ Provides helper functions for accessing current theme data
// ✅ Use this to modify global game settings and theme selection
//
// 📊 CONFIGURATION HIERARCHY:
// 1. baseGameConfig (foundation from baseConfigs.js)
// 2. DEFAULT_CONFIG (overrides from constants.js)
// 3. gameConfig (final merged configuration)
// 4. Theme-specific overrides (applied at runtime)
//
// 🔄 THEME SYSTEM: Themes override base settings for visual/audio customization
// ============================================================================

import { atom, useAtom } from 'jotai';
import { PLAYER_BASE, baseGameConfig } from './baseConfigs';
import { THEMES, GAME_STATES, DEFAULT_CONFIG, ENEMY_SETTINGS } from './constants';
import { themes, getTheme } from './themes/themes';
import { useWorldBounds, isWithinBounds } from './configHelpers';

/**
 * 🎨 SELECTED THEME ATOM - Current Theme Selection
 * ===============================================
 *
 * @description Controls which visual theme is currently active in the game
 * @type {string} - Theme key from THEMES constants ('classic', 'space', 'postapoc', etc.)
 * @default THEMES.CLASSIC
 *
 * 🎯 USAGE EXAMPLES:
 * ```javascript
 * const [currentTheme, setCurrentTheme] = useAtom(selectedThemeAtom);
 * setCurrentTheme(THEMES.SPACE); // Switch to space theme
 * ```
 *
 * 🎨 THEME IMPACT:
 * - Changes all visual assets (models, textures, skyboxes)
 * - Modifies lighting and particle effects
 * - Affects enemy types and behaviors
 * - Updates environment appearance
 *
 */
export const selectedThemeAtom = atom(THEMES.CLASSIC);

/**
 * ⚙️ MAIN GAME CONFIGURATION - Complete Game Settings
 * ==================================================
 *
 * @description The master configuration object containing all game settings
 * @type {Object} - Merged configuration from base + defaults + themes
 *
 * 🎯 CONFIGURATION STRUCTURE:
 * ```javascript
 * {
 *   // Core gameplay settings (from baseGameConfig)
 *   player: { speed, health, projectileSpeed, ... },
 *   enemy: { speed, health, damage, ... },
 *   world: { size, bounds, backgroundColor, ... },
 *
 *   // Theme overrides (from DEFAULT_CONFIG)
 *   camera: { position, fov, near, far },
 *   physics: { gravity, friction, restitution },
 *   rules: { initialScore, scoreMultiplier, winScore },
 *
 *   // Theme system
 *   themes: { classic, space, medieval, postapoc },
 *   enemySettings: { maxOnScreen, spawnRadius }
 * }
 * ```
 *
 * 🔧 MODIFICATION GUIDE:
 * - Base settings: Modify in baseConfigs.js
 * - Default overrides: Modify in constants.js DEFAULT_CONFIG
 * - Theme additions: Add to themes/themes.js
 * - Runtime changes: Use theme atoms and settings atoms
 */
export const gameConfig = {
  // 🔧 Foundation: Base gameplay settings (speed, health, damage, etc.)
  ...baseGameConfig,

  // 🎮 Overrides: Theme-independent defaults (camera, physics, rules)
  ...DEFAULT_CONFIG,

  // 🧑‍🚀 Player: Core player stats from base configuration
  player: { ...PLAYER_BASE },

  // 👹 Enemies: Spawn and population settings
  enemySettings: ENEMY_SETTINGS,

  // 🎨 Themes: Complete theme collection for visual customization
  themes,
};

// Re-export constants for backward compatibility
export { THEMES, GAME_STATES };

/**
 * 🎨 CURRENT THEME HOOK - Get Active Theme Configuration
 * ====================================================
 *
 * @description React hook that returns the currently selected theme configuration
 * @returns {Object} Complete theme object with player, enemies, environment settings
 *
 * 🎯 USAGE EXAMPLES:
 * ```javascript
 * const currentTheme = useCurrentTheme();
 * console.log(currentTheme.player.modelUrl); // Get player model for current theme
 * console.log(currentTheme.environment.skybox); // Get skybox for current theme
 * ```
 *
 * 🔄 REACTIVE UPDATES:
 * - Automatically updates when selectedThemeAtom changes
 * - Components using this hook re-render on theme switches
 * - Provides real-time theme data to all components
 *
 * 📊 RETURNED THEME STRUCTURE:
 * ```javascript
 * {
 *   name: 'Space',
 *   player: { modelUrl, speed, health, ... },
 *   enemies: { types: [...] },
 *   environment: { ground, skybox, lighting, ... }
 * }
 * ```
 */
export function useCurrentTheme() {
  const [selectedTheme] = useAtom(selectedThemeAtom);
  return getTheme(selectedTheme);
}

/**
 * 📦 THEME LOADER - Synchronous Theme Retrieval
 * ============================================
 *
 * @description Returns theme configuration synchronously (themes are pre-loaded)
 * @param {string} selectedTheme - Theme key to retrieve ('classic', 'space', etc.)
 * @returns {Object} Theme configuration object
 *
 * 🎯 USAGE EXAMPLES:
 * ```javascript
 * const themeData = loadCurrentTheme('space');
 * // Theme data is immediately available (pre-loaded)
 * ```
 *
 * ⚡ PERFORMANCE:
 * - Instant access (no async loading needed)
 * - Themes are pre-loaded at startup
 * - No loading delays or waiting
 */
export function loadCurrentTheme(selectedTheme) {
  return getTheme(selectedTheme);
}

/**
 * 🧑‍🚀 PLAYER CONFIG HOOK - Current Theme Player Settings
 * =====================================================
 *
 * @description Returns player configuration from the currently active theme
 * @returns {Object} Player settings including model, speed, health, weapons
 *
 * 🎯 USAGE EXAMPLES:
 * ```javascript
 * const playerConfig = useCurrentPlayerConfig();
 * // Use playerConfig.modelUrl for 3D model loading
 * // Use playerConfig.speed for movement calculations
 * ```
 *
 * 🎮 PLAYER CONFIGURATION INCLUDES:
 * - modelUrl: 3D model file path
 * - speed: Movement speed in units/second
 * - health: Maximum health points
 * - projectileSpeed: Bullet travel speed
 * - color: Player model color
 * - scale: Player model size
 */
export function useCurrentPlayerConfig() {
  const theme = useCurrentTheme();
  return theme.player;
}

/**
 * 👹 ENEMIES CONFIG HOOK - Current Theme Enemy Settings
 * ===================================================
 *
 * @description Returns enemy configuration from the currently active theme
 * @returns {Object} Enemy settings including types, behaviors, and stats
 *
 * 🎯 USAGE EXAMPLES:
 * ```javascript
 * const enemiesConfig = useCurrentEnemies();
 * enemiesConfig.types.forEach(enemyType => {
 *   // Spawn enemies using enemyType configuration
 * });
 * ```
 *
 * 👾 ENEMY CONFIGURATION INCLUDES:
 * - types[]: Array of enemy type configurations
 * - Each type has: modelUrl, speed, health, damage, color
 * - Behavior settings: facePlayer, movement patterns
 * - Spawn probabilities and difficulty scaling
 */
export function useCurrentEnemies() {
  const theme = useCurrentTheme();
  return theme.enemies;
}

/**
 * 🌍 ENVIRONMENT CONFIG HOOK - Current Theme World Settings
 * =======================================================
 *
 * @description Returns environment configuration from the currently active theme
 * @returns {Object} World settings including ground, skybox, lighting, particles
 *
 * 🎯 USAGE EXAMPLES:
 * ```javascript
 * const envConfig = useCurrentEnvironment();
 * // Set skybox: envConfig.skybox.texturePath
 * // Set lighting: envConfig.lighting.ambient
 * // Configure particles: envConfig.particles
 * ```
 *
 * 🌍 ENVIRONMENT CONFIGURATION INCLUDES:
 * - ground: Texture, color, material properties
 * - skybox: HDR texture path and type
 * - lighting: Ambient, directional, and point lights
 * - fog: Color, near/far distances
 * - particles: Fireflies, magic, stars, dust effects
 */
export function useCurrentEnvironment() {
  const theme = useCurrentTheme();
  return theme.environment;
}

// Re-export helper functions from configHelpers
export { useWorldBounds, isWithinBounds };
