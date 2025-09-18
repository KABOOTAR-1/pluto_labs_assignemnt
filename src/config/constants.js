// ============================================================================
// 🆕 ADDING NEW THEMES - COMPLETE GUIDE FOR AI
// ============================================================================
//
// 🎯 STEP-BY-STEP: How to Add a New Theme
//
// 1. 📝 ADD THEME CONSTANT HERE:
//    export const THEMES = {
//      ...existing themes,
//      MEDIEVAL: 'medieval',  // Add your new theme
//    };
//
// 2. 🎨 CREATE THEME IN themes.js:
//    themes.medieval = {
//      name: 'Medieval Fantasy',
//
//      player: {
//        modelUrl: 'https://your-s3-url.com/models/knight.glb',
//        fallbackGeometry: 'box',
//        scale: [1, 1, 1],
//        color: 0x8B4513,
//        rotation: [0, -Math.PI, 0],
//      },
//
//      enemies: {
//        types: [
//          {
//            modelUrl: 'https://your-s3-url.com/models/goblin.glb',
//            speed: 3,
//            health: 50,
//            color: 0x654321,
//            facePlayer: true,
//          }
//        ]
//      },
//
//      environment: {
//        ground: {
//          texture: 'https://your-s3-url.com/textures/cobblestone.jpg',
//          color: 0x8B7355,
//          material: 'standard',
//        },
//        skybox: {
//          texturePath: 'https://your-s3-url.com/skyboxes/medieval-sky.jpg',
//          skyType: 'sunset',
//        },
//        // ... lighting, fog, particles
//      },
//
//      obstacles: {
//        basic: { modelUrl: 'path/to/rock.glb', ... },
//        barrier: { modelUrl: 'path/to/tree.glb', ... }
//      },
//
//      collectibles: {
//        coin: { modelUrl: 'path/to/coin.glb', ... },
//        gem: { modelUrl: 'path/to/gem.glb', ... }
//      }
//    };
//
// 3. 🎮 OPTIONAL: Add theme-specific features
//    - Custom particles in components/
//    - Special lighting effects
//    - Unique sound effects
//
// 📋 THEME STRUCTURE SUMMARY:
// - name: Display name
// - player: Player model and properties
// - enemies: Enemy types and behaviors
// - environment: World appearance (ground, sky, lighting)
// - obstacles: Environmental objects
// - collectibles: Items to collect

// ============================================================================
// 🎨 GAME THEMES - Available theme options
// ============================================================================

export const THEMES = {
  CLASSIC: 'classic',
  SPACE: 'space',
  POSTAPOCALYPTIC: 'postapocalyptic',
  CUSTOM: 'custom'
};

// ============================================================================
// 🎲 GAME STATE MANAGEMENT - UI Control System
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS:
// ✅ These control which screen/interface is displayed to the player
// ✅ Used by components to show/hide different UI elements
// ✅ Game logic changes these states based on player actions
// ✅ DO NOT modify these values - they are referenced throughout the app
//
// 📊 GAME STATE FLOW:
// MENU → PLAYING → GAME_OVER → MENU (loop)
//     ↘ SETTINGS ↗
//
// 🎮 AVAILABLE STATES:
// ============================================================================

export const GAME_STATES = {
  // 🏠 MAIN MENU - Initial screen with game title and options
  MENU: 'menu',

  // 🎮 ACTIVE GAMEPLAY - Player is actively playing the game
  PLAYING: 'playing',

  // 💀 GAME OVER - Player died, show final score and restart options
  GAME_OVER: 'gameOver',

  // ⚙️ SETTINGS MENU - Player adjusting game preferences
  SETTINGS: 'settings',
};

// ============================================================================
// ⚙️ DEFAULT GAME CONFIGURATION - Override Base Settings
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS:
// ✅ These values OVERRIDE the baseGameConfig settings from baseConfigs.js
// ✅ Modify these for global gameplay changes that apply to ALL themes
// ✅ Changes here affect camera, physics, world appearance, and game rules
// ✅ Use this for theme-independent modifications
//
// 📊 CONFIGURATION HIERARCHY:
// 1. baseGameConfig (foundation) ← 2. DEFAULT_CONFIG (overrides) ← 3. Themes (visual)
//
// 🎮 MODIFIABLE SETTINGS:
// ============================================================================

