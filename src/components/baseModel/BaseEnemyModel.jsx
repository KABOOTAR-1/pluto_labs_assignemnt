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
// 🎭 FALLBACK RENDERING PIPELINE:
// 1. BaseEnemy passes modelUrl=null or GLTF loading fails
// 2. BaseModel detects no GLTF model available
// 3. BaseModel creates BaseEnemyModel with fallback props
// 4. BaseEnemyModel renders geometric mesh with GeometryRenderer
// 5. GeometryRenderer creates appropriate Three.js geometry
// 6. meshStandardMaterial applies color and lighting properties
//
// 🎨 GEOMETRY TYPES SUPPORTED (via GeometryRenderer):
// - 'box': Cubic geometry (default) - args: [size, size, size]
// - 'sphere': Spherical geometry - args: [size/2, 16, 16]
// - 'cylinder': Cylindrical geometry - args: [size/2, size/2, size, 16]
// - 'cone': Conical geometry - args: [size/2, size, 16]
//
// ⚠️ IMPORTANT NOTES:
// - BaseEnemyModel is ONLY used as fallback when GLTF models are unavailable
// - Component has no game logic - purely visual rendering
// - Props come from theme configuration via BaseEnemy → BaseModel chain
// - Shadow casting/receiving is enabled for proper lighting integration
// - Geometry size is handled by GeometryRenderer component
// - Material is always meshStandardMaterial for consistent lighting
//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASES:
// ============================================================================
//
// 📝 ADD EMISSIVE GLOW EFFECT:
// ```javascript
// export const BaseEnemyModel = ({ size, color, geometry = 'box' }) => {
//   return (
//     <mesh castShadow receiveShadow>
//       <GeometryRenderer geometry={geometry} size={size} />
//       <meshStandardMaterial 
//         color={color} 
//         emissive={color}
//         emissiveIntensity={0.2}
//       />
//     </mesh>
//   );
// };
// ```
//
// 🎮 ADD WIREFRAME MODE:
// ```javascript
// export const BaseEnemyModel = ({ size, color, geometry = 'box', wireframe = false }) => {
//   return (
//     <mesh castShadow receiveShadow>
//       <GeometryRenderer geometry={geometry} size={size} />
//       <meshStandardMaterial 
//         color={color} 
//         wireframe={wireframe}
//       />
//     </mesh>
//   );
// };
// ```
//
// 🎨 ADD MULTIPLE MATERIALS:
// ```javascript
// export const BaseEnemyModel = ({ size, color, geometry = 'box' }) => {
//   const materials = [
//     new THREE.MeshStandardMaterial({ color: color }),
//     new THREE.MeshStandardMaterial({ color: 0x444444 }), // Darker accent
//   ];
//   
//   return (
//     <mesh castShadow receiveShadow>
//       <GeometryRenderer geometry={geometry} size={size} />
//       <primitive object={materials[0]} />
//     </mesh>
//   );
// };
// ```
//
// 📱 ADD PERFORMANCE OPTIMIZATION:
// ```javascript
// import { memo } from 'react';
// 
// export const BaseEnemyModel = memo(({ size, color, geometry = 'box' }) => {
//   return (
//     <mesh castShadow receiveShadow>
//       <GeometryRenderer geometry={geometry} size={size} />
//       <meshStandardMaterial color={color} />
//     </mesh>
//   );
// });
// ```
//
// 🔊 DISABLE SHADOWS FOR PERFORMANCE:
// ```javascript
// export const BaseEnemyModel = ({ size, color, geometry = 'box', shadows = true }) => {
//   return (
//     <mesh castShadow={shadows} receiveShadow={shadows}>
//       <GeometryRenderer geometry={geometry} size={size} />
//       <meshStandardMaterial color={color} />
//     </mesh>
//   );
// };
// ```
// ============================================================================

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
 * 📦 FALLBACK RENDERING ROLE:
 * - Used by BaseModel as fallbackComponent when modelUrl is null or loading fails
 * - Provides visual consistency across all enemy types when 3D models unavailable
 * - Ensures enemies are always visible regardless of model loading status
 * - Maintains proper lighting integration with shadow support
 *
 * 🎨 VISUAL PROPERTIES:
 * - Geometry: Handled by GeometryRenderer (box, sphere, cylinder, cone)
 * - Material: meshStandardMaterial for consistent lighting response
 * - Shadows: Enabled for both casting and receiving shadows
 * - Color: Applied from theme configuration or component props
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