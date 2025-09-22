# 🔧 Hooks Directory - Game Logic AI Guide

## 📁 Hook Architecture Overview

This directory contains all custom React hooks that implement the core game mechanics. The hook-based architecture separates game logic from rendering, making it easy for AI to understand, modify, and extend gameplay systems.

## 🎮 CORE GAME LOOP PATTERN

All game logic hooks follow this pattern:
```javascript
// Standard hook structure for game mechanics
export const useGameMechanic = (dependencies) => {
  useFrame(() => {
    // Game logic runs every frame (60fps)
    // Access to Three.js scene, physics bodies, and game state
  });
};
```

## 🧑‍🚀 PLAYER SYSTEM HOOKS

### **usePlayerMovement.js** - WASD MOVEMENT SYSTEM
**Purpose:** Handles player movement with Kinematic physics and boundary checking
```javascript
// Key responsibilities:
- WASD/Arrow key input processing
- Kinematic physics body velocity control  
- World boundary collision and clamping
- Smooth movement with normalized direction vectors
- Integration with game state (only moves during PLAYING)

// Dependencies:
- api: Cannon physics body API (required)
- gameState: Current game state atom (required)
- worldBounds: World boundary configuration (required)
```
**AI Modification:** Change movement speed, add new movement patterns (diagonal, sprint), or modify boundary behavior

### **usePlayerRotation.js** - MULTI-PLATFORM ROTATION
**Purpose:** Rotates player to face mouse cursor or mobile joystick with smooth interpolation
```javascript
// Key responsibilities:
- Manage mouse position state internally (no atom dependency)
- Receive mobile position from component props
- Calculate rotation angle from input position
- Apply smooth rotation interpolation to physics body
- Call rotation change callback for other components

// Dependencies:
- api: Cannon.js physics body API (required)
- gameState: Current game state for rotation gating (required)
- onRotationChange: Callback to update rotation state (required)
- mobilePosition: Mobile joystick position from component (required)
```
**AI Modification:** Adjust rotation speed, add rotation constraints, or implement different aiming systems

### **usePlayerShooting.js** - WEAPON SYSTEM
**Purpose:** Handles projectile spawning, firing mechanics, and weapon timing
```javascript
// Key responsibilities:
- Space bar input detection for shooting (uses useKeyControls)
- Projectile spawning with position/direction calculation
- Fire rate limiting and timing control
- Integration with projectile object pool system
- Weapon configuration from projectileTypes.js

// Dependencies:
- playerPosition: Current player position array [x, y, z] (required)
- playerRotation: Current rotation angle in radians (required)
- gameState: Game state for shooting enablement (required)
- projectileType: Current weapon configuration object (required)
- onShoot: Callback to spawn projectiles (required)
- fireRateMultiplier: Multiplier for projectile fire rate (optional, defaults to 1.0)
```
**AI Modification:** Add mouse click shooting, automatic weapons, charge-up mechanics, or special weapon types

### **usePlayerCamera.js** - SMOOTH CAMERA FOLLOWING
**Purpose:** Third-person camera that smoothly follows player movement
```javascript
// Key responsibilities:
- Smooth camera position interpolation using lerp and fixed timestep
- Subscribes to Kinematic physics body position updates for tracking
- Configurable camera offset for third-person view positioning
- Manual rendering with gl.render for camera control
- Game state gating (only active during PLAYING)

// Dependencies:
- bodyApi: Cannon.js physics body API for position subscription (required)
- gameState: Current game state for camera gating (required)
- offset: Camera offset object with x, y, z properties (optional, defaults to { x: 0, y: 15, z: 15 })
```
**AI Modification:** Add camera shake, zoom controls, mouse-controlled rotation, or dynamic camera angles

### **usePlayerHealth.js** - HEALTH AND DAMAGE SYSTEM
**Purpose:** Manages player health, damage processing, and game over detection
```javascript
// Key responsibilities:
- Health value management via Jotai atoms
- Damage processing from enemy attacks
- Game over detection when health reaches zero
- Health regeneration systems (if implemented)
- Integration with UI health display

// Dependencies:
- playerHealth: Health atom for current value (required)
- gameState: Game state for game over transition (required)
- setGameState: Function to trigger game over (required)
```
**AI Modification:** Add health regeneration, damage types, or shield systems

## 👹 ENEMY SYSTEM HOOKS