export const DEFAULT_CONFIG = {
  // 📹 CAMERA SETTINGS - How the game world is viewed
  camera: {
    // 📍 CAMERA POSITION - [x, y, z] coordinates relative to player
    position: [0, 15, 15], // Above and behind player

    // 🔍 FIELD OF VIEW - Camera zoom level (degrees)
    fov: 50, // Standard field of view

    // 📏 CLIPPING PLANES - What distance camera can see
    near: 0.1,   // Closest visible distance
    far: 1000,   // Farthest visible distance
  },

  // ⚡ PHYSICS SETTINGS - How objects interact in the world
  physics: {
    // 🌍 GRAVITY - Downward force [x, y, z] (Earth = -9.81)
    gravity: [0, -9.81, 0], // Standard Earth gravity

    // 🛑 FRICTION - Surface resistance (0 = slippery, 1 = sticky)
    friction: 0.5, // Moderate surface friction

    // 🏀 BOUNCINESS - How much objects bounce (0 = no bounce, 1 = perfect)
    restitution: 0.2, // Slight bounce effect

    // ⚖️ DEFAULT MASS - Weight for physics objects
    defaultMass: 1, // Standard object mass
  },

  // 🌍 WORLD SETTINGS - Global environment properties
  world: {
    // 📏 WORLD SIZE - Game area radius (affects boundaries)
    size: 40, // Game world extends 40 units in each direction

    // 🎨 BACKGROUND COLOR - Sky color when no skybox
    backgroundColor: 0x87ceeb, // Sky blue color

    // 🌫️ ATMOSPHERIC FOG - Distance-based visibility reduction
    fog: {
      color: 0x87ceeb,  // Fog color (matches sky)
      near: 30,         // Distance where fog starts
      far: 100,         // Distance where fog is fully opaque
    },
  },

  // 🏆 GAME RULES - Core gameplay mechanics
  rules: {
    // 📊 SCORING SYSTEM
    initialScore: 0,      // Starting score
    scoreMultiplier: 1,   // Global score multiplier

    // ⏰ TIME LIMITS
    gameDuration: null,   // null = unlimited, number = seconds

    // 🎯 WIN CONDITIONS
    winScore: 500,        // Score needed to win
  },
};

// ============================================================================
// 👹 ENEMY SPAWN SETTINGS - Enemy Population Control
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS:
// ✅ These control how many enemies spawn and where
// ✅ Modify these for difficulty balancing across ALL themes
// ✅ Affects enemy spawn rate and maximum concurrent enemies
// ✅ Changes here apply globally, not per-theme
//
// 📊 ENEMY SPAWNING RULES:
// ============================================================================

export const ENEMY_SETTINGS = {
  // 👥 MAXIMUM ENEMIES - How many enemies can exist at once
  maxOnScreen: 15, // Performance and difficulty balance

  // 🎯 SPAWN RADIUS - Distance from player where enemies spawn
  spawnRadius: 20, // Prevents enemies from spawning too close
};

// ============================================================================
// 💡 LIGHTING PRESETS - Default Lighting Configurations
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS:
// ✅ These are fallback/default lighting values
// ✅ Themes can override these with their own lighting
// ✅ Use these as starting points for custom lighting setups
// ✅ Modify for global lighting changes
//
// 📊 LIGHTING TYPES:
// ============================================================================

export const LIGHTING_PRESETS = {
  // 🌫️ AMBIENT LIGHT - Overall scene illumination
  ambient: {
    color: 0x404040,  // Neutral gray color
    intensity: 0.5,   // Moderate brightness
  },

  // ☀️ DIRECTIONAL LIGHT - Main light source (like sun)
  directional: {
    color: 0xffffff,     // Pure white light
    intensity: 0.8,      // Bright but not overwhelming
    position: [1, 1, 0.5], // Direction from above-right
  },
};