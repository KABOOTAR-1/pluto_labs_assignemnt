# 🎮 Components Directory - AI Navigation Guide

## 📁 Component Architecture Overview

This directory contains all React components for the Three.js top-down shooter. Components are organized by functionality and follow a modular, hook-based architecture for easy AI modification.

## 🚀 CORE GAME COMPONENTS (Start Here)

### **🌍 Scene.jsx** - MAIN GAME COORDINATOR
**Purpose:** 3D Game World Container that coordinates rendering layers with hybrid state management
```javascript
// Key responsibilities:
- Manages essential game state atoms (gameState, player data, UI state)
- Sets up Three.js Canvas with camera configuration and mobile optimizations
- Passes player state and game control props to GameRenderer component
- Renders 3D scene and 2D HUD as separate layers
- Provides world bounds and mobile detection to child components
- Coordinates LightingManager, EnvironmentSetup, and GameRenderer
- Detects mobile devices and conditionally renders mobile controls
- Passes setGameState to HUD for settings navigation

// Key props passed to children:
- HUD: playerHealth, score, enemiesKilled, showHUD, gameState, setGameState
- GameRenderer: playerPosition, playerHealth, gameState, worldBounds, setScore, setEnemiesKilled, isMobile
- MobileGameControls: conditionally rendered based on mobile detection

// Hybrid state management:
- Reads atoms directly: gameState, playerPosition, playerHealth, score, enemiesKilled, showHUD
- GameRenderer reads atoms directly: enemies, projectiles, currentProjectileType
```
**AI Modification:** Start here for Canvas setup, component coordination, adding new rendering layers, or mobile detection logic

### **🎮 GameRenderer.jsx** - 3D ENTITY COORDINATOR
**Purpose:** Physics world container that manages game entities with hybrid state management (Some are passed as props and some refrenced thorugh atoms in the component)
```javascript
// Key responsibilities:
- Sets up physics world with gravity and collision materials (mobile optimized)(Current body is kinematic so no use of gravity and collision)
- Reads game entities (enemies, projectiles) directly from atoms
- Processes projectile type configuration from atoms
- Player component instantiation with props from Scene
- Conditional enemy/projectile rendering (only during PLAYING state)
- Enemy spawning system coordination
- Projectile-enemy collision detection management
- Renders static Floor component
- Suspense-wrapped async component loading

// Hybrid State Management (Props + Direct Atom Access):
// Definition: A React pattern combining prop-based data flow with direct atom access.
// Components receive stable, essential state as props while reading frequently-changing
// shared state directly from Jotai atoms. This reduces prop drilling for reactive data
// while maintaining clear component boundaries and predictable data flow.
- Props received from Scene (7): playerPosition, playerHealth, gameState, worldBounds, setScore, setEnemiesKilled, isMobile
- Atoms read directly: enemies, projectiles, currentProjectileType
```
**AI Modification:** Modify for new entity types, physics changes, conditional rendering logic, or game state management

### **👤 Player.jsx** - PLAYER CHARACTER SYSTEM
**Purpose:** Player character with modular hook-based systems
```javascript
// Integrated hooks:
- usePlayerMovement (WASD physics movement)
- usePlayerRotation (multi-platform rotation with props)
- usePlayerShooting (weapon system)
- usePlayerCamera (smooth camera following)
- usePlayerHealth (damage and health management)
```
**AI Modification:** Add new player abilities, modify movement, or integrate new hooks

### **👹 Enemies.jsx** - ENEMY RENDERING AND MANAGEMENT SYSTEM
**Purpose:** Renders active enemies and manages their lifecycle (updating, removal)
```javascript
// Key responsibilities:
- Renders all active enemies from the enemies array (object pool)
- Maps enemy types to specific components (FastEnemy, TankEnemy)
- Applies theme-based configurations and user settings
- Handles player damage when enemies attack
- Manages enemy removal when defeated or out of bounds
- Integrates with EnemySpawner for continuous gameplay
```
**AI Modification:** Add new enemy types, modify rendering behavior, or adjust enemy-player interactions

