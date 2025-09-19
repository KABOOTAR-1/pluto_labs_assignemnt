# 🎮 Three.js Top-Down Shooter Template

A modular 3D shooter built with React Three Fiber, featuring AI-friendly documentation and theme-based customization.

## 🚀 Quick Start
   ```bash
npm install && npm run dev
```

## 📁 Folder Structure

```
threejsgame/
├── 🚀 index.html                    # Entry point - HTML container
├── 🚀 src/main.jsx                  # Entry point - React app initialization
├── 🚀 src/App.jsx                   # Entry point - Main app component
├── 📦 package.json                  # Dependencies and scripts
├── ⚙️ vite.config.js               # Build configuration
├── 🎨 src/App.css                  # Global styles
├── 📖 TEMPLATE_GUIDE.md            # Detailed modification guide
└── src/
    ├── components/                  # React components
    │   ├── 🎮 GameRenderer.jsx     # 3D Entity Coordinator - Renders game entities in physics world
    │   ├── 🌍 Scene.jsx            # MAIN GAME STATE MANAGER - Start here for game logic
    │   ├── 👤 Player.jsx           # Player character with modular hooks
    │   ├── 👹 Enemies.jsx          # Enemy management and rendering
    │   ├── 🚀 Projectiles.jsx      # Projectile system with collision
    │   ├── 🖥️ StartScreen.jsx      # Main menu interface
    │   ├── ⚙️ SettingsScreen.jsx   # Game configuration screen
    │   ├── 💀 GameOverScreen.jsx   # End game screen
    │   ├── 📊 HUD.jsx              # In-game UI overlay
    │   ├── baseModel/              # Fallback geometry renderers
    │   │   ├── BasePlayerModel.jsx # Player fallback geometry
    │   │   ├── BaseEnemyModel.jsx  # Enemy fallback geometry
    │   │   └── GeometryRenderer.jsx # Generic shape renderer
    │   ├── enemies/                # Enemy system
    │   │   ├── BaseEnemy.jsx       # Core enemy with behavior hooks
    │   │   ├── FastEnemy.jsx       # Fast enemy type
    │   │   ├── TankEnemy.jsx       # Tank enemy type
    │   │   └── EnemySpawner.jsx    # Enemy generation system
    │   ├── GltfLoader/             # 3D model loading
    │   │   ├── BaseModel.jsx       # Universal model loader
    │   │   └── GLTFLoader.jsx      # GLTF processor
    │   ├── projectiles/            # Projectile system
    │   │   ├── BaseProjectile.jsx  # Core projectile physics
    │   │   └── Bullet.jsx          # Basic bullet type
    │   ├── ui/                     # UI components
    │   │   ├── HealthBar.jsx       # Health progress bar
    │   │   ├── ScoreDisplay.jsx    # Score counter
    │   │   ├── EnemyKilledDisplay.jsx # Kill counter
    │   │   ├── ScreenHeader.jsx    # Screen titles
    │   │   └── StatsPanel.jsx      # Statistics display
    │   └── [environment components...] # Floor, lighting, particles, etc.
    ├── hooks/                      # 🔧 Custom React hooks - GAME LOGIC HERE
    │   ├── usePlayerMovement.js        # Player movement with physics
    │   ├── usePlayerRotation.js        # Mouse-based player rotation
    │   ├── usePlayerShooting.js        # Weapon and projectile system
    │   ├── usePlayerCamera.js          # Smooth camera following
    │   ├── usePlayerHealth.js          # Health management and damage
    │   ├── useKeyControls.js           # Keyboard input handling
    │   ├── useMouseControls.js         # Mouse input and aiming
    │   ├── useEnemySpawner.js          # Dynamic enemy generation
    │   ├── useEnemyChase.js            # Enemy AI movement
    │   ├── useEnemyAttack.js           # Enemy combat system
    │   ├── useEnemyCleanup.js          # Enemy boundary cleanup
    │   ├── useEnemyFacing.js           # Enemy visual rotation
    │   ├── useSettingsNavigation.js    # Settings screen navigation
    │   └── useConditionalTexture.js    # Vite-compatible texture loading
    ├── config/                     # 📋 Configuration - SETTINGS & STATE
    │   ├── atoms/                  # Jotai state management
    │   │   ├── gameStateAtoms.js   # Game flow state
    │   │   ├── playerAtoms.js      # Player state
    │   │   ├── entityAtoms.js      # Enemies/projectiles
    │   │   ├── settingsAtoms.js    # User settings
    │   │   └── index.js            # Atom exports
    │   ├── themes/
    │   │   └── themes.js           # 🎨 VISUAL THEMES - Change appearance here
    │   ├── gameConfig.js           # 🎯 MAIN SETTINGS - Core game configuration
    │   ├── baseConfigs.js          # Entity base stats (health, speed, damage)
    │   ├── settingsConfig.js       # Settings UI configuration
    │   └── constants.js            # Game constants
    ├── data/
    │   └── projectileTypes.js      # 🔫 WEAPON TYPES - Add new weapons here
    ├── utils/
    │   └── gameUtils.js            # 🛠️ UTILITIES - Object pooling system
    └── models/                     # 🎨 3D ASSETS - Add new models here
        ├── space/                  # Futuristic theme assets
        ├── post/                   # Post-apocalyptic assets
        ├── medival/                # Medieval theme assets
        ├── skybox/                 # Environment backgrounds
        └── ground/                 # Floor textures
```

