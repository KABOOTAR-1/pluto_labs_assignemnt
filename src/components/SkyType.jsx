/**
 * ☀️ SKY TYPE COMPONENT - Procedural Sky Renderer
 * =============================================
 *
 * 🎯 WHAT THIS COMPONENT DOES:
 * ✅ Renders dynamic, procedural skies without texture files
 * ✅ Supports multiple sky types (day, sunset, dusk, night, dawn)
 * ✅ Uses drei Sky component for realistic atmospheric scattering
 * ✅ Lightweight alternative to texture-based skyboxes
 * ✅ Automatic sun positioning and lighting based on sky type
 *
 * 🔄 SKY TYPES AVAILABLE:
 * - **day**: Bright daylight with high sun position
 * - **sunset**: Warm orange/red colors with low sun
 * - **dusk**: Deep blue/purple twilight colors
 * - **night**: Dark night sky with moon-like lighting
 * - **dawn**: Soft morning light with rising sun
 *
 * ⚙️ CONFIGURATION PARAMETERS:
 * - **sunPosition**: [x, y, z] coordinates for sun placement
 * - **inclination**: Vertical angle of the sun (0 = horizon, 1 = zenith)
 * - **azimuth**: Horizontal angle of the sun (0-1 = full rotation)
 *
 * 🎨 VISUAL FEATURES:
 * - Realistic atmospheric scattering
 * - Dynamic sun positioning
 * - Color gradients based on time of day
 * - Automatic lighting integration with scene
 */

import React from 'react';
import { Sky } from '@react-three/drei';

/**
 * 🌅 SKY CONFIGURATIONS - Predefined sky settings for different times
 * Each configuration defines sun position and atmospheric parameters
 * Used to create consistent lighting and colors for different sky types
 */
const SKY_CONFIGS = {
  day: {
    sunPosition: [100, 10, 100],    // High sun for bright daylight
    inclination: 0,                  // Standard horizon alignment
    azimuth: 0.25,                   // Morning/evening sun angle
  },
  sunset: {
    sunPosition: [0, 10, -100],      // Low western sun
    inclination: 0,                  // Horizon level
    azimuth: 0.5,                    // Western sunset position
  },
  dusk: {
    sunPosition: [-50, 5, -50],      // Low northwest sun
    inclination: 0,                  // Horizon level
    azimuth: 0.75,                   // Northwest dusk position
  },
  night: {
    sunPosition: [-100, -10, -100],  // Very low, behind horizon
    inclination: 0,                  // Below horizon
    azimuth: 1.0,                    // Full rotation for night
  },
  dawn: {
    sunPosition: [50, 5, 50],        // Low eastern sun
    inclination: 0,                  // Horizon level
    azimuth: 0.1,                    // Eastern dawn position
  },
};

const SkyType = ({ skyType = 'day' }) => {
  // 🌅 SELECT SKY CONFIGURATION - Get settings for requested sky type or fallback to day
  const config = SKY_CONFIGS[skyType] || SKY_CONFIGS.day;

  return (
    // ☀️ PROCEDURAL SKY RENDERER - drei Sky component with atmospheric scattering
    <Sky
      sunPosition={config.sunPosition}  // Sun's 3D position in the sky
      inclination={config.inclination}  // Vertical sun angle (0 = horizon)
      azimuth={config.azimuth}          // Horizontal sun angle (0-1 = full rotation)
    />
  );
};

export default SkyType;