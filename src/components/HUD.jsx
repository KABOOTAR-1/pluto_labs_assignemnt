
import { gameConfig } from "../config/gameConfig";

import HealthBar from "./ui/HealthBar";
import ScoreDisplay from "./ui/ScoreDisplay";
import EnemiesKilledDisplay from "./ui/EnemyKilledDisplay";

const HUD = ({
  playerHealth,
  score,
  enemiesKilled,
  showHUD
}) => {

  if (!showHUD) return null;

  return (
    <div className="game-hud">
      <HealthBar current={playerHealth} max={gameConfig.player.health} />
      <ScoreDisplay score={score} />
      <EnemiesKilledDisplay count={enemiesKilled} />
    </div>
  );
};

export default HUD;
