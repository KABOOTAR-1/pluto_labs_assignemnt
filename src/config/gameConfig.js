import { atom, useAtom } from 'jotai';
import { PLAYER_BASE, baseGameConfig } from './baseConfigs';
import { THEMES, GAME_STATES, DEFAULT_CONFIG, ENEMY_SETTINGS } from './constants';
import { themes, getTheme } from './themes/themes';
import { useWorldBounds, isWithinBounds } from './configHelpers';
import { loadTheme } from './themeLoader';

// Re-export constants for backward compatibility
export { THEMES, GAME_STATES };

// Selected theme atom
export const selectedThemeAtom = atom(THEMES.CLASSIC);

// Main game configuration
export const gameConfig = {
  ...baseGameConfig,
  ...DEFAULT_CONFIG,

  // Gameplay player stats come from base
  player: { ...PLAYER_BASE },

  enemySettings: ENEMY_SETTINGS,

  // Theme-specific data (imported from modular file)
  themes,
};

// Enhanced helper functions with dynamic loading
export function useCurrentTheme() {
  const [selectedTheme] = useAtom(selectedThemeAtom);
  return getTheme(selectedTheme);
}

export async function loadCurrentTheme(selectedTheme) {
  return await loadTheme(selectedTheme);
}

export function useCurrentPlayerConfig() {
  const theme = useCurrentTheme();
  return theme.player;
}

export function useCurrentEnemies() {
  const theme = useCurrentTheme();
  return theme.enemies;
}

export function useCurrentEnvironment() {
  const theme = useCurrentTheme();
  return theme.environment;
}

// Re-export helper functions from configHelpers
export { useWorldBounds, isWithinBounds };

// Re-export theme loader utilities
export { themeLoader, loadTheme } from './themeLoader';
