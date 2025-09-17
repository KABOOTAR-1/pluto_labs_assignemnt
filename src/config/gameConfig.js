
export const gameConfig = {
  player: {
    speed: 5,
    health: 100,
    size: 1,
    color: '#4285F4',
    fireRate: 2, 
    projectileSpeed: 15,
    projectileSize: 0.3,
    initialPosition: [0, 0.5, 0],
    initialRotation: [0, 0, 0],
    initialVelocity: [0, 0, 0],
  },
  camera: {
    offset: { x: 0, y: 15, z: 15 },
  },
  // Enemy settings
 enemies: {
   types: [
     {
       id: 'fast',
       speed: 4,
       health: 30,
       size: 0.6,
       color: '#FBBC05',
       damage: 5,
       points: 15,
       spawnRate: 1,
       modelUrl: "", // Temporary - will be replaced with enemy-specific models
     },
     {
       id: 'tank',
       speed: 1.2,
       health: 90,
       size: 1.2,
       color: '#34A853',
       damage: 20,
       points: 25,
       spawnRate: 0.5,
       modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb", // Temporary - will be replaced with enemy-specific models
     }
   ],
   maxOnScreen: 15,
   spawnRadius: 20,
 },

  world: {
    size: 40, 
    floorColor: '#222222',
    backgroundColor: '#000000',
  },
  
  // Game rules
  rules: {
    initialScore: 0,
    scoreMultiplier: 1,
    gameDuration: null, 
    winScore: 500,
  },
  
  // Physics settings
  physics: {
    gravity: [0, -9.81, 0],
    defaultMass: 1,
    restitution: 0.2, 
    friction: 0.5,
  }
};

export const createCustomConfig = (customConfig) => {
  return {
    player: { ...gameConfig.player, ...customConfig?.player },
    enemies: { 
      ...gameConfig.enemies,
      ...customConfig?.enemies,
      types: customConfig?.enemies?.types || gameConfig.enemies.types,
    },
    world: { ...gameConfig.world, ...customConfig?.world },
    rules: { ...gameConfig.rules, ...customConfig?.rules },
    physics: { ...gameConfig.physics, ...customConfig?.physics },
  };
};
