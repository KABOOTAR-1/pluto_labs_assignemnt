// ============================================================================
// CORE GAME STATE ATOMS
// ============================================================================

import { atom } from 'jotai';
import { GAME_STATES } from '../constants';

/**
 * Current game state (menu, playing, gameOver, settings)
 * Controls which screen/UI is displayed
 */
export const gameStateAtom = atom(GAME_STATES.MENU);

/**
 * Current score accumulated during gameplay
 */
export const scoreAtom = atom(0);

/**
 * Number of enemies killed in current game session
 */
export const enemiesKilledAtom = atom(0);