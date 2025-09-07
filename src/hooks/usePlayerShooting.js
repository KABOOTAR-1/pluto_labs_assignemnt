import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { gameConfig } from "../config/gameConfig";
import { useKeyControls } from "../hooks/useKeyControls";

export const usePlayerShooting = (playerPosition, playerRotation, gameState, projectileType, onShoot) => {
  const { space } = useKeyControls();

  const lastShot = useRef(0);

  useFrame(() => {
    if (gameState !== "playing" || !space) return;

    const now = Date.now();
    const fireDelay = 1000 / gameConfig.player.fireRate;

    if (now - lastShot.current > fireDelay) {
      const newProjectile = {
        id: `proj-${now}-${Math.random()}`,
        type: projectileType.id,
        position: [...playerPosition],
        direction: [Math.sin(playerRotation), 0, Math.cos(playerRotation)],
        speed: projectileType.speed,
        size: projectileType.size,
        damage: projectileType.damage,
        color: projectileType.color,
        createdAt: now,
      };

      onShoot(newProjectile);
      lastShot.current = now;
    }
  });
};
