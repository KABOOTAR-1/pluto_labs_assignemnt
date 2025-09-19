// ============================================================================
// 🧑‍🚀 BASE PLAYER MODEL COMPONENT - Fallback Player Geometry with Direction Indicator
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is a fallback player renderer used when GLTF models fail to load
// ✅ Creates player body geometry plus a directional indicator cone
// ✅ Used by BaseModel as fallbackComponent when player modelUrl is null or loading fails
// ✅ Provides visual player representation with clear facing direction
// ✅ Handles shadow casting and receiving for proper lighting integration
//
// 📊 WHAT BASEPLAYERMODEL ACTUALLY DOES:
// - Main body rendering: creates geometric shape for player body using GeometryRenderer
// - Direction indicator: renders white cone to show which way player is facing
// - Shadow integration: enables castShadow and receiveShadow on both meshes
// - Material application: applies meshStandardMaterial with specified colors and effects
//
// 📊 WHAT BASEPLAYERMODEL DOES NOT DO (happens elsewhere):
// - Physics body creation: done in Player component
// - Position/rotation updates: handled by physics system and player hooks
// - Input handling: managed by Player component hooks (movement, rotation, shooting)
// - GLTF loading: handled by BaseModel → GLTFModel chain
// - Theme integration: colors/geometry types come from theme configuration
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎯 FALLBACK PLAYER MODIFICATIONS:
// Since BasePlayerModel is a composite geometry renderer, customization focuses on visual appearance:
//
// 📝 MODIFY PLAYER APPEARANCE:
// - Change main body material properties (metalness, roughness, emissive)
// - Modify direction indicator (size, color, position, shape)
// - Add multiple body parts or accessories
// - Change shadow behavior for performance optimization
//
// 🎭 ADD VISUAL ENHANCEMENTS:
// - Include weapon attachments or equipment visuals
// - Add animated materials or color transitions based on health/state
// - Include particle effects for player abilities or status
// - Add multiple directional indicators (front, back, sides)
//
// 🔄 STATE MANAGEMENT:
// - size: Main body geometry size passed to GeometryRenderer (number, default: 1)
// - color: Main body material color as hex string (string, default: "#00ff00")
// - geometry: Main body shape type ('box', 'sphere', 'cylinder', 'cone') with 'box' default
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/components/baseModel/GeometryRenderer.jsx: Handles main body geometry creation
// - src/components/GltfLoader/BaseModel.jsx: Uses BasePlayerModel as fallbackComponent
// - src/components/Player.jsx: Passes props to BaseModel which uses this component
// - src/config/themes/themes.js: Defines player fallbackGeometry and color
//
// 🎭 FALLBACK RENDERING PIPELINE:
// 1. Player passes modelUrl=null or GLTF loading fails
// 2. BaseModel detects no GLTF model available
// 3. BaseModel creates BasePlayerModel with fallback props
// 4. BasePlayerModel renders main body + direction indicator
// 5. GeometryRenderer creates appropriate Three.js geometry for body
// 6. meshStandardMaterial applies colors and lighting properties
//
// 🎨 COMPONENT STRUCTURE:
// - Main Body Mesh: Uses GeometryRenderer for configurable shape (box, sphere, etc.)
// - Direction Indicator: Fixed white cone positioned in front of player
// - Both meshes: Enable shadow casting and receiving for lighting
// - Materials: Standard materials with proper lighting response
//
// 🧭 DIRECTION INDICATOR DETAILS:
// - Position: [0, 0.1, 1.5] (slightly above and in front of player)
// - Rotation: [-Math.PI / 2, -Math.PI, Math.PI] (points forward)
// - Geometry: coneGeometry with args [0.1, 0.3, 8] (small cone)
// - Material: White with emissive glow, semi-transparent
//
// ⚠️ IMPORTANT NOTES:
// - BasePlayerModel is ONLY used as fallback when GLTF models are unavailable
// - Component has no game logic - purely visual rendering
// - Props come from theme configuration via Player → BaseModel chain

