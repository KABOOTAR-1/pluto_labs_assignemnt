// ============================================================================
// 🎭 BASE MODEL COMPONENT - Universal 3D Model Loader with Fallback System
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is a routing component that selects between GLTF models, custom components, or default geometry
// ✅ BaseModel itself only does conditional rendering and prop forwarding
// ✅ Actual GLTF loading, texture loading, scaling, centering is handled by GLTFModel child component
// ✅ Provides consistent interface for all entity types but delegates actual work to child components
//
// 📊 WHAT BASEMODEL ACTUALLY DOES:
// - Conditional rendering: if (url) → GLTFModel, else if (fallbackComponent) → React.createElement, else → default box
// - Prop forwarding: passes url, textureUrl, rotation, scale, centerModel to GLTFModel unchanged
// - Dynamic component creation: uses React.createElement() for custom fallback components
// - Default box rendering: creates mesh with boxGeometry, meshStandardMaterial, castShadow, receiveShadow
// - Prop mapping: maps modelSize→size, fallbackGeometry→geometry for custom components
//
// 📊 WHAT CHILD COMPONENTS DO (NOT BASEMODEL):
// - GLTF loading: handled by GLTFModel component
// - Texture loading: handled by useConditionalTexture hook in GLTFModel
// - Model centering: handled by GLTFModel component  
// - Model scaling: handled by GLTFModel component
// - Shadow handling for GLTF: handled by GLTFModel component
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎨 VISUAL CUSTOMIZATION:
// ADD NEW:
// - Add animation support for GLTF models (idle, walk, attack animations)
// - Include particle effects around models (auras, trails, magic effects)
// - Add dynamic lighting effects (glowing materials, emissive textures)
// - Include model LOD (Level of Detail) system for performance optimization
// - Add model outline/selection highlighting for UI feedback
// - Include weather effects integration (snow, rain on models)
//
// MODIFY EXISTING:
// - Change default fallback from box to sphere, cylinder, or custom shape
// - Update default color scheme for better theme integration
// - Modify shadow settings (castShadow, receiveShadow) for lighting optimization
// - Change model scaling behavior for different entity types (scaling handled by GLTFModel, not BaseModel)
// - Update texture loading to support multiple textures (diffuse, normal, etc.)
//
// 🎮 FUNCTIONAL MODIFICATIONS:
// ADD NEW:
// - Add model caching system to prevent duplicate GLTF loading
// - Implement model preloading for smoother gameplay experience
// - Add model variant system (different models for same entity type)
// - Include model damage states (pristine, damaged, destroyed visuals)
// - Add model customization system (colors, accessories, modifications)
// - Implement model physics shape generation from GLTF geometry
//
// MODIFY EXISTING:
// - Change fallback priority (try custom component before default box)
// - Update model loading error handling and retry mechanisms
// - Modify centering behavior for specific model types
// - Change texture application logic for different material types
// - Update scaling calculations for consistent entity sizing
//
// 📱 RENDERING MODES & FALLBACK SYSTEM:
// PRIORITY ORDER (highest to lowest):
// 1. GLTF Model Loading (url provided) → GLTFModel component
// 2. Custom Fallback Component (fallbackComponent provided) → React.createElement
// 3. Default Box Geometry (no url, no custom component) → Basic mesh
//
// 🔄 STATE MANAGEMENT:
// - url: GLTF model file path (null triggers fallback mode)
// - textureUrl: Texture file path for model materials
// - fallbackComponent: Custom React component for non-GLTF rendering
// - modelSize: Uniform size for fallback geometries
// - color: Fallback geometry color and material properties
// - rotation: Model orientation in 3D space
// - scale: Model scaling factors for size adjustment
// - fallbackGeometry: Geometry type for fallback rendering
// - centerModel: Model positioning and centering behavior
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/components/GltfLoader/GLTFLoader.jsx: Core GLTF loading and processing
// - src/hooks/useConditionalTexture.js: Texture loading and Vite URL resolution
// - src/components/baseModel/BasePlayerModel.jsx: Player-specific fallback component
// - src/components/baseModel/BaseEnemyModel.jsx: Enemy-specific fallback component
// - src/components/baseModel/GeometryRenderer.jsx: Dynamic geometry generation
// - src/config/themes/themes.js: Model URLs and theme configurations
//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASES:
// ============================================================================
//
// 📝 ADD NEW MODEL TYPE:
// 1. Add model URL to theme configuration in themes.js
// 2. Create custom fallback component if needed
// 3. Use BaseModel in entity component with theme-specific props
// 4. Test fallback rendering when model file is missing
//
// 🎮 ADD MODEL ANIMATIONS:
// 1. Modify GLTFModel to extract and play animations
// 2. Add animation state props to BaseModel interface
// 3. Update parent components to control animation states
// 4. Implement animation blending for smooth transitions
//
// 🎨 ADD CUSTOM FALLBACK:
// 1. Create new component in baseModel/ directory
// 2. Import and pass as fallbackComponent prop
// 3. Ensure component accepts size, color, geometry props
// 4. Test rendering when GLTF model is unavailable
//
// 📱 ADD MODEL VARIANTS:
// 1. Extend url prop to accept array of model URLs
// 2. Add variant selection logic in component
// 3. Update theme configurations with variant options
// 4. Implement variant switching based on game state


import React from "react";
import { GLTFModel } from "./GLTFLoader";
import { GeometryRenderer } from "../baseModel/GeometryRenderer";