### **💎 CollectibleManager.jsx** - COLLECTIBLE SYSTEM COORDINATOR
**Purpose:** Manages collectible spawning, rendering, and lifecycle with random type selection
```javascript
// Key responsibilities:
- Manages collectible pool and spawning system
- Randomly selects collectible types for spawning (currently only health implemented)
- Handles time-based spawning with configurable intervals
- Integrates with useCollectibleSpawner for spawn logic
- Integrates with useCollectibleCollector for collection detection
- Renders active collectibles using BaseCollectible components
- Supports theme-based collectible models and fallbacks

// TO ADD NEW COLLECTIBLE TYPES:
// 1. Add to collectibleTypes.js with id, effect, value, duration
// 2. Add effect logic to useCollectibleCollector applyCollectibleEffect
// 3. Add required state setters as props to useCollectibleCollector
// 4. Update this component to pass new props to useCollectibleCollector
// 5. Add visual config to themes.js collectibles section
```
**AI Modification:** Modify for new collectible types, spawn rates, collection behavior, or visual customization

### **💊 BaseCollectible.jsx** - INDIVIDUAL COLLECTIBLE RENDERER
**Purpose:** Individual collectible component with theme integration and lifecycle management
```javascript
// Key responsibilities:
- Renders individual collectible with theme-based models/geometry
- Handles rotation animation for visual appeal
- Manages collectible lifetime and auto-expiration
- Loads GLB models with fallback geometry support
- Uses theme.collectibles[type] for visual configuration
- Integrates with BaseModel for consistent model loading
```
**AI Modification:** Modify for visual effects, animation behavior, model loading, or theme integration

### **🚀 Projectiles.jsx** - WEAPON SYSTEM
**Purpose:** Projectile management with distance-based hit detection and object pooling
```javascript
// Key responsibilities:
- Renders all active projectiles from projectiles array (object pool)
- Maps projectile types to specific components (currently only Bullet)
- Coordinates distance-based hit detection between projectiles and enemies
- Manages enemy health reduction and death when hit
- Updates game score and statistics when enemies defeated
- Manages projectile cleanup when they hit or expire
```
**AI Modification:** To add new projectiles: 1) Add to projectileTypes.js, 2) Create new component in projectiles/, 3) Add to ProjectileComponents map

## 🖥️ UI SCREEN COMPONENTS

### **StartScreen.jsx** - MAIN MENU
**Purpose:** Game entry point with theme selection and navigation
```javascript
// Features:
- Theme selection dropdown
- Start game button
- Settings navigation
- Responsive design for mobile/desktop
```
**AI Modification:** Add new menu options, modify theme selection, or enhance UI styling

### **⚙️ SettingsScreen.jsx** - GAME CONFIGURATION
**Purpose:** Real-time game settings with live preview
```javascript
// Features:
- Dynamic slider generation from settingsConfig.js
- Real-time setting updates via Jotai atoms
- Category-based organization
- Save/reset functionality
```
**AI Modification:** Add new settings categories, modify UI layout, or add new control types

### **💀 GameOverScreen.jsx** - END GAME STATISTICS
**Purpose:** Game over screen with statistics and navigation
```javascript
// Features:
- Final score display
- Enemies killed counter
- Restart game functionality
- Return to menu navigation
```
**AI Modification:** Add new statistics, modify scoring system, or enhance end-game experience

### **📊 HUD.jsx** - IN-GAME UI OVERLAY
**Purpose:** Real-time game information during gameplay
```javascript
// Features:
- Health bar display
- Score counter
- Enemies killed tracker
- Settings button (only during 'playing' state)
- Mobile-responsive positioning

// Props required:
- playerHealth, score, enemiesKilled, showHUD, gameState, setGameState

// Settings integration:
- Uses useSettingsNavigation hook with gameState and setGameState props
- Settings button appears only when gameState === 'playing'
- Preserves game state when navigating to settings
```
**AI Modification:** Add new HUD elements, modify positioning, enhance visual design, or add new navigation buttons

