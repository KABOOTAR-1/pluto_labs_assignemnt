/**
 * 🎯 PROJECTILE TYPES CONFIGURATION
 * ================================
 *
 * 🎯 HOW AI SHOULD USE THIS FILE:
 * ✅ This is the CENTRAL database for all projectile types in the game
 * ✅ Add new projectile types here to create different weapons/ammo
 * ✅ Modify existing properties to balance gameplay
 * ✅ Each projectile type defines appearance, behavior, and combat stats
 * ✅ Used by Scene.jsx, Projectiles.jsx, and game logic components
 *
 * 📊 PROJECTILE LIFECYCLE:
 * 1. Player selects projectile type via currentProjectileTypeAtom
 * 2. getProjectileType() retrieves configuration from this array
 * 3. Projectile spawned with these properties (speed, damage, etc.)
 * 4. Visual rendering uses color, size, emissiveIntensity
 * 5. Physics uses speed for movement calculations (mass unused for Kinematic type)
 * 6. Combat uses damage for hit calculations
 * 7. Lifetime management uses lifetimeMs for auto-despawn
 *
 * 🔧 MODIFICATION PATTERNS:
 * - Add new objects to array for new projectile types
 * - Modify numeric values to balance difficulty
 * - Change colors for visual variety
 * - Adjust physics properties for different behaviors
 * - Update descriptions for UI clarity
 *
 * ⚠️ IMPORTANT NOTES:
 * - 'default' projectile is fallback if requested type not found
 * - All numeric values are in game units (not pixels)
 * - Colors use hex format for Three.js compatibility
 * - Lifetime is in milliseconds (5000 = 5 seconds)
 * - Mass is required for cannon physics bodies but unused for Kinematic projectiles
 */

export const projectileTypes = [
  {
    // 🎯 UNIQUE IDENTIFIER - Used by getProjectileType() function
    id: 'default',

    // 📛 DISPLAY NAME - Shown in UI and debugging
    name: 'Projectile',

    // 📏 VISUAL SIZE - Radius/diameter of projectile in world units
    size: 0.3,

    // 🏃‍♂️ MOVEMENT SPEED - Units per second projectile travels
    speed: 15,

    // 💥 DAMAGE OUTPUT - Health points removed from targets
    damage: 30,

    // 🎨 VISUAL COLOR - Hex color for projectile appearance
    color: '#ffff00',

    // ✨ GLOW INTENSITY - How bright the projectile glows (0-1)
    emissiveIntensity: 0.5,

    // ⚖️ PHYSICS MASS - Passed to cannon physics body (unused for Kinematic projectiles)
    mass: 0.1,

    // ⏰ LIFETIME - Milliseconds before auto-despawn (prevents memory leaks)
    lifetimeMs: 5000,

    // 📝 DESCRIPTION - Human-readable explanation for developers
    description: 'Standard projectile'
  }
];

/**
 * 🎯 GET DEFAULT PROJECTILE TYPE
 * ==============================
 *
 * @description Returns the first projectile type as a fallback option
 * @returns {Object} The default projectile configuration object
 *
 * 🎯 USAGE EXAMPLES:
 * - When requested projectile type is not found
 * - As fallback in error handling scenarios
 * - For default weapon initialization
 *
 * 📊 RETURN VALUE: Complete projectile configuration object with all properties
 * ⚠️ ASSUMPTION: projectileTypes array is never empty
 */
export const getDefaultProjectileType = () => {
  return projectileTypes[0];
};

/**
 * 🔍 GET PROJECTILE TYPE BY ID
 * ============================
 *
 * @description Finds a projectile type by its unique ID
 * @param {string} id - The unique identifier of the projectile type to find
 * @returns {Object} The projectile configuration object, or default if not found
 *
 * 🎯 USAGE EXAMPLES:
 * - Scene.jsx: getProjectileType(currentProjectileType) for current weapon
 * - UI components: Display projectile information by ID
 * - Game logic: Get projectile stats for combat calculations
 *
 * 🔄 ERROR HANDLING:
 * - Returns default projectile if requested ID doesn't exist
 * - Prevents crashes from invalid projectile type requests
 * - Maintains game stability with fallback behavior
 *
 * 📊 RETURN VALUE: Complete projectile configuration object or default fallback
 */
export const getProjectileType = (id) => {
  return projectileTypes.find(type => type.id === id) || getDefaultProjectileType();
};

/**
 * 📋 GET ALL PROJECTILE TYPE IDS
 * ===============================
 *
 * @description Returns an array of all available projectile type IDs
 * @returns {Array<string>} Array of projectile type ID strings
 *
 * 🎯 USAGE EXAMPLES:
 * - UI dropdowns: Populate weapon selection menus
 * - Settings: Show available projectile options
 * - Validation: Check if a projectile type exists
 * - Debugging: List all available projectile types
 *
 * 📊 RETURN VALUE: ['default', 'laser', 'plasma', ...] etc.
 * 🔄 DYNAMIC: Updates automatically when new projectile types are added
 */
export const getProjectileTypeIds = () => {
  return projectileTypes.map(type => type.id);
};
