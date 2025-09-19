// ============================================================================
// 📐 GEOMETRY RENDERER COMPONENT - Universal Three.js Geometry Factory
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is a universal geometry factory that creates Three.js geometries based on type
// ✅ Provides consistent geometry creation with standardized sizing across the game
// ✅ Used by BasePlayerModel and BaseEnemyModel for fallback geometry rendering
// ✅ Supports 4 geometry types: box, sphere, cylinder, cone with intelligent sizing
// ✅ Acts as centralized geometry creation to ensure visual consistency
//
// 📊 WHAT GEOMETRYRENDERER ACTUALLY DOES:
// - Geometry selection: uses switch statement to create appropriate Three.js geometry
// - Size normalization: applies consistent sizing logic across all geometry types
// - Fallback handling: defaults to box geometry for unknown types
// - Three.js integration: returns native Three.js geometry components
//
// 📊 WHAT GEOMETRYRENDERER DOES NOT DO (happens elsewhere):
// - Material application: handled by parent components (BasePlayerModel, BaseEnemyModel)
// - Mesh creation: parent components wrap geometry in mesh elements
// - Shadow configuration: managed by parent mesh components
// - Position/rotation: handled by parent mesh or group components
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎯 GEOMETRY FACTORY MODIFICATIONS:
// Since GeometryRenderer is a pure geometry factory, customization focuses on geometry types and sizing:
//
// 📝 ADD NEW GEOMETRY TYPES:
// - Add new cases to switch statement for additional shapes
// - Include proper sizing logic for new geometry types
// - Maintain consistency with existing size parameter behavior
// - Add fallback handling for edge cases
//
// 🎭 MODIFY EXISTING GEOMETRIES:
// - Adjust segment counts for performance vs quality trade-offs
// - Change sizing calculations for different visual effects
// - Add parameters for geometry-specific customization
// - Modify default geometry type from 'box' to another shape
//
// 🔄 STATE MANAGEMENT:
// - geometry: Shape type string ('box', 'sphere', 'cylinder', 'cone') with 'box' default
// - size: Base size number used for all geometry calculations (default: 1)
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/components/baseModel/BasePlayerModel.jsx: Uses GeometryRenderer for player body
// - src/components/baseModel/BaseEnemyModel.jsx: Uses GeometryRenderer for enemy body
// - src/config/themes/themes.js: Defines fallbackGeometry types used by this component
//
// 🎭 GEOMETRY CREATION PIPELINE:
// 1. Parent component (BasePlayerModel/BaseEnemyModel) passes geometry type and size
// 2. GeometryRenderer switch statement selects appropriate geometry
// 3. Size calculations applied based on geometry type requirements
// 4. Three.js geometry component returned to parent
// 5. Parent wraps geometry in mesh with material and properties
//
// 🎨 GEOMETRY SPECIFICATIONS:
// - 'box': Cubic geometry with equal dimensions [size, size, size]
// - 'sphere': Spherical geometry with radius=size/2, segments=16x16
// - 'cylinder': Cylindrical geometry with radius=size/2, height=size, segments=16
// - 'cone': Conical geometry with radius=size/2, height=size, segments=16
// - default: Falls back to box geometry for unknown types
//
// 📏 SIZING LOGIC:
// - Box: Uses size directly for width, height, depth
// - Sphere: Uses size/2 as radius (diameter equals size)
// - Cylinder: Uses size/2 as radius, size as height
// - Cone: Uses size/2 as radius, size as height
//
// ⚠️ IMPORTANT NOTES:
// - GeometryRenderer is a pure function component with no side effects
// - Component only creates geometry - no materials, meshes, or positioning
// - Size parameter is consistently interpreted across all geometry types
// - Segment counts are optimized for performance vs visual quality
// - Default fallback ensures component never fails to render
// - All geometries use consistent sizing for visual predictability
//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASES:
// ============================================================================
//
// 📝 ADD NEW GEOMETRY TYPE:
// ```javascript
// export const GeometryRenderer = ({ geometry = 'box', size = 1 }) => {
//   switch (geometry) {
//     case 'sphere':
//       return <sphereGeometry args={[size / 2, 16, 16]} />;
//     case 'cylinder':
//       return <cylinderGeometry args={[size / 2, size / 2, size, 16]} />;
//     case 'cone':
//       return <coneGeometry args={[size / 2, size, 16]} />;
//     case 'octahedron':  // NEW GEOMETRY TYPE
//       return <octahedronGeometry args={[size / 2]} />;
//     case 'box':
//     default:
//       return <boxGeometry args={[size, size, size]} />;
//   }
// };
// ```
//
// 🎮 ADD HIGH-QUALITY VARIANTS:
// ```javascript
// export const GeometryRenderer = ({ geometry = 'box', size = 1, quality = 'normal' }) => {
//   const segments = quality === 'high' ? 32 : 16;
//   
//   switch (geometry) {
//     case 'sphere':
//       return <sphereGeometry args={[size / 2, segments, segments]} />;
//     case 'cylinder':
//       return <cylinderGeometry args={[size / 2, size / 2, size, segments]} />;
//     // ... other cases with dynamic segments
//   }
// };
// ```
//
// 🎨 ADD SIZE VARIANTS:
// ```javascript
// export const GeometryRenderer = ({ geometry = 'box', size = 1, sizeVariant = 'uniform' }) => {
//   const getSize = (baseSize, variant) => {
//     switch (variant) {
//       case 'tall': return [baseSize, baseSize * 1.5, baseSize];
//       case 'wide': return [baseSize * 1.5, baseSize, baseSize * 1.5];
//       case 'flat': return [baseSize, baseSize * 0.5, baseSize];
//       default: return [baseSize, baseSize, baseSize];
//     }
//   };
//   
//   switch (geometry) {
//     case 'box':
//       const [w, h, d] = getSize(size, sizeVariant);
//       return <boxGeometry args={[w, h, d]} />;
//     // ... other cases
//   }
// };
// ```
//
// 📱 ADD PERFORMANCE OPTIMIZATION:
// ```javascript
// import { memo } from 'react';
// 
// export const GeometryRenderer = memo(({ geometry = 'box', size = 1 }) => {
//   switch (geometry) {
//     case 'sphere':
//       return <sphereGeometry args={[size / 2, 8, 8]} />; // Lower segments for performance
//     case 'cylinder':
//       return <cylinderGeometry args={[size / 2, size / 2, size, 8]} />;
//     case 'cone':
//       return <coneGeometry args={[size / 2, size, 8]} />;
//     case 'box':
//     default:
//       return <boxGeometry args={[size, size, size]} />;
//   }
// });
// ```
//
// 🔊 ADD VALIDATION:
// ```javascript
// export const GeometryRenderer = ({ geometry = 'box', size = 1 }) => {
//   const validGeometries = ['box', 'sphere', 'cylinder', 'cone'];
//   const safeGeometry = validGeometries.includes(geometry) ? geometry : 'box';
//   const safeSize = Math.max(0.1, Math.min(10, size)); // Clamp size between 0.1 and 10
//   
//   switch (safeGeometry) {
//     case 'sphere':
//       return <sphereGeometry args={[safeSize / 2, 16, 16]} />;
//     // ... other cases with safeSize
//   }
// };
// ```
// ============================================================================

