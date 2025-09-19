import React, { useEffect } from "react";
import { useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { EXRLoader } from "three-stdlib";

/**
 * 🌌 SKYBOX COMPONENT - HDR Environment Renderer
 * ============================================
 *
 * 🎯 WHAT THIS COMPONENT DOES:
 * ✅ Loads and displays 360° skybox environments from texture files
 * ✅ Supports both HDR (.exr/.hdr) and standard (.jpg/.png) formats
 * ✅ Automatically detects file type and uses appropriate loader
 * ✅ Sets up both scene background and environment for reflections
 * ✅ Handles texture cleanup and memory management
 *
 * 🔄 LOADING STRATEGY:
 * - **HDR Files (.exr/.hdr)**: Use EXRLoader for high-quality reflections
 * - **Standard Images**: Use TextureLoader for regular skyboxes
 * - **Automatic Detection**: File extension determines loader type
 *
 * 🎨 VISUAL FEATURES:
 * - Equirectangular projection for 360° coverage
 * - Environment mapping for realistic reflections
 * - Seamless integration with scene lighting
 * - Theme-specific skybox support
 *
 * ⚡ PERFORMANCE FEATURES:
 * - Lazy loading with useLoader hook
 * - Automatic texture disposal on unmount
 * - Memory cleanup to prevent leaks
 * - Efficient format detection
 *
 * @param {string} texturePath - URL/path to skybox texture file
 */
const Skybox = ({ texturePath }) => {
  // 🎬 SCENE ACCESS - Get Three.js scene for background/environment setup
  const { scene } = useThree();

  // 🛡️ SAFE PATH - Ensure we have a valid texture path or empty string
  const safeTexturePath = texturePath || "";

  // 🔍 FORMAT DETECTION - Choose loader based on file extension
  const isHDR = safeTexturePath.toLowerCase().endsWith('.exr') || safeTexturePath.toLowerCase().endsWith('.hdr');
  const Loader = isHDR ? EXRLoader : THREE.TextureLoader;

  // 📥 TEXTURE LOADING - Load skybox texture with appropriate loader
  const skyboxTexture = useLoader(Loader, safeTexturePath);

  useEffect(() => {
    // 🛡️ VALIDATION - Ensure we have both texture path and loaded texture
    if (!texturePath || !skyboxTexture) return;

    // 🔄 TEXTURE SETUP - Configure for equirectangular environment mapping
    skyboxTexture.mapping = THREE.EquirectangularReflectionMapping;

    // 🌌 SCENE APPLICATION - Set as both background and environment
    scene.background = skyboxTexture;    // Visual skybox background
    scene.environment = skyboxTexture;   // Reflection environment for materials

    // 🧹 CLEANUP FUNCTION - Remove texture and dispose when component unmounts
    return () => {
      // Remove from scene if it's still assigned to this texture
      if (scene.background === skyboxTexture) scene.background = null;
      if (scene.environment === skyboxTexture) scene.environment = null;
      // Free GPU memory
      skyboxTexture.dispose();
    };
  }, [skyboxTexture, scene, texturePath]);

  // 👁️ NO RENDER - This component only sets up scene properties, renders nothing
  return null;
};

export default Skybox;
