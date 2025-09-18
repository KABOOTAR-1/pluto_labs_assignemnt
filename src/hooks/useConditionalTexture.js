import { useState, useEffect } from 'react';
import * as THREE from 'three';

export const useConditionalTexture = (textureUrl) => {
  const [texture, setTexture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (textureUrl) {
      setLoading(true);
      setError(null);

      // For Vite, convert src paths to proper URLs
      let resolvedUrl = textureUrl;
      if (textureUrl.startsWith('/src/')) {
        try {
          resolvedUrl = new URL(textureUrl, import.meta.url).href;
          console.log('Resolved Vite URL:', resolvedUrl);
        } catch (e) {
          console.error('Error resolving Vite URL:', e);
          resolvedUrl = textureUrl;
        }
      }

      const loader = new THREE.TextureLoader();
      loader.load(
        resolvedUrl,
        (loadedTexture) => {
          // Ensure texture properties are set correctly
          loadedTexture.flipY = false;
          loadedTexture.needsUpdate = true;
          setTexture(loadedTexture);
          setLoading(false);
        },
        (progress) => {
          console.log('Texture loading progress:', progress);
        },
        (loadError) => {
          console.error('Error loading texture:', loadError);
          setError(loadError);
          setLoading(false);
        }
      );
    } else {
      //console.log('No texture URL provided');
      setTexture(null);
      setLoading(false);
      setError(null);
    }
  }, [textureUrl]);

  return { texture, loading, error };
};