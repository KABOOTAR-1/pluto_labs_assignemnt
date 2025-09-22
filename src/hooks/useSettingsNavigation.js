// ============================================================================
// ⚙️ USE SETTINGS NAVIGATION HOOK - Settings Screen Navigation System
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS HOOK:
// ✅ This handles navigation to and from settings screen with state preservation
// ✅ Uses sessionStorage to remember previous game state for proper navigation
// ✅ Currently used by StartScreen, GameOverScreen, and SettingsScreen components
// ✅ Provides consistent navigation behavior across all game screens
// ✅ Eliminates code duplication for settings navigation logic
// ✅ Requires gameState and setGameState props from component (no internal atom dependency)
//
// 📊 WHAT USESETTINGSNAVIGATION ACTUALLY DOES:
// - State preservation: saves current game state before navigating to settings
// - Navigation management: provides functions to go to and return from settings
// - Session storage: uses browser sessionStorage for temporary state storage
// - State checking: provides utility to check if currently in settings
// - Game state integration: works with gameState and setGameState props from component
//
// 📊 WHAT USESETTINGSNAVIGATION DOES NOT DO (happens elsewhere):
// - Settings UI rendering: handled by SettingsScreen component
// - Settings values management: handled by settings atoms
// - Game state transitions: only handles settings-related navigation
// - Settings persistence: handled by Jotai atom persistence
//
// 🔄 STATE MANAGEMENT:
// - gameState: Current game state prop from component (required)
// - setGameState: State setter function prop from component (required)
// - sessionStorage: Browser storage for temporary previous state
// - Returns: Object with navigation functions and state utilities


/**
 * ⚙️ USE SETTINGS NAVIGATION HOOK - Settings Screen Navigation System
 * ==================================================================
 *
 * @description Handles navigation to and from settings screen with state preservation
 * @param {string} gameState - Current game state (required)
 * @param {Function} setGameState - Function to update game state (required)
 * @returns {Object} Object containing navigation functions and utilities
 *
 * 🎯 HOOK RESPONSIBILITIES:
 * - Provide goToSettings function for navigating to settings
 * - Provide goBackFromSettings function for returning to previous screen
 * - Store and restore previous game state using sessionStorage
 * - Provide isInSettings utility for conditional rendering
 * - Eliminate code duplication across multiple components
 *
 * ⚙️ NAVIGATION MECHANICS:
 * - State Preservation: Saves current state before going to settings
 * - Session Storage: Uses browser sessionStorage for temporary storage
 * - State Restoration: Restores previous state when returning from settings
 * - Fallback: Defaults to 'menu' if no previous state found
 * - Cleanup: Removes stored state after restoration
 *
 * 🚀 CURRENT USAGE:
 * - StartScreen Component: "SETTINGS" button navigation
 * - GameOverScreen Component: "SETTINGS" button navigation
 * - SettingsScreen Component: "BACK" button navigation
 * - Navigation Consistency: Ensures proper state flow across screens
 */
export const useSettingsNavigation = (gameState, setGameState) => {

  /**
   * Navigate to settings screen, storing current game state
   */
  const goToSettings = () => {
    // Store current state before opening settings
    sessionStorage.setItem('previousGameState', gameState);
    setGameState('settings');
  };

  /**
   * Navigate back from settings to previous screen
   */
  const goBackFromSettings = () => {
    // Restore the previous game state
    const previousState = sessionStorage.getItem('previousGameState') || 'menu';
    setGameState(previousState);
    sessionStorage.removeItem('previousGameState');
  };

  /**
   * Check if currently in settings
   */
  const isInSettings = gameState === 'settings';

  return {
    goToSettings,
    goBackFromSettings,
    isInSettings,
    currentState: gameState
  };
};