## 🎯 AI Navigation Guide

### **🚀 Entry Points (Start Here)**
1. **`index.html`** → **`src/main.jsx`** → **`src/App.jsx`** → **`Scene.jsx`**
2. **Main Game State**: `src/components/Scene.jsx` (manages all atoms and coordinates game)
3. **Game Logic**: `src/hooks/` (actual game loop via useFrame calls)
4. **3D Rendering**: `src/components/GameRenderer.jsx` (renders entities in physics world)
5. **Configuration**: `src/config/gameConfig.js` and `src/config/themes/themes.js`

### **📍 Go Here For Specific Changes**
- **🎮 Gameplay Mechanics** → `src/hooks/` (player/enemy hooks)
- **🎨 Visual Themes** → `src/config/themes/themes.js` + `src/models/`
- **⚙️ Game Settings** → `src/config/gameConfig.js` + `src/config/settingsConfig.js`
- **🔫 Weapons/Projectiles** → `src/data/projectileTypes.js` + `src/components/projectiles/`
- **👹 Enemy Types** → `src/config/baseConfigs.js` + `src/components/enemies/`
- **🖥️ UI/Screens** → `src/components/` (StartScreen, SettingsScreen, etc.)
- **🎭 3D Models** → `src/models/` + `src/components/GltfLoader/`

## 📁 Component Structure

### **Core Game Components**
- `Scene.jsx` - Main game state manager with Jotai atoms and Canvas setup
- `GameRenderer.jsx` - 3D entity coordinator within physics world
- `Player.jsx` - Player character with modular hook-based systems
- `Enemies.jsx` - Enemy management, rendering, and collision system
- `Projectiles.jsx` - Projectile management with collision detection

### **UI Screens**
- `StartScreen.jsx` - Main menu interface
- `SettingsScreen.jsx` - Real-time game configuration with sliders
- `GameOverScreen.jsx` - End game statistics and navigation
- `HUD.jsx` - In-game UI overlay with health/score

### **UI Components** (`src/components/ui/`)
- `HealthBar.jsx` - Visual health progress bar with percentage display
- `ScoreDisplay.jsx` - Real-time score counter with formatting
- `EnemyKilledDisplay.jsx` - Enemy kill counter with live updates
- `ScreenHeader.jsx` - Reusable screen title component
- `StatsPanel.jsx` - Flexible statistics display panel

