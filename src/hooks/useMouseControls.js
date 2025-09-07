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

      const scale = 0.02; // Adjust this value to change sensitivity
      const worldX = x * scale;
      const worldZ = y * scale;
      
      setMousePosition({ x: worldX, y: 0, z: worldZ });
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
