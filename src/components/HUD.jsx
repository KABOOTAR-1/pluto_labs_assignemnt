
import { useAtom } from "jotai";
import { gameStateAtom, playerHealthSettingAtom } from "../config/atoms";

import HealthBar from "./ui/HealthBar";
import ScoreDisplay from "./ui/ScoreDisplay";
import EnemiesKilledDisplay from "./ui/EnemyKilledDisplay";

const HUD = ({
  playerHealth,
  score,
  enemiesKilled,
  showHUD
}) => {
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const [maxPlayerHealth] = useAtom(playerHealthSettingAtom);

  if (!showHUD) return null;

  const handleSettings = () => {
    // Store current state before opening settings so we can return to it
    sessionStorage.setItem('previousGameState', gameState);
    setGameState('settings');
  };

  return (
    <div className="game-hud">
      <HealthBar current={playerHealth} max={maxPlayerHealth} />
      <ScoreDisplay score={score} />
      <EnemiesKilledDisplay count={enemiesKilled} />

      {gameState === 'playing' && (
        <div className="settings-button-container">
          <button className="settings-button" onClick={handleSettings}>
            ⚙️
          </button>
        </div>
      )}
    </div>
  );
};

export default HUD;
