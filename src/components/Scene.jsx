import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { useAtom } from 'jotai';
import { OrbitControls, Sky, Environment } from '@react-three/drei';

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
import { gameConfig } from '../config/gameConfig';
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

  return (
    <>
    <Canvas shadows camera={{ position: [0, 15, 0], rotation: [-Math.PI / 2, 0, 0], fov: 50 }}>
      <color attach="background" args={[gameConfig.world.backgroundColor]} />
      <fog attach="fog" args={[gameConfig.world.backgroundColor, 30, 100]} />

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
          <Player />
          {gameState === 'playing' && (
            <>
              <EnemySpawner
                enemies={enemies}
                setEnemies={setEnemies}
                playerPosition={playerPosition}
                gameState={gameState}
              />
              <Enemies
                enemies={enemies}
                setEnemies={setEnemies}
                playerPosition={playerPosition}
                setPlayerHealth={setPlayerHealth}
                gameState={gameState}
                setGameState={setGameState}
              />
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

      <OrbitControls
        enabled={false}
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
    <HUD
      playerHealth={playerHealth}
      score={score}
      enemiesKilled={enemiesKilled}
      showHUD={showHUD}
    />
    </>
  );
};

export default Scene;
