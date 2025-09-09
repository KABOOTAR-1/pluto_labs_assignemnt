import { useEnemySpawner } from "../../hooks/useEnemySpawner";
import { gameConfig } from "../../config/gameConfig";

const EnemySpawner = ({
  enemies,
  setEnemies,
  playerPosition,
  gameState
}) => {

  useEnemySpawner({
    enemies,
    setEnemies,
    playerPosition,
    gameState,
    maxOnScreen: gameConfig.enemies.maxOnScreen,
    enemyTypes: gameConfig.enemies.types,
    spawnRadius: gameConfig.enemies.spawnRadius,
    difficultyIncreaseInterval: 30,
    difficultyMultiplierStep: 1.2,
  });

  return null;
};

export default EnemySpawner;
