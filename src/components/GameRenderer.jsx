/**
 * 🎯 GAME RENDERER - Core Game Entity Coordinator
 * =============================================
 *
 * 🎯 WHAT THIS COMPONENT DOES:
 * ✅ Sets up physics world with gravity and collision materials
 * ✅ Renders player character with all necessary props
 * ✅ Conditionally renders enemies and projectiles only during PLAYING state
 * ✅ Manages enemy spawning system
 * ✅ Handles projectile-enemy collision detection
 * ✅ Renders static floor/ground geometry
 * ✅ Uses Suspense for async component loading
 *
 * 🔄 GAME STATE MANAGEMENT:
 * - Only renders dynamic entities (enemies/projectiles) when gameState === PLAYING
 * - Player is always rendered but behavior changes based on gameState
 * - Enemy spawner only active during gameplay
 * - Physics world always active for collision detection
 *
 * 📊 PROP REQUIREMENTS:
 * Receives 13 props from Scene component for complete game state management
 * All props are required for proper game functionality
 */

import React, { Suspense } from 'react';
import { Physics } from '@react-three/cannon';
import { gameConfig } from '../config/gameConfig';
import { GAME_STATES } from '../config/constants';

/**
 * 🧍 PLAYER COMPONENT - Main character with movement and combat
 * Handles player input, health, position, and shooting mechanics
 */
import Player from './Player';

/**
 * 🏞️ FLOOR COMPONENT - Ground plane with collision and texturing
 * Provides walking surface and collision boundaries
 */
import Floor from './Floor';

/**
 * 👹 ENEMIES COMPONENT - Enemy rendering and AI coordination
 * Manages multiple enemy entities with individual behaviors
 */
import Enemies from './Enemies';

/**
 * 🎯 PROJECTILES COMPONENT - Bullet rendering and collision
 * Handles projectile movement, lifetime, and enemy hits
 */
import Projectiles from './Projectiles';

/**
 * 🏭 ENEMY SPAWNER - Enemy generation and placement system
 * Creates new enemies based on game rules and player position
 */
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
    // ⚙️ PHYSICS WORLD - Cannon-es physics simulation with gravity and materials
    <Physics
      gravity={gameConfig.physics.gravity}
      defaultContactMaterial={{
        friction: gameConfig.physics.friction,
        restitution: gameConfig.physics.restitution}
      }
    >
      {/* 🧍 PLAYER CHARACTER - Always rendered, behavior changes with game state */}
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

      {/* 🎮 DYNAMIC ENTITIES - Only rendered during active gameplay */}
      {gameState === GAME_STATES.PLAYING && (
        <>
          {/* 🏭 ENEMY SPAWNING - Creates new enemies based on game rules */}
          <EnemySpawner
            enemies={enemies}
            setEnemies={setEnemies}
            playerPosition={playerPosition}
            gameState={gameState}
            worldBounds={worldBounds}
          />

          {/* 👹 ACTIVE ENEMIES - Rendered enemies with AI and collision */}
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

          {/* 🎯 ACTIVE PROJECTILES - Bullets with collision detection */}
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

      {/* 🏞️ STATIC GROUND - Always rendered collision surface */}
      <Floor />
    </Physics>
  );
};

export default GameRenderer;