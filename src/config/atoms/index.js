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
 * 🔄 RESET GAME ATOM - Complete Game State Reset Utility
 * =====================================================
 *
 * @description Master reset function that restores all game state to initial values
 * @type {WritableAtom<null, null>} - Write-only atom (no getter, only setter)
 * @usage Call this atom's setter to reset the entire game state
 *
 * 🎯 USAGE EXAMPLES:
 * ```javascript
 * // In a component or hook:
 * const [, resetGame] = useAtom(resetGameAtom);
 * resetGame(); // Resets entire game state
 *
 * // Or directly:
 * resetGameAtom.write(null); // Not recommended, use hook instead
 * ```
 *
 * 🔄 RESET SEQUENCE:
 * 1. Game State: MENU → PLAYING
 * 2. Player: Full health (resets both playerHealthAtom and activePlayerHealthAtom), center position, facing forward
 * 3. Score: Reset to 0
 * 4. Statistics: Enemies killed reset to 0
 * 5. Entities: All enemies marked inactive
 * 6. Projectiles: All projectiles returned to pool
 * 7. Equipment: Default projectile type selected
 *
 * ⚠️ IMPORTANT NOTES:
 * - Uses basePlayerHealthAtom for health (respects user settings)
 * - Resets both health atoms to ensure gameplay uses correct values
 * - Preserves user preferences and settings
 * - Deactivates entities instead of deleting (performance)
 * - Called automatically on game over → menu transitions
 * - Can be called manually for restart functionality
 *
 * 🎮 WHEN TO USE:
 * - Player clicks "Play Again" after game over
 * - Player selects "Restart" from pause menu
 * - Transitioning from game over back to menu
 * - Testing scenarios requiring clean state
 */
import { atom } from 'jotai';
import { GAME_STATES } from '../constants';
import { gameConfig } from '../gameConfig';
import {
  gameStateAtom,
  playerHealthAtom,
  activePlayerHealthAtom,
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
  null, // No getter - this is write-only
  (get, set) => {
    // 🎲 Reset game flow state
    set(gameStateAtom, GAME_STATES.PLAYING);

    // 🧑‍🚀 Reset player to starting condition
    const baseHealth = get(basePlayerHealthAtom); // Get user's preferred health
    set(playerHealthAtom, baseHealth); // Reset base health atom
    set(activePlayerHealthAtom, baseHealth); // Reset active health atom (used in gameplay)
    set(playerPositionAtom, gameConfig.player.initialPosition);
    set(playerRotationAtom, 0); // Face forward

    // 📊 Reset scoring and statistics
    set(scoreAtom, gameConfig.rules.initialScore);
    set(enemiesKilledAtom, 0);

    // 👹 Deactivate all enemies (performance optimization)
    set(enemiesAtom, (prev) => prev.map(e => ({ ...e, active: false })));

    // 🚀 Return all projectiles to pool
    set(projectilesAtom, (prev) => prev.map(p => ({ ...p, active: false })));

    // 🔫 Reset to default weapon
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