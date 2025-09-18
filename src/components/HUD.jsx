
import { useAtom } from "jotai";
import { basePlayerHealthAtom } from "../config/atoms";
import { useSettingsNavigation } from "../hooks/useSettingsNavigation";

import HealthBar from "./ui/HealthBar";
import ScoreDisplay from "./ui/ScoreDisplay";
import EnemiesKilledDisplay from "./ui/EnemyKilledDisplay";

const HUD = ({
  playerHealth,
  score,
  enemiesKilled,
  showHUD,
  gameState
}) => {
  const [maxPlayerHealth] = useAtom(basePlayerHealthAtom);
  const { goToSettings } = useSettingsNavigation();

  if (!showHUD) return null;

  return (
    <div className="game-hud">
      {/* Consolidated stats container on the left */}
      <div className="stats-container">
        <HealthBar current={playerHealth} max={maxPlayerHealth} />
        <div className="stats-row">
          <ScoreDisplay score={score} />
          <EnemiesKilledDisplay count={enemiesKilled} />
        </div>
      </div>

      {/* Settings button on the right */}
      {gameState === 'playing' && (
        <div className="settings-button-container">
          <button className="settings-button" onClick={goToSettings}>
            ⚙️
          </button>
        </div>
      )}
    </div>
  );
};

export default HUD;
