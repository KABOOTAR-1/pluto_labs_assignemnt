
import { useAtom } from "jotai";
import { playerHealthAtom, scoreAtom, enemiesKilledAtom, showHUDAtom } from "../config/atoms";
import { gameConfig } from "../config/gameConfig";

import HealthBar from "./ui/HealthBar";
import ScoreDisplay from "./ui/ScoreDisplay";
import EnemiesKilledDisplay from "./ui/EnemyKilledDisplay";

const HUD = () => {
  const [playerHealth] = useAtom(playerHealthAtom);
  const [score] = useAtom(scoreAtom);
  const [enemiesKilled] = useAtom(enemiesKilledAtom);
  const [showHUD] = useAtom(showHUDAtom);

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