//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASES:
// ====================================// - Direction indicator always faces "forward" relative to player rotation
// - Main body geometry is configurable, direction indicator is fixed
// - Both meshes cast and receive shadows for proper lighting integration========================================
//
// 📝 ADD HEALTH-BASED COLOR CHANGES:
// ```javascript
// export const BasePlayer = ({ size = 1, color = "#00ff00", geometry = 'box', health = 100 }) => {
//   const healthColor = health > 50 ? color : "#ff0000"; // Red when low health
//   
//   return (
//     <>
//       <mesh castShadow receiveShadow>
//         <GeometryRenderer geometry={geometry} size={size} />
//         <meshStandardMaterial color={healthColor} />
//       </mesh>
//       {/* ... direction indicator ... */}
//     </>
//   );
// };
// ```
//
// 🎮 ADD MULTIPLE DIRECTION INDICATORS:
// ```javascript
// export const BasePlayer = ({ size = 1, color = "#00ff00", geometry = 'box' }) => {
//   return (
//     <>
//       <mesh castShadow receiveShadow>
//         <GeometryRenderer geometry={geometry} size={size} />
//         <meshStandardMaterial color={color} />
//       </mesh>
//       
//       {/* Front indicator */}
//       <mesh position={[0, 0.1, 1.5]} rotation={[-Math.PI / 2, -Math.PI, Math.PI]} castShadow>
//         <coneGeometry args={[0.1, 0.3, 8]} />
//         <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} transparent opacity={0.7} />
//       </mesh>
//       
//       {/* Back indicator (smaller) */}
//       <mesh position={[0, 0.1, -1.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
//         <coneGeometry args={[0.05, 0.15, 6]} />
//         <meshStandardMaterial color="#888888" transparent opacity={0.5} />
//       </mesh>
//     </>
//   );
// };
// ```
//
// 🎨 ADD WEAPON ATTACHMENT:
// ```javascript
// export const BasePlayer = ({ size = 1, color = "#00ff00", geometry = 'box', showWeapon = true }) => {
//   return (
//     <>
//       <mesh castShadow receiveShadow>
//         <GeometryRenderer geometry={geometry} size={size} />
//         <meshStandardMaterial color={color} />
//       </mesh>
//       
//       {/* Direction indicator */}
//       <mesh position={[0, 0.1, 1.5]} rotation={[-Math.PI / 2, -Math.PI, Math.PI]} castShadow>
//         <coneGeometry args={[0.1, 0.3, 8]} />
//         <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} transparent opacity={0.7} />
//       </mesh>
//       
//       {/* Weapon attachment */}
//       {showWeapon && (
//         <mesh position={[0.3, 0, 1.2]} castShadow>
//           <boxGeometry args={[0.1, 0.1, 0.8]} />
//           <meshStandardMaterial color="#444444" />
//         </mesh>
//       )}
//     </>
//   );
// };
// ```
//
// 📱 ADD PERFORMANCE OPTIMIZATION:
// ```javascript
// import { memo } from 'react';
// 
// export const BasePlayer = memo(({ size = 1, color = "#00ff00", geometry = 'box' }) => {
//   return (
//     <>
//       <mesh castShadow receiveShadow>
//         <GeometryRenderer geometry={geometry} size={size} />
//         <meshStandardMaterial color={color} />
//       </mesh>
//       <mesh position={[0, 0.1, 1.5]} rotation={[-Math.PI / 2, -Math.PI, Math.PI]} castShadow>
//         <coneGeometry args={[0.1, 0.3, 8]} />
//         <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} transparent opacity={0.7} />
//       </mesh>
//     </>
//   );
// });
// ```
//
// 🔊 REMOVE DIRECTION INDICATOR:
// ```javascript
// export const BasePlayer = ({ size = 1, color = "#00ff00", geometry = 'box', showDirection = true }) => {
//   return (
//     <>
//       <mesh castShadow receiveShadow>
//         <GeometryRenderer geometry={geometry} size={size} />
//         <meshStandardMaterial color={color} />
//       </mesh>
//       
//       {showDirection && (
//         <mesh position={[0, 0.1, 1.5]} rotation={[-Math.PI / 2, -Math.PI, Math.PI]} castShadow>
//           <coneGeometry args={[0.1, 0.3, 8]} />
//           <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} transparent opacity={0.7} />
//         </mesh>
//       )}
//     </>
//   );
// };
// ```
// ============================================================================

