import { atom } from 'jotai';
import { gameConfig, selectedThemeAtom } from './gameConfig';
import { THEMES, GAME_STATES } from './constants';
import { createProjectilePool } from '../utils/gameUtils';

// Re-export for convenience
export { selectedThemeAtom, THEMES };

// ============================================================================
// CORE GAME STATE
// ============================================================================

export const gameStateAtom = atom(GAME_STATES.MENU);

// ============================================================================
// PLAYER STATE
// ============================================================================

export const playerHealthAtom = atom(gameConfig.player.health);
export const playerPositionAtom = atom([0, 0, 0]);
export const playerRotationAtom = atom(0);

// ============================================================================
// GAME PROGRESS
// ============================================================================

export const scoreAtom = atom(gameConfig.rules.initialScore);
export const enemiesKilledAtom = atom(0);

// ============================================================================
// ENTITY STATE
// ============================================================================

export const enemiesAtom = atom([]);
export const projectilesAtom = atom(createProjectilePool());

// ============================================================================
// SETTINGS & CONFIGURATION
// ============================================================================

export const currentProjectileTypeAtom = atom('default');
export const showHUDAtom = atom(true);

// Runtime settings (can be modified during gameplay)
export const runtimePlayerSpeedAtom = atom(gameConfig.player.speed);
export const runtimeProjectileSpeedAtom = atom(gameConfig.player.projectileSpeed);
export const runtimePlayerHealthAtom = atom(gameConfig.player.health);

// User-configurable settings
export const playerSpeedSettingAtom = atom(gameConfig.player.speed);
export const playerHealthSettingAtom = atom(gameConfig.player.health);
export const playerFireRateSettingAtom = atom(gameConfig.player.fireRate);
export const enemySpeedMultiplierAtom = atom(1.0);
export const enemySpawnRateAtom = atom(1.0);
export const difficultyMultiplierAtom = atom(1.0);
export const maxEnemiesSettingAtom = atom(gameConfig.enemySettings.maxOnScreen);

// ============================================================================
// GAME RESET UTILITY
// ============================================================================

export const resetGameAtom = atom(
  null,
  (get, set) => {
    set(gameStateAtom, GAME_STATES.PLAYING);
    set(playerHealthAtom, get(playerHealthSettingAtom));
    set(playerPositionAtom, gameConfig.player.initialPosition);
    set(playerRotationAtom, 0);
    set(scoreAtom, gameConfig.rules.initialScore);
    set(enemiesKilledAtom, 0);
    set(enemiesAtom, (prev) => prev.map(e => ({ ...e, active: false })));
    set(projectilesAtom, (prev) => prev.map(p => ({ ...p, active: false })));
    set(currentProjectileTypeAtom, 'default');
  }
);

// ============================================================================
// BACKWARD COMPATIBILITY EXPORTS
// ============================================================================

// ============================================================================
// BACKWARD COMPATIBILITY EXPORTS
// ============================================================================

// Re-export utility functions from gameUtils for existing code
export {
  activateProjectile,
  deactivateProjectile,
  activateEnemy,
  deactivateEnemy,
  resetProjectiles,
  resetEnemies
} from '../utils/gameUtils';