### **📱 MobileGameControls.jsx** - MOBILE TOUCH INTERFACE
**Purpose:** Complete mobile control interface with dual joysticks and action buttons
```javascript
// Key responsibilities:
- Provides virtual joystick for movement (left side)
- Provides virtual joystick for rotation/aiming (right side)
- Provides shoot button for primary action (center bottom)
- Integrates with useMobileControls hook for input processing
- Responsive design for various screen sizes
- Touch event handling with smooth input tracking
- Visual feedback for touch interactions
- Configurable joystick and button sizes
```
**AI Modification:** Add more action buttons, modify joystick appearance, add haptic feedback, or adjust touch sensitivity

## 🎨 UI COMPONENTS (`ui/` subfolder)

### **HealthBar.jsx** - HEALTH VISUALIZATION
```javascript
// Features: Visual health bar with percentage, smooth animations, color transitions
// AI Modification: Change colors, add effects, or modify health display logic
```

### **ScoreDisplay.jsx** - SCORE COUNTER
```javascript  
// Features: Real-time score formatting, number animations, responsive sizing
// AI Modification: Add score multipliers, modify formatting, or add visual effects
```

### **EnemyKilledDisplay.jsx** - KILL COUNTER
```javascript
// Features: Enemy kill tracking, milestone notifications, achievement system
// AI Modification: Add kill streaks, modify notifications, or add achievement logic
```

### **ScreenHeader.jsx** - REUSABLE TITLE COMPONENT
```javascript
// Features: Consistent screen titles, responsive typography, theme-aware styling
// AI Modification: Add animations, modify styling, or add subtitle support
```

### **StatsPanel.jsx** - FLEXIBLE STATISTICS DISPLAY
```javascript
// Features: Configurable stat display, grid layout, theme integration
// AI Modification: Add new stat types, modify layout, or enhance visual presentation
```

## 👹 ENEMY SYSTEM (`enemies/` subfolder)

### **BaseEnemy.jsx** - CORE ENEMY FOUNDATION
**Purpose:** Base enemy component with integrated behavior hooks
```javascript
// Integrated hooks:
- useEnemyChase (simple chase movement toward player)
- useEnemyAttack (distance-based combat)
- useEnemyCleanup (boundary management)
- useEnemyFacing (visual rotation toward player)

// Key features:
- Theme-based model loading with fallback geometry
- Health management and damage processing
- Physics integration with dynamic collision detection (size calculated from scale)
```
**AI Modification:** Modify core enemy behavior, add new behavior hooks, or enhance visual effects

### **FastEnemy.jsx** - FAST ENEMY TYPE
```javascript
// Characteristics: High speed, low health, sphere geometry
// Configuration: Uses ENEMY_BASES.fast from baseConfigs.js
// AI Modification: Adjust speed/health balance, add special abilities
```

### **TankEnemy.jsx** - TANK ENEMY TYPE  
```javascript
// Characteristics: Low speed, high health, box geometry
// Configuration: Uses ENEMY_BASES.tank from baseConfigs.js
// AI Modification: Add armor mechanics, special attacks, or defensive abilities
```

### **EnemySpawner.jsx** - ENEMY GENERATION SYSTEM
```javascript
// Features:
- Dynamic enemy spawning with difficulty scaling
- Multiple enemy type support
- Spawn rate configuration via atoms
- Performance optimization with spawn limits
```
**AI Modification:** Add new spawn patterns, modify difficulty curves, or implement wave systems

## 🚀 PROJECTILE SYSTEM (`projectiles/` subfolder)

