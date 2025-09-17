import { useAtom } from "jotai";
import { FastEnemy } from "./enemies/FastEnemy";
import { TankEnemy } from "./enemies/TankEnemy";
import { gameConfig } from "../config/gameConfig";
import { deactivateEnemy, enemySpeedMultiplierAtom } from "../config/atoms";

const EnemyComponents = {
  fast: FastEnemy,
  tank: TankEnemy,
};

const Enemies = ({
  enemies,
  setEnemies,
  playerPosition,
  setPlayerHealth,
  gameState,
  setGameState
}) => {
  const [enemySpeedMultiplier] = useAtom(enemySpeedMultiplierAtom);

  const removeEnemy = (id) => {
    setEnemies((prev) => deactivateEnemy(prev, id));
  };

  const handlePlayerDamage = (damage) => {
    setPlayerHealth((h) => {
      const newHealth = h - damage;
      if (newHealth <= 0) setGameState("gameOver");
      return newHealth;
    });
  };

  // Store configs in a map for quick lookup
  const enemyConfigs = gameConfig.enemies.types.reduce((acc, type) => {
    acc[type.id] = type;
    return acc;
  }, {});

  const activeEnemies = enemies.filter(e => e.active);

  return (
    <>
      {activeEnemies.map((enemy) => {
        const EnemyComponent = EnemyComponents[enemy.type];
        if (!EnemyComponent) {
          console.warn(`No component found for enemy type: ${enemy.type}`);
          return null;
        }
        const config = enemyConfigs[enemy.type];
        if (!config) {
          console.warn(`No config found for enemy type: ${enemy.type}`);
          return null;
        }
        return (
          <EnemyComponent
            key={enemy.id}
            {...enemy}
            {...config}
            speed={config.speed * enemySpeedMultiplier}
            onRemove={removeEnemy}
            playerPosition={playerPosition}
            gameState={gameState}
            onPlayerDamage={handlePlayerDamage}
          />
        );
      })}
    </>
  );
};

export default Enemies;
