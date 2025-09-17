import { useAtom } from 'jotai';
import { gameStateAtom } from '../config/atoms';

/**
 * Custom hook for handling navigation to settings screen
 * Eliminates code duplication across multiple components
 *
 * @returns {Object} - Object containing navigation functions
 */
export const useSettingsNavigation = () => {
  const [gameState, setGameState] = useAtom(gameStateAtom);

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