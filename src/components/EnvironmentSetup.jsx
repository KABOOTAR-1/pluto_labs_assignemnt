/**
 * 🌍 ENVIRONMENT SETUP - World Environment Manager
 * ===============================================
 *
 * 🎯 WHAT THIS COMPONENT DOES:
 * ✅ Sets up the 3D world environment (skybox, fog, atmospheric effects)
 * ✅ Conditionally renders skybox or procedural sky based on theme
 * ✅ Manages world boundaries and environmental constraints
 * ✅ Handles theme-specific environmental presets
 * ✅ Uses Suspense for async environment loading
 *
 * 🔄 ENVIRONMENT TYPES:
 * - **Custom Skybox**: Uses texture-based skybox for specific themes (space, medieval, etc.)
 * - **Procedural Sky**: Uses SkyType component for dynamic skies (day, night, sunset)
 * - **HDR Environment**: Uses drei Environment component for generic scenes
 *
 * 🎨 CONDITIONAL RENDERING LOGIC:
 * - If theme has skybox.texturePath → render Skybox component
 * - Otherwise → render SkyType component with skyType
 * - Special themes (space, cyberpunk, etc.) skip generic Environment
 *
 * ⚙️ CONFIGURATION SOURCES:
 * - currentEnvironment from gameConfig (theme-based settings)
 * - worldBounds from configHelpers (collision boundaries)
 * - Theme-specific skybox paths and sky types
 */

import React, { Suspense } from 'react';
import { Environment } from '@react-three/drei';
import { useCurrentEnvironment } from '../config/gameConfig';
import { useWorldBounds } from '../config/configHelpers';

/**
 * 🌌 SKYBOX COMPONENT - Custom skybox renderer with HDR textures
 * Loads and displays 360° skybox environments
 * Supports theme-specific skybox textures
 * Handles world boundary integration
 */
import Skybox from './Skybox';

/**
 * ☀️ SKY TYPE COMPONENT - Procedural sky renderer
 * Creates dynamic skies without texture files
 * Supports day/night/sunset sky variations
 * Lightweight alternative to texture-based skyboxes
 */
import SkyType from './SkyType';

const EnvironmentSetup = () => {
  // 🎨 THEME ENVIRONMENT - Get current theme's environmental settings
  const currentEnvironment = useCurrentEnvironment();

  // 🌍 WORLD BOUNDARIES - Get collision boundaries for skybox scaling
  const worldBounds = useWorldBounds();

  return (
    <Suspense fallback={null}>
      {/* 🌌 SKY RENDERING - Choose between custom skybox or procedural sky */}
      {currentEnvironment.skybox?.texturePath ? (
        // 🎨 CUSTOM SKYBOX - Use texture-based skybox for specific themes
        <Skybox
          worldBounds={worldBounds}
          texturePath={currentEnvironment.skybox.texturePath}
        />
      ) : (
        // ☀️ PROCEDURAL SKY - Use dynamic sky generation for generic themes
        <SkyType skyType={currentEnvironment.skybox?.skyType || 'day'} />
      )}

      {/* 🏙️ GENERIC ENVIRONMENT - Only for themes without custom skyboxes */}
      {currentEnvironment.name !== 'Deep Space' &&
       currentEnvironment.name !== 'Cyberpunk 2077' &&
       currentEnvironment.name !== 'Medieval Fantasy' &&
       currentEnvironment.name !== 'Post-Apocalyptic' && (
        // 🌆 CITY PRESET - Generic urban environment for basic themes
        <Environment preset="city" />
      )}
    </Suspense>
  );
};

export default EnvironmentSetup;