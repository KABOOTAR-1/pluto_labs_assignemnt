import React from 'react';
import { useAtom } from 'jotai';
import { gameStateAtom, resetGameAtom } from '../config/atoms';

const StartScreen = () => {
  const [gameState] = useAtom(gameStateAtom);
  const [, resetGame] = useAtom(resetGameAtom);
  
  if (gameState !== 'menu') return null;
  
  const handleStartGame = () => {
    resetGame();
  };
  
  return (
    <div className="game-screen start-screen">
      <div className="screen-content">
        <h1>TOP-DOWN SHOOTER</h1>
        <p>Use WASD or arrow keys to move. Aim and shoot with mouse.</p>
        <button className="game-button" onClick={handleStartGame}>START GAME</button>
      </div>
    </div>
  );
};

export default StartScreen;
