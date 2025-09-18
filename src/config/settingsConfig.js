// ============================================================================
// ⚙️ SETTINGS CONFIGURATION - UI Settings Management System
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This defines all user-configurable settings for the game
// ✅ Each setting has UI properties (label, min/max, step) for controls
// ✅ Used by SettingsScreen component to generate UI automatically
// ✅ Helper functions format values and provide access methods
//
// 📊 SETTING STRUCTURE:
// Each setting object contains:
// - label: Display name for UI
// - default: Starting value
// - min/max: Valid range for sliders
// - step: Increment for sliders
// - unit: Display suffix ("/s", "x", etc.)
// - description: Help text for users
//
// 🔧 MODIFICATION GUIDE:
// - Add new settings by following the existing pattern
// - Update min/max/step for appropriate ranges
// - Use descriptive labels and units
// - Test with SettingsScreen component
// ============================================================================

export const settingsConfig = {
  // 🧑‍🚀 PLAYER SETTINGS - User-controlled player abilities
  player: {
    speed: {
      label: 'Movement Speed',
      default: 5,      // Units per second
      min: 1,          // Very slow (for accessibility)
      max: 15,         // Very fast (for speedrunners)
      step: 0.5,       // Smooth slider control
      unit: '',        // No unit needed for speed
      description: 'How fast the player moves around the world'
    },
    health: {
      label: 'Max Health',
      default: 100,    // Standard health pool
      min: 1,          // Minimal health (hard mode)
      max: 300,        // High health (easy mode)
      step: 1,         // Integer values only
      unit: '',        // No unit needed for health
      description: 'Maximum health points (affects healing and difficulty)'
    },
    fireRate: {
      label: 'Fire Rate',
      default: 2,      // Shots per second
      min: 0.5,        // Slow fire rate
      max: 10,         // Very fast fire rate
      step: 0.1,       // Precise control
      unit: '/s',      // Shots per second
      description: 'How many bullets you can fire per second'
    }
  },

  // 👹 ENEMY SETTINGS - Difficulty and challenge controls
  enemies: {
    speedMultiplier: {
      label: 'Enemy Speed',
      default: 1.0,    // Normal speed
      min: 0.5,        // Half speed (easier)
      max: 3.0,        // Triple speed (harder)
      step: 0.1,       // Fine control
      unit: 'x',       // Multiplier notation
      description: 'How fast enemies move (higher = more challenging)'
    },
    spawnRate: {
      label: 'Spawn Rate',
      default: 1.0,    // Normal spawn frequency
      min: 0.5,        // Half as many enemies
      max: 3.0,        // Three times as many enemies
      step: 0.1,       // Precise control
      unit: 'x',       // Multiplier notation
      description: 'How often new enemies appear (higher = more intense)'
    },
    maxCount: {
      label: 'Max Enemies',
      default: 15,     // Balanced enemy count
      min: 5,          // Minimal enemies (tutorial mode)
      max: 50,         // Maximum enemies (chaos mode)
      step: 1,         // Integer values only
      unit: '',        // No unit needed for count
      description: 'Maximum number of enemies that can exist at once'
    }
  },

  // 🎯 DIFFICULTY SETTINGS - Overall challenge level
  difficulty: {
    multiplier: {
      label: 'Difficulty',
      default: 1.0,    // Normal difficulty
      min: 0.5,        // Very easy
      max: 5.0,        // Extremely hard
      step: 0.1,       // Fine-grained control
      unit: 'x',       // Multiplier notation
      description: 'Overall difficulty multiplier affecting all game systems'
    }
  }
};

/**
 * 🏷️ SETTING LABEL FORMATTER - Create User-Friendly Display Labels
 * ============================================================
 *
 * @description Formats setting values with proper labels and units for UI display
 * @param {string} category - Setting category ('player', 'enemies', 'difficulty')
 * @param {string} key - Setting key within category ('speed', 'health', etc.)
 * @param {number} value - Current setting value to format
 * @returns {string} Formatted label like "Movement Speed: 5.0" or "Fire Rate: 2.5/s"
 *
 * 🎯 USAGE EXAMPLES:
 * ```javascript
 * const label = getSettingLabel('player', 'speed', 7.5);
 * // Returns: "Movement Speed: 7.5"
 *
 * const fireLabel = getSettingLabel('player', 'fireRate', 3.2);
 * // Returns: "Fire Rate: 3.2/s"
 * ```
 *
 * 🔧 FORMATTING RULES:
 * - Uses setting.label for display name
 * - Adds unit suffix if specified ("/s", "x", etc.)
 * - Rounds decimal values to 1 decimal place
 * - Falls back to generic format if setting not found
 */
export const getSettingLabel = (category, key, value) => {
  const setting = settingsConfig[category]?.[key];
  if (!setting) return `${key}: ${value}`;

  const unit = setting.unit ? setting.unit : '';
  const formattedValue = typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value;

  return `${setting.label}: ${formattedValue}${unit}`;
};

/**
 * ⚙️ SETTING CONFIG GETTER - Retrieve Complete Setting Configuration
 * ===============================================================
 *
 * @description Gets the complete configuration object for a specific setting
 * @param {string} category - Setting category ('player', 'enemies', 'difficulty')
 * @param {string} key - Setting key within category
 * @returns {Object|null} Complete setting config or null if not found
 *
 * 🎯 USAGE EXAMPLES:
 * ```javascript
 * const speedConfig = getSettingConfig('player', 'speed');
 * // Returns: { label: 'Movement Speed', default: 5, min: 1, max: 15, ... }
 * ```
 *
 * 📊 RETURNED CONFIG INCLUDES:
 * - label: Display name
 * - default: Default value
 * - min/max: Valid range
 * - step: Slider increment
 * - unit: Display suffix
 * - description: Help text
 */
export const getSettingConfig = (category, key) => {
  return settingsConfig[category]?.[key] || null;
};

/**
 * 📂 CATEGORY SETTINGS GETTER - Get All Settings in a Category
 * ==========================================================
 *
 * @description Retrieves all settings within a specific category
 * @param {string} category - Category name ('player', 'enemies', 'difficulty')
 * @returns {Object} All settings in the category as key-value pairs
 *
 * 🎯 USAGE EXAMPLES:
 * ```javascript
 * const playerSettings = getCategorySettings('player');
 * // Returns: { speed: {...}, health: {...}, fireRate: {...} }
 *
 * // Iterate through all player settings
 * Object.entries(playerSettings).forEach(([key, config]) => {
 *   console.log(`${config.label}: ${config.default}${config.unit}`);
 * });
 * ```
 *
 * 🔧 USEFUL FOR:
 * - Building settings UI for entire categories
 * - Bulk operations on related settings
 * - Category-specific validation
 */
export const getCategorySettings = (category) => {
  return settingsConfig[category] || {};
};

/**
 * 📁 ALL CATEGORIES GETTER - Get List of All Setting Categories
 * ===========================================================
 *
 * @description Returns array of all available setting category names
 * @returns {Array<string>} List of category names ['player', 'enemies', 'difficulty']
 *
 * 🎯 USAGE EXAMPLES:
 * ```javascript
 * const categories = getAllCategories();
 * // Returns: ['player', 'enemies', 'difficulty']
 *
 * // Build complete settings UI
 * categories.forEach(category => {
 *   const settings = getCategorySettings(category);
 *   // Create UI section for this category
 * });
 * ```
 *
 * 🎮 APPLICATIONS:
 * - Dynamic settings menu generation
 * - Category-based organization in UI
 * - Bulk operations across all settings
 * - Settings persistence and loading
 */
export const getAllCategories = () => {
  return Object.keys(settingsConfig);
};