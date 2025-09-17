import React from 'react';
import { useAtom } from 'jotai';
import { gameStateAtom, resetGameAtom } from '../config/atoms';
import { useSettingsNavigation } from '../hooks/useSettingsNavigation';

const StartScreen = () => {
  const [gameState] = useAtom(gameStateAtom);
  const [, resetGame] = useAtom(resetGameAtom);
  const { goToSettings } = useSettingsNavigation();
  
  if (gameState !== 'menu') return null;
  
  const handleStartGame = () => {
    resetGame();
  };

  const handleSettings = () => {
    goToSettings();
  };

  return (
    <div className="game-screen start-screen">
      <div className="screen-content">
        <h1>TOP-DOWN SHOOTER</h1>
        <p>Use WASD or arrow keys to move. Aim and shoot with mouse.</p>
        <button className="game-button" onClick={handleStartGame}>START GAME</button>
        <button className="game-button secondary" onClick={handleSettings}>SETTINGS</button>
      </div>
    </div>
  );
};

export default StartScreen;
