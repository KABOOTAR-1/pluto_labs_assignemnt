// hooks/useEnemySpawner.js
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { activateEnemy } from "../config/atoms";

export const useEnemySpawner = ({
  enemies,
  setEnemies,
  playerPosition,
  gameState,
  maxOnScreen,
  enemyTypes,
  spawnRadius,
  difficultyIncreaseInterval = 30,
  difficultyMultiplierStep = 1.2,
  enemySpeedMultiplier = 1.0,
  enemySpawnRate = 1.0,
}) => {
  const spawnTimer = useRef(0);
  const difficultyTimer = useRef(0);
  const difficultyMultiplier = useRef(1);

  const spawnEnemy = () => {
    const activeCount = enemies.filter(e => e.active).length;
    if (activeCount >= maxOnScreen) return;

    // Pick random type
    const randomType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    const enemyConfig = randomType;

    const angle = Math.random() * Math.PI * 2;
    const spawnX = playerPosition[0] + Math.sin(angle) * spawnRadius;
    const spawnZ = playerPosition[2] + Math.cos(angle) * spawnRadius;

    const enemyData = {
      type: randomType.id,
      position: [spawnX, 0.5, spawnZ],
      health: enemyConfig.health,
      size: enemyConfig.size,
      speed: enemyConfig.speed * enemySpeedMultiplier,
    };

    setEnemies((prev) => activateEnemy(prev, enemyData));
  };

  useFrame((_, delta) => {
    if (gameState !== "playing") return;

    spawnTimer.current += delta;
    difficultyTimer.current += delta;

    if (spawnTimer.current >= (1 / difficultyMultiplier.current) * (1 / enemySpawnRate)) {
      spawnTimer.current = 0;
      spawnEnemy();
    }

    if (difficultyTimer.current >= difficultyIncreaseInterval) {
      difficultyTimer.current = 0;
      difficultyMultiplier.current *= difficultyMultiplierStep;
    }
  });
};