### **useEnemySpawner.js** - DYNAMIC ENEMY GENERATION
**Purpose:** Creates new enemies based on spawn rates, difficulty, and game rules
```javascript
// Key responsibilities:
- Spawn timing control based on difficulty and settings
- Enemy type selection from theme configurations
- Spawn position calculation around player (safe distances)
- Population control (maximum enemy limits)
- Object pooling integration with activateEnemy()
- Difficulty scaling over time

// Dependencies:
- enemies: Current enemies array (required)
- setEnemies: Function to update enemies array (required)
- playerPosition: Player position for spawn positioning (required)
- gameState: Only spawns during PLAYING state (required)
- worldBounds: Spawn boundary constraints (required)
```
**AI Modification:** Add wave spawning, boss encounters, or environmental spawn triggers

### **useEnemyChase.js** - SIMPLE CHASE MOVEMENT
**Purpose:** Makes enemies move directly toward player using simple direction calculation (no pathfinding)
```javascript
// Key responsibilities:
- Direction vector calculation (player position - enemy position)
- Velocity application to Kinematic physics body
- Speed normalization for consistent movement
- Distance-based movement (direct line, no obstacle avoidance)
- Game state integration (only chases during PLAYING)

// Dependencies:
- api: Enemy physics body API (required)
- position: Current enemy position array (required)
- speed: Enemy movement speed multiplier (required)
- playerPosition: Target position for chasing (required)
- gameState: Movement enablement (required)
```
**AI Modification:** Add pathfinding, formation movement, or advanced behavior patterns

### **useEnemyAttack.js** - DISTANCE-BASED COMBAT
**Purpose:** Handles enemy attacks using distance calculation and damage dealing
```javascript
// Key responsibilities:
- Distance calculation between enemy and player
- Attack range checking (enemy.size + attack radius)
- Damage dealing via callback when in range
- Attack cooldown management (prevents damage spam)
- Game state integration (only attacks during PLAYING)

// Dependencies:
- position: Current enemy position array (required)
- size: Enemy collision radius (required)
- damage: Damage amount to deal (required)
- playerPosition: Target position for attacks (required)
- onPlayerDamage: Callback to damage player (required)
- gameState: Attack enablement (required)
```
**AI Modification:** Add different attack types, ranged attacks, or special abilities

### **useEnemyCleanup.js** - BOUNDARY MANAGEMENT
**Purpose:** Removes enemies that go outside world boundaries for performance
```javascript
// Key responsibilities:
- World boundary checking every few seconds
- Enemy position validation against world bounds
- Enemy removal when outside safe areas
- Performance optimization (not checked every frame)
- Integration with enemy object pool system

// Dependencies:
- position: Current enemy position array (required)
- enemyId: Unique enemy identifier (required)
- setEnemies: Function to remove enemies (required)
- worldBounds: World boundary configuration (required)
```
**AI Modification:** Add different boundary behaviors, enemy return mechanics, or teleportation

### **useEnemyFacing.js** - VISUAL ROTATION
**Purpose:** Rotates enemy visual representation to face player for better feedback
```javascript
// Key responsibilities:
- Direction calculation toward player
- Enemy mesh rotation updates
- Visual enhancement (enemies face their target)
- Optional feature (can be disabled per enemy type)

// Dependencies:
- enemyRef: React ref to enemy mesh (required)
```

### **useCollectibleSpawner.js** - COLLECTIBLE GENERATION
**Purpose:** Manages collectible spawning with type randomization and object pooling
```javascript
// Key responsibilities:
- Time-based collectible spawning with probability checks
- Random collectible type selection from available types (currently only health)
- Spawn constraint enforcement (delay, max active, world bounds)
- Object pool integration for performance
- Configurable spawn intervals and positioning

// Parameters:
- collectibles: Current collectible pool array
- setCollectibles: State setter for collectibles
- spawnChance: Probability of successful spawn (0-1)
- spawnDelay: Minimum time between spawns (ms)
- maxActiveCollectibles: Population limit
- worldBounds: Spawn area boundaries
- collectibleType: Base type (can be overridden per spawn)

// Returns: spawnCollectible function
```

