import { atom } from 'jotai';
import { gameConfig } from './gameConfig';

export const gameStateAtom = atom('menu');

export const playerHealthAtom = atom(gameConfig.player.health);
export const playerPositionAtom = atom([0, 0, 0]);
export const playerRotationAtom = atom(0);

export const scoreAtom = atom(gameConfig.rules.initialScore);
export const enemiesKilledAtom = atom(0);

export const enemiesAtom = atom([]);

export const projectilesAtom = atom([]);
export const currentProjectileTypeAtom = atom('default');

export const showHUDAtom = atom(true);

export const resetGameAtom = atom(
  null,
  (get, set) => {
    set(gameStateAtom, 'playing');
    set(playerHealthAtom, gameConfig.player.health);
    set(playerPositionAtom, [0, 0, 0]);
    set(playerRotationAtom, 0);
    set(scoreAtom, gameConfig.rules.initialScore);
    set(enemiesKilledAtom, 0);
    set(enemiesAtom, []);
    set(projectilesAtom, []);
    set(currentProjectileTypeAtom, 'default');
  }
);
