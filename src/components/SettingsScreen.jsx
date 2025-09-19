// ============================================================================
// ⚙️ SETTINGS SCREEN COMPONENT - Game Configuration Interface
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This provides a complete settings interface for game customization
// ✅ Controls all user-configurable game parameters with real-time sliders
// ✅ Automatically saves settings to atoms (persistent across sessions)
// ✅ Uses settingsConfig.js for UI generation and validation
//
// 📊 COMPONENT BEHAVIOR:
// - Only visible when gameState === 'settings'
// - Provides sliders for all configurable game parameters
// - Changes apply immediately (real-time updates)
// - Preserves previous game state for seamless navigation
// - Uses sessionStorage to remember where user came from
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎨 VISUAL CUSTOMIZATION:
// ADD NEW:
// - Add theme selector dropdown for visual theme switching
// - Include preset difficulty buttons (Easy/Normal/Hard)
// - Add reset to defaults button for each category
// - Include visual previews of setting changes
//
// MODIFY EXISTING:
// - Change "SETTINGS" title to match your game theme (e.g., "GAME CONFIG", "OPTIONS")
// - Modify category names: "Player" → "Character", "Enemies" → "Opponents", etc.
// - Change slider colors by modifying CSS .setting-item input[type="range"]
// - Update button text "BACK" → "RETURN", "CLOSE", "DONE", etc.
// - Customize category icons by adding them before h3 elements
//
// 🎮 FUNCTIONAL MODIFICATIONS:
// ADD NEW:
// - Add new setting categories (Audio, Graphics, Controls)
// - Implement setting profiles (Beginner/Expert configurations)
// - Add import/export settings functionality
// - Include accessibility options (colorblind support, etc.)
//
// MODIFY EXISTING:
// - Change setting ranges by updating settingsConfig.js min/max/step values
// - Remove unwanted settings by deleting their setting-item divs
// - Reorder settings by moving setting-item divs within categories
// - Change setting categories by renaming h3 elements and updating groupings
// - Modify onChange handlers to add custom logic (validation, side effects)
// - Update slider precision by changing parseFloat/parseInt parsing
//
// 📱 LAYOUT ENHANCEMENTS:
// - Add tabbed interface for different setting categories
// - Implement collapsible sections for better organization
// - Include tooltips explaining what each setting does
// - Add keyboard navigation support
//
// 🔄 STATE MANAGEMENT:
// - gameStateAtom: Controls visibility and navigation
// - Settings atoms: Individual settings that persist between sessions
// - settingsConfig: Provides UI metadata (labels, min/max, steps)
// - sessionStorage: Preserves navigation state for seamless back navigation
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/config/settingsConfig.js: Add new settings definitions
// - src/config/atoms/settingsAtoms.js: Add new setting atoms
// - src/App.css: Styling for settings UI (.settings-container, .setting-group)
// - src/hooks/useSettingsNavigation.js: Navigation logic
// - src/components/StartScreen.jsx: Entry point to settings
//
// 🎨 STYLING DEPENDENCIES:
// - .settings-screen: Full-screen overlay positioning
// - .settings-container.scrollable: Scrollable container for many settings
// - .setting-group.compact: Category grouping with glassmorphism effect
// - .setting-item.compact: Individual setting with slider
// - .screen-content.compact: Compact layout for settings interface
//
// 🔗 ATOM DEPENDENCIES:
// - gameStateAtom: Navigation and visibility control
// - basePlayer*Atoms: User's preferred player settings (persistent)
// - enemy*Atoms: Enemy difficulty and behavior settings
// - activePlayerHealthAtom: Current health during gameplay (temporary)
//
// ⚠️ IMPORTANT NOTES:
// - Settings changes apply IMMEDIATELY (no save button needed)
// - Uses sessionStorage for navigation state preservation
// - Slider ranges come from settingsConfig.js (centralized validation)
// - Health setting shows current/max format for active gameplay
// - Back button restores exact previous state (menu/playing/gameOver)
//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASES:
// ============================================================================
//
// 📝 ADD NEW SETTING CATEGORY:
// 1. Add category to settingsConfig.js
// 2. Create atoms in settingsAtoms.js
// 3. Import atoms and add UI section here
//
// 🎮 ADD PRESET DIFFICULTY BUTTONS:
// Add buttons that set multiple atoms at once (Easy/Normal/Hard)
//
// 🎨 ADD THEME SELECTOR:
// Import selectedThemeAtom and create dropdown for theme switching
//
// 📱 ADD MOBILE-SPECIFIC SETTINGS:
// Include touch sensitivity, button size, etc.
//
// 🔊 ADD AUDIO SETTINGS:
// Add volume sliders, sound effect toggles, music selection
//
// ✏️ MODIFICATION EXAMPLES:
// ============================================================================
//
// 🏷️ CHANGE SETTING LABELS:
// Replace: <h3>Player</h3> → <h3>Hero</h3> or <h3>Character</h3>
// Replace: <h3>Enemies</h3> → <h3>Monsters</h3> or <h3>Opponents</h3>
//
// 🎯 CHANGE TITLE:
// Replace: <h1>SETTINGS</h1> → <h1>GAME OPTIONS</h1> or <h1>CONFIGURATION</h1>
//
// 🔘 CHANGE BUTTON TEXT:
// Replace: BACK → RETURN, CLOSE, DONE, EXIT, etc.
//
// 📊 MODIFY SETTING RANGES:
// In settingsConfig.js, change min/max values:
// speed: { min: 1, max: 15 } → { min: 2, max: 20 } (faster game)
//
// 🗑️ REMOVE UNWANTED SETTINGS:
// Delete entire setting-item div blocks you don't need
// Example: Remove fire rate by deleting lines 230-241
//
// 📋 REORDER SETTINGS:
// Move setting-item divs up/down within their category
// Example: Put health setting first by moving it above speed
//
// 🎨 CHANGE SLIDER APPEARANCE:
// In App.css, modify .setting-item input[type="range"] styles
// Change colors, sizes, thumb appearance
//
// 🔧 ADD VALIDATION TO SLIDERS:
// Modify onChange handlers:
// onChange={(e) => {
//   const value = parseFloat(e.target.value);
//   if (value >= 5) setPlayerSpeed(value); // Minimum speed validation
// }}
//
// 📱 CHANGE LAYOUT:
// Modify .screen-content.compact class to adjust width/spacing
// Change .settings-container.scrollable for different scroll behavior
// ============================================================================

