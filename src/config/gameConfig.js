import { PLAYER_BASE, ENEMY_BASES, baseGameConfig } from './baseConfigs'
import { atom, useAtom } from 'jotai'

// Theme enum
export const THEMES = {
  CLASSIC: 'classic',
  CYBERPUNK: 'cyberpunk',
  SPACE: 'space',
};

// Selected theme atom
export const selectedThemeAtom = atom(THEMES.CLASSIC);

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
      },
      enemies: {
        types: [
          {
            ...ENEMY_BASES.fast,
            modelUrl: null,
            fallbackGeometry: 'sphere',
            color: 0xFF0000, // Red for fast enemies
          },
          {
            ...ENEMY_BASES.tank,
            modelUrl: null,
            fallbackGeometry: 'box',
            color: 0x00FF00, // Green for tank enemies
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
        basic: { modelUrl: null, fallbackGeometry: 'box', material: { color: 0xff4444 } },
        barrier: { modelUrl: null, fallbackGeometry: 'box', material: { color: 0xffff44 } },
      },
      collectibles: {
        coin: { modelUrl: null, fallbackGeometry: 'cylinder', material: { color: 0xffd700 } },
        gem: { modelUrl: null, fallbackGeometry: 'sphere', material: { color: 0x00ffff } },
      },
    },

    cyberpunk: {
      name: 'Cyberpunk 2077',
      player: {
        ...PLAYER_BASE,
        modelUrl: '/models/cyber/player.glb',
        fallbackGeometry: 'box',
        scale: [1, 1, 1],
        color: 0x00ffcc, // Cyan color
      },
      enemies: {
        types: [
          {
            ...ENEMY_BASES.fast,
            speed: 5,
            modelUrl: '/models/cyber/runner.glb',
            fallbackGeometry: 'sphere',
            color: 0xFF0000, // Red for fast enemies
          },
          {
            ...ENEMY_BASES.tank,
            modelUrl: '/models/cyber/tank.glb',
            fallbackGeometry: 'box',
            color: 0x00FF00, // Green for tank enemies
          },
        ],
      },
      environment: {
        ground: { color: 0x1a1a2e, texture: '/textures/cyber/grid.jpg', material: 'standard' },
        background: { color: 0x0f0f23 },
        lighting: {
          ambient: { color: 0x0f0f23, intensity: 0.3 },
          directional: { color: 0x00ffff, intensity: 1.0, position: [0.5, 1, 0.3] },
        },
        fog: { color: 0x16213e, near: 50, far: 200 },
      },
      obstacles: {
        basic: { modelUrl: '/models/cyber/barrier.glb', fallbackGeometry: 'box', material: { color: 0xff0080 } },
        barrier: { modelUrl: '/models/cyber/laser-gate.glb', fallbackGeometry: 'box', material: { color: 0xff4000 } },
      },
      collectibles: {
        coin: { modelUrl: '/models/cyber/data-chip.glb', fallbackGeometry: 'cylinder', material: { color: 0x00ff80 } },
        gem: { modelUrl: '/models/cyber/quantum-crystal.glb', fallbackGeometry: 'sphere', material: { color: 0xff00ff } },
      },
    },

    space: {
      name: 'Deep Space',
      player: {
        ...PLAYER_BASE,
        modelUrl: '/models/space/spaceship.glb',
        fallbackGeometry: 'sphere',
        scale: [2, 2, 2],
        color: 0xcccccc, // Light gray color
      },
      enemies: {
        types: [
          {
            ...ENEMY_BASES.fast,
            speed: 6,
            modelUrl: '/models/space/drone.glb',
            fallbackGeometry: 'sphere',
            color: 0xFF0000, // Red for fast enemies
          },
          {
            ...ENEMY_BASES.tank,
            speed: 0.8,
            health: 150,
            modelUrl: '/models/space/destroyer.glb',
            fallbackGeometry: 'box',
            color: 0x00FF00, // Green for tank enemies
          },
        ],
      },
      environment: {
        ground: { color: 0x2f2f2f, texture: '/textures/space/floor.jpg', material: 'standard' },
        background: { color: 0x000011 },
        lighting: {
          ambient: { color: 0x191970, intensity: 0.2 },
          directional: { color: 0xffffff, intensity: 1.2, position: [0, 1, 0] },
        },
        fog: { color: 0x000011, near: 40, far: 180 },
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
