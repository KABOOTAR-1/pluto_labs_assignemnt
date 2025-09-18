// ============================================================================
// 🎮 CORE GAME STATE ATOMS - Global Game Management
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ These atoms control the overall game flow and UI state
// ✅ Use these to change game screens, track progress, and manage sessions
// ✅ Components subscribe to these atoms to show/hide different UI elements
// ✅ Modify these when implementing new game states or scoring systems
//
// 📊 ATOM USAGE PATTERNS:
// - gameStateAtom: Controls which screen is displayed (menu, playing, game over)
// - scoreAtom: Tracks player progress and achievements
// - enemiesKilledAtom: Statistics and difficulty scaling
//
// 🔄 STATE FLOW: MENU → PLAYING → GAME_OVER → MENU (loop)
// ============================================================================

import { atom } from 'jotai';
import { GAME_STATES } from '../constants';

/**
 * 🎲 GAME STATE ATOM - Controls UI Screen Display
 * ================================================
 *
 * @description Master control for which screen/interface is shown to player
 * @type {string} - One of GAME_STATES values: 'menu', 'playing', 'gameOver', 'settings'
 * @default GAME_STATES.MENU
 *
 * 🎯 USAGE EXAMPLES:
 * - Set to 'playing' when game starts
 * - Set to 'gameOver' when player dies
 * - Set to 'settings' when player opens settings menu
 * - Components use this to conditionally render different screens
 *
 * 🔄 STATE TRANSITIONS:
 * MENU → PLAYING (start game)
 * PLAYING → GAME_OVER (player death)
 * GAME_OVER → MENU (restart)
 * Any state → SETTINGS (pause menu)
 */
export const gameStateAtom = atom(GAME_STATES.MENU);

/**
 * 🏆 SCORE ATOM - Player Progress Tracking
 * =======================================
 *
 * @description Tracks player's current score during active gameplay
 * @type {number} - Points accumulated from killing enemies
 * @default 0
 *
 * 🎯 USAGE EXAMPLES:
 * - Increases when player kills enemies (based on enemy point values)
 * - Resets to 0 when starting new game
 * - Used by HUD to display current score
 * - Can trigger win conditions if score reaches target
 *
 * 📊 SCORING SYSTEM:
 * - Fast enemies: 15 points
 * - Tank enemies: 25 points
 * - Bonus multipliers can be applied
 */
export const scoreAtom = atom(0);

/**
 * 💀 ENEMIES KILLED ATOM - Combat Statistics
 * ==========================================
 *
 * @description Counts total enemies defeated in current game session
 * @type {number} - Running total of enemy kills
 * @default 0
 *
 * 🎯 USAGE EXAMPLES:
 * - Increments each time an enemy is destroyed
 * - Used for statistics and achievements
 * - Can influence difficulty scaling
 * - Resets to 0 when starting new game
 * - Displayed in game over screen and HUD
 *
 * 📈 STATISTICS TRACKING:
 * - Helps balance difficulty based on player skill
 * - Used for high score systems
 * - Can unlock special abilities or bonuses
 */
export const enemiesKilledAtom = atom(0);