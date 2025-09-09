import React from "react";
import { FastEnemy } from "./enemies/FastEnemy";
import { TankEnemy } from "./enemies/TankEnemy";

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

  const removeEnemy = (id) => {
    setEnemies((prev) => prev.filter((e) => e.id !== id));
  };

  const handlePlayerDamage = (damage) => {
    setPlayerHealth((h) => {
      const newHealth = h - damage;
      if (newHealth <= 0) setGameState("gameOver");
      return newHealth;
    });
  };

  return (
    <>
      {enemies.map((enemy) => {
        const EnemyComponent = EnemyComponents[enemy.type];
        return (
          <EnemyComponent
            key={enemy.id}
            {...enemy}
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
