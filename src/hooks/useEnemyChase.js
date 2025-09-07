import { useFrame } from "@react-three/fiber";

export const useEnemyChase = (api, position, speed, playerPosition, gameState) => {

  useFrame((_, delta) => {
    if (gameState !== "playing") return;

    const dirX = playerPosition[0] - position[0];
    const dirZ = playerPosition[2] - position[2];
    const distance = Math.sqrt(dirX * dirX + dirZ * dirZ);
    if (distance === 0) return;

    const nx = dirX / distance;
    const nz = dirZ / distance;

    api.velocity.set(nx * speed, 0, nz * speed);

    position[0] += nx * speed * delta;
    position[2] += nz * speed * delta;
  });
};
