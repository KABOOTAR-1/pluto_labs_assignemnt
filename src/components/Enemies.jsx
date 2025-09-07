import React from "react";
import { useAtom } from "jotai";
import { enemiesAtom, playerPositionAtom, playerHealthAtom, gameStateAtom } from "../config/atoms";
import { FastEnemy } from "./enemies/FastEnemy";
import { TankEnemy } from "./enemies/TankEnemy";

const EnemyComponents = {
  fast: FastEnemy,
  tank: TankEnemy,
};

const Enemies = () => {
  const [enemies, setEnemies] = useAtom(enemiesAtom);
  const [playerPosition] = useAtom(playerPositionAtom);
  const [, setPlayerHealth] = useAtom(playerHealthAtom);
  const [gameState, setGameState] = useAtom(gameStateAtom);

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
