// ============================================================================
// 💀 GAME OVER SCREEN COMPONENT - End Game Results Interface
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This displays final game results when player dies or game ends
// ✅ Shows player statistics (score, enemies killed) and performance metrics
// ✅ Provides navigation options to restart, return to menu, or access settings
// ✅ Uses conditional rendering based on game state atom
//
// 📊 COMPONENT BEHAVIOR:
// - Only renders when gameState === 'gameOver'
// - Displays final score and enemies killed statistics
// - Provides three action buttons: PLAY AGAIN, MAIN MENU, SETTINGS
// - Uses reusable UI components (ScreenHeader, StatsPanel)
// - Handles navigation and game state transitions
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎨 VISUAL CUSTOMIZATION:
// ADD NEW:
// - Add high score display and comparison with previous best
// - Include achievement badges or unlocked content notifications
// - Add animated statistics counters for dramatic effect
// - Include performance ratings (S/A/B/C grades based on performance)
// - Add social sharing buttons for scores and achievements
//
// MODIFY EXISTING:
// - Change "GAME OVER" title to match theme ("MISSION FAILED", "DEFEATED", "WASTED")
// - Modify statistic labels: "SCORE" → "POINTS", "ENEMIES DESTROYED" → "KILLS", "FOES VANQUISHED"
// - Update button text: "PLAY AGAIN" → "RETRY", "RESTART", "TRY AGAIN"
// - Change button text: "MAIN MENU" → "HOME", "EXIT", "LOBBY"
// - Customize colors and styling to match game theme
//
// 🎮 FUNCTIONAL MODIFICATIONS:
// ADD NEW:
// - Add detailed statistics breakdown (accuracy, time survived, damage dealt)
// - Implement save/load high scores functionality
// - Add replay system to review last game session
// - Include progression system (XP gained, level ups)
// - Add difficulty recommendation based on performance
//
// MODIFY EXISTING:
// - Change which statistics are displayed by modifying StatsPanel props
// - Add validation to prevent accidental restarts
// - Modify navigation behavior (skip menu, go directly to game)
// - Add confirmation dialogs for destructive actions
// - Change the order of buttons based on expected user flow
//
// 📱 LAYOUT ENHANCEMENTS:
// ADD NEW:
// - Add tabbed interface showing different stat categories
// - Include visual charts/graphs of performance over time
// - Add screenshot capture of final game state
// - Implement responsive design for different screen sizes
//
// MODIFY EXISTING:
// - Change layout from vertical to horizontal button arrangement
// - Modify spacing and sizing of statistics display
// - Update component positioning and alignment
// - Change animation timing and effects
//
// 🔄 STATE MANAGEMENT:
// - gameStateAtom: Controls visibility and navigation transitions
// - resetGameAtom: Handles complete game state reset for new games
// - scoreAtom: Final score display (read-only on this screen)
// - enemiesKilledAtom: Combat statistics display (read-only)
// - useSettingsNavigation: Provides settings access with state preservation
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/components/ui/ScreenHeader.jsx: Reusable title component
// - src/components/ui/StatsPanel.jsx: Statistics display component
// - src/config/atoms/gameStateAtoms.js: Score and statistics management
// - src/config/atoms/titleAtoms.js: CREATE THIS for theme-based titles
// - src/config/themes/themes.js: Add titles object to each theme
// - src/hooks/useSettingsNavigation.js: Settings navigation logic
// - src/App.css: Styling for .game-over-screen, .stats-container, .stat-*
//
// 🎨 STYLING DEPENDENCIES:
// - .game-over-screen: Full-screen overlay positioning
// - .screen-content: Centered content container
// - .screen-header: Title styling and positioning
// - .stats-container: Statistics layout and spacing
// - .stat, .stat-label, .stat-value: Individual statistic styling
// - .buttons-container: Button layout and spacing
// - .game-button, .game-button.secondary: Button appearance and interactions
//
// 🔗 ATOM DEPENDENCIES:
// - gameStateAtom (read): Determines when to render this component
// - resetGameAtom (write): Resets game state when "PLAY AGAIN" clicked
// - scoreAtom (read): Final score for display
// - enemiesKilledAtom (read): Combat statistics for display
// - gameOverTitleAtom (read/write): Dynamic theme-based title (OPTIONAL - CREATE THIS)
// - useSettingsNavigation: Provides goToSettings() function
// - useCurrentTheme: Provides current theme data for titles (FOR DYNAMIC TITLES)
//
// ⚠️ IMPORTANT NOTES:
// - Component returns null when gameState !== 'gameOver' (conditional rendering)
// - resetGame() transitions state to 'playing' and resets all game variables
// - setGameState('menu') returns to main menu without resetting game data
// - Statistics are read-only snapshots of final game state
// - Settings navigation preserves 'gameOver' state in sessionStorage
//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASES:
// ============================================================================
//
// 📝 ADD NEW STATISTICS:
// Modify StatsPanel stats array to include additional metrics:
// stats={[
//   { label: "SCORE:", value: score },
//   { label: "ENEMIES DESTROYED:", value: enemiesKilled },
//   { label: "TIME SURVIVED:", value: timeAlive },
//   { label: "ACCURACY:", value: `${accuracy}%` }
// ]}
//
// 🎮 ADD HIGH SCORE SYSTEM:
// Import high score atoms and display comparison with personal best
//
// 🎨 CHANGE THEME TERMINOLOGY:
// METHOD 1 - Direct replacement:
// Replace "GAME OVER" with theme-appropriate text:
// - Medieval: "THOU HAST FALLEN", "QUEST FAILED"
// - Space: "MISSION TERMINATED", "SHIP DESTROYED"
// - Post-Apocalyptic: "YOU DIED", "WASTELAND CLAIMED YOU"
//
// METHOD 2 - Theme-based title system (RECOMMENDED):
// 1. Create titleAtoms.js in src/config/atoms/:
//    export const gameOverTitleAtom = atom('GAME OVER');
// 2. Add titles to each theme in themes.js:
//    space: { 
//      name: 'Deep Space',
//      titles: {
//        gameOver: 'MISSION TERMINATED',
//        start: 'SPACE COMMAND',
//        settings: 'SHIP CONFIG'
//      },
//      ...rest of theme
//    }
// 3. Import and use in component:
//    import { gameOverTitleAtom } from '../config/atoms/titleAtoms';
//    import { useCurrentTheme } from '../config/gameConfig';
//    const [, setGameOverTitle] = useAtom(gameOverTitleAtom);
//    const currentTheme = useCurrentTheme();
//    useEffect(() => {
//      setGameOverTitle(currentTheme.titles?.gameOver || 'GAME OVER');
//    }, [currentTheme, setGameOverTitle]);
//    const [gameOverTitle] = useAtom(gameOverTitleAtom);
// 4. Use dynamic title:
//    <ScreenHeader title={gameOverTitle} />
//
// 📱 ADD SOCIAL FEATURES:
// Include sharing buttons for social media integration
//
// 🏆 ADD ACHIEVEMENT SYSTEM:
// Display unlocked achievements or progress toward goals
//
// ✏️ MODIFICATION EXAMPLES:
// ============================================================================
//
// 🏷️ CHANGE TITLE:
// METHOD 1 - Direct replacement:
// Replace: title="GAME OVER" → title="MISSION FAILED" or title="WASTED"
//
// METHOD 2 - Dynamic theme-based titles (RECOMMENDED):
// 1. Create src/config/atoms/titleAtoms.js with title atoms
// 2. Add titles object to each theme in themes.js
// 3. Import title atom and theme hook in this component
// 4. Use useEffect to update title when theme changes
// 5. Replace static title with dynamic title from atom
// Example: <ScreenHeader title={gameOverTitle} /> instead of title="GAME OVER"
//
// 📊 MODIFY STATISTICS:
// Add new stats by expanding the stats array in StatsPanel
//
// 🔘 CHANGE BUTTON TEXT:
// Replace: "PLAY AGAIN" → "RETRY", "RESTART", "TRY AGAIN"
// Replace: "MAIN MENU" → "HOME", "EXIT", "LOBBY"
//
// 🗑️ REMOVE UNWANTED BUTTONS:
// Delete entire button elements you don't need
// Example: Remove settings button by deleting lines 39-41
//
// 📋 REORDER BUTTONS:
// Move button elements to change their display order
// Example: Put MAIN MENU first, then PLAY AGAIN
//
// 🎨 ADD CONFIRMATION DIALOGS:
// Modify button handlers to show confirmation before action:
// const handleRestart = () => {
//   if (confirm("Start a new game?")) resetGame();
// };
//
// 🏆 ADD PERFORMANCE RATING:
// Calculate and display performance grade based on score/time/accuracy
//
// 📱 CHANGE LAYOUT:
// Modify CSS classes or add new ones for different arrangements
// ============================================================================

