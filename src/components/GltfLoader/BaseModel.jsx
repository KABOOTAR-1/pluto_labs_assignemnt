import React from "react";
import { GLTFModel } from "./GLTFLoader";

/**
 * BaseModel Component - Renders 3D models with fallback options
 *
 * This component provides a unified interface for loading GLTF models with automatic
 * fallback to primitive geometries when models aren't available or fail to load.
 *
 * @param {string} url - Path to GLTF model file (if null, uses fallback)
 * @param {string} textureUrl - Path to texture file for the model
 * @param {React.Component} fallbackComponent - Custom fallback component to use
 * @param {number} modelSize - Size of the fallback geometry in world units (default: 1)
 * @param {string} color - Hex color for fallback geometry (default: "#00ff00")
 * @param {Array<number>} rotation - Rotation as [x, y, z] in radians (default: [0, 0, 0])
 * @param {Array<number>} scale - Scale as [x, y, z] multipliers (default: [1, 1, 1])
 * @param {string} fallbackGeometry - Type of fallback geometry: 'box', 'sphere', etc. (default: 'box')
 * @param {boolean} centerModel - Whether to center the loaded model (default: true)
 */
export function BaseModel({ url = null, textureUrl, fallbackComponent, modelSize = 1, color = "#00ff00", rotation = [0, 0, 0], scale = [1, 1, 1], fallbackGeometry = 'box', centerModel = true }) {
  // If a GLTF model URL is provided, load and render the 3D model
  if (url) {
    return <GLTFModel url={url} textureUrl={textureUrl} rotation={rotation} scale={scale} centerModel={centerModel} />;
  }

  // If a custom fallback component is provided, use it with the specified properties
  if (fallbackComponent) {
    return React.createElement(fallbackComponent, { size: modelSize, color, geometry: fallbackGeometry });
  }

  // Default fallback: render a simple colored box geometry
  return (
    <>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[modelSize, modelSize, modelSize]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
}

// useGLTF.preload("/models/player.glb");
