import React from 'react';
import { useAtom } from 'jotai';
import {
  gameStateAtom,
  playerSpeedSettingAtom,
  playerHealthSettingAtom,
  playerFireRateSettingAtom,
  enemySpeedMultiplierAtom,
  enemySpawnRateAtom,
  difficultyMultiplierAtom,
  maxEnemiesSettingAtom
} from '../config/atoms';

const SettingsScreen = () => {
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const [playerSpeed, setPlayerSpeed] = useAtom(playerSpeedSettingAtom);
  const [playerHealth, setPlayerHealth] = useAtom(playerHealthSettingAtom);
  const [playerFireRate, setPlayerFireRate] = useAtom(playerFireRateSettingAtom);
  const [enemySpeedMultiplier, setEnemySpeedMultiplier] = useAtom(enemySpeedMultiplierAtom);
  const [enemySpawnRate, setEnemySpawnRate] = useAtom(enemySpawnRateAtom);
  const [difficultyMultiplier, setDifficultyMultiplier] = useAtom(difficultyMultiplierAtom);
  const [maxEnemies, setMaxEnemies] = useAtom(maxEnemiesSettingAtom);

  if (gameState !== 'settings') return null;

  const handleBack = () => {
    // Restore the previous game state (either 'playing' or 'menu')
    const previousState = sessionStorage.getItem('previousGameState') || 'menu';
    setGameState(previousState);
    sessionStorage.removeItem('previousGameState');
  };

  return (
    <div className="game-screen settings-screen">
      <div className="screen-content compact">
        <h1>SETTINGS</h1>

        <div className="settings-container scrollable">
          <div className="setting-group compact">
            <h3>Player</h3>

            <div className="setting-item compact">
              <label>Speed: {playerSpeed.toFixed(1)}</label>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={playerSpeed}
                onChange={(e) => setPlayerSpeed(parseFloat(e.target.value))}
              />
            </div>

            <div className="setting-item compact">
              <label>Health: {playerHealth}</label>
              <input
                type="range"
                min="50"
                max="300"
                step="10"
                value={playerHealth}
                onChange={(e) => setPlayerHealth(parseInt(e.target.value))}
              />
            </div>

            <div className="setting-item compact">
              <label>Fire Rate: {playerFireRate.toFixed(1)}/s</label>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.1"
                value={playerFireRate}
                onChange={(e) => setPlayerFireRate(parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div className="setting-group compact">
            <h3>Enemies</h3>

            <div className="setting-item compact">
              <label>Speed: {enemySpeedMultiplier.toFixed(1)}x</label>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={enemySpeedMultiplier}
                onChange={(e) => setEnemySpeedMultiplier(parseFloat(e.target.value))}
              />
            </div>

            <div className="setting-item compact">
              <label>Spawn Rate: {enemySpawnRate.toFixed(1)}x</label>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={enemySpawnRate}
                onChange={(e) => setEnemySpawnRate(parseFloat(e.target.value))}
              />
            </div>

            <div className="setting-item compact">
              <label>Max Count: {maxEnemies}</label>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={maxEnemies}
                onChange={(e) => setMaxEnemies(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="setting-group compact">
            <h3>Difficulty</h3>

            <div className="setting-item compact">
              <label>Multiplier: {difficultyMultiplier.toFixed(1)}x</label>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={difficultyMultiplier}
                onChange={(e) => setDifficultyMultiplier(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="buttons-container compact">
          <button className="game-button compact" onClick={handleBack}>
            BACK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;