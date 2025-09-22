// ============================================================================
// 📐 GEOMETRY RENDERER COMPONENT - Universal Three.js Geometry Factory
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is a universal geometry factory that creates Three.js geometries based on type
// ✅ Provides consistent geometry creation with standardized sizing across the game
// ✅ Used by BasePlayerModel, BaseEnemyModel, and BaseModel for fallback geometry rendering
// ✅ Supports 5 geometry types: box, sphere, cylinder, cone, octahedron with intelligent sizing
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
// ⚠️ IMPORTANT NOTES:
// - GeometryRenderer is a pure function component with no side effects
// - Component only creates geometry - no materials, meshes, or positioning
// - Size parameter is consistently interpreted across all geometry types
// - Segment counts are optimized for performance vs visual quality
// - Default fallback ensures component never fails to render
// - All geometries use consistent sizing for visual predictability


import React from "react";

/**
 * 📐 GEOMETRY RENDERER COMPONENT - Universal Three.js Geometry Factory
 * ==================================================================
 *
 * @description Universal geometry factory that creates Three.js geometries based on type string
 * @param {string} geometry - Shape type ('box', 'sphere', 'cylinder', 'cone', 'octahedron') with 'box' default
 * @param {number} size - Base size for geometry calculations (default: 1)
 * @returns {JSX.Element} Three.js geometry component ready for mesh wrapping
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Create appropriate Three.js geometry based on type parameter
 * - Apply consistent sizing logic across all geometry types
 * - Provide fallback to box geometry for unknown types
 * - Ensure visual consistency across player and enemy fallback rendering
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

    case 'octahedron':
      // 🔸 OCTAHEDRAL GEOMETRY - Radius, detail level
      return <octahedronGeometry args={[size / 2, 0]} />;

    case 'box':
    default:
      // 📦 CUBIC GEOMETRY - Width, height, depth (uniform cube)
      return <boxGeometry args={[size, size, size]} />;
  }
};