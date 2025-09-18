import React, { Suspense, useEffect } from 'react';
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
import { gameConfig, useCurrentEnvironment, useWorldBounds } from '../config/gameConfig';
import { getProjectileType, projectileTypes } from '../data/projectileTypes';
import { activateProjectile } from '../config/atoms';
import Player from './Player';
import Floor from './Floor';
import Enemies from './Enemies';
import Projectiles from './Projectiles';
import EnemySpawner from './enemies/EnemySpawner';
import SpaceParticles from './SpaceParticles';
import CyberpunkParticles from './CyberpunkParticles';
import MedievalParticles from './MedievalParticles';
import PostApocalypticParticles from './PostApocalypticParticles';
import Skybox from './Skybox';
import SkyType from './SkyType';
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
  const [currentProjectileTypeId, setCurrentProjectileType] = useAtom(currentProjectileTypeAtom);

  const projectileConfig = getProjectileType(currentProjectileTypeId);
  const currentEnvironment = useCurrentEnvironment();
  const worldBounds = useWorldBounds();

  // Initialize projectile type on mount
  useEffect(() => {
    const firstId = projectileTypes[0]?.id;
    if (firstId) {
      setCurrentProjectileType(firstId);
    }
  }, [setCurrentProjectileType]);

  return (
    <>
      <Canvas shadows
        camera={{
          position: [0, 15, 15], // Fixed height and behind player
          fov: 50,
          near: 0.1,
          far: 1000
        }}>
        {/* Only set background color if no skybox is present */}
        {/* {currentEnvironment.skybox?.texturePath ? null : (
          <color attach="background" args={[currentEnvironment.background?.color || gameConfig.world.backgroundColor]} />
        )} */}
        {/* <fog attach="fog" args={[currentEnvironment.fog?.color || gameConfig.world.backgroundColor, currentEnvironment.fog?.near || 30, currentEnvironment.fog?.far || 100]} /> */}

        {/* Ambient Light */}
        <ambientLight
          color={currentEnvironment.lighting?.ambient?.color || 0x404040}
          intensity={currentEnvironment.lighting?.ambient?.intensity || 0.5}
        />

        {/* Directional Lights */}
        {currentEnvironment.lighting?.directional && (
          Array.isArray(currentEnvironment.lighting.directional) ? (
            currentEnvironment.lighting.directional.map((light, index) => (
              <directionalLight
                key={`directional-${index}`}
                color={light.color}
                intensity={light.intensity}
                position={light.position}
                castShadow={index === 0} // Only first directional light casts shadows
                shadow-mapSize={[2048, 2048]}
                shadow-camera-left={-20}
                shadow-camera-right={20}
                shadow-camera-top={20}
                shadow-camera-bottom={-20}
              />
            ))
          ) : (
            <directionalLight
              color={currentEnvironment.lighting.directional.color}
              intensity={currentEnvironment.lighting.directional.intensity}
              position={currentEnvironment.lighting.directional.position}
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-camera-left={-20}
              shadow-camera-right={20}
              shadow-camera-top={20}
              shadow-camera-bottom={-20}
            />
          )
        )}

        {/* Point Lights */}
        {currentEnvironment.lighting?.point && currentEnvironment.lighting.point.map((light, index) => (
          <pointLight
            key={`point-${index}`}
            color={light.color}
            intensity={light.intensity}
            position={light.position}
            distance={light.distance}
          />
        ))}

        {/* Space Particles */}
        <Suspense fallback={null}>
        <SpaceParticles />
        <CyberpunkParticles />
        <MedievalParticles />
        <PostApocalypticParticles />
        </Suspense>

        <Suspense fallback={null}>
          {/* Conditionally render Skybox or SkyType based on texture availability */}
          {currentEnvironment.skybox?.texturePath ? (
            <Skybox
              worldBounds={worldBounds}
              texturePath={currentEnvironment.skybox.texturePath}
            />
          ) : (
            <SkyType skyType={currentEnvironment.skybox?.skyType || 'day'} />
          )}

          {/* Only show Environment for non-space/cyberpunk/medieval/postapocalyptic themes */}
          {currentEnvironment.name !== 'Deep Space' && currentEnvironment.name !== 'Cyberpunk 2077' && currentEnvironment.name !== 'Medieval Fantasy' && currentEnvironment.name !== 'Post-Apocalyptic' && (
            <Environment preset="city" />
          )}

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
                selectedProjectileType={projectileConfig}
                onShoot={(projectileData) => setProjectiles((prev) => activateProjectile(prev, projectileData))}
              />
            </Suspense>
            {gameState === 'playing' && (
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
                  projectileConfig={projectileConfig}
                />
              </>
            )}
            <Floor />
          </Physics>
        </Suspense>
        <OrbitControls />
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
