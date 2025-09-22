/**
 * 💎 USE COLLECTIBLE SPAWNER HOOK - Collectible Generation System
 * =============================================================
 *
 * 🎯 HOW AI SHOULD USE THIS HOOK:
 * ✅ This hook provides a spawn function for collectible generation
 * ✅ Handles spawn probability, timing constraints, and position randomization
 * ✅ Receives all configuration as props for maximum flexibility
 * ✅ Can be used in any component that needs collectible spawning logic
 * ✅ Provides clean separation of spawning logic from rendering
 *
 * 🔄 SPAWN TRIGGER SYSTEM:
 * - Returns a spawn function that can be called when enemy is defeated
 * - Applies probability-based spawning with provided settings
 * - Enforces minimum spawn delays and maximum active limits
 * - Generates random spawn positions within world bounds with margin
 *
 * 📊 SPAWN MECHANICS:
 * - Probability: Configurable chance per enemy defeat (0-1)
 * - Delay: Minimum time between spawns (seconds)
 * - Max Active: Population control to prevent screen clutter
 * - Position: Random variation within world bounds minus margin
 * - Type: Configurable collectible effects (healing, speed, etc.)
 *
 * 🎮 INTEGRATION POINTS:
 * - collectibles/setCollectibles: Manages active collectible pool
 * - Settings: Passed as props for user configuration
 * - activateCollectible: Utility function for pool management
 */

import { useRef, useCallback } from 'react';
import { activateCollectible, getActiveCollectiblesCount } from '../utils/gameUtils';

/**
 * 💎 USE COLLECTIBLE SPAWNER HOOK - Collectible Spawn Function Provider
 * ===================================================================
 *
 * @description Provides a collectible spawning function with configurable behavior
 * @param {Object} props - Configuration object for spawning behavior
 * @param {Array} props.collectibles - Current active collectibles array
 * @param {Function} props.setCollectibles - Function to update collectibles array
 * @param {number} props.spawnChance - Probability per enemy defeat (0.0 = never, 1.0 = always)
 * @param {number} props.spawnDelay - Minimum seconds between spawns
 * @param {number} props.maxActiveCollectibles - Maximum simultaneous collectibles
 * @param {Object} props.worldBounds - World boundary limits for spawning
 * @param {Object} props.collectibleType - Collectible type configuration (effect, duration, etc.)
 * @returns {Function} spawnCollectible - Function to attempt spawning a collectible
 *
 * 🎯 HOOK RESPONSIBILITIES:
 * - Provide a spawn function that can be called on enemy defeats
 * - Apply configurable spawn probability and constraints
 * - Generate random spawn positions within world bounds with margin
 * - Create collectibles with configurable effects and properties
 * - Update spawn timing and collectible pool state
 * - Handle spawn delay enforcement and population limits
 *
 * 🔄 SPAWN DECISION PROCESS:
 * 1. Spawn function called → Check if spawning conditions met
 * 2. Verify timing constraints (minimum delay since last spawn)
 * 3. Check population limits (maximum active collectibles)
 * 4. Roll probability dice against provided spawn chance
 * 5. Generate random position within world bounds minus margin if spawn approved
 * 6. Create collectible data with configurable type and properties
 * 7. Activate collectible in object pool and update spawn timestamp
 *
 * 📊 CONFIGURABLE PARAMETERS:
 * - spawnChance: Probability per enemy defeat (0.0 = never, 1.0 = always)
 * - spawnDelay: Minimum seconds between spawns
 * - maxActiveCollectibles: Maximum simultaneous collectibles
 * - worldBounds: Boundary constraints with margin for spawn positioning
 * - collectibleType: Effect configuration (healAmount, speedBoost, etc.)
 *
 * ⚡ PERFORMANCE OPTIMIZATIONS:
 * - Early returns for unmet conditions (prevents unnecessary calculations)
 * - Efficient random position generation within bounds minus margin
 * - Minimal state updates through targeted operations
 * - Object pooling prevents garbage collection overhead
 */
