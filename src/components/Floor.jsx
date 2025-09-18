import React from 'react';
import { gameConfig, useCurrentEnvironment } from '../config/gameConfig';
import TexturedFloor from './TexturedFloor';
import SolidFloor from './SolidFloor';

const Floor = () => {
  const currentEnvironment = useCurrentEnvironment();
  const worldSize = gameConfig.world.size;
  const groundConfig = currentEnvironment.ground || {};
  const hasTexture = groundConfig.texture && groundConfig.texture.trim() !== '';

  // Conditionally render the appropriate floor component
  return hasTexture ? (
    <TexturedFloor groundConfig={groundConfig} worldSize={worldSize} />
  ) : (
    <SolidFloor groundConfig={groundConfig} worldSize={worldSize} />
  );
};

export default Floor;
