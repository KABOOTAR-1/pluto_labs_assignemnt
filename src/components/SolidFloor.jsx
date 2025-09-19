/**
 * 🎨 SOLID FLOOR COMPONENT - Solid Color Ground with Static Physics Plane
 * =====================================================================
 *
 * 🎯 WHAT THIS COMPONENT DOES:
 * ✅ Creates a static physics plane body (used for structural/visual purposes with kinematic entities)
 * ✅ Renders solid colored ground surfaces without textures
 * ✅ Supports both reflective and standard materials based on theme config
 * ✅ Provides shadow receiving surface for realistic lighting
 * ✅ Lightweight alternative to textured floors for stylized environments
 *
 * 🔧 PHYSICS SETUP:
 * - Uses usePlane from @react-three/cannon to create static collision surface
 * - Positioned at [0, 0, 0] with horizontal rotation (-Math.PI/2)
 * - Type: 'Static' means immovable - provides structural integrity to physics world
 * - Since player/enemies are kinematic with Y velocity = 0, ground collision isn't actively used
 * - Serves as foundation for physics world and potential future collision features
 *
 * 🎨 MATERIAL OPTIONS:
 * - **Reflector Material**: Creates reflective surfaces with blur effects
 * - **Standard Material**: Basic solid color material with roughness/metalness
 * - Both provide shadow reception for realistic scene lighting
 *
 * 🎯 AI MODIFICATION GUIDE:
 * - **Change Material Type**: Modify groundConfig.material logic
 * - **Adjust Material Properties**: Modify roughness, metalness, or color values
 * - **Add Texture Support**: Could be extended to support textures like TexturedFloor
 * - **Enable Ground Collision**: If kinematic bodies become dynamic, collision will work automatically
 * - **Physics Body Purpose**: Currently structural - can be enhanced for active collision detection
 */

import React from 'react';
import { usePlane } from '@react-three/cannon';
import { MeshReflectorMaterial } from '@react-three/drei';
import { gameConfig } from '../config/gameConfig';

const SolidFloor = ({ groundConfig, worldSize }) => {
  // ⚙️ STATIC PHYSICS PLANE - Create structural foundation for physics world
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],  // Rotate to horizontal position
    position: [0, 0, 0],             // Center of world at ground level
    type: 'Static'                   // Immovable structural element
  }));

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
        // 🔮 REFLECTIVE MATERIAL - Creates reflective solid color surface
        <MeshReflectorMaterial
          color={groundConfig.color || gameConfig.world.floorColor}
          roughness={groundConfig.roughness || 0.7}     // Surface roughness
          blur={[1000, 1000]}                          // Reflection blur
          mixBlur={30}                                  // Blur mixing
          mixStrength={80}                              // Reflection strength
          metalness={groundConfig.metalness || 0.1}     // Metallic appearance
        />
      ) : (
        // 🎨 STANDARD MATERIAL - Basic solid color material
        <meshStandardMaterial
          color={groundConfig.color || gameConfig.world.floorColor}
          roughness={groundConfig.roughness || 0.8}     // Surface roughness
          metalness={groundConfig.metalness || 0.2}     // Metallic appearance
        />
      )}
    </mesh>
  );
};

export default SolidFloor;