### **BaseProjectile.jsx** - CORE PROJECTILE PHYSICS
**Purpose:** Foundation projectile with Kinematic physics and distance-based hit detection
```javascript
// Key features:
- Kinematic physics movement (code-controlled, not physics simulation)
- Manual distance-based hit detection with enemies (not physics collision)
- Automatic cleanup on boundary exit or after 5 seconds
- Object pooling integration
- Visual effects and trails
```
**AI Modification:** Add new projectile types, modify physics, or enhance visual effects

### **Bullet.jsx** - BASIC BULLET TYPE
**Purpose:** Simple bullet wrapper around BaseProjectile (currently the only projectile type)
```javascript
// Features: Pure passthrough wrapper - forwards all props to BaseProjectile
// Configuration: Uses projectileTypes.js for properties
// Pattern: Template for creating new projectile types with custom behavior
```
**AI Modification:** Create new projectile components following this pattern (LaserProjectile, RocketProjectile, etc.)

### **🔧 Adding New Projectile Types - Step by Step:**
```javascript
// 1. Add to src/data/projectileTypes.js:
{
  id: 'laser',
  name: 'Laser Beam', 
  size: 0.2,
  speed: 25,
  damage: 40,
  color: '#ff0000',
  emissiveIntensity: 0.8,
  mass: 0.05,
  lifetimeMs: 3000
}

// 2. Create src/components/projectiles/LaserProjectile.jsx:
import { BaseProjectile } from './BaseProjectile';
export const LaserProjectile = (props) => {
  // Custom laser behavior/visuals
  return <BaseProjectile {...props} />;
};

// 3. Add to ProjectileComponents map in Projectiles.jsx:
const ProjectileComponents = {
  bullet: Bullet,
  laser: LaserProjectile  // Add this line
};
```

## 🎭 3D MODEL SYSTEM (`GltfLoader/` subfolder)

### **BaseModel.jsx** - UNIVERSAL MODEL LOADER
**Purpose:** Handles all 3D model loading with fallback systems
```javascript
// Features:
- GLTF/GLB model loading
- Automatic fallback to geometric shapes
- Theme-based model selection
- Error handling and loading states
- Auto-scaling and centering
```
**AI Modification:** Add new model formats, modify loading behavior, or enhance error handling

### **GLTFLoader.jsx** - GLTF PROCESSOR
```javascript
// Features:
- Three.js GLTF loader integration
- Texture processing
```
**AI Modification:** Add animation support, modify materials, or optimize loading performance

## 🔧 FALLBACK MODEL SYSTEM (`baseModel/` subfolder)

### **BasePlayerModel.jsx** - PLAYER FALLBACK GEOMETRY
```javascript
// Features: Geometric player representation with directional indicator
// AI Modification: Change shapes, add visual indicators, or enhance styling
```

### **BaseEnemyModel.jsx** - ENEMY FALLBACK GEOMETRY
```javascript
// Features: Simple geometric enemy shapes with theme colors
// AI Modification: Add enemy type differentiation, modify shapes, or add effects
```

### **GeometryRenderer.jsx** - GENERIC SHAPE RENDERER
```javascript
// Supported shapes: box, sphere, cylinder, cone, octahedron
// Features: Theme color integration, material properties, scaling
// AI Modification: Add new shapes, modify materials, or add procedural generation
```

## 🌍 ENVIRONMENT COMPONENTS

### **LightingManager.jsx** - SCENE ILLUMINATION SYSTEM
```javascript
// Features: Dynamic lighting system with theme-based configuration
// Responsibilities: Ambient, directional, and point light management
// AI Modification: Add dynamic lighting, shadows, or special lighting effects
```

### **EnvironmentSetup.jsx** - WORLD ENVIRONMENT COORDINATOR
```javascript
// Features: Skybox, ground, fog, and world boundary setup
// Responsibilities: Complete environment rendering and theme integration
// AI Modification: Add weather effects, time-of-day cycles, or environmental hazards
```

