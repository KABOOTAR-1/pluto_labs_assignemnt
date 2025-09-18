// ============================================================================
// SETTINGS & CONFIGURATION ATOMS
// ============================================================================

import { atom } from 'jotai';
import { gameConfig } from '../gameConfig';

/**
 * 👁️ SHOW HUD ATOM - Interface Visibility Control
 * ===============================================
 *
 * @description Controls whether the Heads-Up Display is visible during gameplay
 * @type {boolean} - true = show HUD, false = hide HUD (minimalist mode)
 * @default true
 *
 * 🎯 USAGE EXAMPLES:
 * - Toggle for clean screenshots or cinematic moments
 * - Accessibility option for players who prefer minimal UI
 * - Can be bound to keyboard shortcut (H key)
 * - Useful during tutorials or special game modes
 *
 * 🎮 IMPACT ON GAMEPLAY:
 * - When false: No health bar, score display, or weapon indicators
 * - When true: Full UI overlay with all game information
 * - Settings screen can control this preference
 */
export const showHUDAtom = atom(true);

// ============================================================================
// USER-CONFIGURABLE SETTINGS (persistent preferences)
// ============================================================================

/**
 * 🏃‍♂️ BASE PLAYER SPEED ATOM - Movement Speed Preference
 * =====================================================
 *
 * @description User's preferred base movement speed (saved setting)
 * @type {number} - Units per second movement speed
 * @default gameConfig.player.speed (typically 5)
 *
 * 🎯 USAGE EXAMPLES:
 * - Settings menu slider: "Movement Speed: Slow/Normal/Fast"
 * - Saved to localStorage for persistent preferences
 * - Affects base player movement before power-ups/debuffs
 * - Can be overridden by activePlayerSpeedAtom during gameplay
 *
 * ⚙️ SETTINGS INTEGRATION:
 * - UI: Slider from 3 (slow) to 8 (fast)
 * - Default: 5 (normal speed)
 * - Persistence: Save on change, load on game start
 */
export const basePlayerSpeedAtom = atom(gameConfig.player.speed);

/**
 * ❤️ BASE PLAYER HEALTH ATOM - Health Capacity Preference
 * =====================================================
 *
 * @description User's preferred maximum health capacity (saved setting)
 * @type {number} - Maximum health points
 * @default gameConfig.player.health (typically 100)
 *
 * 🎯 USAGE EXAMPLES:
 * - Settings menu: "Health: Low/Normal/High"
 * - Affects starting health and healing amounts
 * - Saved preference for accessibility/difficulty
 * - Can be different from activePlayerHealthAtom during gameplay
 *
 * ⚙️ SETTINGS INTEGRATION:
 * - UI: Options like 50/75/100/150 health
 * - Default: 100 (standard health)
 * - Affects: Starting health, healing pickups, UI scaling
 */
export const basePlayerHealthAtom = atom(gameConfig.player.health);

/**
 * 🔫 BASE PLAYER FIRE RATE ATOM - Shooting Speed Preference
 * =======================================================
 *
 * @description User's preferred shooting speed (saved setting)
 * @type {number} - Shots per second
 * @default gameConfig.player.fireRate (typically 2)
 *
 * 🎯 USAGE EXAMPLES:
 * - Settings menu: "Fire Rate: Slow/Normal/Fast"
 * - Controls automatic weapon firing speed
 * - Saved for player comfort and skill level
 * - Affects gameplay pacing and difficulty
 *
 * ⚙️ SETTINGS INTEGRATION:
 * - UI: Slider from 1 (slow) to 5 (very fast)
 * - Default: 2 shots per second
 * - Affects: Combat difficulty, resource management
 */
export const basePlayerFireRateAtom = atom(gameConfig.player.fireRate);

/**
 * 👹 ENEMY SPEED MULTIPLIER ATOM - Enemy Difficulty Setting
 * =======================================================
 *
 * @description Global multiplier for all enemy movement speeds
 * @type {number} - Speed multiplier (0.5 = half speed, 2.0 = double speed)
 * @default 1.0 (normal speed)
 *
 * 🎯 USAGE EXAMPLES:
 * - Difficulty settings: "Enemy Speed: Easy/Normal/Hard"
 * - Accessibility: Slower enemies for players with motor challenges
 * - Balance testing: Quickly adjust enemy difficulty
 * - Affects all enemy types uniformly
 *
 * ⚙️ SETTINGS INTEGRATION:
 * - UI: Slider from 0.5 (easy) to 2.0 (hard)
 * - Default: 1.0 (normal difficulty)
 * - Real-time: Changes apply immediately to existing enemies
 */
export const enemySpeedMultiplierAtom = atom(1.0);

/**
 * ⏰ ENEMY SPAWN RATE ATOM - Enemy Frequency Setting
 * ================================================
 *
 * @description Controls how often new enemies spawn
 * @type {number} - Spawn rate multiplier (0.5 = half frequency, 2.0 = double)
 * @default 1.0 (normal spawn rate)
 *
 * 🎯 USAGE EXAMPLES:
 * - Difficulty settings: "Spawn Rate: Low/Normal/High"
 * - Accessibility: Fewer enemies for beginners
 * - Performance: Reduce spawns on lower-end devices
 * - Affects enemy spawner timing
 *
 * ⚙️ SETTINGS INTEGRATION:
 * - UI: Slider from 0.3 (few enemies) to 2.0 (many enemies)
 * - Default: 1.0 (normal frequency)
 * - Real-time: Affects future spawns, not existing enemies
 */
export const enemySpawnRateAtom = atom(1.0);

/**
 * 🎯 DIFFICULTY MULTIPLIER ATOM - Overall Challenge Setting
 * =======================================================
 *
 * @description Master difficulty setting affecting multiple game systems
 * @type {number} - Difficulty multiplier (0.5 = easy, 2.0 = hard)
 * @default 1.0 (normal difficulty)
 *
 * 🎯 USAGE EXAMPLES:
 * - Main difficulty selector: "Easy/Normal/Hard/Expert"
 * - Affects: Enemy speed, spawn rate, damage, player health
 * - One-stop difficulty adjustment for players
 * - Can be combined with individual settings
 *
 * ⚙️ SETTINGS INTEGRATION:
 * - UI: Preset buttons or slider
 * - Default: 1.0 (normal)
 * - Affects: Multiple atoms simultaneously
 * - Real-time: Applies to all affected systems
 */
export const difficultyMultiplierAtom = atom(1.0);

/**
 * 👥 MAX ENEMIES SETTING ATOM - Enemy Population Control
 * ====================================================
 *
 * @description Maximum number of enemies allowed on screen simultaneously
 * @type {number} - Maximum enemy count
 * @default gameConfig.enemySettings.maxOnScreen (typically 15)
 *
 * 🎯 USAGE EXAMPLES:
 * - Performance settings: Reduce for lower-end devices
 * - Difficulty: Fewer enemies for easier gameplay
 * - Screen space: Limit for crowded displays
 * - Affects enemy spawning and cleanup
 *
 * ⚙️ SETTINGS INTEGRATION:
 * - UI: Slider from 5 (minimal) to 25 (maximum)
 * - Default: 15 enemies
 * - Performance: Lower values help with frame rate
 * - Real-time: Affects future spawns, may gradually reduce existing count
 */
export const maxEnemiesSettingAtom = atom(gameConfig.enemySettings.maxOnScreen);