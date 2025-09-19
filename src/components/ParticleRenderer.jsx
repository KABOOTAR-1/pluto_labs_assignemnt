import React, { Suspense } from 'react';
import SpaceParticles from './SpaceParticles';
import PostApocalypticParticles from './PostApocalypticParticles';

const ParticleRenderer = () => {
  return (
    <Suspense fallback={null}>
      <SpaceParticles />
      <PostApocalypticParticles />
    </Suspense>
  );
};

export default ParticleRenderer;