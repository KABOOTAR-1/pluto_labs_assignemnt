// ============================================================================
// 🧑‍🚀 PLAYER COMPONENT - Main Player Character Controller
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is the core player character that users control in the game
// ✅ Integrates physics, movement, shooting, health, camera, and rendering
// ✅ Uses multiple custom hooks for modular player behavior systems
// ✅ Supports both 3D models (GLTF) and fallback geometric shapes
//
// 📊 COMPONENT BEHAVIOR:
// - Creates physics body using @react-three/cannon for collision detection
// - Syncs position between physics body and atoms for other components
// - Handles movement via WASD/arrow keys with boundary checking (usePlayerMovement)
// - Manages mouse-based rotation and aiming system (usePlayerRotation)
// - Implements shooting mechanics with fire rate limiting (usePlayerShooting)
// - Controls camera following with smooth interpolation (usePlayerCamera)
// - Manages health system with damage handling and game over detection (usePlayerHealth)
// - Renders 3D model or fallback geometry based on current theme
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎨 VISUAL CUSTOMIZATION:
// ADD NEW:
// - Add player animations (idle, walking, shooting, taking damage)
// - Include particle effects for movement (dust trails, jetpack flames)
// - Add visual feedback for damage (screen flash, model tinting)
// - Include power-up visual effects (glowing, size changes, trails)
// - Add customizable player skins or color schemes
//
// MODIFY EXISTING:
// - Change player model by updating theme modelUrl in themes.js
// - Modify fallback geometry: 'box' → 'sphere', 'cylinder', etc.
// - Change player colors by updating color property in theme config
// - Modify player rotation by updating theme properties
//
// 🎮 FUNCTIONAL MODIFICATIONS:
// ADD NEW:
// - Add dash/dodge mechanics with cooldown system
// - Implement double jump or jetpack functionality
// - Add stamina system limiting continuous movement
// - Add special abilities (shield, invisibility, speed boost)
// - Include power-up collection and effect application
//
// MODIFY EXISTING:
// - Change movement speed by modifying basePlayerSpeedAtom
// - Update fire rate by changing basePlayerFireRateAtom
// - Modify health capacity by updating basePlayerHealthAtom
// - Change physics properties (mass, collision box size)
// - Update boundary behavior (teleport vs game over)
//
// 📱 PHYSICS & CONTROLS:
// ADD NEW:
// - Add gamepad/controller support alongside keyboard/mouse
// - Implement touch controls for mobile devices
// - Add customizable key bindings system
// - Include mouse sensitivity settings
// - Add aim assist or auto-targeting options
//
// MODIFY EXISTING:
// - Change control scheme by modifying useKeyControls hook
// - Update mouse sensitivity in useMouseControls hook
// - Modify physics mass/type in useBox configuration
// - Change collision detection behavior
// - Update movement smoothing and interpolation
//
// 🔄 STATE MANAGEMENT:
// - playerPositionAtom: Real-time position sync with physics body
// - playerRotationAtom: Mouse-based rotation for aiming
// - basePlayerSpeedAtom: User-configurable movement speed setting
// - basePlayerFireRateAtom: User-configurable shooting speed setting
// - basePlayerHealthAtom: User-configurable health capacity setting
// - useCurrentPlayerConfig: Current theme's player configuration
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/hooks/usePlayerMovement.js: Movement logic and boundary checking
// - src/hooks/usePlayerRotation.js: Mouse-based rotation system
// - src/hooks/usePlayerShooting.js: Shooting mechanics and projectile spawning
// - src/hooks/usePlayerCamera.js: Camera following and positioning
// - src/hooks/usePlayerHealth.js: Health management and damage handling
// - src/hooks/useKeyControls.js: Keyboard input handling
// - src/hooks/useMouseControls.js: Mouse input and position tracking
// - src/components/GltfLoader/BaseModel.jsx: 3D model loading system
// - src/components/baseModel/BasePlayerModel.jsx: Fallback geometry renderer
// - src/config/themes/themes.js: Player visual configuration per theme
//
// 🎨 VISUAL DEPENDENCIES:
// - BaseModel: Handles 3D model loading with fallback support
// - BasePlayer: Renders fallback geometry when no model available
// - Theme system: Provides modelUrl, colors, scale, rotation per theme
// - Physics body: Creates collision box for player interaction
//
// 🔗 HOOK DEPENDENCIES:
// - usePlayerMovement: WASD/arrow key movement with boundary checking
// - usePlayerRotation: Mouse-based rotation and aiming
// - usePlayerShooting: Space key shooting with fire rate limiting
// - usePlayerCamera: Camera following with smooth interpolation
// - usePlayerHealth: Health management and damage system
// - useKeyControls: Keyboard input state management
// - useMouseControls: Mouse position and click state management
//
// ⚠️ IMPORTANT NOTES:
// - Player position is synced between physics body and atoms
// - Health changes trigger automatic adjustment to new max values
// - Game over is triggered by health reaching 0 or boundary violations
// - Physics body is kinematic (controlled by code, not physics simulation)
// - Camera follows player with configurable offset
// - Shooting creates projectiles through onShoot callback
//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASES:
// ============================================================================
//
// 📝 CHANGE PLAYER MODEL:
// Update modelUrl in theme configuration:
// themes.space.player.modelUrl = 'https://new-model-url.com/player.glb'
//
// 🎮 ADD DASH MECHANIC:
// 1. Add dash key to useKeyControls
// 2. Create useDash hook with cooldown
// 3. Apply velocity boost in usePlayerMovement
//
// 🎨 CHANGE PLAYER APPEARANCE:
// Modify theme properties:
// themes.medieval.player.color = 0x8B4513 (brown)
//
// 📱 ADD MOBILE CONTROLS:
// 1. Create useTouchControls hook
// 2. Add touch input handling
// 3. Update movement logic to support touch
//
// 🔊 ADD SOUND EFFECTS:
// 1. Import audio system
// 2. Add sound triggers in movement/shooting hooks
// 3. Include footstep, shooting, damage sounds
//
// ✏️ MODIFICATION EXAMPLES:
// ============================================================================
//
// 🏃‍♂️ CHANGE MOVEMENT SPEED:
// Modify basePlayerSpeedAtom default value or use settings screen
//
// 🔫 CHANGE FIRE RATE:
// Modify basePlayerFireRateAtom or update in settings
//
// ❤️ CHANGE HEALTH:
// Modify basePlayerHealthAtom or adjust in game settings
//
// 📦 CHANGE COLLISION BOX SIZE:
// Update args in useBox: args: [2, 2, 2] for larger collision box
//
// 🎯 CHANGE INITIAL POSITION:
// Modify gameConfig.player.initialPosition: [x, y, z]
//
// 🎨 ADD PLAYER GLOW EFFECT:
// Add emissive material properties to BasePlayer component
//
// 🎮 ADD INVINCIBILITY FRAMES:
// Modify usePlayerHealth to include temporary invincibility after damage
// ============================================================================

