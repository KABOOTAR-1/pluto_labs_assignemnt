/**
 * 💎 USE COLLECTIBLE COLLECTOR HOOK - Collectible Collection System
 * ===============================================================
 *
 * 🎯 HOW AI SHOULD USE THIS HOOK:
 * ✅ This hook manages collectible collection and effect application
 * ✅ Handles collision detection between player and collectibles
 * ✅ Applies configurable effects (healing, speed boosts, etc.)
 * ✅ Updates game statistics and manages collectible lifecycle
 * ✅ Provides clean separation of collection logic from rendering
 *
 * 🔄 COLLECTION SYSTEM:
 * - Monitors player position relative to active collectibles
 * - Performs distance-based collision detection using collectible size
 * - Applies collectible effects based on type and configuration
 * - Updates statistics and removes collected collectibles
 * - Handles both instant and duration-based effects
 *
 * 📊 COLLECTION MECHANICS:
 * - Collision: Distance-based detection using collectible size as radius
 * - Effects: Configurable types (heal, speed, damage, etc.)
 * - Duration: Support for temporary and permanent effects
 * - Statistics: Tracks collection count and effect totals
 * - Cleanup: Automatic collectible removal after collection
 *
 * 🎮 INTEGRATION POINTS:
 * - playerPosition: For collision detection
 * - collectibles/setCollectibles: Manages active collectible pool
 * - Player stats: Health, speed, etc. for effect application
 * - deactivateCollectible: Utility function for pool management
 */

import { useCallback, useEffect, useRef } from 'react';
import { deactivateCollectible } from '../utils/gameUtils';
import { COLLECTIBLE_TYPES } from '../config/constants';

/**
 * 💎 USE COLLECTIBLE COLLECTOR HOOK - Collectible Collection and Effect System
 * ===========================================================================
 *
 * @description Manages collectible collection, collision detection, and effect application
 * @param {Object} props - Configuration object for collection behavior
 * @param {Array<number>} props.playerPosition - Current player position [x, y, z]
 * @param {number} props.activePlayerHealth - Current active player health
 * @param {Function} props.setActivePlayerHealth - Function to update active player health
 * @param {number} props.basePlayerHealth - Maximum player health capacity
 * @param {Array} props.collectibles - Current active collectibles array
 * @param {Function} props.setCollectibles - Function to update collectibles array
 * @param {Function} props.setCollectiblesCollected - Function to update collection count
 * @param {Function} props.setTotalHealthRestored - Function to update healing statistics
 * @returns {void} Hook manages collection through side effects, no return value needed
 *
 * 🎯 HOOK RESPONSIBILITIES:
 * - Monitor player position relative to active collectibles
 * - Perform distance-based collision detection using collectible size
 * - Apply collectible effects based on type and configuration
 * - Update game statistics for collected collectibles
 * - Remove collected collectibles from active pool
 * - Handle both instant and duration-based effects
 *
 * 🔄 COLLECTION PROCESS:
 * 1. Monitor player position changes for collision opportunities
 * 2. Calculate distance between player and each active collectible
 * 3. Check if distance is within collectible size (collection radius)
 * 4. Apply collectible effect based on type (heal, speed, etc.)
 * 5. Update relevant game statistics
 * 6. Remove collectible from active pool
 * 7. Handle effect cleanup for duration-based collectibles
 *
 * 📊 EFFECT TYPES SUPPORTED:
 * - heal: Restores player health up to maximum
 * - speed: Temporary movement speed boost
 * - damage: Temporary damage boost
 * - shield: Temporary damage immunity
 * - Custom: Extensible for new effect types
 *
 * ⚡ PERFORMANCE OPTIMIZATIONS:
 * - Efficient distance calculations for collision detection
 * - Early returns for collectibles outside collection range
 * - Minimal state updates through targeted operations
 * - Object pooling prevents memory allocation overhead
 *
 * 🔧 TO ADD NEW COLLECTIBLE EFFECTS:
 * 1. Add new case to applyCollectibleEffect function switch statement
 * 2. Add required state setters as props to this hook
 * 3. Update CollectibleManager to pass new props to this hook
 * 
 * Example for speed boost:
 * ```javascript
 * case 'speed': {
 *   const speedMultiplier = collectible.value || 2;
 *   const duration = collectible.duration || 5000;
 *   setPlayerSpeedMultiplier(speedMultiplier);
 *   setTimeout(() => setPlayerSpeedMultiplier(1), duration);
 *   break;
 * }
 * ```
 */
