import React from "react";
import { GLTFModel } from "./GLTFLoader";

export function BaseModel({ url = null, fallbackComponent, size = 1, color = "#00ff00", rotation = [0, 0, 0], scale = [1, 1, 1], fallbackGeometry = 'box' }) {
  if (url) {
    return <GLTFModel url={url} rotation={rotation} scale={scale} />;
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
