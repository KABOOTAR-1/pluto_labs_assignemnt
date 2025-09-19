/**
 * 🏞️ FLOOR COMPONENT - Smart Ground Renderer
 * =========================================
 *
 * 🎯 WHAT THIS COMPONENT ACTUALLY DOES:
 * ✅ Automatically chooses between textured or solid floor based on theme configuration
 * ✅ Provides unified interface for different floor rendering approaches
 * ✅ Handles theme-based ground customization (colors, textures, materials)
 * ✅ Uses world size for proper floor scaling (doesn't manage boundaries)
 * ✅ Supports both realistic and stylized ground appearances
 * ✅ Child components create static physics plane bodies for collision detection
 *
 * 🔄 RENDERING LOGIC:
 * - **Has Texture**: Uses TexturedFloor for image-based grounds (realistic)
 * - **No Texture**: Uses SolidFloor for solid colored grounds (stylized)
 * - **Theme Integration**: Ground properties come from current theme configuration
 *
 * 🎨 CUSTOMIZATION OPTIONS:
 * - **Textures**: Image files for realistic ground surfaces
 * - **Colors**: Solid colors for stylized environments
 * - **Materials**: Standard vs Reflector materials for different visual effects
 * - **Size**: Uses world size for proper scaling (from gameConfig.world.size)
 *
 * ⚙️ THEME CONFIGURATION:
 * Ground properties are defined in theme files (themes.js):
 * ```javascript
 * ground: {
 *   texture: '/path/to/ground-texture.jpg',  // For textured floors
 *   color: 0x8B7355,                        // For solid floors
 *   material: 'reflector',                  // 'reflector' or 'standard'
 *   roughness: 0.8,                         // Surface roughness
 *   metalness: 0.1                          // Metallic appearance
 * }
 * ```
 *
 * 🎯 AI MODIFICATION GUIDE:
 * - **Add New Floor Types**: Create new floor components and add conditions here
 * - **Change Default Behavior**: Modify the hasTexture logic
 * - **Add Floor Effects**: Extend with particle effects or animations
 * - **Theme Integration**: Update theme files to use new floor properties
 * - **Size Adjustments**: Modify worldSize usage for different scaling needs
 * - **Enable Ground Collision**: Static physics plane bodies are already created by child components using usePlane from @react-three/cannon
 */

import React from 'react';
import { gameConfig, useCurrentEnvironment } from '../config/gameConfig';

/**
 * 🖼️ TEXTURED FLOOR - Image-based ground renderer with static physics plane
 * Creates realistic ground surfaces using texture images
 * Includes static physics plane body for collision detection
 * Supports reflection materials and advanced surface properties
 */
import TexturedFloor from './TexturedFloor';

/**
 * 🎨 SOLID FLOOR - Solid color ground renderer with static physics plane
 * Creates stylized ground surfaces using solid colors
 * Includes static physics plane body for collision detection
 * Lightweight alternative for non-realistic environments
 */
import SolidFloor from './SolidFloor';

const Floor = () => {
  // 🎨 THEME ENVIRONMENT - Get current theme's ground configuration
  const currentEnvironment = useCurrentEnvironment();

  // 🌍 WORLD SIZE - Get the game world's boundary size for floor scaling
  const worldSize = gameConfig.world.size;

  // ⚙️ GROUND CONFIG - Extract ground properties from current theme
  const groundConfig = currentEnvironment.ground || {};

  // 🔍 TEXTURE CHECK - Determine if theme has a texture or should use solid color
  const hasTexture = groundConfig.texture && groundConfig.texture.trim() !== '';

  // 🎯 CONDITIONAL RENDERING - Choose appropriate floor component based on theme
  return hasTexture ? (
    // 🖼️ TEXTURED FLOOR - For themes with ground texture images
    <TexturedFloor groundConfig={groundConfig} worldSize={worldSize} />
  ) : (
    // 🎨 SOLID FLOOR - For themes with solid ground colors
    <SolidFloor groundConfig={groundConfig} worldSize={worldSize} />
  );
};

export default Floor;
