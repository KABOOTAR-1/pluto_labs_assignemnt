import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export const useEnemyAttack = (
  position,
  size,
  damage,
  playerPosition,
  gameState,
  onPlayerDamage
) => {
  const lastAttack = useRef(0);

  useFrame(() => {
    if (gameState !== "playing") return;

    const dx = playerPosition[0] - position[0];
    const dz = playerPosition[2] - position[2];
    const distance = Math.sqrt(dx * dx + dz * dz);

    if (distance < size + 1) {
      const now = Date.now();
      if (now - lastAttack.current > 500) {
        lastAttack.current = now;
        onPlayerDamage(damage);
      }
    }
  });
};
