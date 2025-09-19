// ============================================================================
// 🎨 USE CONDITIONAL TEXTURE HOOK - Vite-Compatible Texture Loading
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS HOOK:
// ✅ This handles texture loading with Vite URL resolution for GLTF models
// ✅ Provides loading states and error handling for texture operations
// ✅ Currently used by GLTFLoader component for optional texture overrides
// ✅ Supports both standard URLs and Vite src/ paths
// ✅ Uses Three.js TextureLoader for proper texture loading
//
// 📊 WHAT USECONDITIONALEXTURE ACTUALLY DOES:
// - URL resolution: converts Vite src/ paths to proper URLs using import.meta.url
// - Texture loading: uses THREE.TextureLoader for loading texture files
// - State management: provides loading, error, and loaded texture states
// - Texture configuration: sets flipY and needsUpdate properties
// - Error handling: catches and reports texture loading failures
//
// 📊 WHAT USECONDITIONALEXTURE DOES NOT DO (happens elsewhere):
// - Texture application: handled by GLTFLoader component material traversal
// - GLTF loading: handled by useGLTF hook from @react-three/drei
// - Model rendering: handled by GLTFLoader and BaseModel components
// - Texture caching: no built-in caching (could be added)
//
// 🔄 STATE MANAGEMENT:
// - textureUrl: URL or path to texture file (required, can be null)
// - Returns: Object with texture, loading, and error states

import { useState, useEffect } from 'react';
import * as THREE from 'three';

/**
 * 🎨 USE CONDITIONAL TEXTURE HOOK - Vite-Compatible Texture Loading
 * ================================================================
 *
 * @description Handles texture loading with Vite URL resolution for GLTF models
 * @param {string|null} textureUrl - URL or path to texture file (required, can be null)
 * @returns {Object} Object with texture, loading, and error states
 *
 * 🎯 HOOK RESPONSIBILITIES:
 * - Load texture files using Three.js TextureLoader
 * - Resolve Vite src/ paths to proper URLs using import.meta.url
 * - Provide loading and error states for UI feedback
 * - Configure texture properties (flipY, needsUpdate)
 * - Handle texture loading failures gracefully
 *
 * 🎨 TEXTURE MECHANICS:
 * - Loading: Uses THREE.TextureLoader for texture file loading
 * - URL Resolution: Converts Vite src/ paths to proper import URLs
 * - Configuration: Sets flipY=false and needsUpdate=true for proper display
 * - State Management: Provides loading, error, and texture states
 * - Conditional: Only loads when textureUrl is provided
 *
 * 🚀 CURRENT USAGE:
 * - GLTFLoader Component: Optional texture override for GLTF models
 * - Vite Integration: Proper URL resolution for development and build
 * - Error Handling: Graceful fallback when texture loading fails
 * - Three.js Integration: Compatible with Three.js material system
 */
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