### **useCollectibleCollector.js** - COLLECTION DETECTION
**Purpose:** Handles collectible collection, effect application, and statistics tracking
```javascript
// Key responsibilities:
- Distance-based collision detection between player and collectibles
- Collectible effect application via applyCollectibleEffect function
- Statistics tracking (collection count, health restored)
- Object pool management (deactivation after collection)
- Duplicate collection prevention with persistent guards

// TO ADD NEW COLLECTIBLE EFFECTS:
// 1. Add to collectibleTypes.js array
// 2. Add case to applyCollectibleEffect switch statement
// 3. Add required props (state setters) to hook
// 4. Update CollectibleManager to pass new props

// Parameters:
- playerPosition: Current player position [x, y, z]
- activePlayerHealth/setActivePlayerHealth: Health management
- basePlayerHealth: Maximum health capacity
- collectibles/setCollectibles: Collectible pool management
- setCollectiblesCollected: Statistics tracking
- setTotalHealthRestored: Healing statistics

// Effect Types:
- HEALTH: Instant healing up to maximum
- SPEED: Temporary movement speed boost (TODO)
- DAMAGE: Temporary damage multiplier (TODO)
- SHIELD: Temporary invincibility (TODO)
```
**AI Modification:** Add new collectible effect types, modify collection radius, or enhance visual feedback

## ⚙️ CONTROL SYSTEM HOOKS

### **useKeyControls.js** - KEYBOARD INPUT HANDLING
**Purpose:** Processes keyboard input for player movement (WASD/Arrow keys)
```javascript
// Key responsibilities:
- Keyboard event listeners for keydown/keyup
- Key state tracking (which keys are currently pressed)
- Movement direction calculation from key combinations
- Cleanup of event listeners on component unmount

// Returns:
- movement: Object with direction properties { forward, backward, left, right }
```
**AI Modification:** Add new key bindings, modifier keys, or custom control schemes

### **useMouseControls.js** - MOUSE INPUT HANDLING  
**Purpose:** Tracks mouse movement and calls external setter (no atom dependency)
```javascript
// Key responsibilities:
- Mouse position tracking and conversion to world coordinates
- Call setMousePosition callback to update external state
- Click event detection (mousedown/mouseup states)
- DOM integration using getBoundingClientRect() for positioning
- Event management with proper cleanup

// Dependencies:
- setMousePosition: Callback function to update mouse position (required)

// Returns:
- {} (empty object, state managed externally)
```
**AI Modification:** Add mouse sensitivity, integrate with shooting system, or add touch controls

### **useMobileControls.js** - MOBILE TOUCH INPUT BRIDGE
**Purpose:** Bridges mobile UI components with shared input atoms for dual-joystick and button controls
```javascript
const { onMove, onStop, onRotate, onShoot } = useMobileControls();
```
**What it provides:**
- Movement joystick handler: Converts touch coordinates to directional input atoms
- Rotation joystick handler: Converts touch coordinates to rotation input position
- Shoot button handler: Manages primary action with cooldown prevention
- Multi-platform integration: Uses same atoms as keyboard/mouse controls
**Integration points:**
- MobileGameControls: Uses callbacks for dual joystick and button UI
- Input atoms: Shares state with keyboard and mouse systems
- Game logic: Works with existing usePlayerMovement/usePlayerRotation/usePlayerShooting hooks
**Returns:**
```javascript
{
  onMove,      // Movement joystick callback
  onStop,      // Movement stop callback  
  onRotate,    // Rotation joystick callback (maintains rotation when released)
  onShoot,     // Shoot button callback
  inputState,  // Current combined input state
  atoms        // Direct atom access for advanced use
}
```
**AI Modification:** Adjust joystick sensitivity, add haptic feedback, or implement gesture controls

## 🖥️ UI SYSTEM HOOKS

### **useSettingsNavigation.js** - SETTINGS SCREEN MANAGEMENT
**Purpose:** Handles navigation and state management for the settings screen (no atom dependency)
```javascript
// Key responsibilities:
- Navigate to settings from any screen
- Preserve previous game state in sessionStorage
- Return to exact previous screen
- Manage settings screen visibility via props

// Dependencies:
- gameState: Current game state from component (required)
- setGameState: State setter function from component (required)

// Returns:
- goToSettings: Function to navigate to settings
- goBackFromSettings: Function to return to previous screen
- isInSettings: Boolean indicating if currently in settings
- currentState: Current game state for convenience

// Usage in components:
const { goToSettings } = useSettingsNavigation(gameState, setGameState);

// Used by:
- StartScreen.jsx: "SETTINGS" button
- GameOverScreen.jsx: "SETTINGS" button  
- SettingsScreen.jsx: "BACK" button
- HUD.jsx: Settings button during gameplay (requires setGameState prop)
```
**AI Modification:** Add new settings categories, keyboard navigation, settings validation, or new navigation patterns

## 🎨 UTILITY HOOKS

### **useConditionalTexture.js** - VITE-COMPATIBLE TEXTURE LOADING
**Purpose:** Loads textures with error handling and Vite build system compatibility
```javascript
// Key responsibilities:
- Texture loading with Three.js TextureLoader
- Error handling for missing texture files
- Vite asset path resolution
- Fallback to default textures when loading fails

// Parameters:
- texturePath: Path to texture file (can be empty)

// Returns:
- texture: Three.js Texture object or null
```
**AI Modification:** Add texture caching, multiple format support, or loading progress

