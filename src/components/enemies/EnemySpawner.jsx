import { useEnemySpawner } from "../../hooks/useEnemySpawner";
import { useAtomValue, useAtom } from "jotai";
import { enemiesAtom, playerPositionAtom, gameStateAtom } from "../../config/atoms";
import { gameConfig } from "../../config/gameConfig";

const EnemySpawner = () => {
  const [enemies, setEnemies] = useAtom(enemiesAtom);
  const playerPosition = useAtomValue(playerPositionAtom);
  const gameState = useAtomValue(gameStateAtom);

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

  return null; // ✅ purely logic, no rendering
};

export default EnemySpawner;
