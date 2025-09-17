import { useEnemySpawner } from "../../hooks/useEnemySpawner";
import { gameConfig } from "../../config/gameConfig";
import { useAtom } from "jotai";
import {
  enemySpeedMultiplierAtom,
  enemySpawnRateAtom,
  maxEnemiesSettingAtom
} from "../../config/atoms";

const EnemySpawner = ({
  enemies,
  setEnemies,
  playerPosition,
  gameState
}) => {
  const [enemySpeedMultiplier] = useAtom(enemySpeedMultiplierAtom);
  const [enemySpawnRate] = useAtom(enemySpawnRateAtom);
  const [maxEnemies] = useAtom(maxEnemiesSettingAtom);

  useEnemySpawner({
    enemies,
    setEnemies,
    playerPosition,
    gameState,
    maxOnScreen: maxEnemies,
    enemyTypes: gameConfig.enemies.types,
    spawnRadius: gameConfig.enemies.spawnRadius,
    difficultyIncreaseInterval: 30,
    difficultyMultiplierStep: 1.2,
    enemySpeedMultiplier,
    enemySpawnRate,
  });

  return null;
};

export default EnemySpawner;
