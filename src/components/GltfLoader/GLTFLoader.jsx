import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useState, useEffect } from "react";

export const GLTFModel = ({
  url,
  rotation = [0, 0, 0],
  desiredSize = 1 // max dimension you want
}) => {
  const { scene, error } = useGLTF(url);
  const [clonedScene, setClonedScene] = useState(null);

  useEffect(() => {
    if (scene && !clonedScene) {
      try {
        const clone = scene.clone();
        setClonedScene(clone);
      } catch (err) {
        console.error("Error cloning GLTF scene:", err);
      }
    }
  }, [scene, clonedScene]);

  // Compute scale only once per model
  const scale = useMemo(() => {
    if (!clonedScene) return [1, 1, 1];
    try {
      const box = new THREE.Box3().setFromObject(clonedScene);
      const size = new THREE.Vector3();
      box.getSize(size);
      console.log("Model size:", size);

      // Use Math.max to find the largest dimension
      const maxDim = Math.max(size.x, size.y, size.z);
      const s = desiredSize / maxDim;

      return [s, s, s];
    } catch (err) {
      console.error("Error computing scale:", err);
      return [1, 1, 1];
    }
  }, [clonedScene, desiredSize]);

  if (error) {
    console.error("GLTF loading error:", error);
    return null;
  }

  if (!clonedScene) {
    return null; // Don't render anything while loading
  }

  return (
    <primitive
      object={clonedScene}
      rotation={rotation}
      scale={scale}
      castShadow
      receiveShadow
    />
  );
};