export const useCollectibleSpawner = ({
  collectibles,
  setCollectibles,
  spawnChance,
  spawnDelay,
  maxActiveCollectibles,
  worldBounds,
  collectibleType
}) => {
  // Track last spawn time using ref to avoid re-renders
  const lastSpawnTimeRef = useRef(0);

  /**
   * 🎯 SPAWN COLLECTIBLE FUNCTION - Attempt to Spawn a Collectible
   * ============================================================
   *
   * @description Attempts to spawn a collectible based on current conditions and settings
   * @returns {boolean} true if collectible was spawned, false if conditions not met
   *
   * 🔄 SPAWN DECISION PROCESS:
   * 1. Check if enough time has passed since last spawn (delay enforcement)
   * 2. Verify we're under the maximum active collectible limit
   * 3. Roll probability dice against provided spawn chance
   * 4. If successful, generate random spawn position within world bounds minus margin
   * 5. Create complete collectible data object with configurable type and properties
   * 6. Activate collectible in object pool and update spawn timestamp
   * 7. Return success status for caller feedback
   *
   * 📊 SPAWN CONSTRAINTS:
   * - Minimum delay: Prevents collectible spam during intense combat
   * - Maximum active: Maintains visual clarity and performance
   * - Probability: Provides rarity and strategic value
   * - World bounds with margin: Ensures collectibles spawn away from boundaries
   * - Type validation: Ensures collectibleType is properly configured
   *
   * 🎲 RANDOMIZATION:
   * - Spawn location: Random position within world bounds minus 2-unit margin
   * - Probability check: Math.random() vs user setting for fairness
   * - Timing: Based on function call timing
   *
   * ⚡ EFFICIENCY FEATURES:
   * - Early exit conditions prevent unnecessary computations
   * - Minimal state updates through targeted operations
   * - Object pooling eliminates memory allocation overhead
   * - Real-time settings integration for immediate user feedback
   */
  const spawnCollectible = useCallback((customCollectibleType = null) => {
    const currentTime = Date.now();
    const timeSinceLastSpawn = currentTime - lastSpawnTimeRef.current;
    const activeCollectibleCount = getActiveCollectiblesCount(collectibles);

    // Use provided collectible type or fallback to the hook's default
    const typeToUse = customCollectibleType || collectibleType;

    // 🚫 Check spawn constraints (early exits for performance)
    if (timeSinceLastSpawn < spawnDelay) return false; // Too soon since last spawn
    if (activeCollectibleCount >= maxActiveCollectibles) return false; // Too many active collectibles
    if (!typeToUse) return false; // No collectible type configured

    // 🎲 Probability check for spawning
    if (Math.random() >= spawnChance) return false; // Failed probability check

    // 📍 Generate random spawn position within world bounds with margin from edges
    const margin = 2; // Units to keep away from world boundaries
    const effectiveMinX = worldBounds.minX + margin;
    const effectiveMaxX = worldBounds.maxX - margin;
    const effectiveMinZ = worldBounds.minZ + margin;
    const effectiveMaxZ = worldBounds.maxZ - margin;

    const spawnX = effectiveMinX + Math.random() * (effectiveMaxX - effectiveMinX);
    const spawnZ = effectiveMinZ + Math.random() * (effectiveMaxZ - effectiveMinZ);
    const spawnPosition = [
      spawnX, // Random X within world bounds minus margin
      0.5, // Fixed Y: Slightly above ground level
      spawnZ  // Random Z within world bounds minus margin
    ];

    // 💎 Create new collectible data object with configurable type
    const newCollectibleData = {
      position: spawnPosition,
      type: typeToUse.id || 'health', // Collectible type identifier
      effect: typeToUse.effect || 'heal', // Effect type (heal, speed, etc.)
      value: typeToUse.value || typeToUse.healAmount || 25, // Effect value
      duration: typeToUse.duration || 0, // Effect duration (0 = instant)
      spawnTime: currentTime,
      lifetime: typeToUse.lifetimeMs || typeToUse.lifetime || 15000, // Visual lifetime in ms
      rotationSpeed: typeToUse.rotationSpeed || 2, // Visual rotation speed
      size: typeToUse.size || 0.8 // Collision size
    };

    // 🔄 Activate collectible in object pool
    setCollectibles(prev => activateCollectible(prev, newCollectibleData));
    lastSpawnTimeRef.current = currentTime;

    // 🎵 TODO: Add spawn sound effect
    // playCollectibleSpawnSound();

    return true; // Successfully spawned
  }, [
    collectibles,
    setCollectibles,
    spawnChance,
    spawnDelay,
    maxActiveCollectibles,
    worldBounds,
    collectibleType
  ]);

  return spawnCollectible;
};
