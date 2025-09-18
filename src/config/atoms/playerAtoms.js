// ============================================================================
// PLAYER STATE ATOMS
// ============================================================================

import { atom } from 'jotai';
import { gameConfig } from '../gameConfig';

/**
 * Player's current health points
 * When this reaches 0, player dies
 */
export const playerHealthAtom = atom(gameConfig.player.health);

/**
 * Player's current position in 3D world [x, y, z]
 */
export const playerPositionAtom = atom([0, 0, 0]);

/**
 * Player's current rotation angle in radians
 */
export const playerRotationAtom = atom(0);

/**
 * Current projectile type selected by player
 * References projectileTypes.js for available options
 */
export const currentProjectileTypeAtom = atom('default');

/**
 * Active player movement speed (can be modified by power-ups, debuffs, etc.)
 * This is the actual speed used during gameplay
 */
export const activePlayerSpeedAtom = atom(gameConfig.player.speed);

/**
 * Active projectile speed (can be modified by power-ups, etc.)
 * This is the actual speed used for projectiles during gameplay
 */
export const activeProjectileSpeedAtom = atom(gameConfig.player.projectileSpeed);

/**
 * Active player health (can be modified during gameplay)
 * This is the actual health value during gameplay (may differ from max health)
 */
export const activePlayerHealthAtom = atom(gameConfig.player.health);