import { useFrame } from "@react-three/fiber";

export const useEnemyCleanup = (
  position,
  id,
  onRemove,
  worldBounds = { minX: -40, maxX: 40, minZ: -40, maxZ: 40 }
) => {
  useFrame(() => {
    if (position[0] < worldBounds.minX || position[0] > worldBounds.maxX ||
        position[2] < worldBounds.minZ || position[2] > worldBounds.maxZ) {
      onRemove(id);
    }
  });
};