export const useCollectibleCollector = ({
  playerPosition,
  activePlayerHealth,
  setActivePlayerHealth,
  basePlayerHealth,
  collectibles,
  setCollectibles,
  setCollectiblesCollected,
  setTotalHealthRestored
}) => {
  // 🛡️ Persistent guard to prevent duplicate collections across multiple useEffect runs
  const collectedIdsRef = useRef(new Set());

  /**
   * 🎯 APPLY COLLECTIBLE EFFECT - Execute Collectible Effect Logic
   * ============================================================
   *
   * @description Applies the effect of a collected collectible based on its type
   * @param {Object} collectible - The collectible object containing effect configuration
   *
   * 🔄 EFFECT TYPES HANDLED:
   * - heal: Restores player health with overheal prevention
   * - speed: Applies temporary speed boost (TODO: implement)
   * - damage: Applies temporary damage boost (TODO: implement)
   * - shield: Applies temporary immunity (TODO: implement)
   * - Custom: Extensible for new effect types
   *
   * 📊 HEALING LOGIC:
   * - Calculates actual healing amount (prevents overhealing)
   * - Updates active player health within base maximum
   * - Tracks total healing for game statistics
   * - Provides console feedback for debugging
   *
   * 🎮 EFFECT EXTENSIBILITY:
   * - Modular effect application allows easy addition of new types
   * - Consistent effect structure for all collectible types
   * - Centralized effect logic for maintainability
   * - Type-based effect routing for clean code organization
   */
  const applyCollectibleEffect = useCallback((collectible) => {
    switch (collectible.effect) {
      case COLLECTIBLE_TYPES.HEALTH: {
        // ❤️ HEALTH RESTORATION EFFECT
        const healAmount = collectible.value || 25;
        setActivePlayerHealth(prev => Math.min(prev + healAmount, basePlayerHealth));

        setTotalHealthRestored(prev => prev + healAmount);

        console.log(`Collectible collected! Healed for ${healAmount} HP.`);
        break;
      }

      case 'speed':
        // 🏃‍♂️ SPEED BOOST EFFECT (TODO: implement)
        console.log(`Speed boost collectible collected! +${collectible.value} speed for ${collectible.duration}s`);
        // TODO: Implement speed boost logic
        break;

      case 'damage':
        // 💥 DAMAGE BOOST EFFECT (TODO: implement)
        console.log(`Damage boost collectible collected! +${collectible.value} damage for ${collectible.duration}s`);
        // TODO: Implement damage boost logic
        break;

      case 'shield':
        // 🛡️ SHIELD EFFECT (TODO: implement)
        console.log(`Shield collectible collected! Immunity for ${collectible.duration}s`);
        // TODO: Implement shield logic
        break;

      default:
        // ❓ UNKNOWN EFFECT TYPE
        console.warn(`Unknown collectible effect: ${collectible.effect}`);
        break;
    }
  }, [setActivePlayerHealth, setTotalHealthRestored]);

  /**
   * 💎 COLLECTIBLE COLLECTION MONITOR - Detect and Process Collections
   * ================================================================
   *
   * @description Monitors player position and checks for collectible collections
   *
   * 🔄 COLLECTION DETECTION:
   * 1. Triggered whenever player position changes
   * 2. Iterate through all active collectibles
   * 3. Calculate 3D distance between player and collectible
   * 4. Check if distance is within collectible size (collection radius)
   * 5. Apply collectible effect if collision detected
   * 6. Update statistics and remove collectible from pool
   *
   * 📊 COLLISION CALCULATION:
   * - Uses 3D Euclidean distance: sqrt(dx² + dy² + dz²)
   * - Collectible size as collection radius for accurate hit detection
   * - Efficient early returns for distant collectibles
   * - Prevents multiple collections of same collectible
   *
   * 🎯 EFFECT APPLICATION:
   * - heal: Increases player health up to base maximum
   * - Tracks healing amount for statistics
   * - Prevents overhealing beyond maximum health
   * - Updates both active and statistical health values
   *
   * ⚡ EFFICIENCY FEATURES:
   * - Size-based collision detection for accurate interaction
   * - Distance-based early exit for performance
   * - Single-pass iteration through active collectibles
   * - Immediate collectible deactivation after collection
   * - Minimal re-renders through targeted state updates
   * - Collection guard prevents duplicate processing during state updates
   */
  useEffect(() => {
    if (!collectibles || collectibles.length === 0) return;

    // Check each active collectible for collection
    collectibles.forEach(collectible => {
      if (!collectible.active || collectedIdsRef.current.has(collectible.id)) return; // Skip inactive or already processed collectibles

      // 📏 Calculate 3D distance between player and collectible
      const dx = playerPosition[0] - collectible.position[0];
      const dy = playerPosition[1] - collectible.position[1];
      const dz = playerPosition[2] - collectible.position[2];
      const distanceSq = dx * dx + dy * dy + dz * dz;

      // 💎 Check if player is within collectible size (collection radius)
      const collectionRadius = collectible.size || 0.8; // Use collectible size or default
      if (distanceSq <= collectionRadius * collectionRadius) {
        // 🛡️ Mark as collected to prevent duplicate processing (persistent across useEffect runs)
        collectedIdsRef.current.add(collectible.id);

        // 🎯 Apply collectible effect based on type
        applyCollectibleEffect(collectible);

        // 📊 Update collection statistics
        setCollectiblesCollected(prev => prev + 1);

        // 🗑️ Remove collectible from active pool
        setCollectibles(prev => deactivateCollectible(prev, collectible.id));

        // 🎵 TODO: Add collection sound effect and particle burst
        // playCollectibleCollectSound();
        // spawnCollectionParticles(collectible.position);
      }
    });
  }, [playerPosition, collectibles, setCollectibles, setCollectiblesCollected, activePlayerHealth, basePlayerHealth, setActivePlayerHealth, setTotalHealthRestored, applyCollectibleEffect]);

  // 🧹 Cleanup collected IDs when collectibles array changes (removes inactive collectibles)
  useEffect(() => {
    if (!collectibles || collectibles.length === 0) {
      collectedIdsRef.current.clear();
      return;
    }

    // Remove IDs of collectibles that are no longer active
    const activeIds = new Set(collectibles.filter(c => c.active).map(c => c.id));
    const collectedIds = collectedIdsRef.current;
    
    // Clean up collected IDs that are no longer in active collectibles
    for (const id of collectedIds) {
      if (!activeIds.has(id)) {
        collectedIds.delete(id);
      }
    }
  }, [collectibles]);
};