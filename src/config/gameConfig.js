import { PLAYER_BASE, ENEMY_BASES, baseGameConfig } from './baseConfigs'
import { atom, useAtom } from 'jotai'

// Theme enum
export const THEMES = {
  CLASSIC: 'classic',
  MEDIEVAL: 'medieval',
  SPACE: 'space',
  POSTAPOCALYPTIC: 'postapocalyptic',
};

// Game state enum
export const GAME_STATES = {
  MENU: 'menu',
  PLAYING: 'playing',
  GAME_OVER: 'gameOver',
  SETTINGS: 'settings',
};

// Selected theme atom
export const selectedThemeAtom = atom(THEMES.SPACE);

export const gameConfig = {
  ...baseGameConfig,

  // Gameplay player stats come from base
  player: { ...PLAYER_BASE },

  enemySettings:{
       maxOnScreen: 15,
       spawnRadius: 20,
  },

  // Theme-specific data
  themes: {
    classic: {
      name: 'Classic',
      player: {
        ...PLAYER_BASE,
        modelUrl: null,
        fallbackGeometry: 'box',
        scale: [1, 1, 1],
        color: 0x4285f4, // Blue color
        rotation: [0, -Math.PI, 0],
      },
      enemies: {
        types: [
          {
            ...ENEMY_BASES.fast,
            modelUrl: null,
            fallbackGeometry: 'sphere',
            color: 0xFF0000, // Red for fast enemies
            facePlayer: true,
          },
          {
            ...ENEMY_BASES.tank,
            modelUrl: null,
            fallbackGeometry: 'box',
            color: 0x00FF00, // Green for tank enemies
            facePlayer: true,
          },
        ],
      },
      environment: {
        ground: { color: 0x2a2f36, material: 'standard', texture: null },
        background: { color: 0x87ceeb },
        lighting: {
          ambient: { color: 0x404040, intensity: 0.4 },
          directional: { color: 0xffffff, intensity: 0.8, position: [1, 1, 0.5] },
        },
        fog: { color: 0x87ceeb, near: 30, far: 100 },
      },
      obstacles: {
        basic: { modelUrl: "null", fallbackGeometry: 'box', material: { color: 0xff4444 } },
        barrier: { modelUrl: null, fallbackGeometry: 'box', material: { color: 0xffff44 } },
      },
      collectibles: {
        coin: { modelUrl: null, fallbackGeometry: 'cylinder', material: { color: 0xffd700 } },
        gem: { modelUrl: null, fallbackGeometry: 'sphere', material: { color: 0x00ffff } },
      },
    },

    medieval: {
      name: 'Medieval Fantasy',
      player: {
        ...PLAYER_BASE,
        modelUrl: '/src/models/medival/medivalPlayer.glb',
        fallbackGeometry: 'box',
        scale: [1, 1, 1],
        color: 0x8B4513, // Saddle brown for medieval armor
        //rotation: [0, -Math.PI, 0],
      },
      enemies: {
        types: [
          {
            ...ENEMY_BASES.fast,
            speed: 4,
            modelUrl: '/src/models/medival/medivalEnemy1.glb',
            fallbackGeometry: 'sphere',
            color: 0x654321, // Dark brown for goblin/orc
            facePlayer: true,
          },
          {
            ...ENEMY_BASES.tank,
            modelUrl: '/src/models/medival/medivalEnemy2.glb',
            fallbackGeometry: 'box',
            color: 0x2F4F2F, // Dark green for troll/ogre
            facePlayer: true,
          },
        ],
      },
      environment: {
        ground: {
          color: 0x8B7355,
          texture: '/textures/medieval/stone-ground.jpg',
          material: 'standard',
          metalness: 0.1,
          roughness: 0.9
        },
        background: { color: 0x87CEEB },
        lighting: {
          ambient: { color: 0xFFF8DC, intensity: 0.4 },
          directional: [
            { color: 0xFFF8DC, intensity: 0.9, position: [1, 1, 0.5] },
            { color: 0xFFA500, intensity: 0.4, position: [-1, 0.5, -0.5] }
          ],
          point: [
            { color: 0xFFD700, intensity: 0.6, position: [0, 12, 0], distance: 30 },
            { color: 0xFF6347, intensity: 0.4, position: [15, 8, 15], distance: 25 }
          ]
        },
        fog: { color: 0xF5F5DC, near: 30, far: 120 },
        particles: {
          fireflies: { count: 600, color: 0xFFFF00, size: 2 },
          magic: { count: 300, colors: [0x9370DB, 0xDA70D6, 0xFF69B4], size: 3 }
        }
      },
      obstacles: {
        basic: { modelUrl: '/models/medieval/rock.glb', fallbackGeometry: 'box', material: { color: 0x696969 } },
        barrier: { modelUrl: '/models/medieval/tree.glb', fallbackGeometry: 'cylinder', material: { color: 0x8B4513 } },
      },
      collectibles: {
        coin: { modelUrl: '/models/medieval/gold-coin.glb', fallbackGeometry: 'cylinder', material: { color: 0xFFD700 } },
        gem: { modelUrl: '/models/medieval/magic-crystal.glb', fallbackGeometry: 'octahedron', material: { color: 0x9370DB } },
      },
    },

    space: {
      name: 'Deep Space',
      player: {
        ...PLAYER_BASE,
        modelUrl: '/src/models/space/spacePlayer.glb',
        fallbackGeometry: 'sphere',
        scale: [1, 1, 1],
        color: 0x00AAFF, // Bright blue for space player
        rotation: [0, 0, 0],
      },
      enemies: {
        types: [
          {
            ...ENEMY_BASES.fast,
            speed: 6,
            modelUrl: '/src/models/space/spaceEnemy1.glb',
            fallbackGeometry: 'sphere',
            color: 0x00FFFF, // Cyan for fast enemies
            facePlayer: true, // Enable facing player for space fast enemies
          },
          {
            ...ENEMY_BASES.tank,
            speed: 0.8,
            health: 150,
            modelUrl: '/src/models/space/spaceEnemy2.glb',
            //textureUrl: '/src/models/space/spaceEnemy2.png',
            fallbackGeometry: 'box',
            color: 0xFF00FF, // Magenta for tank enemies
            facePlayer: true, // Enable facing player for space tank enemies
          },
        ],
      },
      environment: {
        ground: {
          color: 0x1a1a2e,
          texture: '/textures/space/metal-floor.jpg',
          material: 'standard',
          metalness: 0.3,
          roughness: 0.7
        },
        background: { color: 0x000022 },
        lighting: {
          ambient: { color: 0x001122, intensity: 0.1 },
          directional: [
            { color: 0x4488ff, intensity: 0.8, position: [1, 1, 0.5] },
            { color: 0xff4444, intensity: 0.3, position: [-1, -1, -0.5] }
          ],
          point: [
            { color: 0x00ffff, intensity: 0.5, position: [0, 10, 0], distance: 50 },
            { color: 0xff00ff, intensity: 0.3, position: [20, 5, 20], distance: 30 }
          ]
        },
        fog: { color: 0x000033, near: 50, far: 200 },
        particles: {
          stars: { count: 1000, color: 0xffffff, size: 2 },
          nebula: { color: 0x442266, density: 0.5 }
        }
      },
      obstacles: {
        basic: { modelUrl: '/models/space/barrel.glb', fallbackGeometry: 'cylinder', material: { color: 0x666666 }, scale: [1.5, 2, 1.5] },
        barrier: { modelUrl: '/models/space/force-field.glb', fallbackGeometry: 'box', material: { color: 0x8800ff } },
      },
      collectibles: {
        coin: { modelUrl: '/models/space/cosmic-coin.glb', fallbackGeometry: 'cylinder', material: { color: 0xffd700 } },
        gem: { modelUrl: '/models/space/nebula-crystal.glb', fallbackGeometry: 'sphere', material: { color: 0xff69b4 } },
      },
    },

    postapocalyptic: {
      name: 'Post-Apocalyptic',
      player: {
        ...PLAYER_BASE,
        modelUrl: '/src/models/post/postPlayer.glb',
        textureUrl: '/src/models/post/postPlayer.png',
        fallbackGeometry: 'box',
        scale: [1, 1, 1],
        color: 0x4A4A4A, // Dark metallic gray for wasteland survivor
        rotation: [0, 0, 0],
      },
      enemies: {
        types: [
          {
            ...ENEMY_BASES.fast,
            speed: 5,
            modelUrl: '/src/models/post/postEnemy1.glb',
            textureUrl: '/src/models/post/postColorMap.png',
            fallbackGeometry: 'sphere',
            color: 0x8B0000,
            facePlayer: true,
          },
          {
            ...ENEMY_BASES.tank,
            modelUrl: '/src/models/post/postEnemy2.glb',
           // textureUrl: '/src/models/post/postColorMap.png',
            fallbackGeometry: 'box',
            color: 0x2F2F2F, // Dark gray for armored mutants
            facePlayer: true,
          },
        ],
      },
      environment: {
        ground: {
          color: 0x3A3A3A,
          texture: '/textures/post/wasteland-ground.jpg',
          material: 'standard',
          metalness: 0.2,
          roughness: 0.8
        },
        background: { color: 0x1a1a1a },
        lighting: {
          ambient: { color: 0x2a2a2a, intensity: 0.3 },
          directional: [
            { color: 0xFFA500, intensity: 0.7, position: [1, 1, 0.5] },
            { color: 0xFF4500, intensity: 0.5, position: [-1, 0.5, -0.5] }
          ],
          point: [
            { color: 0xFF6347, intensity: 0.8, position: [0, 8, 0], distance: 25 },
            { color: 0x32CD32, intensity: 0.6, position: [20, 6, 20], distance: 20 },
            { color: 0xFF1493, intensity: 0.5, position: [-20, 7, -20], distance: 20 }
          ]
        },
        fog: { color: 0x2a2a2a, near: 35, far: 150 },
        particles: {
          dust: { count: 500, color: 0x8B7355, size: 1 },
          sparks: { count: 200, colors: [0xFFFF00, 0xFF4500, 0xFF6347], size: 2 }
        }
      },
      obstacles: {
        basic: { modelUrl: '/models/post/rubble.glb', fallbackGeometry: 'box', material: { color: 0x696969 } },
        barrier: { modelUrl: '/models/post/wreckage.glb', fallbackGeometry: 'cylinder', material: { color: 0x2F2F2F } },
      },
      collectibles: {
        coin: { modelUrl: '/models/post/scrap-metal.glb', fallbackGeometry: 'cylinder', material: { color: 0xFFD700 } },
        gem: { modelUrl: '/models/post/energy-cell.glb', fallbackGeometry: 'octahedron', material: { color: 0x00FF7F } },
      },
    },

  },
}
// Helper functions
export function useCurrentTheme() {
  const [selectedTheme] = useAtom(selectedThemeAtom)
  return gameConfig.themes[selectedTheme]
}
export function useCurrentPlayerConfig() {
  const theme = useCurrentTheme()
  return theme.player
}
export function useCurrentEnemies() {
  const theme = useCurrentTheme()
  return theme.enemies
}
export function useCurrentEnvironment() {
  const theme = useCurrentTheme()
  return theme.environment
}

// World bounds helper functions
export function useWorldBounds() {
  return gameConfig.world.bounds
}

export function useWorldSize() {
  return gameConfig.world.size
}

export function useSpawnRadius() {
  return gameConfig.world.spawnRadius
}

// Utility function to check if position is within bounds
export function isWithinBounds(position, bounds = gameConfig.world.bounds) {
  const [x, y, z] = position
  return (
    x >= bounds.minX && x <= bounds.maxX &&
    y >= bounds.minY && y <= bounds.maxY &&
    z >= bounds.minZ && z <= bounds.maxZ
  )
}
