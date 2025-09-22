/**
 * 💎 COLLECTIBLE TYPES CONFIGURATION
 * ==================================
 *
 * 🎯 HOW AI SHOULD USE THIS FILE:
 * ✅ This is the CENTRAL database for all collectible types in the game
 * ✅ Add new collectible types here to create different items/ammo
 * ✅ Modify existing properties to balance gameplay
 * ✅ Each collectible type defines appearance, behavior, and combat stats
 * ✅ Used by CollectibleManager.jsx, BaseCollectible.jsx, and game logic components
 *
 * 📊 COLLECTIBLE LIFECYCLE:
 * 1. Collectible type selected by spawning system
 * 2. getCollectibleType() retrieves configuration from this array
 * 3. Collectible spawned with these properties (effect, value, lifetime, etc.)
 * 4. Visual rendering uses theme-based appearance
 * 5. Physics uses size for collision detection
 * 6. Effects use value and duration for gameplay impact
 * 7. Lifetime management uses lifetimeMs for auto-despawn
 *
 * 🔧 HOW TO ADD NEW COLLECTIBLE TYPES:
 * 
 * 1️⃣ **ADD TO THIS FILE (collectibleTypes.js):**
 * ```javascript
 * {
 *   id: 'speed',                           // Unique identifier
 *   name: 'Speed Boost',                   // Display name
 *   effect: COLLECTIBLE_TYPES.SPEED,       // Effect type from constants
 *   value: 2,                              // Effect magnitude (2x speed)
 *   duration: 5000,                        // Effect duration (5 seconds)
 *   size: 0.8,                            // Collision radius
 *   lifetimeMs: 12000,                    // Despawn time (12 seconds)
 *   spawnIntervalMin: 10000,              // Min spawn interval
 *   spawnIntervalMax: 20000,              // Max spawn interval
 *   description: 'Doubles movement speed for 5 seconds'
 * }
 * ```
 * 
 * 2️⃣ **ADD EFFECT LOGIC (useCollectibleCollector.js):**
 * In the `applyCollectibleEffect` function, add a new case:
 * ```javascript (here setPlayeSpeedMultiplier is used as a example. We will get the reference of the setter that sets the players speed)
 * case 'speed': {
 *   const speedMultiplier = collectible.value || 2;
 *   const duration = collectible.duration || 5000;
 *   setPlayerSpeedMultiplier(speedMultiplier);
 *   setTimeout(() => setPlayerSpeedMultiplier(1), duration);
 *   console.log(`Speed boost! ${speedMultiplier}x speed for ${duration/1000}s`);
 *   break;
 * }
 * ```
 * 
 * 3️⃣ **ADD REQUIRED PROPS TO useCollectibleCollector:**
 * Pass any state setters needed for the effect:
 * ```javascript
 * useCollectibleCollector({
 *   // ... existing props ...
 *   setPlayerSpeedMultiplier,  // Add new prop for speed effect
 * });
 * ```
 * 
 * 4️⃣ **UPDATE THEME COLLECTIBLES (themes.js):**
 * Add visual configuration for the new type:
 * ```javascript
 * collectibles: {
 *   speed: { 
 *     modelUrl: '/models/speed-boost.glb', 
 *     fallbackGeometry: 'sphere', 
 *     material: { color: 0x03A9F4, emissive: 0x03A9F4 } 
 *   },
 * }
 * ```
 * 
 * 🔧 MODIFICATION PATTERNS:
 * - Add new objects to array for new collectible types
 * - Modify numeric values to balance difficulty
 * - Change effects for different gameplay mechanics
 * - Adjust spawn intervals for frequency control
 * - Update descriptions for UI clarity
 *
 * ⚠️ IMPORTANT NOTES:
 * - 'health' collectible is the default/fallback type
 * - All numeric values are in game units (not pixels)
 * - Effects use COLLECTIBLE_TYPES enum values for type safety
 * - Lifetime is in milliseconds (15000 = 15 seconds)
 * - Size affects collision detection radius
 */

import { COLLECTIBLE_TYPES } from '../config/constants';

export const collectibleTypes = [
  {
    // 💎 UNIQUE IDENTIFIER - Used by getCollectibleType() function
    id: 'health',

    // 📛 DISPLAY NAME - Shown in UI and debugging
    name: 'Health Collectible',

    // 🎯 EFFECT TYPE - What this collectible does (uses COLLECTIBLE_TYPES enum)
    effect: COLLECTIBLE_TYPES.HEALTH,

    // 💎 EFFECT VALUE - Magnitude of the effect (25 = 25 HP healing)
    value: 25,

    // ⏰ EFFECT DURATION - How long effect lasts (0 = instant, >0 = temporary)
    duration: 0,

    // 📏 VISUAL SIZE - Collision radius/diameter of collectible in world units
    size: 0.8,

    // ⏰ LIFETIME - Milliseconds before auto-despawn (prevents memory leaks)
    lifetimeMs: 15000,

    // 🎲 SPAWN INTERVALS - Random spawn timing in milliseconds
    spawnIntervalMin: 8000,  // Minimum time between spawns
    spawnIntervalMax: 15000, // Maximum time between spawns

    // 📝 DESCRIPTION - Human-readable explanation for developers
    description: 'Restores 25 health points to the player'
  }
];

/**
 * 💎 GET DEFAULT COLLECTIBLE TYPE
 * ===============================
 *
 * @description Returns the first collectible type as a fallback option
 * @returns {Object} The default collectible configuration object
 *
 * 🎯 USAGE EXAMPLES:
 * - When requested collectible type is not found
 * - As fallback in error handling scenarios
 * - For default collectible initialization
 *
 * 📊 RETURN VALUE: Complete collectible configuration object with all properties
 * ⚠️ ASSUMPTION: collectibleTypes array is never empty
 */
export const getDefaultCollectibleType = () => {
  return collectibleTypes[0];
};

/**
 * 🔍 GET COLLECTIBLE TYPE BY ID
 * =============================
 *
 * @description Finds a collectible type by its unique ID
 * @param {string} id - The unique identifier of the collectible type to find
 * @returns {Object} The collectible configuration object, or default if not found
 *
 * 🎯 USAGE EXAMPLES:
 * - CollectibleManager.jsx: getCollectibleType(typeId) for spawning
 * - UI components: Display collectible information by ID
 * - Game logic: Get collectible stats for effect application
 *
 * 🔄 ERROR HANDLING:
 * - Returns default collectible if requested ID doesn't exist
 * - Prevents crashes from invalid collectible type requests
 * - Maintains game stability with fallback behavior
 *
 * 📊 RETURN VALUE: Complete collectible configuration object or default fallback
 */
export const getCollectibleType = (id) => {
  return collectibleTypes.find(type => type.id === id) || getDefaultCollectibleType();
};

/**
 * 📋 GET ALL COLLECTIBLE TYPE IDS
 * ================================
 *
 * @description Returns an array of all available collectible type IDs
 * @returns {Array<string>} Array of collectible type ID strings
 *
 * 🎯 USAGE EXAMPLES:
 * - UI dropdowns: Populate collectible selection menus
 * - Settings: Show available collectible options
 * - Validation: Check if a collectible type exists
 * - Debugging: List all available collectible types
 *
 * 📊 RETURN VALUE: ['health', 'speed', 'damage', ...] etc.
 * 🔄 DYNAMIC: Updates automatically when new collectible types are added
 */
export const getCollectibleTypeIds = () => {
  return collectibleTypes.map(type => type.id);
};