import React from "react";

/**
 * 📐 GEOMETRY RENDERER COMPONENT - Universal Three.js Geometry Factory
 * ==================================================================
 *
 * @description Universal geometry factory that creates Three.js geometries based on type string
 * @param {string} geometry - Shape type ('box', 'sphere', 'cylinder', 'cone') with 'box' default
 * @param {number} size - Base size for geometry calculations (default: 1)
 * @returns {JSX.Element} Three.js geometry component ready for mesh wrapping
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Create appropriate Three.js geometry based on type parameter
 * - Apply consistent sizing logic across all geometry types
 * - Provide fallback to box geometry for unknown types
 * - Ensure visual consistency across player and enemy fallback rendering
 *
 * 📐 GEOMETRY TYPE SUPPORT:
 * - 'box': Cubic geometry with equal dimensions [size, size, size]
 * - 'sphere': Spherical geometry with radius=size/2, 16x16 segments
 * - 'cylinder': Cylindrical geometry with radius=size/2, height=size, 16 segments
 * - 'cone': Conical geometry with radius=size/2, height=size, 16 segments
 * - default: Falls back to box geometry for unknown types
 *
 * 📏 SIZING CONSISTENCY:
 * - All geometries normalized to fit within size parameter bounds
 * - Sphere/Cylinder/Cone use size/2 as radius for consistent visual scale
 * - Box uses size directly for all dimensions
 * - Height equals size for cylinder and cone geometries
 *
 * 🎨 VISUAL QUALITY:
 * - Segment counts optimized for performance vs quality balance
 * - Sphere: 16x16 segments for smooth appearance
 * - Cylinder/Cone: 16 radial segments for circular smoothness
 * - Box: No segments needed (built-in cubic geometry)
 *
 * 🚀 USAGE PATTERNS:
 * - BasePlayerModel: Uses for main player body geometry
 * - BaseEnemyModel: Uses for enemy body geometry
 * - Theme System: Geometry type comes from theme fallbackGeometry property
 * - Fallback Rendering: Ensures entities always have visual representation
 */
export const GeometryRenderer = ({ geometry = 'box', size = 1 }) => {
  switch (geometry) {
    case 'sphere':
      // 🔮 SPHERICAL GEOMETRY - Radius = size/2, 16x16 segments for smoothness
      return <sphereGeometry args={[size / 2, 16, 16]} />;
      
    case 'cylinder':
      // 🗂️ CYLINDRICAL GEOMETRY - Top radius, bottom radius, height, radial segments
      return <cylinderGeometry args={[size / 2, size / 2, size, 16]} />;
      
    case 'cone':
      // 🔺 CONICAL GEOMETRY - Radius, height, radial segments
      return <coneGeometry args={[size / 2, size, 16]} />;
      
    case 'box':
    default:
      // 📦 CUBIC GEOMETRY - Width, height, depth (uniform cube)
      return <boxGeometry args={[size, size, size]} />;
  }
};