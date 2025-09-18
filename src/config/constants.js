// Game theme enum
export const THEMES = {
  CLASSIC: 'classic',
  SPACE: 'space',
  POSTAPOCALYPTIC: 'postapocalyptic',
  CUSTOM: 'custom'
};

// Game state enum
export const GAME_STATES = {
  MENU: 'menu',
  PLAYING: 'playing',
  GAME_OVER: 'gameOver',
  SETTINGS: 'settings',
};

// Default game configuration values
export const DEFAULT_CONFIG = {
  camera: {
    position: [0, 15, 15],
    fov: 50,
    near: 0.1,
    far: 1000
  },
  physics: {
    gravity: [0, -9.81, 0],
    friction: 0.5,
    restitution: 0.2,
    defaultMass: 1
  },
  world: {
    size: 40,
    backgroundColor: 0x87ceeb,
    fog: {
      color: 0x87ceeb,
      near: 30,
      far: 100
    }
  },
  rules: {
    initialScore: 0,
    scoreMultiplier: 1,
    gameDuration: null,
    winScore: 500
  }
};

// Enemy settings
export const ENEMY_SETTINGS = {
  maxOnScreen: 15,
  spawnRadius: 20
};

// Lighting presets
export const LIGHTING_PRESETS = {
  ambient: {
    color: 0x404040,
    intensity: 0.5
  },
  directional: {
    color: 0xffffff,
    intensity: 0.8,
    position: [1, 1, 0.5]
  }
};