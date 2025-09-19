/**
 * 🖼️ TEXTURED FLOOR COMPONENT - Realistic Ground with Static Physics Plane
 * =====================================================================
 *
 * 🎯 WHAT THIS COMPONENT DOES:
 * ✅ Creates a static physics plane body (used for structural/visual purposes with kinematic entities)
 * ✅ Loads and applies texture images to create realistic ground surfaces
 * ✅ Supports both reflective and standard materials based on theme config
 * ✅ Automatically scales texture to fit the world size
 * ✅ Handles texture wrapping and repetition for seamless coverage
 * ✅ Provides shadow receiving surface for realistic lighting
 *
 * 🔧 PHYSICS SETUP:
 * - Uses usePlane from @react-three/cannon to create static collision surface
 * - Positioned at [0, 0, 0] with horizontal rotation (-Math.PI/2)
 * - Type: 'Static' means immovable - provides structural integrity to physics world
 * - Since player/enemies are kinematic with Y velocity = 0, ground collision isn't actively used
 * - Serves as foundation for physics world and potential future collision features
 *
 * 🎨 MATERIAL OPTIONS:
 * - **Reflector Material**: Creates realistic reflections and metallic surfaces
 * - **Standard Material**: Basic material with color, roughness, and metalness
 * - Both support texture mapping and shadow reception
 *
 * 🔄 TEXTURE CONFIGURATION:
 * - Wrap mode set to 1000 (repeat) for seamless tiling
 * - Repeat scale calculated based on world size for proper coverage
 * - Texture applied to both reflective and standard materials
 *
 * 🎯 AI MODIFICATION GUIDE:
 * - **Change Material Type**: Modify groundConfig.material logic
 * - **Adjust Texture Scaling**: Change the repeat.set() calculation
 * - **Add Material Properties**: Extend with normal maps, AO maps, etc.
 * - **Enable Ground Collision**: If kinematic bodies become dynamic, collision will work automatically
 * - **Physics Body Purpose**: Currently structural - can be enhanced for active collision detection
 */

import React from 'react';
import { usePlane } from '@react-three/cannon';
import { MeshReflectorMaterial, useTexture } from '@react-three/drei';
import { gameConfig } from '../config/gameConfig';

const TexturedFloor = ({ groundConfig, worldSize }) => {
  // ⚙️ STATIC PHYSICS PLANE - Create structural foundation for physics world
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],  // Rotate to horizontal position
    position: [0, 0, 0],             // Center of world at ground level
    type: 'Static'                   // Immovable structural element
  }));

  // 📥 TEXTURE LOADING - Load ground texture from theme configuration
  const texturePath = groundConfig.texture;
  const groundTexture = useTexture(texturePath);

  // 🔧 TEXTURE CONFIGURATION - Set up seamless texture repetition for world coverage
  if (groundTexture) {
    groundTexture.wrapS = groundTexture.wrapT = 1000; // Enable seamless texture repetition
    groundTexture.repeat.set(worldSize / 10, worldSize / 10); // Scale to fit world size
  }

  return (
    // 🌍 GROUND MESH - Visual representation with physics body attachment
    <mesh
      ref={ref}                    // Attach physics body reference
      receiveShadow                // Receive shadows from other objects
      rotation={[-Math.PI / 2, 0, 0]} // Rotate to horizontal orientation
    >
      {/* 📐 GROUND GEOMETRY - Large plane covering the world area */}
      <planeGeometry args={[worldSize * 2, worldSize * 2]} />

      {/* 🎨 MATERIAL SELECTION - Choose between reflective or standard material */}
      {groundConfig.material === 'reflector' || !groundConfig.material ? (
        // 🔮 REFLECTIVE MATERIAL - Creates realistic ground with reflections
        <MeshReflectorMaterial
          color={groundConfig.color || gameConfig.world.floorColor}
          roughness={groundConfig.roughness || 0.7}     // Surface roughness
          blur={[1000, 1000]}                          // Reflection blur
          mixBlur={30}                                  // Blur mixing
          mixStrength={80}                              // Reflection strength
          metalness={groundConfig.metalness || 0.1}     // Metallic appearance
          map={groundTexture}                           // Texture map
        />
      ) : (
        // 🎨 STANDARD MATERIAL - Basic material with texture support
        <meshStandardMaterial
          color={groundConfig.color || gameConfig.world.floorColor}
          roughness={groundConfig.roughness || 0.8}     // Surface roughness
          metalness={groundConfig.metalness || 0.2}     // Metallic appearance
          map={groundTexture}                           // Texture map
        />
      )}
    </mesh>
  );
};

export default TexturedFloor;