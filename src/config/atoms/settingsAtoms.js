// ============================================================================
// SETTINGS & CONFIGURATION ATOMS
// ============================================================================

import { atom } from 'jotai';
import { gameConfig } from '../gameConfig';

/**
 * Whether to show the Heads-Up Display (HUD) during gameplay
 */
export const showHUDAtom = atom(true);

// ============================================================================
// USER-CONFIGURABLE SETTINGS (persistent preferences)
// ============================================================================

/**
 * Base player movement speed setting (saved in user preferences)
 * This is the default speed the player starts with
 */
export const basePlayerSpeedAtom = atom(gameConfig.player.speed);

/**
 * Base player health setting (saved in user preferences)
 * This is the maximum health the player starts with
 */
export const basePlayerHealthAtom = atom(gameConfig.player.health);

/**
 * Base player fire rate setting (saved in user preferences)
 * This controls how fast the player can shoot by default
 */
export const basePlayerFireRateAtom = atom(gameConfig.player.fireRate);

/**
 * Enemy speed multiplier (affects all enemies)
 * Higher values make enemies faster
 */
export const enemySpeedMultiplierAtom = atom(1.0);

/**
 * Enemy spawn rate multiplier
 * Higher values spawn enemies more frequently
 */
export const enemySpawnRateAtom = atom(1.0);

/**
 * Overall game difficulty multiplier
 * Affects multiple aspects of gameplay difficulty
 */
export const difficultyMultiplierAtom = atom(1.0);

/**
 * Maximum number of enemies allowed on screen simultaneously
 */
export const maxEnemiesSettingAtom = atom(gameConfig.enemySettings.maxOnScreen);