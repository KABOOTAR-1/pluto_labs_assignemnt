import { DEFAULT_CONFIG } from './constants';

// World bounds helper functions
export function useWorldBounds() {
  return DEFAULT_CONFIG.world.bounds || {
    minX: -40,
    maxX: 40,
    minZ: -40,
    maxZ: 40,
    minY: -10,
    maxY: 50
  };
}

export function useWorldSize() {
  return DEFAULT_CONFIG.world.size;
}

export function useSpawnRadius() {
  return DEFAULT_CONFIG.world.spawnRadius || 35;
}

// Utility function to check if position is within bounds
export function isWithinBounds(position, bounds = DEFAULT_CONFIG.world.bounds) {
  const [x, y, z] = position;
  return (
    x >= (bounds?.minX || -40) && x <= (bounds?.maxX || 40) &&
    y >= (bounds?.minY || -10) && y <= (bounds?.maxY || 50) &&
    z >= (bounds?.minZ || -40) && z <= (bounds?.maxZ || 40)
  );
}

// Theme validation helper
export function validateTheme(theme) {
  if (!theme) return false;
  return ['name', 'player', 'enemies', 'environment'].every(key => key in theme);
}

// Deep merge utility for theme configurations
export function mergeThemeConfig(baseConfig, themeConfig) {
  const result = { ...baseConfig };

  Object.keys(themeConfig).forEach(key => {
    if (typeof themeConfig[key] === 'object' && themeConfig[key] !== null && !Array.isArray(themeConfig[key])) {
      result[key] = mergeThemeConfig(result[key] || {}, themeConfig[key]);
    } else {
      result[key] = themeConfig[key];
    }
  });

  return result;
}

// Lighting configuration helper
export function createLightingConfig(themeLighting) {
  return {
    ambient: {
      color: themeLighting?.ambient?.color || DEFAULT_CONFIG.lighting.ambient.color,
      intensity: themeLighting?.ambient?.intensity || DEFAULT_CONFIG.lighting.ambient.intensity
    },
    directional: themeLighting?.directional || [DEFAULT_CONFIG.lighting.directional],
    point: themeLighting?.point || []
  };
}

// Particle configuration helper
export function createParticleConfig(themeParticles) {
  if (!themeParticles) return null;

  return {
    fireflies: themeParticles.fireflies || { count: 600, color: 0xFFFF00, size: 2 },
    magic: themeParticles.magic || { count: 300, colors: [0x9370DB, 0xDA70D6, 0xFF69B4], size: 3 },
    stars: themeParticles.stars || { count: 1000, color: 0xffffff, size: 2 },
    dust: themeParticles.dust || { count: 500, color: 0x8B7355, size: 1 },
    sparks: themeParticles.sparks || { count: 200, colors: [0xFFFF00, 0xFF4500, 0xFF6347], size: 2 }
  };
}