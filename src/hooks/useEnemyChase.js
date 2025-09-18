import { useFrame } from "@react-three/fiber";

export const useEnemyChase = (api, position, speed, playerPosition, gameState) => {
  useFrame(() => {
    if (gameState !== "playing") return;
    //console.log("Enemy chasing player:", position, playerPosition);
    const dirX = playerPosition[0] - position[0];
    const dirZ = playerPosition[2] - position[2];
    const distance = Math.sqrt(dirX * dirX + dirZ * dirZ);
    if (distance === 0)
      { 
        api.velocity.set(0, 0, 0);
        return};

    const nx = dirX / distance;
    const nz = dirZ / distance;
    api.velocity.set(nx * speed, 0, nz * speed);
  });
};