import React from "react";
import { useAtom } from "jotai";
import { gameStateAtom, resetGameAtom, scoreAtom, enemiesKilledAtom } from "../config/atoms";
import { useSettingsNavigation } from "../hooks/useSettingsNavigation";
import ScreenHeader from "./ui/ScreenHeader";
import StatsPanel from "./ui/StatsPanel";

/**
 * 💀 GAME OVER SCREEN COMPONENT - End Game Results Interface
 * =========================================================
 *
 * @description Final screen displayed when player dies or game ends, showing statistics and navigation options
 * @returns {JSX.Element|null} Full-screen game over interface or null if not in game over state
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Display final game statistics (score, enemies killed)
 * - Provide restart functionality for immediate replay
 * - Offer navigation back to main menu
 * - Allow access to settings for configuration changes
 * - Handle game state transitions and resets
 *
 * 🔄 STATE INTERACTIONS:
 * - Reads gameState to determine visibility
 * - Reads score and enemiesKilled for statistics display
 * - Writes to resetGameAtom to start new game
 * - Writes to gameStateAtom for menu navigation
 * - Uses settings navigation hook for settings access
 *
 * 🎨 UI COMPONENTS:
 * - ScreenHeader: Reusable title component ("GAME OVER")
 * - StatsPanel: Flexible statistics display component
 * - Three action buttons with different priorities
 *
 * 🎮 USER ACTIONS:
 * - PLAY AGAIN: Immediate restart with full game reset
 * - MAIN MENU: Return to start screen without reset
 * - SETTINGS: Configure game options, return to game over after
 */