import React from "react";
import { GeometryRenderer } from "./GeometryRenderer";

/**
 * 🧑‍🚀 BASE PLAYER MODEL COMPONENT - Fallback Player Geometry with Direction Indicator
 * ===================================================================================
 *
 * @description Composite fallback renderer for player character when GLTF models are unavailable
 * @param {number} size - Main body geometry size for shape dimensions (default: 1)
 * @param {string} color - Main body material color as hex string (default: "#00ff00")
 * @param {string} geometry - Main body shape type ('box', 'sphere', 'cylinder', 'cone') with 'box' default
 * @returns {JSX.Element} Fragment containing main body mesh and direction indicator cone
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Render fallback player body geometry when GLTF models are unavailable
 * - Create directional indicator to show which way player is facing
 * - Apply shadow casting and receiving for both body and indicator
 * - Provide visual distinction between player body and facing direction
 *
 * 📦 COMPOSITE STRUCTURE:
 * - Main Body: Configurable geometry (box/sphere/cylinder/cone) with theme color
 * - Direction Indicator: Fixed white cone positioned in front of player
 * - Shadow Support: Both meshes cast and receive shadows for lighting
 * - Material Properties: Standard materials with proper lighting response
 *
 * 🧭 DIRECTION INDICATOR SPECIFICATIONS:
 * - Position: [0, 0.1, 1.5] (slightly above center, 1.5 units forward)
 * - Rotation: [-π/2, -π, π] (oriented to point forward relative to player)
 * - Geometry: Small cone (radius: 0.1, height: 0.3, segments: 8)
 * - Material: White with emissive glow, semi-transparent (opacity: 0.7)
 *
 * 🎨 VISUAL PROPERTIES:
 * - Main Body: Theme-configurable geometry, color, and size
 * - Direction Cone: Fixed white cone with emissive glow
 * - Shadows: Both meshes participate in shadow casting/receiving
 * - Materials: meshStandardMaterial for consistent lighting response
 *
 * 🚀 USAGE PATTERNS:
 * - Classic Theme: Uses BasePlayer with box/sphere geometry and theme colors
 * - GLTF Themes: Uses BasePlayer only when model loading fails
 * - Development: Useful for testing player mechanics without requiring 3D models
 * - Performance: Lighter rendering when 3D models are too complex
 */
export const BasePlayer = ({ size = 1, color = "#00ff00", geometry = 'box' }) => {
  return (
    <>
      {/* 🧑‍🚀 MAIN PLAYER BODY - Configurable geometry with theme-based appearance */}
      <mesh castShadow receiveShadow>
        <GeometryRenderer geometry={geometry} size={size} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* 🧭 DIRECTION INDICATOR - Fixed white cone showing player facing direction */}
      <mesh
        position={[0, 0.1, 1.5]}                    // Slightly above center, in front of player
        rotation={[-Math.PI / 2, -Math.PI, Math.PI]} // Oriented to point forward
        castShadow
      >
        <coneGeometry args={[0.1, 0.3, 8]} />       // Small cone (radius, height, segments)
        <meshStandardMaterial
          color="#ffffff"                             // White base color
          emissive="#ffffff"                          // White emissive glow
          emissiveIntensity={0.3}                    // Subtle glow intensity
          transparent                                 // Enable transparency
          opacity={0.7}                              // Semi-transparent
        />
      </mesh>
    </>
  );
};
