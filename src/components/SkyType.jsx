import React from 'react';
import { Sky } from '@react-three/drei';

// Sky type configurations for different times of day
const SKY_CONFIGS = {
  day: {
    sunPosition: [100, 10, 100],
    inclination: 0,
    azimuth: 0.25,
  },
  sunset: {
    sunPosition: [0, 10, -100],
    inclination: 0,
    azimuth: 0.5,
  },
  dusk: {
    sunPosition: [-50, 5, -50],
    inclination: 0,
    azimuth: 0.75,
  },
  night: {
    sunPosition: [-100, -10, -100],
    inclination: 0,
    azimuth: 1.0,
  },
  dawn: {
    sunPosition: [50, 5, 50],
    inclination: 0,
    azimuth: 0.1,
  },
};

const SkyType = ({ skyType = 'day' }) => {
  const config = SKY_CONFIGS[skyType] || SKY_CONFIGS.day;

  return (
    <Sky
      sunPosition={config.sunPosition}
      inclination={config.inclination}
      azimuth={config.azimuth}
    />
  );
};

export default SkyType;