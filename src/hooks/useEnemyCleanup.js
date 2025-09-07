import { useFrame } from "@react-three/fiber";

export const useEnemyCleanup = (
  position,
  id,
  onRemove
) => {
  useFrame(() => {
    if (Math.abs(position[0]) > 100 || Math.abs(position[2]) > 100) {
      onRemove(id);
    }
  });
};
