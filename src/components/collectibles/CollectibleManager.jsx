/**
 * 💎 COLLECTIBLE MANAGER - Health Collectible System Coordinator
 * ============================================================
 *
 * 🎯 HOW AI SHOULD USE THIS COMPONENT:
 * ✅ This manages all collectibles in the game world
 * ✅ Handles spawning, rendering, and lifecycle management
 * ✅ Integrates with time-based spawning system
 * ✅ Uses object pooling for performance optimization
 * ✅ Provides spawn rate control and difficulty balancing
 *
 * 🔄 COLLECTIBLE SYSTEM FLOW:
 * 1. Time-based spawning with random intervals
 * 2. Check spawn probability and timing constraints
 * 3. Spawn collectible within world bounds
 * 4. Render all active collectibles using BaseCollectible
 * 5. Handle automatic cleanup of expired collectibles
 *
 * 📊 SPAWN MECHANICS:
 * - Time-based spawning with random intervals
 * - Probability-based spawning (configurable via atoms)
 * - Maximum active collectibles limit for balance
 * - Random position variation within world bounds
 *
 * 🎮 INTEGRATION POINTS:
 * - collectiblesAtom: Manages active collectible collection
 * - Theme system: Visual customization
 * - Settings atoms: User-configurable spawn rates
 *
 * ⚡ PERFORMANCE FEATURES:
 * - Object pooling prevents memory allocation
 * - Efficient active collectible filtering
 * - Minimal re-renders through atom optimization
 * - Batch operations for spawn management
 */

import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import {
  collectiblesAtom,
  collectibleSpawnChanceSettingAtom,
  maxActiveCollectiblesSettingAtom,
  collectibleSpawnDelaySettingAtom,
  playerPositionAtom,
  activePlayerHealthAtom,
  basePlayerHealthAtom,
  collectiblesCollectedAtom,
  totalHealthRestoredAtom
} from '../../config/atoms';
import { useCurrentTheme } from '../../config/gameConfig';
import { BaseCollectible } from './BaseCollectible';
import { useCollectibleSpawner } from '../../hooks/useCollectibleSpawner';
import { useCollectibleCollector } from '../../hooks/useCollectibleCollector';
import { getCollectibleType, getCollectibleTypeIds } from '../../data/collectibleTypes';
import { COLLECTIBLE_TYPES } from '../../config/constants';

/**
 * 🎮 COLLECTIBLE MANAGER COMPONENT - System Coordinator
 * ===================================================
 *
 * @description Manages the complete collectible system lifecycle
 * @returns {JSX.Element} Rendered active collectibles in the game world
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Time-based spawning with random intervals
 * - Enforce spawn probability and timing rules
 * - Manage collectible pool activation and deactivation
 * - Render all active collectibles with proper configuration
 * - Handle spawn location randomization within world bounds
 * - Maintain spawn rate balance and difficulty scaling
 *
 * 🔄 SPAWN TRIGGER SYSTEM:
 * - Uses time-based intervals with randomization
 * - Respects maximum active collectibles limits
 * - Provides random position variation within world bounds
 *
 * 📊 SPAWN CONFIGURATION:
 * - Spawn chance: Probability of successful spawn (0-1)
 * - Spawn intervals: Min/max time between spawns (ms)
 * - Max active: Maximum simultaneous collectibles
 * - World bounds: Boundary constraints for positioning
 */
