// ============================================================================
// 🎭 GLTF LOADER COMPONENT - Advanced 3D Model Loading and Processing
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is the actual GLTF loading specialist that does all the heavy lifting
// ✅ Handles GLTF file loading, texture application, model centering, and smart scaling
// ✅ Uses scene cloning for safe model reuse without affecting original GLTF data
// ✅ Integrates with useConditionalTexture for Vite-compatible texture loading
// ✅ Provides automatic model sizing and positioning for consistent game presentation
//
// 📊 WHAT GLTFLOADER ACTUALLY DOES:
// - GLTF file loading: uses useGLTF hook from @react-three/drei
// - Scene cloning: creates safe copies of loaded models with scene.clone()
// - Model centering: calculates and applies center positioning using THREE.Box3
// - Smart scaling: computes optimal scale based on model dimensions, then multiplies with provided scale
// - Texture loading: optional texture override (most GLTF models already have textures)
// - Material updates: traverses model and applies override textures if provided
// - Error handling: manages GLTF loading failures by returning null (no fallback)
// - Shadow configuration: applies castShadow and receiveShadow to rendered models
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎨 VISUAL CUSTOMIZATION:
// ADD NEW:
// - Add animation support by extracting and playing GLTF animations
// - Include model preloading with useGLTF.preload() for smoother experience
// - Add custom model caching (note: useGLTF already provides internal caching)
// - Include multiple texture support (diffuse, normal, roughness maps)
// - Add model variant loading based on URL patterns
// - Include lighting optimization for different model types
//
// 🎮 FUNCTIONAL MODIFICATIONS:
// ADD NEW:
// - Add model damage states by modifying materials based on health
// - Implement model LOD (Level of Detail) based on camera distance
// - Add model outline/selection highlighting for UI interactions
// - Include model physics shape generation from GLTF geometry
// - Add model validation and sanitization for security
// - Implement model streaming for large files
//
// MODIFY EXISTING:
// - Change cloning behavior to share materials for performance
// - Update scaling to maintain aspect ratios differently
// - Modify centering to use different anchor points (bottom, top, center)
// - Change texture loading to support texture atlases
// - Update material processing to handle PBR materials differently
//
// 📱 PERFORMANCE & OPTIMIZATION:
// ADD NEW:
// - Add geometry optimization and simplification for performance
// - Include texture compression and format optimization
// - Add model instancing for repeated models
// - Include memory management and cleanup for large scenes
// - Add progressive loading for complex models
// - Implement model culling based on visibility
//
// MODIFY EXISTING:
// - Optimize scene traversal for material updates
// - Change cloning strategy to reduce memory usage
// - Update texture loading to use compressed formats
// - Modify scaling calculations to be more efficient
// - Cache bounding box calculations to avoid recalculating on each render
//
// 🔄 STATE MANAGEMENT:
// - scene: Original GLTF scene loaded by useGLTF hook
// - error: GLTF loading error state from useGLTF hook
// - texture: Loaded texture from useConditionalTexture hook
// - clonedScene: Safe copy of original scene for manipulation
// - computedScale: Calculated scale based on model dimensions
// - finalScale: Either provided scale or computed scale
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/hooks/useConditionalTexture.js: Texture loading with Vite URL resolution
// - src/components/GltfLoader/BaseModel.jsx: Parent router that delegates to this component
// - src/config/themes/themes.js: Model URLs and texture paths for different themes
//
// ⚠️ IMPORTANT NOTES:
// - Scene cloning prevents shared state issues between model instances
// - Model centering affects physics body alignment in parent components
// - Smart scaling ensures consistent entity sizes regardless of original model size
// - Texture override is optional and independent of model loading (most models don't need it)
// - Material traversal handles both single materials and material arrays
// - Error states return null (no fallback rendering - fallback handled by parent BaseModel)
// - Loading states return null to prevent rendering incomplete models


import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useState, useEffect } from "react";
import { useConditionalTexture } from "../../hooks/useConditionalTexture";

