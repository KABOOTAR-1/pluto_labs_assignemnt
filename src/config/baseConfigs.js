// Base shared player stats (gameplay)
export const PLAYER_BASE = {
  speed: 5,
  health: 100,
  size: 1,
  fireRate: 2,
  projectileSpeed: 15,
  projectileSize: 0.3,
  initialPosition: [0, 0.5, 0],
  initialRotation: [0, 0, 0],
  initialVelocity: [0, 0, 0],
}

// Base shared enemy stats (gameplay)
export const ENEMY_BASES = {
  fast: {
    id: 'fast',
    speed: 4,
    health: 30,
    size: 0.6,
    damage: 5,
    points: 15,
    spawnRate: 1,
  },
  tank: {
    id: 'tank',
    speed: 1.2,
    health: 90,
    size: 1.2,
    damage: 20,
    points: 25,
    spawnRate: 0.5,
  },
}

// Base global game settings (theme-independent)
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
