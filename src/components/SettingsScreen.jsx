import React from 'react';
import { useAtom } from 'jotai';
import {
  gameStateAtom,
  activePlayerHealthAtom,
  basePlayerSpeedAtom,
  basePlayerHealthAtom,
  basePlayerFireRateAtom,
  enemySpeedMultiplierAtom,
  enemySpawnRateAtom,
  difficultyMultiplierAtom,
  maxEnemiesSettingAtom
} from '../config/atoms';
import { settingsConfig, getSettingLabel } from '../config/settingsConfig';

const SettingsScreen = () => {
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const [currentPlayerHealth, setCurrentPlayerHealth] = useAtom(activePlayerHealthAtom);
  const [playerSpeed, setPlayerSpeed] = useAtom(basePlayerSpeedAtom);
  const [playerHealthSetting] = useAtom(basePlayerHealthAtom);
  const [playerFireRate, setPlayerFireRate] = useAtom(basePlayerFireRateAtom);
  const [enemySpeedMultiplier, setEnemySpeedMultiplier] = useAtom(enemySpeedMultiplierAtom);
  const [enemySpawnRate, setEnemySpawnRate] = useAtom(enemySpawnRateAtom);
  const [difficultyMultiplier, setDifficultyMultiplier] = useAtom(difficultyMultiplierAtom);
  const [maxEnemies, setMaxEnemies] = useAtom(maxEnemiesSettingAtom);

  const handleBack = () => {
    // Restore the previous game state (either 'playing' or 'menu')
    const previousState = sessionStorage.getItem('previousGameState') || 'menu';
    setGameState(previousState);
    sessionStorage.removeItem('previousGameState');
  };

  return (
    <div
      className="game-screen settings-screen"
      style={{ display: gameState !== 'settings' ? 'none' : 'flex' }}
    >
      <div className="screen-content compact">
        <h1>SETTINGS</h1>

        <div className="settings-container scrollable">
          <div className="setting-group compact">
            <h3>Player</h3>

            <div className="setting-item compact">
              <label>{getSettingLabel('player', 'speed', playerSpeed)}</label>
              <input
                type="range"
                min={settingsConfig.player.speed.min}
                max={settingsConfig.player.speed.max}
                step={settingsConfig.player.speed.step}
                value={playerSpeed}
                onChange={(e) => setPlayerSpeed(parseFloat(e.target.value))}
              />
            </div>

            <div className="setting-item compact">
              <label>{getSettingLabel('player', 'health', currentPlayerHealth)}/{playerHealthSetting}</label>
              <input
                type="range"
                min={settingsConfig.player.health.min}
                max={settingsConfig.player.health.max}
                step={settingsConfig.player.health.step}
                value={currentPlayerHealth}
                onChange={(e) => {
                  const newHealth = parseInt(e.target.value);
                  setCurrentPlayerHealth(newHealth);
                }}
              />
            </div>

            <div className="setting-item compact">
              <label>{getSettingLabel('player', 'fireRate', playerFireRate)}</label>
              <input
                type="range"
                min={settingsConfig.player.fireRate.min}
                max={settingsConfig.player.fireRate.max}
                step={settingsConfig.player.fireRate.step}
                value={playerFireRate}
                onChange={(e) => setPlayerFireRate(parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div className="setting-group compact">
            <h3>Enemies</h3>

            <div className="setting-item compact">
              <label>{getSettingLabel('enemies', 'speedMultiplier', enemySpeedMultiplier)}</label>
              <input
                type="range"
                min={settingsConfig.enemies.speedMultiplier.min}
                max={settingsConfig.enemies.speedMultiplier.max}
                step={settingsConfig.enemies.speedMultiplier.step}
                value={enemySpeedMultiplier}
                onChange={(e) => setEnemySpeedMultiplier(parseFloat(e.target.value))}
              />
            </div>

            <div className="setting-item compact">
              <label>{getSettingLabel('enemies', 'spawnRate', enemySpawnRate)}</label>
              <input
                type="range"
                min={settingsConfig.enemies.spawnRate.min}
                max={settingsConfig.enemies.spawnRate.max}
                step={settingsConfig.enemies.spawnRate.step}
                value={enemySpawnRate}
                onChange={(e) => setEnemySpawnRate(parseFloat(e.target.value))}
              />
            </div>

            <div className="setting-item compact">
              <label>{getSettingLabel('enemies', 'maxCount', maxEnemies)}</label>
              <input
                type="range"
                min={settingsConfig.enemies.maxCount.min}
                max={settingsConfig.enemies.maxCount.max}
                step={settingsConfig.enemies.maxCount.step}
                value={maxEnemies}
                onChange={(e) => setMaxEnemies(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="setting-group compact">
            <h3>Difficulty</h3>

            <div className="setting-item compact">
              <label>{getSettingLabel('difficulty', 'multiplier', difficultyMultiplier)}</label>
              <input
                type="range"
                min={settingsConfig.difficulty.multiplier.min}
                max={settingsConfig.difficulty.multiplier.max}
                step={settingsConfig.difficulty.multiplier.step}
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