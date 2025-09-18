import React, { useEffect } from "react";
import { useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { EXRLoader } from "three-stdlib";

const Skybox = ({ texturePath }) => {
  const { scene } = useThree();
  const safeTexturePath = texturePath || "";
  const skyboxTexture = useLoader(EXRLoader, safeTexturePath);

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
