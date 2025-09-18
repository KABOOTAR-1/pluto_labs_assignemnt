import React from "react";
import { GLTFModel } from "./GLTFLoader";

export function BaseModel({ url = null, textureUrl, fallbackComponent, size = 1, color = "#00ff00", rotation = [0, 0, 0], scale = [1, 1, 1], fallbackGeometry = 'box', centerModel = true }) {
  if (url) {
    return <GLTFModel url={url} textureUrl={textureUrl} rotation={rotation} scale={scale} centerModel={centerModel} />;
  }

  if (fallbackComponent) {
    return React.createElement(fallbackComponent, { size, color, geometry: fallbackGeometry });
  }
  return (
    <>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
}

// useGLTF.preload("/models/player.glb");