import React from 'react';
import { useAtom } from 'jotai';
import {
  gameStateAtom,
  activePlayerHealthAtom,
  basePlayerSpeedAtom,
  basePlayerHealthAtom,
  basePlayerFireRateAtom,
  enemySpeedMultiplierAtom,
  enemySpawnRateAtom,
  difficultyMultiplierAtom,
  maxEnemiesSettingAtom
} from '../config/atoms';
import { settingsConfig, getSettingLabel } from '../config/settingsConfig';

/**
 * ⚙️ SETTINGS SCREEN COMPONENT - Game Configuration Interface
 * ==========================================================
 *
 * @description Comprehensive settings interface for all user-configurable game parameters
 * @returns {JSX.Element} Full-screen settings interface with organized categories and sliders
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Display all configurable game settings in organized categories
 * - Provide real-time sliders for immediate setting changes
 * - Show current values with proper units and formatting
 * - Handle navigation back to previous game state
 * - Preserve settings across game sessions
 *
 * 🔄 STATE INTERACTIONS:
 * - Reads gameState to determine visibility
 * - Reads/writes all settings atoms for configuration
 * - Uses sessionStorage for navigation state preservation
 * - Applies changes immediately (no save button needed)
 *
 * 🎨 STYLING CLASSES:
 * - .settings-screen: Full-screen overlay with conditional display
 * - .settings-container.scrollable: Scrollable container for settings
 * - .setting-group.compact: Category sections with glassmorphism
 * - .setting-item.compact: Individual settings with labels and sliders
 * - .screen-content.compact: Compact layout for settings interface
 */
