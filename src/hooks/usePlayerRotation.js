import { useFrame } from "@react-three/fiber";
import { useMouseControls } from "../hooks/useMouseControls";

export const usePlayerRotation = (api, gameState, onRotationChange) => {
  const { mousePosition } = useMouseControls();

  useFrame(() => {
    if (gameState !== "playing" || !mousePosition) return;

    const angle = Math.atan2(mousePosition.x, mousePosition.z);
    onRotationChange(angle);
    api.rotation.set(0, angle, 0);
  });
};