const GameOverScreen = () => {
  // 🎲 GAME STATE MANAGEMENT
  // Controls game over screen visibility and navigation
  const [gameState, setGameState] = useAtom(gameStateAtom);
  
  // 🔄 GAME RESET FUNCTIONALITY
  // resetGame initializes fresh game state and transitions to 'playing'
  const [, resetGame] = useAtom(resetGameAtom);
  
  // 📊 FINAL GAME STATISTICS
  // Read-only values displaying player's performance in completed game
  const [score] = useAtom(scoreAtom);
  const [enemiesKilled] = useAtom(enemiesKilledAtom);
  
  // ⚙️ SETTINGS NAVIGATION
  // goToSettings preserves 'gameOver' state and transitions to settings screen
  const { goToSettings } = useSettingsNavigation();

  // 👁️ CONDITIONAL RENDERING
  // Only show game over screen when game state is 'gameOver'
  // Returns null otherwise to hide component completely
  if (gameState !== "gameOver") return null;

  /**
   * 🔄 RESTART HANDLER - Begin New Game Session
   * ==========================================
   *
   * @description Triggers complete game state reset and begins fresh gameplay
   * @effects:
   * - Resets player to full health at starting position
   * - Clears all enemies and projectiles from game world
   * - Resets score and statistics to zero
   * - Changes game state from 'gameOver' to 'playing'
   * - Initializes default weapon/projectile type
   *
   * 🎮 USER EXPERIENCE:
   * - Immediate transition to gameplay (no menu navigation)
   * - All progress lost (intentional for fresh start)
   * - Player expects this behavior from "PLAY AGAIN" button
   */
  const handleRestart = () => resetGame();

  /**
   * 🏠 MAIN MENU HANDLER - Return to Start Screen
   * ============================================
   *
   * @description Navigates back to main menu while preserving game statistics
   * @effects:
   * - Changes game state from 'gameOver' to 'menu'
   * - Preserves final score and statistics (no reset)
   * - Shows start screen with game title and options
   * - Allows player to view settings or start fresh game
   *
   * 🎮 USER EXPERIENCE:
   * - Non-destructive navigation (statistics preserved)
   * - Player can review final stats before starting new game
   * - Standard "return to menu" behavior
   */
  const handleMainMenu = () => setGameState("menu");

  // 🎨 RENDER GAME OVER INTERFACE
  return (
    <div className="game-screen game-over-screen">
      {/* 📦 CONTENT CONTAINER - Centered content with standard layout */}
      <div className="screen-content">
        {/* 🎯 GAME OVER TITLE - Reusable header component with theme-appropriate title */}
        <ScreenHeader title="GAME OVER" />

        {/* 📊 STATISTICS DISPLAY - Flexible stats component showing final performance */}
        <StatsPanel
          stats={[
            { label: "SCORE:", value: score },
            { label: "ENEMIES DESTROYED:", value: enemiesKilled },
          ]}
        />

        {/* 🎮 ACTION BUTTONS - Three navigation options with different priorities */}
        <div className="buttons-container">
          {/* 🔄 PRIMARY ACTION - Immediate restart with full game reset */}
          <button className="game-button" onClick={handleRestart}>
            PLAY AGAIN
          </button>
          
          {/* 🏠 SECONDARY ACTION - Return to menu preserving statistics */}
          <button className="game-button secondary" onClick={handleMainMenu}>
            MAIN MENU
          </button>
          
          {/* ⚙️ TERTIARY ACTION - Access settings with state preservation */}
          <button className="game-button secondary" onClick={goToSettings}>
            SETTINGS
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