const SettingsScreen = () => {
  // 🎲 NAVIGATION STATE MANAGEMENT
  // Controls settings screen visibility and handles back navigation
  const [gameState, setGameState] = useAtom(gameStateAtom);
  
  // 🧑‍🚀 PLAYER CONFIGURATION ATOMS
  // User's preferred player settings (persistent across sessions)
  const [currentPlayerHealth, setCurrentPlayerHealth] = useAtom(activePlayerHealthAtom);
  const [playerSpeed, setPlayerSpeed] = useAtom(basePlayerSpeedAtom);
  const [playerHealthSetting] = useAtom(basePlayerHealthAtom); // Read-only for display
  const [playerFireRate, setPlayerFireRate] = useAtom(basePlayerFireRateAtom);
  
  // 👹 ENEMY CONFIGURATION ATOMS
  // Difficulty and enemy behavior settings
  const [enemySpeedMultiplier, setEnemySpeedMultiplier] = useAtom(enemySpeedMultiplierAtom);
  const [enemySpawnRate, setEnemySpawnRate] = useAtom(enemySpawnRateAtom);
  const [maxEnemies, setMaxEnemies] = useAtom(maxEnemiesSettingAtom);
  
  // 🎯 DIFFICULTY CONFIGURATION ATOMS
  // Overall game difficulty settings
  const [difficultyMultiplier, setDifficultyMultiplier] = useAtom(difficultyMultiplierAtom);

  /**
   * 🔙 BACK NAVIGATION HANDLER - Return to Previous State
   * ===================================================
   *
   * @description Restores the previous game state and cleans up navigation storage
   * @effects:
   * - Retrieves previous state from sessionStorage ('menu', 'playing', 'gameOver')
   * - Sets gameState to previous state (seamless navigation)
   * - Cleans up sessionStorage to prevent memory leaks
   * - Falls back to 'menu' if no previous state found
   *
   * 🔄 NAVIGATION FLOW:
   * - User came from StartScreen → returns to 'menu'
   * - User came from GameRenderer → returns to 'playing'
   * - User came from GameOverScreen → returns to 'gameOver'
   */
  const handleBack = () => {
    // Restore the previous game state (either 'playing' or 'menu')
    const previousState = sessionStorage.getItem('previousGameState') || 'menu';
    setGameState(previousState);
    sessionStorage.removeItem('previousGameState');
  };

  // 🎨 RENDER SETTINGS INTERFACE
  return (
    <div
      className="game-screen settings-screen"
      style={{ display: gameState !== 'settings' ? 'none' : 'flex' }}
    >
      {/* 📦 CONTENT CONTAINER - Compact layout for settings interface */}
      <div className="screen-content compact">
        {/* 🎯 SETTINGS TITLE - Clear identification of settings screen */}
        <h1>SETTINGS</h1>

        {/* 📋 SETTINGS CONTAINER - Scrollable container for all setting categories */}
        <div className="settings-container scrollable">
          
          {/* 🧑‍🚀 PLAYER SETTINGS CATEGORY - User character configuration */}
          <div className="setting-group compact">
            <h3>Player</h3>

            {/* 🏃‍♂️ MOVEMENT SPEED SETTING - How fast player moves */}
            <div className="setting-item compact">
              <label>{getSettingLabel('player', 'speed', playerSpeed)}</label>
              <input
                type="range"
                min={settingsConfig.player.speed.min}
                max={settingsConfig.player.speed.max}
                step={settingsConfig.player.speed.step}
                value={playerSpeed}
                onChange={(e) => setPlayerSpeed(parseFloat(e.target.value))}
              />
            </div>

            {/* ❤️ HEALTH SETTING - Player health capacity with current/max display */}
            <div className="setting-item compact">
              <label>{getSettingLabel('player', 'health', currentPlayerHealth)}/{playerHealthSetting}</label>
              <input
                type="range"
                min={settingsConfig.player.health.min}
                max={settingsConfig.player.health.max}
                step={settingsConfig.player.health.step}
                value={currentPlayerHealth}
                onChange={(e) => {
                  const newHealth = parseInt(e.target.value);
                  setCurrentPlayerHealth(newHealth);
                }}
              />
            </div>

            {/* 🔫 FIRE RATE SETTING - How fast player can shoot */}
            <div className="setting-item compact">
              <label>{getSettingLabel('player', 'fireRate', playerFireRate)}</label>
              <input
                type="range"
                min={settingsConfig.player.fireRate.min}
                max={settingsConfig.player.fireRate.max}
                step={settingsConfig.player.fireRate.step}
                value={playerFireRate}
                onChange={(e) => setPlayerFireRate(parseFloat(e.target.value))}
              />
            </div>
          </div>

          {/* 👹 ENEMY SETTINGS CATEGORY - Enemy difficulty and behavior */}
          <div className="setting-group compact">
            <h3>Enemies</h3>

            {/* 🏃‍♂️ ENEMY SPEED MULTIPLIER - Global enemy movement speed */}
            <div className="setting-item compact">
              <label>{getSettingLabel('enemies', 'speedMultiplier', enemySpeedMultiplier)}</label>
              <input
                type="range"
                min={settingsConfig.enemies.speedMultiplier.min}
                max={settingsConfig.enemies.speedMultiplier.max}
                step={settingsConfig.enemies.speedMultiplier.step}
                value={enemySpeedMultiplier}
                onChange={(e) => setEnemySpeedMultiplier(parseFloat(e.target.value))}
              />
            </div>

            {/* ⏰ SPAWN RATE SETTING - How frequently enemies appear */}
            <div className="setting-item compact">
              <label>{getSettingLabel('enemies', 'spawnRate', enemySpawnRate)}</label>
              <input
                type="range"
                min={settingsConfig.enemies.spawnRate.min}
                max={settingsConfig.enemies.spawnRate.max}
                step={settingsConfig.enemies.spawnRate.step}
                value={enemySpawnRate}
                onChange={(e) => setEnemySpawnRate(parseFloat(e.target.value))}
              />
            </div>

            {/* 👥 MAX ENEMIES SETTING - Maximum concurrent enemy count */}
            <div className="setting-item compact">
              <label>{getSettingLabel('enemies', 'maxCount', maxEnemies)}</label>
              <input
                type="range"
                min={settingsConfig.enemies.maxCount.min}
                max={settingsConfig.enemies.maxCount.max}
                step={settingsConfig.enemies.maxCount.step}
                value={maxEnemies}
                onChange={(e) => setMaxEnemies(parseInt(e.target.value))}
              />
            </div>
          </div>

          {/* 🎯 DIFFICULTY SETTINGS CATEGORY - Overall challenge level */}
          <div className="setting-group compact">
            <h3>Difficulty</h3>

            {/* 📈 DIFFICULTY MULTIPLIER - Master difficulty control */}
            <div className="setting-item compact">
              <label>{getSettingLabel('difficulty', 'multiplier', difficultyMultiplier)}</label>
              <input
                type="range"
                min={settingsConfig.difficulty.multiplier.min}
                max={settingsConfig.difficulty.multiplier.max}
                step={settingsConfig.difficulty.multiplier.step}
                value={difficultyMultiplier}
                onChange={(e) => setDifficultyMultiplier(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* 🔙 NAVIGATION CONTROLS - Back button to return to previous state */}
        <div className="buttons-container compact">
          <button className="game-button compact" onClick={handleBack}>
            BACK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;