import React, { useEffect } from "react";
import { useBox } from "@react-three/cannon";
import { useAtom } from "jotai";
import {
  playerPositionAtom,
  playerRotationAtom,
  basePlayerSpeedAtom,
  basePlayerFireRateAtom,
  basePlayerHealthAtom,
} from "../config/atoms";
import { gameConfig, useCurrentPlayerConfig } from "../config/gameConfig";
import { usePlayerMovement } from "../hooks/usePlayerMovement";
import { usePlayerRotation } from "../hooks/usePlayerRotation";
import { usePlayerShooting } from "../hooks/usePlayerShooting";
import { usePlayerCamera } from "../hooks/usePlayerCamera";
import { usePlayerHealth } from "../hooks/usePlayerHealth";
import { BaseModel } from "./GltfLoader/BaseModel";
import { BasePlayer } from "./baseModel/BasePlayerModel";

// 🎯 INITIAL PLAYER STATE CONFIGURATION
// Retrieved from central game configuration for consistency
const initialPosition = gameConfig.player.initialPosition;
const initialRotation = gameConfig.player.initialRotation;
const initialVelocity = gameConfig.player.initialVelocity;
  
/**
 * 🧑‍🚀 PLAYER COMPONENT - Main Player Character Controller
 * ======================================================
 *
 * @description The core player character component that handles all player-related functionality
 * @param {Object} worldBounds - World boundary limits for collision detection
 * @param {Array<number>} playerPosition - Current player position [x, y, z] from parent
 * @param {number} playerHealth - Current player health value from parent
 * @param {string} gameState - Current game state ('playing', 'menu', etc.)
 * @param {Function} setGameState - Function to change game state (for game over)
 * @param {Function} setPlayerHealth - Function to update player health
 * @param {Object} selectedProjectileType - Current weapon/projectile configuration
 * @param {Function} onShoot - Callback function to spawn projectiles when shooting
 * @returns {JSX.Element} Player character with physics body and 3D model/geometry
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Physics body creation and collision detection
 * - Position synchronization between physics and atoms
 * - Movement handling via keyboard input
 * - Mouse-based rotation and aiming
 * - Shooting mechanics with fire rate limiting
 * - Camera following and positioning
 * - Health management and damage handling
 * - 3D model rendering with fallback support
 *
 * 🔄 HOOK INTEGRATIONS:
 * - usePlayerMovement: WASD/arrow key movement with boundary checking
 * - usePlayerRotation: Mouse-based rotation using useMouseControls
 * - usePlayerShooting: Space key shooting using useKeyControls
 * - usePlayerCamera: Smooth camera following with interpolation
 * - usePlayerHealth: Damage handling and game over detection
 *
 * 🎨 RENDERING SYSTEM:
 * - BaseModel: Loads GLTF models from theme configuration
 * - BasePlayer: Fallback geometry when no model available
 * - Theme-based appearance (colors, scale, rotation)
 */
