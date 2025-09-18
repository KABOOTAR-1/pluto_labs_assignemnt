// hooks/useEnemySpawner.js
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { activateEnemy } from "../config/atoms";
import { GAME_STATES } from "../config/gameConfig";

export const useEnemySpawner = ({
  enemies,
  setEnemies,
  playerPosition,
  gameState,
  maxOnScreen,
  enemyTypes,
  spawnRadius,
  worldBounds,
  difficultyIncreaseInterval = 30,
  difficultyMultiplierStep = 1.2,
  enemySpawnRate = 1.0,
  difficultyMultiplier = 1.0,
}) => {
  const spawnTimer = useRef(0);
  const difficultyTimer = useRef(0);
  const dynamicDifficultyMultiplier = useRef(1);

  const spawnEnemy = () => {
    const activeCount = enemies.filter(e => e.active).length;
    if (activeCount >= maxOnScreen) return;

    // Pick random type
    const randomType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    const enemyConfig = randomType;

    const angle = Math.random() * Math.PI * 2;
    let spawnX = playerPosition[0] + Math.sin(angle) * spawnRadius;
    let spawnZ = playerPosition[2] + Math.cos(angle) * spawnRadius;

    // Ensure spawn position is within world bounds - 5 units from edges
    const safeMinX = worldBounds.minX + 5;
    const safeMaxX = worldBounds.maxX - 5;
    const safeMinZ = worldBounds.minZ + 5;
    const safeMaxZ = worldBounds.maxZ - 5;

    spawnX = Math.max(safeMinX, Math.min(safeMaxX, spawnX));
    spawnZ = Math.max(safeMinZ, Math.min(safeMaxZ, spawnZ));

    const enemyData = {
      type: randomType.id,
      position: [spawnX, enemyConfig.size, spawnZ],
      health: enemyConfig.health,
      size: enemyConfig.size,
      scale: enemyConfig.scale || [1, 1, 1],
      speed: enemyConfig.speed,
    };

    setEnemies((prev) => activateEnemy(prev, enemyData));
  };

  useFrame((_, delta) => {
    if (gameState !== GAME_STATES.PLAYING) return;

    spawnTimer.current += delta;
    difficultyTimer.current += delta;

    if (spawnTimer.current >= (1 / dynamicDifficultyMultiplier.current) * (1 / enemySpawnRate) * (1 / difficultyMultiplier)) {
      spawnTimer.current = 0;
      spawnEnemy();
    }

    if (difficultyTimer.current >= difficultyIncreaseInterval) {
      difficultyTimer.current = 0;
      dynamicDifficultyMultiplier.current *= difficultyMultiplierStep;
    }
  });
};
