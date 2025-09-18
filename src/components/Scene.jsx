import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useAtom } from 'jotai';

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
import { useWorldBounds } from '../config/configHelpers';
import { getProjectileType, projectileTypes } from '../data/projectileTypes';
import { activateProjectile } from '../utils/gameUtils';
import LightingManager from './LightingManager';
import ParticleRenderer from './ParticleRenderer';
import EnvironmentSetup from './EnvironmentSetup';
import GameRenderer from './GameRenderer';
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

        <LightingManager />

        {/* <ParticleRenderer /> */}

        <EnvironmentSetup />

        <GameRenderer
          enemies={enemies}
          setEnemies={setEnemies}
          projectiles={projectiles}
          setProjectiles={setProjectiles}
          playerPosition={playerPosition}
          playerHealth={playerHealth}
          setPlayerHealth={setPlayerHealth}
          gameState={gameState}
          setGameState={setGameState}
          worldBounds={worldBounds}
          selectedProjectileType={projectileConfig}
          onShoot={(projectileData) => setProjectiles((prev) => activateProjectile(prev, projectileData))}
          setScore={setScore}
          setEnemiesKilled={setEnemiesKilled}
        />
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
