import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useState, useEffect } from "react";
import { useConditionalTexture } from "../../hooks/useConditionalTexture";

export const GLTFModel = ({
  url,
  textureUrl,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  desiredSize = 1, // max dimension you want
  centerModel = true // whether to center the model
}) => {
  const { scene, error } = useGLTF(url);
  const { texture } = useConditionalTexture(textureUrl);
  const [clonedScene, setClonedScene] = useState(null);

  useEffect(() => {
    if (scene && !clonedScene) {
      try {
        const clone = scene.clone();

        if (centerModel) {
          // Center the model by adjusting its position
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

  // Apply texture to materials when both model and texture are loaded
  useEffect(() => {
    if (clonedScene && texture) {
      clonedScene.traverse((child) => {
        if (child.isMesh && child.material) {
          // Apply texture to the material
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              mat.map = texture;
              mat.needsUpdate = true;
            });
          } else {
            child.material.map = texture;
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [clonedScene, texture]);

  // Compute scale only once per model
  const computedScale = useMemo(() => {
    if (!clonedScene) return [1, 1, 1];
    try {
      const box = new THREE.Box3().setFromObject(clonedScene);
      const size = new THREE.Vector3();
      box.getSize(size);

      // Use Math.max to find the largest dimension
      const maxDim = Math.max(size.x, size.y, size.z);
      const s = desiredSize / maxDim;

      return [s, s, s];
    } catch (err) {
      console.error("Error computing scale:", err);
      return [1, 1, 1];
    }
  }, [clonedScene, desiredSize]);

  // Use provided scale or computed scale
  const finalScale = scale.every(s => s === 1) ? computedScale : scale;

  if (error) {
    console.error("GLTF loading error for", url, ":", error);
    return null;
  }

  if (!clonedScene) {
    return null; // Don't render anything while loading
  }

  return (
    <primitive
      object={clonedScene}
      rotation={rotation}
      scale={finalScale}
      castShadow
      receiveShadow
    />
  );
};
