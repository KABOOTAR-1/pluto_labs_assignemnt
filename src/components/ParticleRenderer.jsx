import React, { Suspense } from 'react';
import SpaceParticles from './SpaceParticles';
import CyberpunkParticles from './CyberpunkParticles';
import MedievalParticles from './MedievalParticles';
import PostApocalypticParticles from './PostApocalypticParticles';

const ParticleRenderer = () => {
  return (
    <Suspense fallback={null}>
      <SpaceParticles />
      <CyberpunkParticles />
      <MedievalParticles />
      <PostApocalypticParticles />
    </Suspense>
  );
};

export default ParticleRenderer;