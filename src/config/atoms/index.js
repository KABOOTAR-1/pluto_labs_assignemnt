// ============================================================================
// ATOMS INDEX - Centralized exports for all atoms
// ============================================================================

// Game State Atoms
export {
  gameStateAtom,
  scoreAtom,
  enemiesKilledAtom
} from './gameStateAtoms';

// Player State Atoms
export {
  playerHealthAtom,
  playerPositionAtom,
  playerRotationAtom,
  currentProjectileTypeAtom,
  activePlayerSpeedAtom,
  activeProjectileSpeedAtom,
  activePlayerHealthAtom
} from './playerAtoms';

// Entity State Atoms
export {
  enemiesAtom,
  projectilesAtom
} from './entityAtoms';

// Settings & Configuration Atoms
export {
  showHUDAtom,
  basePlayerSpeedAtom,
  basePlayerHealthAtom,
  basePlayerFireRateAtom,
  enemySpeedMultiplierAtom,
  enemySpawnRateAtom,
  difficultyMultiplierAtom,
  maxEnemiesSettingAtom
} from './settingsAtoms';

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

/**
 * Game reset utility atom
 * Resets all game state to initial values
 */
import { atom } from 'jotai';
import { GAME_STATES } from '../constants';
import { gameConfig } from '../gameConfig';
import {
  gameStateAtom,
  playerHealthAtom,
  playerPositionAtom,
  playerRotationAtom,
  scoreAtom,
  enemiesKilledAtom,
  enemiesAtom,
  projectilesAtom,
  currentProjectileTypeAtom
} from './index';
import { basePlayerHealthAtom } from './settingsAtoms';

export const resetGameAtom = atom(
  null,
  (get, set) => {
    set(gameStateAtom, GAME_STATES.PLAYING);
    set(playerHealthAtom, get(basePlayerHealthAtom));
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
// BACKWARD COMPATIBILITY NOTE
// ============================================================================

/*
All atoms are exported with their original names above for backward compatibility.
Existing imports from '../config/atoms' will continue to work without changes.

The atoms are now organized into logical groups:
- gameStateAtoms.js: Core game state (gameState, score, enemiesKilled)
- playerAtoms.js: Player-related state (health, position, current values)
- entityAtoms.js: Game entities (enemies, projectiles)
- settingsAtoms.js: User preferences and configuration
*/