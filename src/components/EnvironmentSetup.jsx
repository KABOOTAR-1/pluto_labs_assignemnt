import React, { Suspense } from 'react';
import { Environment } from '@react-three/drei';
import { useCurrentEnvironment } from '../config/gameConfig';
import { useWorldBounds } from '../config/gameConfig';
import Skybox from './Skybox';
import SkyType from './SkyType';

const EnvironmentSetup = () => {
  const currentEnvironment = useCurrentEnvironment();
  const worldBounds = useWorldBounds();

  return (
    <Suspense fallback={null}>
      {/* Conditionally render Skybox or SkyType based on texture availability */}
      {currentEnvironment.skybox?.texturePath ? (
        <Skybox
          worldBounds={worldBounds}
          texturePath={currentEnvironment.skybox.texturePath}
        />
      ) : (
        <SkyType skyType={currentEnvironment.skybox?.skyType || 'day'} />
      )}

      {/* Only show Environment for non-space/cyberpunk/medieval/postapocalyptic themes */}
      {currentEnvironment.name !== 'Deep Space' &&
       currentEnvironment.name !== 'Cyberpunk 2077' &&
       currentEnvironment.name !== 'Medieval Fantasy' &&
       currentEnvironment.name !== 'Post-Apocalyptic' && (
        <Environment preset="city" />
      )}
    </Suspense>
  );
};

export default EnvironmentSetup;