### **ParticleRenderer.jsx** - ENVIRONMENTAL EFFECTS
```javascript
// Features: Theme-based particle systems (stars, dust, sparks, fireflies)
// Status: Currently disabled for performance in Scene.jsx
// AI Modification: Add new particle types, modify behavior, or enhance performance
```

### **Floor.jsx** - GROUND PLANE (Used by GameRenderer)
```javascript
// Features: Physics-enabled ground plane, texture mapping, theme integration
// AI Modification: Add terrain variation, modify physics, or enhance textures
```

## 🔄 COMPONENT INTERACTION PATTERNS

### **State Management Flow (Hybrid Pattern):**
```
Scene.jsx (reads atoms, passes props)
    ↓
GameRenderer (receives props, reads atoms, passes props)
    ↓
Components (receive props, read atoms) → Hooks (game logic) → State updates
```

### **Rendering Hierarchy:**
```
Scene.jsx
├── GameRenderer.jsx (during gameplay)
│   ├── Player.jsx
│   ├── Enemies.jsx  
│   ├── Projectiles.jsx
│   ├── collectibles/
│   │   ├── CollectibleManager.jsx
│   │   └── BaseCollectible.jsx
│   ├── MobileControls/
│   │   └── MobileGameControls.jsx
│   └── Environment components
├── StartScreen.jsx (menu state)
├── SettingsScreen.jsx (settings state)
├── GameOverScreen.jsx (gameOver state)
└── HUD.jsx (overlay during gameplay)
```

### **Hook Integration Pattern:**
```javascript
// Components use hooks for game logic:
function Player() {
  usePlayerMovement();    // Physics movement
  usePlayerRotation(api, gameState, callback, mobilePos);  // Multi-platform rotation
  usePlayerShooting();    // Weapon system
  usePlayerCamera();      // Camera following
  usePlayerHealth();      // Health management
  
  return <BaseModel />; // 3D representation
}
```

## 📋 AI MODIFICATION GUIDELINES

### **Adding New Components:**
1. Follow existing naming conventions (PascalCase)
2. Use hooks for game logic, components for rendering
3. Integrate with theme system for visual consistency
4. Add comprehensive documentation comments
5. Include fallback systems for robustness

### **Modifying Existing Components:**
1. Check component dependencies before changes
2. Update related hooks if behavior changes
3. Maintain theme compatibility
4. Test with all available themes
5. Preserve performance optimizations

### **Component Dependencies:**
- **Scene.jsx** - Central dependency, affects all components
- **GameRenderer.jsx** - Affects all 3D entities
- **Theme system** - Visual changes affect multiple components
- **Atoms** - State changes propagate to dependent components

### **Performance Considerations:**
- Use React.memo for expensive components
- Implement object pooling for frequently created/destroyed entities
- Optimize useFrame calls in hooks
- Minimize state updates during game loop
- Use efficient collision detection algorithms

## 🚨 CRITICAL FILES FOR AI

### **Must Understand:**
- **Scene.jsx** - Game coordinator and state manager
- **GameRenderer.jsx** - 3D rendering coordinator
- **BaseModel.jsx** - Universal model loading system
- **BaseEnemy.jsx** - Enemy behavior foundation

### **Frequently Modified:**
- **Theme-related components** - For visual customization
- **UI components** - For interface improvements
- **Enemy components** - For gameplay balance
- **Projectile components** - For weapon systems

### **Safe to Modify:**
- Individual UI components (isolated functionality)
- Fallback model components (visual only)
- Environment components (atmospheric effects)
- Individual enemy type components

### **Modify with Caution:**
- Scene.jsx (affects entire game)
- GameRenderer.jsx (affects all 3D entities)
- Core hook integrations (complex dependencies)

This component system provides a **complete, modular foundation** for 3D game development. Each component is documented, tested, and designed for easy AI modification while maintaining system stability and performance.
