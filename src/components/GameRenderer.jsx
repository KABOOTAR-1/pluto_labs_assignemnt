/**
 * 🎯 GAME RENDERER - Core Game Entity Coordinator
 * =============================================
 *
 * 🎯 WHAT THIS COMPONENT DOES:
 * ✅ Sets up physics world with gravity and collision materials (mobile optimized)
 * ✅ Reads game entities (enemies, projectiles) directly from atoms
 * ✅ Processes projectile type configuration from atoms
 * ✅ Renders player character with props from Scene
 * ✅ Conditionally renders enemies and projectiles only during PLAYING state
 * ✅ Manages enemy spawning system and projectile lifecycle
 * ✅ Handles projectile-enemy collision detection
 * ✅ Renders static floor/ground geometry
 * ✅ Uses Suspense for async component loading
 *
 * 🔄 DATA FLOW:
 * 1. Receives player state and game control props from Scene
 * 2. Reads enemies/projectiles arrays directly from atoms
 * 3. Processes currentProjectileType atom into full configuration
 * 4. Handles projectile creation and enemy defeat logic
 * 5. Updates score and statistics through prop callbacks
 *
 * 📊 PROP REQUIREMENTS (7 props):
 * - playerPosition/playerHealth/setPlayerHealth: Player state management
 * - gameState/setGameState: Game phase control
 * - worldBounds: Collision boundaries
 * - setScore/setEnemiesKilled: Statistics tracking
 * - isMobile: Device optimization flag
 *
 * 📊 ATOM DEPENDENCIES:
 * - enemiesAtom: Game entity array (read/write)
 * - projectilesAtom: Projectile array (read/write)
 * - currentProjectileTypeAtom: Weapon selection (read/write)
 */

import React, { Suspense } from 'react';
import { Physics } from '@react-three/cannon';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { gameConfig } from '../config/gameConfig';
import { GAME_STATES } from '../config/constants';
import {
  enemiesAtom,
  projectilesAtom,
  currentProjectileTypeAtom
} from '../config/atoms';
import { getProjectileType, projectileTypes } from '../data/projectileTypes';
import { activateProjectile } from '../utils/gameUtils';

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

import {CollectibleManager} from './collectibles/CollectibleManager';

const GameRenderer = ({
  playerPosition,
  playerHealth,
  setPlayerHealth,
  gameState,
  setGameState,
  worldBounds,
  setScore,
  setEnemiesKilled,
  isMobile=false
}) => {
  // 🎮 GAME STATE - Read atoms directly instead of receiving as props
  const [enemies, setEnemies] = useAtom(enemiesAtom);
  const [projectiles, setProjectiles] = useAtom(projectilesAtom);
  const [currentProjectileType, setCurrentProjectileType] = useAtom(currentProjectileTypeAtom);

  // 🔧 PROJECTILE CONFIGURATION - Process projectile type into full configuration
  const selectedProjectileType = getProjectileType(currentProjectileType);

  // 🚀 INITIALIZATION - Set default projectile type when component mounts
  useEffect(() => {
    const firstId = projectileTypes[0]?.id;
    if (firstId) {
      setCurrentProjectileType(firstId);
    }
  }, [setCurrentProjectileType]);

  // 🔫 SHOOTING HANDLER - Handle projectile creation internally
  const handleShoot = (projectileData) => {
    setProjectiles((prev) => activateProjectile(prev, projectileData));
  };
  return (
    // ⚙️ PHYSICS WORLD - Cannon-es physics simulation with gravity and materials
   <Physics
  gravity={isMobile ? gameConfig.physics.gravity/2 : gameConfig.physics.gravity}
  iterations={isMobile ? 3 : 10}
  tolerance={isMobile ? 0.001 : 0.0001}
  broadphase={isMobile ? 'NaiveBroadphase' : 'SAPBroadphase'}
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
          onShoot={handleShoot}
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

          <CollectibleManager worldBounds={worldBounds}/>
        </>
      )}

      {/* 🏞️ STATIC GROUND - Always rendered collision surface */}
      <Floor />
    </Physics>
  );
};

export default GameRenderer;