import React from "react";
import { GLTFModel } from "./GLTFLoader";

export function BaseModel({ url = null, fallbackComponent, size = 1, color = "#00ff00" }) {
  if (url) {
    return <GLTFModel url={url} />;
  }

  if (fallbackComponent) {
    return React.createElement(fallbackComponent, { size, color });
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