/**
 * 🎭 BASE MODEL COMPONENT - Universal 3D Model Loader with Fallback System
 * =======================================================================
 *
 * @description Universal 3D model loading system with three-tier fallback for game entities
 * @param {string|null} url - Path to GLTF model file (null triggers fallback mode)
 * @param {string} textureUrl - Path to texture file for model materials
 * @param {React.Component} fallbackComponent - Custom fallback component for non-GLTF rendering
 * @param {number} modelSize - Uniform size for fallback geometries (default: 1)
 * @param {string} color - Hex color for fallback geometry materials (default: "#00ff00")
 * @param {Array<number>} rotation - Model orientation as [x, y, z] in radians (default: [0, 0, 0])
 * @param {Array<number>} scale - Model scaling factors as [x, y, z] multipliers (default: [1, 1, 1])
 * @param {string} fallbackGeometry - Geometry type for fallback rendering ('box', 'sphere', etc.)
 * @param {boolean} centerModel - Whether to center loaded models at origin (default: true)
 * @param {number} desiredSize - Maximum dimension for GLTF auto-scaling (default: 1)
 * @returns {JSX.Element} GLTF model, custom fallback component, or default box geometry
 *
 * 🎯 COMPONENT PURPOSE:
 * - Provides unified interface for loading 3D models across all game entities
 * - Ensures entities always have visual representation (graceful degradation)
 * - Receives theme-specific model URLs with consistent fallback behavior
 * - Forwards texture URLs to GLTFModel for processing (does not handle texture loading)
 * - Supports both development (fallback) and production (GLTF) workflows
 *
 * 🔄 THREE-TIER FALLBACK SYSTEM:
 * 1. GLTF Model Loading (url provided):
 *    - Loads and renders GLTF model via GLTFModel component
 *    - Applies textures, centering, scaling, and rotation
 *    - Handles model cloning and material updates
 *    - Provides full 3D model experience with animations
 *
 * 2. Custom Fallback Component (fallbackComponent provided):
 *    - Creates custom React component via React.createElement
 *    - Passes size, color, geometry props to custom component
 *    - Allows entity-specific fallback rendering (BasePlayerModel, BaseEnemyModel)
 *    - Maintains visual consistency with game theme
 *
 * 3. Default Box Geometry (no url, no custom component):
 *    - Renders simple colored box with standard material
 *    - Ensures entity is always visible in game world
 *    - Provides basic shadow casting and receiving
 *    - Serves as final fallback for development and debugging
 *
 * 🎨 INTEGRATION WITH GLTF SYSTEM:
 * - GLTFModel: Handles GLTF loading via useGLTF from @react-three/drei
 * - useConditionalTexture: Manages texture loading with Vite compatibility
 * - Model Centering: Automatic centering using THREE.Box3 calculations
 * - Model Scaling: Smart scaling based on bounding box dimensions
 * - Material Updates: Dynamic texture application to all model materials
 *
 * 🚀 USAGE PATTERNS:
 * - Player Rendering: BaseModel with player GLTF and BasePlayerModel fallback
 * - Enemy Rendering: BaseModel with enemy GLTF and BaseEnemyModel fallback
 * - Object Rendering: BaseModel with object GLTF and custom geometry fallback
 * - Development: BaseModel with null URL for immediate geometric fallback
 * - Theme Switching: Parent components pass theme-specific URLs to BaseModel
 */
export function BaseModel({ 
  url = null, 
  textureUrl, 
  fallbackComponent, 
  modelSize = 1, 
  color = "#00ff00", 
  rotation = [0, 0, 0], 
  scale = [1, 1, 1], 
  fallbackGeometry = 'box', 
  centerModel = true,
  desiredSize = 1  // Maximum dimension for GLTF auto-scaling
}) {
  // 🎭 TIER 1: GLTF MODEL LOADING
  // If a GLTF model URL is provided, load and render the full 3D model
  if (url) {
    return (
      <GLTFModel 
        url={url}                    // GLTF file path for model loading
        textureUrl={textureUrl}      // Optional texture for material override
        rotation={rotation}          // Model orientation in 3D space
        scale={scale}               // Model scaling factors
        centerModel={centerModel}   // Whether to center model at origin
        desiredSize={desiredSize}   // Maximum dimension for auto-scaling
      />
    );
  }

  // 🎨 TIER 2: CUSTOM FALLBACK COMPONENT
  // If a custom fallback component is provided, use it with specified properties
  if (fallbackComponent) {
    return (
      <group scale={scale} rotation={rotation}>
        {React.createElement(fallbackComponent, { 
          size: modelSize,              // Uniform size for fallback geometry
          color,                        // Color for fallback materials
          geometry: fallbackGeometry    // Geometry type for fallback rendering
        })}
      </group>
    );
  }

  // 📦 TIER 3: DEFAULT GEOMETRY FALLBACK
  // Final fallback: render geometry based on fallbackGeometry prop to ensure entity visibility
  return (
    <group scale={scale} rotation={rotation}>
      <mesh castShadow receiveShadow>
        {/* 📐 DYNAMIC GEOMETRY - Uses GeometryRenderer for various shapes */}
        <GeometryRenderer geometry={fallbackGeometry} size={modelSize} />

        {/* 🎨 DEFAULT MATERIAL - Standard material with specified color */}
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

// 🚀 MODEL PRELOADING CONFIGURATION
// Uncomment and modify for specific models that should be preloaded
// useGLTF.preload("/models/player.glb");
// useGLTF.preload("/models/enemy1.glb");
// useGLTF.preload("/models/enemy2.glb");