export const CollectibleManager = ({ worldBounds }) => {
  const theme = useCurrentTheme();
  
  // Collectible state management
  const [collectibles, setCollectibles] = useAtom(collectiblesAtom);

  // Player and health state for collection
  const [playerPosition] = useAtom(playerPositionAtom);
  const [activePlayerHealth, setActivePlayerHealth] = useAtom(activePlayerHealthAtom);
  const [basePlayerHealth] = useAtom(basePlayerHealthAtom);
  const [, setCollectiblesCollected] = useAtom(collectiblesCollectedAtom);
  const [, setTotalHealthRestored] = useAtom(totalHealthRestoredAtom);

  // User-configurable settings (real-time)
  const [spawnChance] = useAtom(collectibleSpawnChanceSettingAtom);
  const [maxActiveCollectibles] = useAtom(maxActiveCollectiblesSettingAtom);
  const [spawnDelaySeconds] = useAtom(collectibleSpawnDelaySettingAtom);
  const spawnDelay = spawnDelaySeconds * 1000; // Convert to milliseconds

  // Default rotation speed for collectibles (fallback if not specified in spawned collectible)
  const defaultRotationSpeed = 2;

  // Get available collectible type IDs for random selection
  const availableCollectibleIds = getCollectibleTypeIds();

  // Create spawner function that can handle any collectible type
  const baseSpawnCollectible = useCollectibleSpawner({
    collectibles,
    setCollectibles,
    spawnChance,
    spawnDelay,
    maxActiveCollectibles,
    worldBounds,
    collectibleType: null // We'll override this per spawn
  });

  // Enhanced spawn function that randomly selects collectible type
  const spawnRandomCollectible = React.useCallback(() => {
    // Randomly select a collectible type
    const randomIndex = Math.floor(Math.random() * availableCollectibleIds.length);
    const selectedTypeId = availableCollectibleIds[randomIndex];
    const selectedCollectibleType = getCollectibleType(selectedTypeId);

    // Call the base spawner with the selected type
    return baseSpawnCollectible(selectedCollectibleType);
  }, [availableCollectibleIds, baseSpawnCollectible]);

  // 💎 COLLECTIBLE COLLECTION SYSTEM - Single hook instance for all collectibles
  useCollectibleCollector({
    playerPosition,
    activePlayerHealth,
    setActivePlayerHealth,
    basePlayerHealth,
    collectibles,
    setCollectibles,
    setCollectiblesCollected,
    setTotalHealthRestored
  });

  // Time-based spawning with random intervals
  useEffect(() => {
    const scheduleNextSpawn = () => {
      // Get a random collectible type for interval calculation
      const randomIndex = Math.floor(Math.random() * availableCollectibleIds.length);
      const selectedTypeId = availableCollectibleIds[randomIndex];
      const selectedCollectibleType = getCollectibleType(selectedTypeId);

      // Random interval between min and max from selected collectible type
      const randomInterval = selectedCollectibleType.spawnIntervalMin +
        Math.random() * (selectedCollectibleType.spawnIntervalMax - selectedCollectibleType.spawnIntervalMin);

      setTimeout(() => {
        spawnRandomCollectible();
        scheduleNextSpawn(); // Schedule the next spawn
      }, randomInterval);
    };

    scheduleNextSpawn(); // Start the first spawn

    // No cleanup needed as the timeout chain will continue
  }, [spawnRandomCollectible, availableCollectibleIds]);

  /**
   * 🎨 ACTIVE COLLECTIBLES RENDERING - 3D World Integration
   * =====================================================
   *
   * @description Renders all active collectibles in the game world
   *
   * 🔄 RENDERING PROCESS:
   * 1. Filter collectibles array for active entities
   * 2. Map each active collectible to BaseCollectible component
   * 3. Pass collectible configuration and theme data
   * 4. Handle unique key generation for React
   *
   * ⚡ PERFORMANCE OPTIMIZATIONS:
   * - Only renders active collectibles (filtered array)
   * - Stable keys prevent unnecessary re-renders
   * - Component reuse through object pooling
   * - Minimal prop passing for efficiency
   *
   * 🎭 VISUAL INTEGRATION:
   * - Each collectible uses BaseCollectible for consistent behavior
   * - Theme-based visual customization
   * - Smooth animations and effects
   * - Proper 3D positioning and scaling
   */
  const activeCollectibles = collectibles.filter(collectible => collectible.active);

  return (
    <>
      {activeCollectibles.map(collectible => (
        <BaseCollectible
          key={collectible.id}
          id={collectible.id}
          position={collectible.position}
          spawnTime={collectible.spawnTime}
          lifetime={collectible.lifetime}
          rotationSpeed={collectible.rotationSpeed || defaultRotationSpeed}
          collectibleType={collectible.type || 'health'}
        />
      ))}
    </>
  );
};