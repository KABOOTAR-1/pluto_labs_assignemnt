// ============================================================================
// 🏭 USE ENEMY SPAWNER HOOK - Dynamic Enemy Generation with Difficulty Scaling
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS HOOK:
// ✅ This handles dynamic enemy spawning during gameplay with automatic difficulty scaling
// ✅ Uses object pooling via activateEnemy for performance optimization
// ✅ Currently used by EnemySpawner component for enemy generation
// ✅ Integrates with user settings and theme configurations for spawn behavior
// ✅ Provides automatic population control and safe spawn positioning
//
// 📊 WHAT USEENEMYSPAWNER ACTUALLY DOES:
// - Spawn timing: manages when enemies appear based on spawn rate and difficulty
// - Population control: enforces maximum enemy count limits for performance
// - Difficulty scaling: automatically increases spawn frequency over time
// - Safe positioning: spawns enemies around player within world boundaries
// - Type randomization: randomly selects enemy types from available types
// - Object pooling: reuses enemy objects for memory efficiency
//
// 📊 WHAT USEENEMYSPAWNER DOES NOT DO (happens elsewhere):
// - Enemy behavior: handled by enemy behavior hooks (chase, attack, cleanup, facing)
// - Enemy rendering: handled by enemy components (FastEnemy, TankEnemy, etc.)
// - Enemy types definition: defined in theme configurations and ENEMY_BASES
// - Physics body creation: done in BaseEnemy component with useBox
// - Enemy health/damage: managed by enemy configurations and combat system
//
// 🔄 STATE MANAGEMENT:
// - enemies: Enemy object pool array (required)
// - setEnemies: State setter for enemy updates (required)
// - playerPosition: Player coordinates for spawn positioning (required)
// - gameState: Current game state for spawn activation control (required)
// - maxOnScreen: Population limit from user settings (required)
// - enemyTypes: Available enemy types from current theme (required)
// - spawnRadius: Distance from player for spawning (required)
// - worldBounds: World boundaries for safe spawn zones (required)
// - difficultyIncreaseInterval: Seconds between difficulty increases (optional, default: 30)
// - difficultyMultiplierStep: Multiplier for difficulty scaling (optional, default: 1.2)
// - enemySpawnRate: User-configured spawn rate multiplier (optional, default: 1.0)
// - difficultyMultiplier: User-configured difficulty scaling (optional, default: 1.0)

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { activateEnemy } from "../utils/gameUtils";
import { GAME_STATES } from "../config/constants";

/**
 * 🏭 USE ENEMY SPAWNER HOOK - Dynamic Enemy Generation with Difficulty Scaling
 * ==========================================================================
 *
 * @description Handles dynamic enemy spawning during gameplay with automatic difficulty scaling
 * @param {Object} config - Configuration object containing all spawn parameters
 * @returns {void} No return value - manages enemy spawning through side effects
 *
 * 🎯 HOOK RESPONSIBILITIES:
 * - Manage spawn timing based on difficulty and user settings
 * - Control enemy population to maintain performance
 * - Select random enemy types from theme configuration
 * - Calculate safe spawn positions around player
 * - Apply automatic difficulty scaling over time
 * - Use object pooling for memory efficiency
 *
 * 🏭 SPAWN MECHANICS:
 * - Timing: Based on spawn rate, difficulty multipliers, and dynamic scaling
 * - Positioning: Circular spawn around player at specified radius
 * - Safety: Ensures spawn positions are within world boundaries
 * - Population: Respects maximum enemy count limits
 * - Difficulty: Automatically increases spawn frequency over time
 *
 * 🚀 CURRENT USAGE:
 * - EnemySpawner Component: Main enemy generation system
 * - Object Pooling: Uses activateEnemy from gameUtils for performance
 * - Theme Integration: Receives enemy types from theme system
 * - Settings Integration: Uses player-configured spawn parameters
 */
export const useEnemySpawner = ({
  enemies,
  setEnemies,
  playerPosition,
  gameState,
  maxOnScreen,
  enemyTypes,
  spawnRadius,
  worldBounds,
  difficultyIncreaseInterval = 30,
  difficultyMultiplierStep = 1.2,
  enemySpawnRate = 1.0,
  difficultyMultiplier = 1.0,
}) => {
  const spawnTimer = useRef(0);
  const difficultyTimer = useRef(0);
  const dynamicDifficultyMultiplier = useRef(1);

  const spawnEnemy = () => {
    const activeCount = enemies.filter(e => e.active).length;
    if (activeCount >= maxOnScreen) return;

    // Pick random type
    const randomType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    const enemyConfig = randomType;

    const angle = Math.random() * Math.PI * 2;
    let spawnX = playerPosition[0] + Math.sin(angle) * spawnRadius;
    let spawnZ = playerPosition[2] + Math.cos(angle) * spawnRadius;

    // Ensure spawn position is within world bounds - 5 units from edges
    const safeMinX = worldBounds.minX + 5;
    const safeMaxX = worldBounds.maxX - 5;
    const safeMinZ = worldBounds.minZ + 5;
    const safeMaxZ = worldBounds.maxZ - 5;

    spawnX = Math.max(safeMinX, Math.min(safeMaxX, spawnX));
    spawnZ = Math.max(safeMinZ, Math.min(safeMaxZ, spawnZ));

    const enemyData = {
      type: randomType.id,
      position: [spawnX, enemyConfig.size, spawnZ],
      health: enemyConfig.health,
      size: enemyConfig.size,
      scale: enemyConfig.scale || [1, 1, 1],
      speed: enemyConfig.speed,
    };

    setEnemies((prev) => activateEnemy(prev, enemyData));
  };

  useFrame((_, delta) => {
    if (gameState !== GAME_STATES.PLAYING) return;

    spawnTimer.current += delta;
    difficultyTimer.current += delta;

    if (spawnTimer.current >= (1 / dynamicDifficultyMultiplier.current) * (1 / enemySpawnRate) * (1 / difficultyMultiplier)) {
      spawnTimer.current = 0;
      spawnEnemy();
    }

    if (difficultyTimer.current >= difficultyIncreaseInterval) {
      difficultyTimer.current = 0;
      dynamicDifficultyMultiplier.current *= difficultyMultiplierStep;
    }
  });
};
