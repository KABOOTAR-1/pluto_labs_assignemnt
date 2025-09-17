import React from "react";
import { useAtom } from "jotai";
import { gameStateAtom, resetGameAtom, scoreAtom, enemiesKilledAtom } from "../config/atoms";
import ScreenHeader from "./ui/ScreenHeader";
import StatsPanel from "./ui/StatsPanel";

const GameOverScreen = () => {
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const [, resetGame] = useAtom(resetGameAtom);
  const [score] = useAtom(scoreAtom);
  const [enemiesKilled] = useAtom(enemiesKilledAtom);

  if (gameState !== "gameOver") return null;

  const handleRestart = () => resetGame();
  const handleMainMenu = () => setGameState("menu");
  const handleSettings = () => {
    // Store current state before opening settings
    sessionStorage.setItem('previousGameState', gameState);
    setGameState("settings");
  };

  return (
    <div className="game-screen game-over-screen">
      <div className="screen-content">
        <ScreenHeader title="GAME OVER" />

        <StatsPanel
          stats={[
            { label: "SCORE:", value: score },
            { label: "ENEMIES DESTROYED:", value: enemiesKilled },
          ]}
        />

        <div className="buttons-container">
          <button className="game-button" onClick={handleRestart}>
            PLAY AGAIN
          </button>
          <button className="game-button secondary" onClick={handleMainMenu}>
            MAIN MENU
          </button>
          <button className="game-button secondary" onClick={handleSettings}>
            SETTINGS
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
