/**
 * 🎮 SCENE COMPONENT - Main 3D Game World Container
 * ===============================================
 *
 * 🎯 WHAT THIS COMPONENT ACTUALLY DOES:
 * ✅ Manages essential game state atoms (gameState, player data, UI state)
 * ✅ Sets up the Three.js Canvas with camera configuration and mobile optimizations
 * ✅ Passes player state, game control, and world data to GameRenderer component
 * ✅ Renders the 3D scene and 2D HUD as separate layers
 * ✅ Provides world bounds and mobile detection to child components
 *
 * 🔄 DATA FLOW:
 * 1. Reads essential atoms for UI and player state management
 * 2. Passes player position/health, game state, and world bounds to GameRenderer
 * 3. GameRenderer reads game entities (enemies, projectiles) and projectile config from atoms
 * 4. GameRenderer handles projectile type processing and initialization internally
 * 5. Renders HUD with current game statistics
 * 6. Updates atoms when child components request changes
 *
 * 📊 STATE MANAGEMENT:
 * - gameState: Current game phase (menu, playing, gameOver) - passed to GameRenderer
 * - playerPosition/playerHealth: Player character state - passed to GameRenderer
 * - score/enemiesKilled: Game progress tracking - passed to GameRenderer
 * - showHUD: UI visibility control - used for HUD rendering
 * - Game entities (enemies/projectiles) read by GameRenderer from atoms
 * - Projectile configuration processed by GameRenderer from atoms
 */

import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useAtom } from 'jotai';

import {
  gameStateAtom,
  playerPositionAtom,
  activePlayerHealthAtom,
  scoreAtom,
  enemiesKilledAtom,
  showHUDAtom
} from '../config/atoms';
import { useWorldBounds } from '../config/configHelpers';
import LightingManager from './LightingManager';
import ParticleRenderer from './ParticleRenderer';
import EnvironmentSetup from './EnvironmentSetup';
import GameRenderer from './GameRenderer';
import HUD from './HUD';
import MobileGameControls from './MobileControls/MobileGameControls';

const Scene = ({ theme = {} }) => {
  // 🎮 CORE GAME STATE - Read/write access to game phase
  const [gameState, setGameState] = useAtom(gameStateAtom);

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

  // 🌍 WORLD BOUNDARIES - Get collision boundaries and world constraints
  const worldBounds = useWorldBounds();

  // 📱 MOBILE DETECTION - Detect if user is on mobile device
  const isMobile = useMemo(() => {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);


  return (
    <>
      {/* 🎮 3D GAME WORLD - Three.js Canvas with all 3D rendering */}
      <Canvas shadows={!isMobile} // Disable shadows on mobile for performance
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
        <EnvironmentSetup theme={theme} />

        {/* 🎯 CORE GAME LOGIC - Player, enemies, projectiles, and interactions */}
        <GameRenderer
          playerPosition={playerPosition}
          playerHealth={playerHealth}
          setPlayerHealth={setPlayerHealth}
          gameState={gameState}
          setGameState={setGameState}
          worldBounds={worldBounds}
          setScore={setScore}
          setEnemiesKilled={setEnemiesKilled}
          isMobile={isMobile}
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
        setGameState={setGameState}
      />
      
      {/* 📱 MOBILE CONTROLS - Only show on mobile devices */}
      {isMobile && <MobileGameControls />}
    </>
  );
};

export default Scene;