### **Enemy System** (`src/components/enemies/`)
- `BaseEnemy.jsx` - Core enemy with behavior hooks (chase, attack, cleanup, facing)
- `FastEnemy.jsx` - Fast, low-health enemy type wrapper
- `TankEnemy.jsx` - Slow, high-health enemy type wrapper
- `EnemySpawner.jsx` - Dynamic enemy generation with difficulty scaling

### **Projectile System** (`src/components/projectiles/`)
- `BaseProjectile.jsx` - Core projectile with Kinematic physics and collision detection
- `Bullet.jsx` - Basic bullet type wrapper around BaseProjectile

### **3D Model System** (`src/components/GltfLoader/`)
- `BaseModel.jsx` - Universal model loader with fallback geometry routing
- `GLTFLoader.jsx` - GLTF processor with auto-scaling, centering, and texture loading

### **Fallback Models** (`src/components/baseModel/`)
- `BasePlayerModel.jsx` - Player fallback geometry with directional indicator
- `BaseEnemyModel.jsx` - Enemy fallback geometry renderer
- `GeometryRenderer.jsx` - Generic shape renderer (box, sphere, cylinder, cone)

### **Game Hooks** (`src/hooks/`)
- **usePlayerMovement.js** - Kinematic physics movement with WASD controls and boundary checking
- **usePlayerRotation.js** - Mouse-based player rotation with smooth interpolation
- **usePlayerShooting.js** - Weapon system with projectile spawning and firing mechanics
- **usePlayerCamera.js** - Smooth third-person camera following with fixed timestep
- **usePlayerHealth.js** - Health management, damage processing, and game over detection
- **useKeyControls.js** - Keyboard input handling (WASD/Arrow keys)
- **useMouseControls.js** - Mouse movement tracking and click detection for aiming/shooting
- **useEnemySpawner.js** - Dynamic enemy generation with difficulty scaling and object pooling
- **useEnemyChase.js** - AI pursuit behavior using Kinematic physics velocity
- **useEnemyAttack.js** - Collision-based combat system with attack cooldown
- **useEnemyCleanup.js** - World boundary safety system for enemy removal
- **useEnemyFacing.js** - Visual enemy rotation to face player for better feedback
- **useSettingsNavigation.js** - Settings screen navigation with state preservation
- **useConditionalTexture.js** - Vite-compatible texture loading with error handling

### **Configuration** (`src/config/`)
- **atoms/** - Jotai state atoms for reactive game state management
  - `gameStateAtoms.js` - Game flow control (menu, playing, gameOver, settings)
  - `playerAtoms.js` - Player state (health, position, rotation, settings)
  - `entityAtoms.js` - Dynamic entities (enemies array, projectiles array)
  - `settingsAtoms.js` - User preferences (spawn rates, difficulty, speeds)
- **themes/themes.js** - Complete visual theme system (models, textures, colors, particles)
- **gameConfig.js** - Core game mechanics (physics, camera, world bounds, rules)
- **baseConfigs.js** - Entity base stats (PLAYER_BASE, ENEMY_BASES, health/speed/damage)
- **settingsConfig.js** - Settings UI configuration (sliders, ranges, labels)
- **constants.js** - Game constants and enums (GAME_STATES, default values)

### **Assets** (`src/models/`)
- `space/` - Futuristic theme assets
- `post/` - Post-apocalyptic theme assets
- `medival/` - Medieval theme assets

## 🎯 Key Features
- **Kinematic Physics** - Code-controlled movement with collision
- **Object Pooling** - Performance optimization for entities
- **Theme System** - Swappable visual themes with 3D models
- **Modular Hooks** - Separated game logic for easy customization
- **AI Documentation** - Fragment-system comments in every file

## 🔧 Tech Stack
React Three Fiber, @react-three/cannon, Jotai, Three.js, Vite

## 🎮 Controls
WASD/Arrows (move), Mouse (aim/shoot)

## 📖 For AI
Every file includes comprehensive documentation with purpose, integration points, usage examples, and customization guides.
