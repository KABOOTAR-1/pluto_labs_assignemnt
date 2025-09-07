import { useFrame, useThree } from "@react-three/fiber";

export const usePlayerCamera = (playerPosition, gameState) => {
  const { camera } = useThree();

  useFrame(() => {
    if (gameState !== "playing") return;

    camera.position.set(playerPosition[0], 15, playerPosition[2] + 15);
    camera.lookAt(playerPosition[0], 0, playerPosition[2]);
  });
};
