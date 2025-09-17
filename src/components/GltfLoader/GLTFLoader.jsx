import { useGLTF } from "@react-three/drei";

export const GLTFModel=({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} castShadow receiveShadow />;
}