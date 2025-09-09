import { useFrame } from "@react-three/fiber";

export const useEnemyCleanup = (
  position,
  id,
  onRemove
) => {
  useFrame(() => {
    if (Math.abs(position[0]) > 40 || Math.abs(position[2]) > 40) {
      onRemove(id);
    }
  });
};
