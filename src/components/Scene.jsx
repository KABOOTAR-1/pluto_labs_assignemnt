import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { useAtom } from 'jotai';
import { Sky, Environment, OrbitControls } from '@react-three/drei';

import {
  gameStateAtom,
  enemiesAtom,
  projectilesAtom,
  playerPositionAtom,
  playerHealthAtom,
  scoreAtom,
  enemiesKilledAtom,
  showHUDAtom,
  currentProjectileTypeAtom
} from '../config/atoms';
import { gameConfig, useCurrentEnvironment } from '../config/gameConfig';
import { getProjectileType } from '../data/projectileTypes';
import Player from './Player';
import Floor from './Floor';
import Enemies from './Enemies';
import Projectiles from './Projectiles';
import EnemySpawner from './enemies/EnemySpawner';
import HUD from './HUD';

const Scene = () => {
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const [enemies, setEnemies] = useAtom(enemiesAtom);
  const [projectiles, setProjectiles] = useAtom(projectilesAtom);
  const [playerPosition] = useAtom(playerPositionAtom);
  const [playerHealth, setPlayerHealth] = useAtom(playerHealthAtom);
  const [score, setScore] = useAtom(scoreAtom);
  const [enemiesKilled, setEnemiesKilled] = useAtom(enemiesKilledAtom);
  const [showHUD] = useAtom(showHUDAtom);
  const [currentProjectileTypeId] = useAtom(currentProjectileTypeAtom);

  const projectileConfig = getProjectileType(currentProjectileTypeId);
  const currentEnvironment = useCurrentEnvironment();

  return (
    <>
      <Canvas shadows
        camera={{
          position: [0, 15, 15], // Fixed height and behind player
          fov: 50,
          near: 0.1,
          far: 1000
        }}>
        <color attach="background" args={[currentEnvironment.background?.color || gameConfig.world.backgroundColor]} />
        <fog attach="fog" args={[currentEnvironment.fog?.color || gameConfig.world.backgroundColor, currentEnvironment.fog?.near || 30, currentEnvironment.fog?.far || 100]} />

        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <Sky sunPosition={[100, 10, 100]} />

          <Physics
            gravity={gameConfig.physics.gravity}
            defaultContactMaterial={{
              friction: gameConfig.physics.friction,
              restitution: gameConfig.physics.restitution
            }}
          >
            <Suspense fallback={null}>
              <Player />
            </Suspense>
            {gameState === 'playing' && (
              <>
                <EnemySpawner
                  enemies={enemies}
                  setEnemies={setEnemies}
                  playerPosition={playerPosition}
                  gameState={gameState}
                />
                <Suspense fallback={null}>
                  <Enemies
                    enemies={enemies}
                    setEnemies={setEnemies}
                    playerPosition={playerPosition}
                    setPlayerHealth={setPlayerHealth}
                    gameState={gameState}
                    setGameState={setGameState}
                  />
                </Suspense>
                <Projectiles
                  projectiles={projectiles}
                  setProjectiles={setProjectiles}
                  enemies={enemies}
                  setEnemies={setEnemies}
                  setScore={setScore}
                  setEnemiesKilled={setEnemiesKilled}
                  projectileConfig={projectileConfig}
                />
              </>
            )}
            <Floor />
          </Physics>
        </Suspense>
        {/* <OrbitControls /> */}
      </Canvas>
      <HUD
        playerHealth={playerHealth}
        score={score}
        enemiesKilled={enemiesKilled}
        showHUD={showHUD}
        gameState={gameState}
      />
    </>
  );
};

export default Scene;
