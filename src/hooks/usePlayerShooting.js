import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { gameConfig, GAME_STATES } from "../config/gameConfig";
import { useKeyControls } from "../hooks/useKeyControls";

export const usePlayerShooting = (playerPosition, playerRotation, gameState, projectileType, onShoot, fireRate = gameConfig.player.fireRate) => {
  const { space } = useKeyControls();

  const lastShot = useRef(0);

  useFrame(() => {
    if (gameState !== GAME_STATES.PLAYING || !space) return;

    const now = Date.now();
    const fireDelay = 1000 / fireRate;

    if (now - lastShot.current > fireDelay) {
      const projectileData = {
        type: projectileType.id,
        position: [...playerPosition],
        direction: [Math.sin(playerRotation), 0, Math.cos(playerRotation)],
        speed: projectileType.speed,
        size: projectileType.size,
        damage: projectileType.damage,
        color: projectileType.color,
      };

      onShoot(projectileData);
      lastShot.current = now;
    }
  });
};
