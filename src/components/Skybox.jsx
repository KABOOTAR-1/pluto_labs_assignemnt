import React, { useEffect } from "react";
import { useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { EXRLoader } from "three-stdlib";

/**
 * Skybox Component - Supports both HDR/EXR and JPG textures
 * =========================================================
 *
 * Automatically detects file format and uses appropriate loader:
 * - .exr, .hdr files → EXRLoader (high quality, reflections)
 * - .jpg, .jpeg, .png files → TextureLoader (standard images)
 *
 * @param {string} texturePath - URL to skybox texture file
 */
const Skybox = ({ texturePath }) => {
  const { scene } = useThree();
  const safeTexturePath = texturePath || "";

  // Choose loader based on file extension
  const isHDR = safeTexturePath.toLowerCase().endsWith('.exr') || safeTexturePath.toLowerCase().endsWith('.hdr');
  const Loader = isHDR ? EXRLoader : THREE.TextureLoader;
  const skyboxTexture = useLoader(Loader, safeTexturePath);

  useEffect(() => {
    if (!texturePath || !skyboxTexture) return;

    // Use as environment + background
    skyboxTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = skyboxTexture;
    scene.environment = skyboxTexture;

    return () => {
      if (scene.background === skyboxTexture) scene.background = null;
      if (scene.environment === skyboxTexture) scene.environment = null;
      skyboxTexture.dispose();
    };
  }, [skyboxTexture, scene, texturePath]);

  return null;
};

export default Skybox;
