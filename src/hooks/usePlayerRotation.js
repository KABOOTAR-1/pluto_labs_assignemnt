import { useFrame } from "@react-three/fiber";
import { GAME_STATES } from "../config/gameConfig";
import { useMouseControls } from "../hooks/useMouseControls";

export const usePlayerRotation = (api, gameState, onRotationChange) => {
  const { mousePosition } = useMouseControls();

  useFrame(() => {
    if (gameState !== GAME_STATES.PLAYING || !mousePosition) return;

    const angle = Math.atan2(mousePosition.x, mousePosition.z);
    onRotationChange(angle);
    api.rotation.set(0, angle, 0);
  });
};
