import React, { Suspense } from 'react';
import { Physics } from '@react-three/cannon';
import { gameConfig } from '../config/gameConfig';
import { GAME_STATES } from '../config/constants';
import Player from './Player';
import Floor from './Floor';
import Enemies from './Enemies';
import Projectiles from './Projectiles';
import EnemySpawner from './enemies/EnemySpawner';

const GameRenderer = ({
  enemies,
  setEnemies,
  projectiles,
  setProjectiles,
  playerPosition,
  playerHealth,
  setPlayerHealth,
  gameState,
  setGameState,
  worldBounds,
  selectedProjectileType,
  onShoot,
  setScore,
  setEnemiesKilled
}) => {
  return (
    <Physics
      gravity={gameConfig.physics.gravity}
      defaultContactMaterial={{
        friction: gameConfig.physics.friction,
        restitution: gameConfig.physics.restitution
      }}
    >
      <Suspense fallback={null}>
        <Player
          worldBounds={worldBounds}
          playerPosition={playerPosition}
          playerHealth={playerHealth}
          gameState={gameState}
          setGameState={setGameState}
          setPlayerHealth={setPlayerHealth}
          selectedProjectileType={selectedProjectileType}
          onShoot={onShoot}
        />
      </Suspense>

      {gameState === GAME_STATES.PLAYING && (
        <>
          <EnemySpawner
            enemies={enemies}
            setEnemies={setEnemies}
            playerPosition={playerPosition}
            gameState={gameState}
            worldBounds={worldBounds}
          />
          <Suspense fallback={null}>
            <Enemies
              enemies={enemies}
              setEnemies={setEnemies}
              playerPosition={playerPosition}
              setPlayerHealth={setPlayerHealth}
              gameState={gameState}
              setGameState={setGameState}
              worldBounds={worldBounds}
            />
          </Suspense>
          <Projectiles
            projectiles={projectiles}
            setProjectiles={setProjectiles}
            enemies={enemies}
            setEnemies={setEnemies}
            setScore={setScore}
            setEnemiesKilled={setEnemiesKilled}
            projectileConfig={selectedProjectileType}
          />
        </>
      )}

      <Floor />
    </Physics>
  );
};

export default GameRenderer;