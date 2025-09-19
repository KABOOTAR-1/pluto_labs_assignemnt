/**
 * 💡 LIGHTING MANAGER - Dynamic Lighting System
 * ============================================
 *
 * 🎯 WHAT THIS COMPONENT DOES:
 * ✅ Manages all light sources in the 3D scene (ambient, directional, point lights)
 * ✅ Dynamically adjusts lighting based on current theme/environment
 * ✅ Handles shadow casting for realistic depth perception
 * ✅ Supports multiple light configurations (arrays or single lights)
 * ✅ Performance-optimized lighting setup with theme-based presets
 *
 * 🔄 LIGHTING TYPES MANAGED:
 * - **Ambient Light**: Base illumination affecting all objects equally
 * - **Directional Light**: Sun-like lighting with shadows (primary light source)
 * - **Point Light**: Localized lighting from specific positions (lamps, effects)
 *
 * ⚙️ CONFIGURATION SOURCE:
 * - Reads from currentEnvironment.lighting configuration
 * - Supports theme-based lighting presets (medieval, space, post-apoc, etc.)
 * - Fallback values ensure lighting works even with incomplete configs
 *
 * 🎨 LIGHTING FEATURES:
 * - Shadow mapping with configurable resolution (2048x2048 default)
 * - Shadow camera frustum optimization for performance
 * - Multiple directional lights support for complex scenes
 * - Dynamic light property updates based on theme changes
 */

import React from 'react';
import { useCurrentEnvironment } from '../config/gameConfig';

const LightingManager = () => {
  // 🎨 THEME-BASED LIGHTING - Get current environment lighting configuration
  const currentEnvironment = useCurrentEnvironment();

  return (
    <>
      {/* 🌟 AMBIENT LIGHT - Base illumination for entire scene */}
      <ambientLight
        color={currentEnvironment.lighting?.ambient?.color || 0x404040}
        intensity={currentEnvironment.lighting?.ambient?.intensity || 0.5}
      />

      {/* ☀️ DIRECTIONAL LIGHTS - Sun-like lighting with shadows */}
      {currentEnvironment.lighting?.directional && (
        Array.isArray(currentEnvironment.lighting.directional) ? (
          // 🎯 MULTIPLE DIRECTIONAL LIGHTS - For complex lighting setups
          currentEnvironment.lighting.directional.map((light, index) => (
            <directionalLight
              key={`directional-${index}`}
              color={light.color}
              intensity={light.intensity}
              position={light.position}
              castShadow={index === 0} // Only first directional light casts shadows for performance
              shadow-mapSize={[2048, 2048]} // High-res shadow mapping
              shadow-camera-left={-20}   // Shadow camera frustum bounds
              shadow-camera-right={20}
              shadow-camera-top={20}
              shadow-camera-bottom={-20}
            />
          ))
        ) : (
          // 🎯 SINGLE DIRECTIONAL LIGHT - Simple lighting setup
          <directionalLight
            color={currentEnvironment.lighting.directional.color}
            intensity={currentEnvironment.lighting.directional.intensity}
            position={currentEnvironment.lighting.directional.position}
            castShadow // Enable shadows for main light source
            shadow-mapSize={[2048, 2048]}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
        )
      )}

      {/* 💡 POINT LIGHTS - Localized lighting effects */}
      {currentEnvironment.lighting?.point && currentEnvironment.lighting.point.map((light, index) => (
        <pointLight
          key={`point-${index}`}
          color={light.color}
          intensity={light.intensity}
          position={light.position}
          distance={light.distance} // Maximum reach of the light
        />
      ))}
    </>
  );
};

export default LightingManager;