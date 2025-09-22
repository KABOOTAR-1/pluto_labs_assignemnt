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
  playerPositionAtom,
  playerRotationAtom,
  currentProjectileTypeAtom,
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
  playerFireRateMultiplierAtom,
  enemySpeedMultiplierAtom,
  enemySpawnRateAtom,
  difficultyMultiplierAtom,
  maxEnemiesSettingAtom,
  collectibleSpawnChanceSettingAtom,
  maxActiveCollectiblesSettingAtom,
  collectibleSpawnDelaySettingAtom
} from './settingsAtoms';

// Input State Atoms
export {
  forwardInputAtom,
  backwardInputAtom,
  leftInputAtom,
  rightInputAtom,
  primaryActionAtom,
  inputPositionAtom,
  inputStateAtom
} from './inputAtoms';

// Power-up State Atoms
export {
  collectiblesAtom,
  collectiblesCollectedAtom,
  totalHealthRestoredAtom,
  collectibleSpawnChanceAtom,
  collectibleSpawnDelayAtom,
  maxActiveCollectiblesAtom,
  lastCollectibleSpawnTimeAtom
} from './collectibleAtoms';

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
 * 2. Player: Full health (resets activePlayerHealthAtom), center position, facing forward
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
    set(activePlayerHealthAtom, baseHealth); // Reset health atom
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

The atoms are now organized into logical groups following "Settings vs Runtime" pattern:
- gameStateAtoms.js: Core game state (gameState, score, enemiesKilled)
- playerAtoms.js: Runtime player state (current health, position, rotation, weapon)
- entityAtoms.js: Game entities (enemies, projectiles)
- settingsAtoms.js: Persistent user preferences (base health, speed, difficulty settings)
- inputAtoms.js: Multi-platform input state (movement, actions, combined state)

ARCHITECTURE PATTERN:
- base*Atom: User preferences (persistent, saved to localStorage)
- active*Atom: Current gameplay state (volatile, reset each game)
- *InputAtom: Real-time input state (updated by keyboard/touch/gamepad events)
- resetGameAtom: Applies base settings to active state on game restart
- inputStateAtom: Combined input state for backward compatibility
*/