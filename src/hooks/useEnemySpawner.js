// hooks/useEnemySpawner.js
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

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
}) => {
  const spawnTimer = useRef(0);
  const difficultyTimer = useRef(0);
  const difficultyMultiplier = useRef(1);

  const spawnEnemy = () => {
    if (enemies.length >= maxOnScreen) return;

    // Pick random type
    const randomType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    const enemyConfig = randomType;

    const angle = Math.random() * Math.PI * 2;
    const spawnX = playerPosition[0] + Math.sin(angle) * spawnRadius;
    const spawnZ = playerPosition[2] + Math.cos(angle) * spawnRadius;

    setEnemies((prev) => [
      ...prev,
      {
        id: `enemy-${Date.now()}-${Math.random()}`,
        type: randomType.id,
        position: [spawnX, 0.5, spawnZ],
        health: enemyConfig.health,
        size: enemyConfig.size,
      },
    ]);
  };

  useFrame((_, delta) => {
    if (gameState !== "playing") return;

    spawnTimer.current += delta;
    difficultyTimer.current += delta;

    if (spawnTimer.current >= 1 / difficultyMultiplier.current) {
      spawnTimer.current = 0;
      spawnEnemy();
    }

    if (difficultyTimer.current >= difficultyIncreaseInterval) {
      difficultyTimer.current = 0;
      difficultyMultiplier.current *= difficultyMultiplierStep;
    }
  });
};
