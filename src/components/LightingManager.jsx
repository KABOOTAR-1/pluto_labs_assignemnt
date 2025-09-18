import React from 'react';
import { useCurrentEnvironment } from '../config/gameConfig';

const LightingManager = () => {
  const currentEnvironment = useCurrentEnvironment();

  return (
    <>
      {/* Ambient Light */}
      <ambientLight
        color={currentEnvironment.lighting?.ambient?.color || 0x404040}
        intensity={currentEnvironment.lighting?.ambient?.intensity || 0.5}
      />

      {/* Directional Lights */}
      {currentEnvironment.lighting?.directional && (
        Array.isArray(currentEnvironment.lighting.directional) ? (
          currentEnvironment.lighting.directional.map((light, index) => (
            <directionalLight
              key={`directional-${index}`}
              color={light.color}
              intensity={light.intensity}
              position={light.position}
              castShadow={index === 0} // Only first directional light casts shadows
              shadow-mapSize={[2048, 2048]}
              shadow-camera-left={-20}
              shadow-camera-right={20}
              shadow-camera-top={20}
              shadow-camera-bottom={-20}
            />
          ))
        ) : (
          <directionalLight
            color={currentEnvironment.lighting.directional.color}
            intensity={currentEnvironment.lighting.directional.intensity}
            position={currentEnvironment.lighting.directional.position}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
        )
      )}

      {/* Point Lights */}
      {currentEnvironment.lighting?.point && currentEnvironment.lighting.point.map((light, index) => (
        <pointLight
          key={`point-${index}`}
          color={light.color}
          intensity={light.intensity}
          position={light.position}
          distance={light.distance}
        />
      ))}
    </>
  );
};

export default LightingManager;