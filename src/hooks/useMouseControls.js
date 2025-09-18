import { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const useMouseControls = () => {
  const [mousePosition, setMousePosition] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const { camera, size } = useThree();

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Get mouse position relative to canvas center
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      const MOUSE_WORLD_SCALE = 0.02; // Adjust this value to change mouse-to-world sensitivity
      const worldPositionX = x * MOUSE_WORLD_SCALE;
      const worldPositionZ = y * MOUSE_WORLD_SCALE;

      setMousePosition({ x: worldPositionX, y: 0, z: worldPositionZ });
    };

    const handleMouseDown = () => {
      setIsMouseDown(true);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [camera, size]);

  return { mousePosition, isMouseDown };
};
