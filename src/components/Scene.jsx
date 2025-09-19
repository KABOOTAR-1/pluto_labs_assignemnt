/**
 * 🎮 SCENE COMPONENT - Main 3D Game World Container
 * ===============================================
 *
 * 🎯 WHAT THIS COMPONENT ACTUALLY DOES:
 * ✅ Manages all game state atoms (enemies, projectiles, player data, score)
 * ✅ Sets up the Three.js Canvas with camera configuration
 * ✅ Passes state data and callbacks to child components
 * ✅ Initializes default projectile type on component mount
 * ✅ Renders the 3D scene and 2D HUD as separate layers
 * ✅ Provides world bounds data to child components
 *
 * 🔄 DATA FLOW:
 * 1. Reads from Jotai atoms for current game state
 * 2. Processes projectile type ID into full configuration
 * 3. Passes processed data to GameRenderer component
 * 4. Renders HUD with current game statistics
 * 5. Updates atoms when child components request changes
 *
 * 📊 STATE MANAGEMENT:
 * - gameState: Current game phase (menu, playing, gameOver)
 * - enemies/projectiles: Arrays of active game entities
 * - playerPosition/playerHealth: Player character state
 * - score/enemiesKilled: Game progress tracking
 * - currentProjectileType: Selected weapon configuration
 */

import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useAtom } from 'jotai';

import {
  gameStateAtom,
  enemiesAtom,
  projectilesAtom,
  playerPositionAtom,
  activePlayerHealthAtom,
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
  // 🎮 CORE GAME STATE - Read/write access to game phase
  const [gameState, setGameState] = useAtom(gameStateAtom);

  // 👹 ENEMY MANAGEMENT - Array of active enemies and update function
  const [enemies, setEnemies] = useAtom(enemiesAtom);

  // 🎯 PROJECTILE MANAGEMENT - Array of active projectiles and update function
  const [projectiles, setProjectiles] = useAtom(projectilesAtom);

  // 🧍 PLAYER POSITION - Read-only access to player location
  const [playerPosition] = useAtom(playerPositionAtom);

  // ❤️ PLAYER HEALTH - Current health value and setter for damage/healing
  const [playerHealth, setPlayerHealth] = useAtom(activePlayerHealthAtom);

  // 🏆 SCORE TRACKING - Current game score
  const [score, setScore] = useAtom(scoreAtom);

  // 📊 STATISTICS - Number of enemies defeated
  const [enemiesKilled, setEnemiesKilled] = useAtom(enemiesKilledAtom);

  // 👁️ UI VISIBILITY - Whether to show heads-up display
  const [showHUD] = useAtom(showHUDAtom);

  // 🔫 WEAPON SELECTION - Current projectile type ID and setter
  const [currentProjectileType, setCurrentProjectileType] = useAtom(currentProjectileTypeAtom);

  // 🔧 DATA PROCESSING - Convert projectile type ID to full configuration object
  const projectileConfig = getProjectileType(currentProjectileType);

  // 🌍 WORLD BOUNDARIES - Get collision boundaries and world constraints
  const worldBounds = useWorldBounds();

  // 🚀 INITIALIZATION - Set default projectile type when component mounts
  useEffect(() => {
    const firstId = projectileTypes[0]?.id;
    if (firstId) {
      setCurrentProjectileType(firstId);
    }
  }, [setCurrentProjectileType]);

  return (
    <>
      {/* 🎮 3D GAME WORLD - Three.js Canvas with all 3D rendering */}
      <Canvas shadows
        camera={{
          position: [0, 15, 15], // Fixed height and behind player
          fov: 50,
          near: 0.1,
          far: 1000
        }}>

        {/* 💡 LIGHTING SYSTEM - Dynamic lights and shadows */}
        <LightingManager />

        {/* ✨ PARTICLE EFFECTS - Currently disabled for performance */}
        {/* <ParticleRenderer /> */}

        {/* 🌍 ENVIRONMENT - Skybox, ground, fog, and world boundaries */}
        <EnvironmentSetup />

        {/* 🎯 CORE GAME LOGIC - Player, enemies, projectiles, and interactions */}
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

        {/* 🎥 CAMERA CONTROLS - Mouse/touch camera movement */}
        {/* <OrbitControls /> */}
      </Canvas>

      {/* 📊 2D UI OVERLAY - Health, score, and game information */}
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
