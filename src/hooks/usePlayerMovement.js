import { useFrame } from "@react-three/fiber";
import { gameConfig } from "../config/gameConfig";
import { useKeyControls } from "../hooks/useKeyControls";

export const usePlayerMovement = (api, playerPosition, gameState) => {
  const { forward, backward, left, right } = useKeyControls();

  useFrame((_, delta) => {
    if (gameState !== "playing") return;

    const moveSpeed = gameConfig.player.speed * delta;
    let [x, , z] = playerPosition;

    if (forward) z -= moveSpeed;
    if (backward) z += moveSpeed;
    if (left) x -= moveSpeed;
    if (right) x += moveSpeed;

    api.position.set(x, 0.5, z);
  });

  //api.position.subscribe(v => setPlayerPosition(v));
};
