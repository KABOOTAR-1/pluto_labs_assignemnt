import { useEnemySpawner } from "../../hooks/useEnemySpawner";
import { gameConfig, useCurrentEnemies } from "../../config/gameConfig";
import { useAtom } from "jotai";
import {
  enemySpawnRateAtom,
  maxEnemiesSettingAtom,
  difficultyMultiplierAtom
} from "../../config/atoms";

const EnemySpawner = ({
  enemies,
  setEnemies,
  playerPosition,
  gameState
}) => {
  const [enemySpawnRate] = useAtom(enemySpawnRateAtom);
  const [maxEnemies] = useAtom(maxEnemiesSettingAtom);
  const [difficultyMultiplier] = useAtom(difficultyMultiplierAtom);
  const currentEnemies = useCurrentEnemies();

  useEnemySpawner({
    enemies,
    setEnemies,
    playerPosition,
    gameState,
    maxOnScreen: maxEnemies,
    enemyTypes: currentEnemies.types,
    spawnRadius: gameConfig.enemySettings.spawnRadius,
    difficultyIncreaseInterval: 30,
    difficultyMultiplierStep: 1.2,
    enemySpawnRate,
    difficultyMultiplier,
  });

  return null;
};

export default EnemySpawner;
