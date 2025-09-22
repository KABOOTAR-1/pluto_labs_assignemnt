// ============================================================================
// 📦 BASE ENEMY MODEL COMPONENT - Fallback Geometry Renderer for Enemies
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is a fallback geometry renderer used when GLTF models fail to load
// ✅ Creates simple geometric shapes (box, sphere, cylinder, cone) for enemy visualization
// ✅ Used by BaseModel as fallbackComponent when modelUrl is null or loading fails
// ✅ Provides consistent visual fallback for all enemy types across all themes
// ✅ Handles shadow casting and receiving for proper lighting integration
//
// 📊 WHAT BASEENEMYMODEL ACTUALLY DOES:
// - Mesh creation: renders a Three.js mesh with shadow support
// - Geometry delegation: uses GeometryRenderer to create shape based on geometry prop
// - Material application: applies meshStandardMaterial with specified color
// - Shadow integration: enables castShadow and receiveShadow for lighting
//
// 📊 WHAT BASEENEMYMODEL DOES NOT DO (happens elsewhere):
// - Physics body creation: done in BaseEnemy component
// - Position updates: handled by physics system in BaseEnemy
// - AI behaviors: managed by BaseEnemy hooks (chase, attack, cleanup)
// - GLTF loading: handled by BaseModel → GLTFModel chain
// - Theme integration: colors/geometry types come from theme configuration
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎯 FALLBACK GEOMETRY MODIFICATIONS:
// Since BaseEnemyModel is a simple geometry renderer, customization focuses on visual appearance:
//
// 📝 MODIFY GEOMETRY APPEARANCE:
// - Change material properties (metalness, roughness, emissive)
// - Add multiple materials for different parts of the enemy
// - Modify shadow behavior (disable shadows for performance)
// - Add wireframe or transparent materials for special effects
//
// 🎭 ADD VISUAL ENHANCEMENTS:
// - Include multiple meshes for compound enemy shapes
// - Add emissive materials for glowing effects
// - Include animated materials or color transitions
// - Add particle effects or additional visual elements
//
// 🔄 STATE MANAGEMENT:
// - size: Geometry size passed to GeometryRenderer (number)
// - color: Material color as hex number or color string
// - geometry: Shape type ('box', 'sphere', 'cylinder', 'cone') with 'box' default
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/components/baseModel/GeometryRenderer.jsx: Handles actual geometry creation
// - src/components/GltfLoader/BaseModel.jsx: Uses BaseEnemyModel as fallbackComponent
// - src/components/enemies/BaseEnemy.jsx: Passes props to BaseModel which uses this component
// - src/config/themes/themes.js: Defines fallbackGeometry and color for enemy types
//
//
// ⚠️ IMPORTANT NOTES:
// - BaseEnemyModel is ONLY used as fallback when GLTF models are unavailable
// - Component has no game logic - purely visual rendering
// - Props come from theme configuration via BaseEnemy → BaseModel chain
// - Shadow casting/receiving is enabled for proper lighting integration
// - Geometry size is handled by GeometryRenderer component
// - Material is always meshStandardMaterial for consistent lighting
import React from "react";
import { GeometryRenderer } from "./GeometryRenderer";

/**
 * 📦 BASE ENEMY MODEL COMPONENT - Fallback Geometry Renderer for Enemies
 * =====================================================================
 *
 * @description Simple geometric fallback renderer used when GLTF enemy models fail to load or are unavailable
 * @param {number} size - Geometry size for shape dimensions
 * @param {string|number} color - Material color as hex number or color string
 * @param {string} geometry - Shape type ('box', 'sphere', 'cylinder', 'cone') with 'box' default
 * @returns {JSX.Element} Three.js mesh with geometry and material
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Render fallback geometry when GLTF models are unavailable
 * - Create Three.js mesh with shadow casting and receiving
 * - Apply consistent material properties for lighting integration
 * - Delegate geometry creation to GeometryRenderer component
 *
 * 🚀 USAGE PATTERNS:
 * - Classic Theme: Uses BaseEnemyModel with box/sphere geometry and theme colors
 * - GLTF Themes: Uses BaseEnemyModel only when model loading fails
 * - Development: Useful for testing enemy behavior without requiring 3D models
 * - Performance: Lighter rendering when 3D models are too complex
 */
export const BaseEnemyModel = ({ size, color, geometry = 'box' }) => {
  return (
    <mesh castShadow receiveShadow>
      <GeometryRenderer geometry={geometry} size={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};