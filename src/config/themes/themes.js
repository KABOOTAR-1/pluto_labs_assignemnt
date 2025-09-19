/**
 * 🎮 GAME THEME CONFIGURATION SYSTEM - COMPREHENSIVE AI GUIDE
 * =========================================================
 *
 * 🚀 HOW TO CREATE NEW GAMES BY MODIFYING ASSETS
 * ===============================================
 *
 * 🎯 AVAILABLE THEMES TO MODIFY:
 * ==============================
 * 1. 'classic' - Uses geometric shapes, modify colors only
 * 2. 'space' - Full 3D space theme, modify any assets
 * 3. 'postapocalyptic' - Full 3D wasteland theme, modify any assets
 * 4. 'custom' - Template for new themes (MODIFY THIS ONE)
 *
 * 🎨 ASSET LOADING SYSTEM:
 * =======================
 * 🔗 CURRENT: Local paths like '/src/models/space/player.glb'
 * 🔗 FUTURE: S3 URLs like 'https://bucket.s3.amazonaws.com/models/player.glb'
 * 🔄 AI will provide S3 URLs to replace local paths
 *
 * 📝 QUICK MODIFICATION GUIDE:
 * ===========================
 *
 * 🧑‍🚀 TO CHANGE PLAYER MODEL:
 * --------------------------
 * themes[themeName].player.modelUrl = 'YOUR_S3_URL_HERE'
 *
 * 👹 TO CHANGE ENEMY MODELS:
 * -------------------------
 * themes[themeName].enemies.types[0].modelUrl = 'ENEMY1_S3_URL'
 * themes[themeName].enemies.types[1].modelUrl = 'ENEMY2_S3_URL'
 *
 * 🌌 TO CHANGE SKYBOX:
 * -------------------
 * themes[themeName].environment.skybox.texturePath = 'SKYBOX_S3_URL'
 *
 * 🏞️  TO CHANGE GROUND TEXTURE:
 * ----------------------------
 * themes[themeName].environment.ground.texture = 'GROUND_S3_URL'
 *
 * 🎨 TO CHANGE COLORS:
 * -------------------
 * themes[themeName].player.color = 0xFF0000  // Hex color
 * themes[themeName].enemies.types[0].color = 0x00FF00
 *
 * 🎮 USING THE CUSTOM THEME:
 * =========================
 * When players want a theme we don't have, use the 'custom' theme:
 * 1. Copy the custom theme object
 * 2. Replace all empty strings ('') with your S3 asset URLs
 * 3. Set appropriate colors and properties
 * 4. The custom theme becomes your new game theme
 *
 * 🔧 MODIFYING EXISTING THEMES:
 * =============================
 * You can modify ANY theme, not just custom. For example:
 * - Want space theme but different player? Change only player.modelUrl
 * - Want postapocalyptic but different skybox? Change only skybox.texturePath
 * - Mix and match assets from different themes as needed
 *
 * 📁 ASSET REQUIREMENTS:
 * =====================
 * 🗂️  Models: GLTF/GLB format, properly centered
 * 🎨 Textures: PNG/JPG, power-of-2 dimensions recommended
 * ☁️  Skyboxes: HDR/EXR (best quality) OR JPG/PNG (simple skies)
 *
 * ⚠️  IMPORTANT NOTES:
 * ===================
 * - All S3 URLs must be publicly accessible
 * - Models should be optimized for web (under 5MB recommended)
 * - Test fallback colors when models fail to load
 * - Use CORS-enabled S3 buckets for web access
 * - Skybox supports both HDR (.exr/.hdr) and standard (.jpg/.png) formats
 * - ⚠️ DO NOT CHANGE SCALE VALUES: Keep player.scale and enemies.scale at [1,1,1] always
 * - Changing scale values will break collision detection and physics
 */

import { PLAYER_BASE, ENEMY_BASES } from '../baseConfigs';

