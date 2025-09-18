// ============================================================================
// 🎮 BASE PLAYER CONFIGURATION - SHARED TEMPLATE VALUES
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ These values ARE used by themes via spread operator (...PLAYER_BASE)
// ✅ Themes inherit these properties and can override specific values
// ✅ Modify these to change default behavior across ALL themes
// ✅ Individual themes can override any property in themes.js
//
// 📊 BASE PLAYER PROPERTIES (inherited by all themes):
// ============================================================================

export const PLAYER_BASE = {
  // 🏃‍♂️ MOVEMENT - Base movement speed (themes can override)
  speed: 5,

  // ❤️ HEALTH - Starting health points (themes can override)
  health: 100,

  // 📏 VISUAL SIZE - Model scale multiplier (themes can override)
  size: 1,

  // 🔫 FIRE RATE - Shots per second (themes can override)
  fireRate: 2,

  // 🚀 PROJECTILE SPEED - Bullet travel speed (themes can override)
  projectileSpeed: 15,

  // 📏 PROJECTILE SIZE - Bullet visual size (themes can override)
  projectileSize: 0.3,

  // 📍 SPAWN POSITION - Where player starts [x, y, z]
  initialPosition: [0, 0.5, 0], // Center, slightly above ground

  // 🔄 SPAWN ROTATION - Starting orientation [x, y, z] in radians
  initialRotation: [0, 0, 0], // Facing forward

  // 💨 INITIAL VELOCITY - Starting movement [x, y, z]
  initialVelocity: [0, 0, 0], // No initial movement
}

// ============================================================================
// 👹 BASE ENEMY CONFIGURATIONS - SHARED TEMPLATES
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ These enemy templates ARE inherited by themes via spread operator
// ✅ Themes use ...ENEMY_BASES.fast or ...ENEMY_BASES.tank as starting points
// ✅ Themes can override any property (speed, health, etc.)
// ✅ Modify these for global enemy balance changes
// ✅ Individual themes can customize enemy behavior in themes.js
//
// 📊 ENEMY TEMPLATE TYPES:
// ============================================================================

export const ENEMY_BASES = {
  // 🏃‍♂️ FAST ENEMY - Quick but weak
  fast: {
    // 🆔 UNIQUE IDENTIFIER - Used by game logic
    id: 'fast',

    // 🏃‍♂️ MOVEMENT SPEED - How fast enemy moves toward player
    speed: 4,

    // ❤️ HEALTH POINTS - How much damage enemy can take
    health: 30,

    // 📏 VISUAL SIZE - Scale multiplier for enemy model
    size: 0.6,

    // 💥 ATTACK DAMAGE - How much health player loses on contact
    damage: 5,

    // 🏆 SCORE POINTS - Points awarded when enemy is killed
    points: 15,

    // ⏰ SPAWN RATE - How often this enemy type spawns (0-1 scale)
    spawnRate: 1, // Higher = spawns more frequently
  },

  // 🛡️ TANK ENEMY - Slow but strong
  tank: {
    // 🆔 UNIQUE IDENTIFIER
    id: 'tank',

    // 🐌 MOVEMENT SPEED - Slower than fast enemy
    speed: 1.2,

    // ❤️ HEALTH POINTS - Much more durable
    health: 90,

    // 📏 VISUAL SIZE - Same size as fast enemy
    size: 0.6,

    // 💥 ATTACK DAMAGE - Much more dangerous
    damage: 20,

    // 🏆 SCORE POINTS - Higher reward for difficulty
    points: 25,

    // ⏰ SPAWN RATE - Spawns less frequently
    spawnRate: 0.5, // Lower = spawns less frequently
  },
}

// ============================================================================
// 🌍 BASE GAME CONFIGURATION - GLOBAL GAME SETTINGS
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ These are theme-INDEPENDENT settings used by all themes
// ✅ Modify these for global gameplay changes (camera, physics, world size)
// ✅ These values are used as foundation, then DEFAULT_CONFIG (from constants.js) can override them
// ✅ Themes DON'T override these - they have separate environment settings
// ✅ Changes here affect the fundamental game behavior across ALL themes
//
// 📊 CONFIGURATION HIERARCHY:
// 1. baseGameConfig (this file) - Foundation settings
// 2. DEFAULT_CONFIG (constants.js) - Overrides some base values
// 3. Theme environment settings - Visual/atmospheric overrides (separate)
//
// 📊 GLOBAL GAME SETTINGS:
// ============================================================================

export const baseGameConfig = {
  camera: {
    offset: { x: 0, y: 15, z: 15 },
    fov: 50,
    near: 0.1,
    far: 1000,
  },
  world: {
    size: 40,
    bounds: {
      minX: -40,
      maxX: 40,
      minZ: -40,
      maxZ: 40,
      minY: -10,
      maxY: 50,
    },
    spawnRadius: 35, // Safe spawn area within bounds
    skybox: {
      enabled: true,
      size: 1000, // Skybox cube size
      texturePath: null, // Will be set per theme
    },
  },
  rules: {
    initialScore: 0,
    scoreMultiplier: 1,
    gameDuration: null,
    winScore: 500,
  },
  physics: {
    gravity: [0, -9.81, 0],
    defaultMass: 1,
    restitution: 0.2,
    friction: 0.5,
  },
}
