// usePlayerCamera.js
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GAME_STATES } from "../config/gameConfig";

export const usePlayerCamera = (bodyApi, gameState, offset = { x: 0, y: 15, z: 15 }) => {
  const { camera, gl, scene } = useThree();

  const prevPos = useRef(new THREE.Vector3());
  const nextPos = useRef(new THREE.Vector3());

  const accumulator = useRef(0);
  const fixedStep = 1 / 60;

  useEffect(() => {
    const unsubscribe = bodyApi.position.subscribe(([x, y, z]) => {
      prevPos.current.copy(nextPos.current);
      nextPos.current.set(x, y, z);
    });
    return unsubscribe;
  }, [bodyApi.position]);

  useFrame((state, delta) => {
    if (gameState !== GAME_STATES.PLAYING) return;

    accumulator.current = Math.min(accumulator.current + delta, fixedStep);
    const alpha = accumulator.current / fixedStep;

    const interp = prevPos.current.clone().lerp(nextPos.current, alpha);

    camera.position.set(interp.x + offset.x, interp.y + offset.y, interp.z + offset.z);
    camera.lookAt(interp.x, interp.y + 1, interp.z);

    // Manual render
    gl.render(scene, camera);
  }, 1);
};