/**
 * 🎨 THEME OBJECT STRUCTURE BREAKDOWN:
 * ===================================
 *
 * Each theme object contains these sections:
 *
 * 🎯 THEME BASICS:
 * name: Display name shown in UI
 *
 * 🧑‍🚀 PLAYER SECTION:
 * modelUrl: S3 URL to player 3D model (GLTF/GLB)
 * fallbackGeometry: Shape if model fails ('box', 'sphere', 'cylinder')
 * scale: Size multipliers [width, height, depth] - DO NOT CHANGE FROM [1,1,1]
 * color: Hex color for fallback geometry
 * rotation: Rotation in radians [x, y, z]
 *
 * 👹 ENEMIES SECTION:
 * types[]: Array of enemy configurations
 *   - modelUrl: S3 URL to enemy 3D model
 *   - speed: Movement speed multiplier
 *   - health: Hit points
 *   - color: Fallback color
 *   - scale: Size multipliers [width, height, depth] - DO NOT CHANGE FROM [1,1,1]
 *   - facePlayer: Whether enemy rotates to face player
 *
 * 🌍 ENVIRONMENT SECTION:
 * ground: Floor appearance
 *   - texture: S3 URL to ground texture (PNG/JPG)
 *   - color: Fallback ground color
 *   - material: Material type ('standard', 'lambert')
 * skybox: Background sky
 *   - texturePath: S3 URL to skybox texture (HDR/EXR/JPG/PNG)
 *   - skyType: Time of day ('day', 'night', 'sunset')
 * lighting: Light setup
 *   - ambient: Overall scene lighting
 *   - directional: Main light source (like sun)
 * fog: Atmospheric effects
 * particles: Environmental particle effects
 *
 * 🚧 OBSTACLES SECTION:
 * basic: Simple obstacles
 * barrier: Complex barriers
 *   - modelUrl: S3 URL to obstacle model
 *   - fallbackGeometry: Shape if model fails
 *   - material.color: Obstacle color
 *
 * 💎 COLLECTIBLES SECTION:
 * coin: Collectible coins
 * gem: Collectible gems
 *   - modelUrl: S3 URL to collectible model
 *   - fallbackGeometry: Shape if model fails
 *   - material.color: Collectible color
 */
export const themes = {
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
          scale: [1, 1, 1],
          color: 0xFF0000, // Red for fast enemies
          facePlayer: true,
        },
        {
          ...ENEMY_BASES.tank,
          modelUrl: null,
          fallbackGeometry: 'box',
          scale: [1, 1, 1],
          color: 0x00FF00, // Green for tank enemies
          facePlayer: true,
        },
      ],
    },
    environment: {
      ground: { color: 0x2a2f36, material: 'standard', texture: '' },
      background: { color: 0x87ceeb },
      skybox: { texturePath: '', skyType: 'day' },
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

  custom: {
    name: 'custom game template',
    player: {
      ...PLAYER_BASE,
      modelUrl: '',
      fallbackGeometry: 'box',
      scale: [1, 1, 1],
      color: 0x8B4513, // Saddle brown for medieval armor
      rotation: [0, 0, 0],
    },
    enemies: {
      types: [
        {
          ...ENEMY_BASES.fast,
          speed: 4,
          modelUrl: '',
          fallbackGeometry: 'sphere',
          scale: [1, 1, 1],
          color: 0x654321, // Dark brown for goblin/orc
          facePlayer: true,
        },
        {
          ...ENEMY_BASES.tank,
          modelUrl: '',
          fallbackGeometry: 'box',
          scale: [1, 1, 1],
          color: 0x2F4F2F, // Dark green for troll/ogre
          facePlayer: true,
        },
      ],
    },
    environment: {
      ground: {
        color: 0x8B7355,
        texture: '',
        material: 'standard',
        metalness: 0.1,
        roughness: 0.9
      },
      background: { color: 0x87CEEB },
      skybox: { texturePath: '', skyType: 'sunset' },
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
          scale: [1, 1, 1],
          color: 0x00FFFF, // Cyan for fast enemies
          facePlayer: true,
        },
        {
          ...ENEMY_BASES.tank,
          speed: 0.8,
          health: 150,
          modelUrl: '/src/models/space/spaceEnemy2.glb',
          fallbackGeometry: 'box',
          scale: [1, 1, 1],
          color: 0xFF00FF, // Magenta for tank enemies
          facePlayer: true,
        },
      ],
    },
    environment: {
      ground: {
        color: 0x1a1a2e,
        texture: '/src/models/ground/3d-rendering-hexagonal-texture-background.jpg',
        material: 'standard',
        metalness: 0.3,
        roughness: 0.7
      },
      background: { color: 0x000022 },
      skybox: { texturePath: '/src/models/skybox/NightSkyHDRI009_4K-HDR.exr', skyType: 'night' },
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
          fallbackGeometry: 'sphere',
          scale: [1, 1, 1],
          color: 0x8B0000,
          facePlayer: true,
        },
        {
          ...ENEMY_BASES.tank,
          modelUrl: '/src/models/post/postEnemy2.glb',
          fallbackGeometry: 'box',
          scale: [1, 1, 1],
          color: 0x2F2F2F, // Dark gray for armored mutants
          facePlayer: true,
        },
      ],
    },
    environment: {
      ground: {
        color: 0x3A3A3A,
        texture: '/src/models/ground/sand-ground-textured.jpg',
        material: 'standard',
        metalness: 0.2,
        roughness: 0.8
      },
      background: { color: 0x1a1a1a },
      skybox: { texturePath: '/src/models/skybox/goegap_1k.exr', skyType: 'dusk' },
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
};

// Helper functions for theme management
export function getTheme(themeName) {
  return themes[themeName] || themes.classic;
}

export function getThemeNames() {
  return Object.keys(themes);
}

export function validateTheme(themeName) {
  return themeName in themes;
}