export default function Player({ worldBounds, playerPosition, playerHealth, gameState, setGameState, setPlayerHealth, selectedProjectileType, onShoot }) {
  // 🎨 THEME CONFIGURATION
  // Gets current theme's player configuration (model, colors, scale, etc.)
  const playerConfig = useCurrentPlayerConfig();

  // 🔮 PHYSICS BODY CREATION
  // Creates kinematic physics body for collision detection and position control
  const [ref, api] = useBox(() => ({
    mass: 1,                    // Physics mass (affects collision response)
    type: "Kinematic",          // Controlled by code, not physics simulation
    args: [                     // Collision box dimensions [width, height, depth]
      playerConfig.size || gameConfig.player.size,
      playerConfig.size || gameConfig.player.size,
      playerConfig.size || gameConfig.player.size
    ],
    position: initialPosition,  // Starting position from gameConfig passed as props
    name: "player",            // Identifier for collision detection
  }));

  // 🎲 ATOM STATE MANAGEMENT
  // Position atom for sharing player position with other components
  const [, setPlayerPosition] = useAtom(playerPositionAtom);
  // Rotation atom for sharing player facing direction
  const [playerRotation, setPlayerRotation] = useAtom(playerRotationAtom);
  // User-configurable settings from settings screen
  const [playerSpeed] = useAtom(basePlayerSpeedAtom);           // Movement speed
  const [playerFireRate] = useAtom(basePlayerFireRateAtom);     // Shooting speed
  const [playerHealthSetting] = useAtom(basePlayerHealthAtom);  // Max health capacity

  // 🔄 POSITION RESET EFFECT - Reset player to initial state when game starts/resets
  useEffect(() => {
    // Guard clauses: only reset if initial values exist and not during active gameplay
    if(!initialPosition || !initialRotation || !initialVelocity) return;
    if(gameState === "playing" || gameState === "settings") return;
    
    console.log("Initial Position:", initialPosition);
    // Reset physics body to starting state
    api.position.set(...initialPosition);    // Move to spawn point
    api.rotation.set(...initialRotation);    // Face default direction
    api.velocity.set(...initialVelocity);    // Stop all movement
  }, [gameState, api]);

  // 🔗 POSITION SYNCHRONIZATION EFFECT - Sync physics position with atoms
  useEffect(() => {
    // Subscribe to physics body position changes and update atom
    // This allows other components to react to player movement
    const unsubscribe = api.position.subscribe((pos) => setPlayerPosition(pos));
    return unsubscribe; // Cleanup subscription on unmount
  }, [api.position, setPlayerPosition]);

  // ❤️ HEALTH ADJUSTMENT EFFECT - Adapt current health to new max health settings
  useEffect(() => {
    setPlayerHealth((currentHealth) => {
      // If current health is less than the new max, heal to new max
      if (currentHealth < playerHealthSetting) {
        return playerHealthSetting;
      }
      // If current health exceeds the new max, cap it at new max
      if (currentHealth > playerHealthSetting) {
        return playerHealthSetting;
      }
      // Otherwise keep current health unchanged
      return currentHealth;
    });
  }, [playerHealthSetting, setPlayerHealth]);

  // 🎮 PLAYER BEHAVIOR HOOKS - Modular systems for player functionality
  
  // 🏃‍♂️ MOVEMENT SYSTEM - WASD/arrow key movement with boundary checking
  usePlayerMovement(
    api,                                      // Physics body API
    playerPosition,                           // Current position
    gameState,                               // Game state for movement gating
    () => setGameState("gameOver"),          // Boundary violation callback
    playerSpeed,                             // Movement speed from settings
    worldBounds                              // World boundaries for collision
  );
  
  // 🔄 ROTATION SYSTEM - Mouse-based rotation and aiming
  usePlayerRotation(
    api,                                      // Physics body API
    gameState,                               // Game state for rotation gating
    setPlayerRotation                        // Callback to update rotation atom
  );
  
  // 🔫 SHOOTING SYSTEM - Space key shooting with fire rate limiting
  usePlayerShooting(
    playerPosition,                          // Current position for projectile spawn
    playerRotation,                          // Current rotation for projectile direction
    gameState,                               // Game state for shooting gating
    selectedProjectileType,                  // Current weapon configuration
    onShoot,                                 // Callback to spawn projectiles
    playerFireRate                           // Fire rate from settings
  );
  
  // ❤️ HEALTH SYSTEM - Damage handling and game over detection
  usePlayerHealth(
    ref,                                     // Physics body ref for damage detection
    playerHealth,                            // Current health value
    (h) => setPlayerHealth(h),              // Health update callback
    () => setGameState("gameOver")          // Game over callback
  );
  
  // 📹 CAMERA SYSTEM - Smooth camera following with configurable offset
  usePlayerCamera(
    api,                                     // Physics body API for position tracking
    gameState,                               // Game state for camera control gating
    gameConfig.camera.offset                 // Camera offset configuration
  );
  // 🎨 RENDER PLAYER CHARACTER
  return (
    <group ref={ref}>
      {/* 🎭 PLAYER MODEL/GEOMETRY - Theme-based 3D model with fallback support */}
      <BaseModel
        url={playerConfig.modelUrl}                                    // GLTF model URL from current theme
        fallbackComponent={BasePlayer}                                 // Fallback component when no model
        size={playerConfig.size || gameConfig.player.size}           // Model/geometry size
        color={playerConfig.color || gameConfig.player.color}        // Fallback geometry color
        fallbackGeometry={playerConfig.fallbackGeometry || 'box'}    // Geometry type ('box', 'sphere', etc.)
        rotation={playerConfig.rotation || [0, -Math.PI, 0]}         // Model rotation [x, y, z] radians
        scale={playerConfig.scale || [1, 1, 1]}                      // Model scale [x, y, z] multipliers
        centerModel={false}                                           // Don't auto-center model
      />
    </group>
  );
}