/**
 * 🎭 GLTF MODEL COMPONENT - Advanced 3D Model Loading and Processing
 * ================================================================
 *
 * @description Specialized component for loading, processing, and rendering GLTF 3D models
 * @param {string} url - Path to GLTF model file (.glb or .gltf)
 * @param {string} textureUrl - Optional path to texture file for material override
 * @param {Array<number>} rotation - Model rotation as [x, y, z] in radians (default: [0, 0, 0])
 * @param {Array<number>} scale - Model scale as [x, y, z] multipliers (default: [1, 1, 1])
 * @param {number} desiredSize - Maximum dimension for auto-scaling (default: 1)
 * @param {boolean} centerModel - Whether to center model at origin (default: true)
 * @returns {JSX.Element|null} Three.js primitive with processed GLTF model or null if loading/error
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Load GLTF files using useGLTF hook from @react-three/drei
 * - Create safe scene clones to prevent shared state issues
 * - Calculate and apply model centering using bounding box math
 * - Compute smart scaling based on model dimensions vs desired size
 * - Optionally override model textures (most GLTF models already have built-in textures)
 * - Handle loading states and error conditions (returns null on error/loading)
 * - Render final model with shadows and proper positioning
 *
 * 🔄 MODEL PROCESSING PIPELINE:
 * 1. GLTF Loading: useGLTF loads model file asynchronously
 * 2. Scene Cloning: Safe copy created to prevent original modification
 * 3. Model Centering: Bounding box calculated and model positioned at origin
 * 4. Texture Loading: useConditionalTexture loads optional texture override if provided
 * 5. Material Updates: Override texture applied to all materials if textureUrl provided
 * 6. Scale Calculation: Smart scaling computed based on desired size
 * 7. Final Rendering: Model rendered with computed properties and shadows
 *
 * 🎨 SMART SCALING SYSTEM:
 * - Measures model bounding box to find largest dimension
 * - Calculates scale factor: desiredSize / maxDimension
 * - Combines provided scale with computed scale (finalScale = computedScale * providedScale)
 * - Ensures consistent entity sizes regardless of original model dimensions
 * - Maintains model proportions while fitting within desired bounds
 *
 * 🚀 USAGE PATTERNS:
 * - Player Models: GLTFModel with player GLTF (usually no texture override needed)
 * - Enemy Models: GLTFModel with enemy GLTF (may use textureUrl for theme variations)
 * - Environment Objects: GLTFModel with object GLTF (typically uses built-in textures)
 * - Weapon Models: GLTFModel with weapon GLTF (may override for damage/upgrade states)
 */
export const GLTFModel = ({
  url,
  textureUrl,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  desiredSize = 1, // max dimension you want
  centerModel = true // whether to center the model
}) => {
  // 🔄 GLTF LOADING - Load model file using @react-three/drei hook
  const { scene, error } = useGLTF(url);
  
  // 🎨 TEXTURE LOADING - Load optional texture using custom hook with Vite support
  const { texture } = useConditionalTexture(textureUrl);
  
  // 🎭 SCENE STATE - Safe cloned copy for manipulation without affecting original
  const [clonedScene, setClonedScene] = useState(null);

  // 🎯 SCENE CLONING AND CENTERING - Create safe copy and position model
  useEffect(() => {
    if (scene && !clonedScene) {
      try {
        // 🔄 SAFE CLONING - Create independent copy to prevent shared state issues
        const clone = scene.clone();

        if (centerModel) {
          // 📐 MODEL CENTERING - Calculate bounding box and center at origin
          const box = new THREE.Box3().setFromObject(clone);
          const center = new THREE.Vector3();
          box.getCenter(center);
          clone.position.sub(center); // Move the model so its center is at (0,0,0)
        }

        setClonedScene(clone);
      } catch (err) {
        console.error("Error cloning GLTF scene:", err);
      }
    }
  }, [scene, clonedScene, url, centerModel]);

  // 🎨 OPTIONAL TEXTURE OVERRIDE - Apply texture override if provided (most GLTF models already have textures)
  useEffect(() => {
    if (clonedScene && texture) {
      // 🔍 MATERIAL TRAVERSAL - Walk through model hierarchy to override existing textures
      clonedScene.traverse((child) => {
        if (child.isMesh && child.material) {
          // 🎨 TEXTURE OVERRIDE - Replace existing textures with provided override
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              mat.map = texture; // Override existing texture
              mat.needsUpdate = true;
            });
          } else {
            child.material.map = texture; // Override existing texture
            child.material.needsUpdate = true;
          }
        }
    });
    }
  }, [clonedScene, texture]);

  // 📏 SMART SCALING - Compute optimal scale based on model dimensions
  const computedScale = useMemo(() => {
    if (!clonedScene) return [1, 1, 1];
    try {
      // 📐 BOUNDING BOX CALCULATION - Measure model dimensions
      const box = new THREE.Box3().setFromObject(clonedScene);
      const size = new THREE.Vector3();
      box.getSize(size);

      // 🎯 SCALE CALCULATION - Find largest dimension and compute scale factor
      const maxDim = Math.max(size.x, size.y, size.z);
      const s = desiredSize / maxDim;

      return [s, s, s]; // Uniform scaling to maintain proportions
    } catch (err) {
      console.error("Error computing scale:", err);
      return [1, 1, 1];
    }
  }, [clonedScene, desiredSize]);

  // ⚖️ FINAL SCALE DECISION - Combine provided scale with computed scale
  const finalScale = [
    computedScale[0] * scale[0],
    computedScale[1] * scale[1], 
    computedScale[2] * scale[2]
  ];

  // 🚫 ERROR HANDLING - Return null if GLTF loading failed
  if (error) {
    console.error("GLTF loading error for", url, ":", error);
    return null;
  }

  // ⏳ LOADING STATE - Return null while model is being processed
  if (!clonedScene) {
    return null; // Don't render anything while loading
  }

  // 🎭 FINAL RENDERING - Render processed model with computed properties
  return (
    <primitive
      object={clonedScene}        // Cloned and processed model
      rotation={rotation}         // Applied rotation
      scale={finalScale}         // Smart or provided scaling
      castShadow                 // Enable shadow casting
      receiveShadow              // Enable shadow receiving
    />
  );
};