## 🔄 HOOK INTEGRATION PATTERNS

### **Component → Hook Integration:**
```javascript
// Standard pattern for using hooks in components
function GameComponent() {
  // 1. Use hooks to get game logic
  usePlayerMovement(api, gameState, worldBounds);
  usePlayerRotation(playerRef, camera);
  usePlayerShooting(gameState, playerPosition, projectileType, onShoot);
  
  // 2. Render component with hook-driven behavior
  return <mesh ref={playerRef}>...</mesh>;
}
```

### **Hook → State Integration:**
```javascript
// Most hooks use direct props and callbacks for state management
// Only input-related hooks use atoms internally for shared state

// Prop-based hooks (majority):
usePlayerRotation(api, gameState, onRotationChange, mobilePosition);
useSettingsNavigation(gameState, setGameState);
useMouseControls(setMousePosition);

// Atom-based hooks (input system only):
const [inputState] = useAtom(inputStateAtom);
const [enemies, setEnemies] = useAtom(enemiesAtom);
```

### **useFrame Integration:**
```javascript
// Game logic runs in useFrame for 60fps updates
useFrame(() => {
  // Physics calculations
  // State updates  
  // Movement processing
  // Collision detection
});
```

## 📋 AI MODIFICATION GUIDELINES

### **Adding New Hooks:**
1. **Follow naming convention:** `use[System][Action].js` (e.g., `useEnemyTeleport.js`)
2. **Use useFrame for game loop:** All game logic should run at 60fps
3. **Prefer props over atoms:** Use props and callbacks for state management when possible
4. **Use atoms sparingly:** Only for shared state that multiple components need (like input system)
5. **Handle dependencies:** Clearly define required parameters
6. **Add comprehensive documentation:** Explain purpose, dependencies, and modification points

### **Modifying Existing Hooks:**
1. **Check component dependencies:** See which components use the hook
2. **Test with all themes:** Ensure changes work across visual themes
3. **Maintain performance:** Avoid expensive operations in useFrame
4. **Preserve API compatibility:** Don't break existing component integrations

### **Common Modification Patterns:**

#### **Adding New Player Abilities:**
```javascript
// Create new hook: usePlayerDash.js
export const usePlayerDash = (api, gameState, dashCooldown) => {
  useFrame(() => {
    // Dash logic implementation
  });
};

// Integrate in Player.jsx:
usePlayerDash(api, gameState, 2000); // 2 second cooldown
```

#### **Creating New Enemy Behaviors:**
```javascript
// Create new hook: useEnemyPatrol.js  
export const useEnemyPatrol = (api, position, patrolPoints) => {
  useFrame(() => {
    // Patrol logic implementation
  });
};

// Use in BaseEnemy.jsx instead of useEnemyChase
```

#### **Adding New Game Mechanics:**
```javascript
// Create new hook: useWeaponUpgrade.js
export const useWeaponUpgrade = (currentWeapon, upgradeLevel) => {
  useFrame(() => {
    // Weapon upgrade logic
  });
};
```

## 🚨 IMPORTANT NOTES FOR AI

### **Performance Considerations:**
- **useFrame runs at 60fps** - Keep logic lightweight
- **Avoid expensive calculations** in game loop hooks
- **Use refs for object access** instead of state when possible
- **Batch atom updates** to prevent unnecessary re-renders

### **Hook Dependencies:**
- **Physics API** - Required for movement and collision hooks
- **Jotai Atoms** - Required for state management integration  
- **Game State** - Most hooks need gameState for conditional logic
- **Position Arrays** - Use [x, y, z] format consistently

### **Integration Points:**
- **Components** - Hooks are used in component render functions
- **Atoms** - Hooks read/write global game state
- **Physics** - Hooks control Cannon.js physics bodies
- **Three.js** - Hooks manipulate 3D objects and scene

### **Safe to Modify:**
- Individual hook implementations (isolated functionality)
- Hook parameters and configuration
- Game logic within useFrame callbacks
- Performance optimizations

### **Modify with Caution:**
- Hook APIs and return values (affects component integration)
- useFrame timing and performance
- Atom read/write patterns (affects reactivity)
- Physics body manipulation (affects collision)

This hook system provides **complete game logic separation** from rendering, making it easy to understand, modify, and extend gameplay mechanics while maintaining clean component architecture.
