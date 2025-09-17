import React from "react";

export const GeometryRenderer = ({ geometry = 'box', size = 1 }) => {
  switch (geometry) {
    case 'sphere':
      return <sphereGeometry args={[size / 2, 16, 16]} />;
    case 'cylinder':
      return <cylinderGeometry args={[size / 2, size / 2, size, 16]} />;
    case 'cone':
      return <coneGeometry args={[size / 2, size, 16]} />;
    case 'box':
    default:
      return <boxGeometry args={[size, size, size]} />;
  }
};