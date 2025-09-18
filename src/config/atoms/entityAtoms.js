// ============================================================================
// ENTITY STATE ATOMS
// ============================================================================

import { atom } from 'jotai';
import { createProjectilePool } from '../../utils/gameUtils';

/**
 * Array of all active enemies in the game world
 * Each enemy object contains position, health, type, etc.
 */
export const enemiesAtom = atom([]);

/**
 * Array of all active projectiles in the game world
 * Managed as a pool for performance optimization
 */
export const projectilesAtom = atom(createProjectilePool());