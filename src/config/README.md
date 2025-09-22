# 🎮 Configuration System - Complete Guide

## 📁 Config Folder Overview

The `src/config/` folder contains the **central nervous system** of the Three.js game. This is where all game settings, theme configurations, and state management atoms are defined. The configuration system is designed to be **modular, extensible, and AI-friendly**.

## 🏗️ Architecture Overview

```
src/config/
├── README.md              # 📖 This documentation
├── baseConfigs.js         # 🔧 Foundation game settings
├── configHelpers.js       # 🛠️ Utility functions for configuration
├── constants.js           # 📊 Game constants and enums
├── gameConfig.js          # ⚙️ Main game configuration hub
├── settingsConfig.js      # 🎛️ User settings configuration
├── atoms/                 # 🔄 State management atoms
│   ├── index.js          # 📤 Central atom exports
│   ├── gameStateAtoms.js # 🎯 Core game state
│   ├── playerAtoms.js    # 🧑‍🚀 Player-related state
│   ├── entityAtoms.js    # 👹 Game entities state
│   ├── collectibleAtoms.js # 💎 Collectible system state
│   ├── inputAtoms.js     # 🎮 Input system state
│   └── settingsAtoms.js  # ⚙️ Settings state
└── themes/               # 🎨 Theme system
    └── themes.js         # 🎭 Theme definitions
```

## 🎨 Theme System - Complete Guide

The theme system allows you to create completely different visual styles and gameplay experiences. Each theme can customize models, textures, lighting, particles, and even gameplay parameters.

### **🎭 How Themes Work**

1. **Theme Selection**: Player chooses theme via `selectedThemeAtom`
2. **Configuration Override**: Theme settings override base game config
3. **Asset Loading**: Models, textures, and effects load based on theme
4. **Smooth Transitions**: Components update reactively when theme changes

### **📁 Theme File Structure**

```
themes/themes.js
├── themes (object)
│   ├── classic (theme)
│   │   ├── name: "Classic"
│   │   ├── player: { modelUrl, speed, health, ... }
│   │   ├── enemies: { types: [...] }
│   │   └── environment: { ground, skybox, lighting, particles }
│   ├── space (theme)
│   ├── medieval (theme)
│   └── postapocalyptic (theme)
```

## 🚀 Adding a New Theme - Step by Step

### **Step 1: Add Theme to Constants**

**File:** `src/config/constants.js`

```javascript
// Add your new theme to the THEMES enum
export const THEMES = {
  CLASSIC: 'classic',
  SPACE: 'space',
  MEDIEVAL: 'medieval',
  POSTAPOCALYPTIC: 'postapocalyptic',
  CYBERPUNK: 'cyberpunk',        // ← Add this line
  FANTASY: 'fantasy'             // ← Add this line
};
```

### **Step 2: Create Theme Definition**

**File:** `src/config/themes/themes.js`

```javascript
export const themes = {
  // ... existing themes ...

  // 🎨 NEW CYBERPUNK THEME
  cyberpunk: {
    name: 'Cyberpunk 2077',  // Display name in UI

    // 🧑‍🚀 PLAYER CONFIGURATION
    player: {
      modelUrl: '/src/models/cyberpunk/cyberpunkPlayer.glb',  // 3D model path
      fallbackGeometry: 'box',           // Shape if model fails to load
      scale: [1.2, 1.2, 1.2],          // Model size multiplier
      color: 0x00FFFF,                  // Fallback color (cyan)
      rotation: [0, 0, 0],              // Initial rotation
      speed: 6,                         // Movement speed (faster than classic)
      health: 120,                      // Health points (tougher)
      // projectileSpeed removed - now per-projectile in projectileTypes.js
    },

    // 👹 ENEMY CONFIGURATION
    enemies: {
      types: [
        {
          // 🚀 FAST CYBER ENEMY
          name: 'Cyber Drone',
          modelUrl: '/src/models/cyberpunk/drone.glb',
          fallbackGeometry: 'sphere',
          color: 0xFF00FF,              // Magenta
          speed: 8,                     // Very fast
          health: 60,                   // Less health (easier to kill)
          damage: 15,                   // Moderate damage
          facePlayer: true,             // Always faces player
          scale: [0.8, 0.8, 0.8]       // Smaller visual and collision size
        },
        {
          // 🛡️ HEAVY CYBER ENEMY
          name: 'Cyber Tank',
          modelUrl: '/src/models/cyberpunk/tank.glb',
          fallbackGeometry: 'box',
          color: 0xFF0000,              // Red
          speed: 2,                     // Slow but powerful
          health: 200,                  // High health
          damage: 25,                   // High damage
          facePlayer: true,
          scale: [1.5, 1.5, 1.5]       // Larger visual and collision size
        }
      ]
    },

    // 🌆 ENVIRONMENT CONFIGURATION
    environment: {
      // 🏗️ GROUND SETTINGS
      ground: {
        color: 0x1a1a2e,               // Dark blue-gray
        texture: '/src/models/cyberpunk/cyberGround.jpg',
        material: 'standard',
        metalness: 0.8,                // Metallic surface
        roughness: 0.2                 // Smooth surface
      },

      // 🌃 SKYBOX SETTINGS
      background: { color: 0x0a0a14 }, // Very dark blue
      skybox: {
        texturePath: '/src/models/cyberpunk/cyberSkybox.hdr',
        skyType: 'night'               // Dark, neon-lit night
      },

      // 💡 LIGHTING SETUP
      lighting: {
        // 🌙 AMBIENT LIGHTING
        ambient: {
          color: 0x4444FF,            // Blue ambient light
          intensity: 0.3               // Dim ambient
        },

        // ☀️ DIRECTIONAL LIGHTS
        directional: [
          {
            color: 0xFFFFFF,          // White sunlight
            intensity: 0.8,
            position: [1, 1, 0.5]     // From above-right
          },
          {
            color: 0xFF4444,          // Red accent light
            intensity: 0.4,
            position: [-1, 0.5, -0.5] // From left
          }
        ],

        // 💡 POINT LIGHTS (neon signs, etc.)
        point: [
          {
            color: 0x00FFFF,          // Cyan neon
            intensity: 0.8,
            position: [0, 15, 0],     // High center
            distance: 30
          },
          {
            color: 0xFF00FF,          // Magenta neon
            intensity: 0.6,
            position: [20, 10, 20],   // Corner
            distance: 25
          }
        ]
      },

      // ✨ PARTICLE EFFECTS
      fog: {
        color: 0x1a1a2e,              // Matches ground color
        near: 20,                     // Fog starts closer
        far: 80                       // Fog ends farther
      },

      particles: {
        // 🌟 STARS IN THE NIGHT SKY
        stars: {
          count: 1500,                // More stars for cyberpunk
          color: 0xFFFFFF,
          size: 2
        },

        // ⚡ ELECTRIC SPARKS
        sparks: {
          count: 300,                 // Cyberpunk sparks
          colors: [0x00FFFF, 0xFF00FF, 0xFFFF00], // Neon colors
          size: 3
        },

        // 🌆 CITY LIGHTS
        cityLights: {
          count: 200,
          color: 0xFFFFFF,
          size: 1
        }
      }
    },

    // 🚧 OBSTACLE CONFIGURATION
    obstacles: {
      basic: {
        modelUrl: '/src/models/cyberpunk/serverRack.glb',
        fallbackGeometry: 'box',
        material: { color: 0x666666, metalness: 0.9 }
      },
      barrier: {
        modelUrl: '/src/models/cyberpunk/forceField.glb',
        fallbackGeometry: 'cylinder',
        material: { color: 0x00FFFF, transparent: true, opacity: 0.7 }
      }
    },

    // 💎 COLLECTIBLE CONFIGURATION
    collectibles: {
      health: {
        modelUrl: '/src/models/cyberpunk/healthPack.glb',
        fallbackGeometry: 'octahedron',
        material: { color: 0x76FF03, emissive: 0x76FF03, emissiveIntensity: 0.6 }
      },
      speed: {
        modelUrl: '/src/models/cyberpunk/speedBooster.glb',
        fallbackGeometry: 'sphere',
        material: { color: 0x03A9F4, emissive: 0x03A9F4, emissiveIntensity: 0.4 }
      },
      damage: {
        modelUrl: '/src/models/cyberpunk/damageAmp.glb',
        fallbackGeometry: 'box',
        material: { color: 0xFF5722, emissive: 0xFF5722, emissiveIntensity: 0.5 }
      },
      shield: {
        modelUrl: '/src/models/cyberpunk/shieldGen.glb',
        fallbackGeometry: 'cylinder',
        material: { color: 0x9C27B0, emissive: 0x9C27B0, emissiveIntensity: 0.3 }
      }
    },

    // 🎯 WEAPON CONFIGURATION (if applicable)
    weapons: {
      // Weapon-specific configurations can go here
    }
  }
};
```

### **Step 3: Add Theme Assets**

Create the asset folder structure:
```
src/models/cyberpunk/
├── cyberpunkPlayer.glb
├── drone.glb
├── tank.glb
├── serverRack.glb
├── forceField.glb
├── dataChip.glb
├── energyCore.glb
├── cyberGround.jpg
└── cyberSkybox.hdr
```

### **Step 4: Test the Theme**

```javascript
// In any component, switch to your new theme:
import { useAtom } from 'jotai';
import { selectedThemeAtom } from '../config/gameConfig';
import { THEMES } from '../config/constants';

function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useAtom(selectedThemeAtom);

  const switchToCyberpunk = () => {
    setCurrentTheme(THEMES.CYBERPUNK);
  };

  return (
    <button onClick={switchToCyberpunk}>
      Switch to Cyberpunk Theme
    </button>
  );
}
```

## 🔧 Modifying Existing Themes

### **🎨 Changing Visual Properties**

```javascript
// Example: Make space theme more colorful
export const themes = {
  space: {
    name: 'Deep Space',
    player: {
      // ... existing properties ...
      color: 0xFF6B6B,  // Change from blue to coral
      speed: 7           // Make player faster
    },
    environment: {
      lighting: {
        ambient: {
          color: 0x6B73FF,  // Purple ambient light
          intensity: 0.5    // Brighter ambient
        }
        // ... other lighting changes ...
      }
    }
  }
};
```

### **📊 Changing Gameplay Balance**

```javascript
// Example: Make medieval theme easier
export const themes = {
  medieval: {
    name: 'Medieval Fantasy',
    player: {
      health: 150,        // More health
      speed: 6           // Faster movement
    },
    enemies: {
      types: [
        {
          speed: 3,       // Slower enemies
          health: 40,     // Less health
          damage: 8       // Less damage
        }
      ]
    }
  }
};
```

## 🎯 Theme Configuration Properties

### **🧑‍🚀 Player Properties**
- `modelUrl`: Path to 3D model file
- `fallbackGeometry`: Shape if model fails ('box', 'sphere', 'cylinder')
- `scale`: Visual size multiplier [x, y, z] - Automatically sets collision size to Math.max(...scale)
- `color`: Hex color for fallback geometry
- `rotation`: Initial rotation [x, y, z] in radians
- `speed`: Movement speed (units/second)
- `health`: Maximum health points

### **👹 Enemy Properties**
- `name`: Display name for enemy type
- `modelUrl`: Path to enemy 3D model
- `speed`: Movement speed
- `health`: Hit points
- `damage`: Damage dealt to player
- `facePlayer`: Whether enemy rotates to face player
- `scale`: Visual size multiplier [x, y, z] - Automatically sets collision size to Math.max(...scale)
- `color`: Fallback color

### **🌍 Environment Properties**

#### **Ground Settings:**
- `color`: Hex color for ground
- `texture`: Path to ground texture image
- `material`: Material type ('standard', 'basic')
- `metalness`: Metallic surface property (0-1)
- `roughness`: Surface roughness (0-1)

#### **Skybox Settings:**
- `texturePath`: Path to HDR skybox image
- `skyType`: Sky appearance ('day', 'night', 'sunset')

#### **Lighting Setup:**
- `ambient`: Overall scene illumination
- `directional`: Sun-like directional lights
- `point`: Local light sources

#### **Particle Effects:**
- `stars`: Starfield for space themes
- `fireflies`: Ambient floating lights
- `dust`: Atmospheric particles
- `sparks`: Dynamic spark effects

## 🚨 Important Notes for Theme Creation

### **⚠️ Asset Requirements:**
- Models should be in GLTF/GLB format
- Textures should be power-of-2 sizes (256x256, 512x512, etc.)
- HDR skyboxes provide best lighting

### **🎮 Performance Considerations:**
- Too many particles can reduce FPS
- Large models increase load times
- Complex lighting setups impact performance

### **🔄 Theme Switching:**
- Themes update when `selectedThemeAtom` changes
- Components re-render with new theme data
- Visual changes happen through React's reactive system

### **🛠️ Debugging Themes:**
```javascript
// Check current theme in browser console
import { useCurrentTheme } from '../config/gameConfig';

function DebugComponent() {
  const theme = useCurrentTheme();
  console.log('Current theme:', theme);
  return null;
}
```

## 🎨 Advanced Theme Features

### **Conditional Properties:**
```javascript
// Theme can reference other theme properties
cyberpunk: {
  player: {
    speed: 6,
    health: 120
  },
  enemies: {
    types: [
      {
        speed: 8,
        health: 60
        // Enemy is faster but weaker
      }
    ]
  }
}
```

### **Theme Inheritance:**
```javascript
// Create variations of existing themes
const baseCyberpunk = themes.cyberpunk;

export const themes = {
  cyberpunk: baseCyberpunk,
  cyberpunkHard: {
    ...baseCyberpunk,
    player: {
      ...baseCyberpunk.player,
      health: 80  // Harder version has less health
    },
    enemies: {
      types: baseCyberpunk.enemies.types.map(enemy => ({
        ...enemy,
        speed: enemy.speed * 1.5,  // Faster enemies
        health: enemy.health * 1.2  // Tougher enemies
      }))
    }
  }
};
```

This theme system provides **unlimited customization possibilities** while maintaining a consistent structure that AI developers can easily understand and extend.

## 📋 File Responsibilities

### 🎯 **baseConfigs.js** - Foundation Settings
**Purpose:** Defines the core gameplay parameters that rarely change
```javascript
// Contains: PLAYER_BASE, baseGameConfig
// Used for: Speed, health, damage values
// Modified when: Changing core game balance
```

### 📊 **constants.js** - Game Constants
**Purpose:** Centralized constants, enums, and default configurations
```javascript
// Contains: THEMES, GAME_STATES, DEFAULT_CONFIG, ENEMY_SETTINGS
// Used for: Theme switching, game state management, physics settings
// Modified when: Adding new themes or game states
```

### ⚙️ **gameConfig.js** - Main Configuration Hub
**Purpose:** The central configuration orchestrator that combines all settings
```javascript
// Contains: gameConfig object, theme hooks, helper functions
// Used for: Accessing current theme, player config, enemy settings
// Modified when: Adding new configuration categories
```

### 🎛️ **settingsConfig.js** - User Settings
**Purpose:** Defines all user-configurable game settings with UI properties
```javascript
// Contains: settingsConfig object with labels, defaults, ranges
// Used for: Settings screens, user preferences, difficulty adjustment
// Modified when: Adding new user settings
```

### 🛠️ **configHelpers.js** - Configuration Utilities
**Purpose:** Helper functions for configuration processing and validation
```javascript
// Contains: World bounds, theme validation, config merging, lighting setup
// Used for: Boundary checking, theme loading, configuration processing
// Modified when: Adding new configuration processing needs
```

### 🔄 **atoms/** - State Management
**Purpose:** Modular state management using Jotai atoms
```javascript
// Organized by: gameStateAtoms, playerAtoms, entityAtoms, settingsAtoms
// Used for: Reactive state management, component communication
// Modified when: Adding new game state or settings
```

## 📖 Detailed File Documentation

### 🎯 **baseConfigs.js - Core Game Balance**

```javascript
// 🧑‍🚀 PLAYER CONFIGURATION
export const PLAYER_BASE = {
  speed: 5,           // Movement speed (units/second)
  health: 100,        // Starting health points
  // projectileSpeed moved to projectileTypes.js (per-projectile)
  // ... more properties
};

// 🎮 BASE GAME CONFIGURATION
export const baseGameConfig = {
  physics: { /* Physics settings */ },
  rules: { /* Game rules */ },
  // ... foundation settings
};
```

**AI Usage:** Modify these values to change core game balance. All other configs build upon these foundation values.

### 📊 **constants.js - System Constants**

```javascript
// 🎨 THEME SYSTEM
export const THEMES = {
  CLASSIC: 'classic',
  SPACE: 'space',
  MEDIEVAL: 'medieval',
  POSTAPOCALYPTIC: 'postapocalyptic'
};

// 🎮 GAME STATES
export const GAME_STATES = {
  MENU: 'menu',
  PLAYING: 'playing',
  GAME_OVER: 'gameOver',
  SETTINGS: 'settings'
};

// ⚙️ DEFAULT CONFIGURATION
export const DEFAULT_CONFIG = {
  camera: { position: [0, 15, 15], fov: 50 },
  physics: { gravity: [0, -9.81, 0] },
  world: { size: 40, bounds: { minX: -40, maxX: 40, /* ... */ } }
};
```

**AI Usage:** Add new themes to THEMES, modify camera/physics defaults, or add new game states.

### ⚙️ **gameConfig.js - Configuration Orchestrator**

```javascript
// 🎨 THEME SELECTION ATOM
export const selectedThemeAtom = atom(THEMES.CLASSIC);

// ⚙️ MAIN GAME CONFIGURATION
export const gameConfig = {
  ...baseGameConfig,     // Foundation settings
  ...DEFAULT_CONFIG,     // Theme-independent defaults
  player: { ...PLAYER_BASE }, // Player configuration
  themes,                // All available themes
};

// 🎨 THEME ACCESS HOOKS
export function useCurrentTheme() {
  const [selectedTheme] = useAtom(selectedThemeAtom);
  return getTheme(selectedTheme);
}

export function useCurrentPlayerConfig() {
  const theme = useCurrentTheme();
  return theme.player;
}
```

**AI Usage:** Use the hook functions to access current theme data in components. Modify gameConfig to add new configuration categories.

### 🎛️ **settingsConfig.js - User Interface Settings**

```javascript
// ⚙️ SETTINGS CONFIGURATION
export const settingsConfig = {
  player: {
    speed: {
      label: 'Movement Speed',
      default: 5,
      min: 1, max: 15,
      step: 0.5,
      unit: '',
      description: 'How fast the player moves'
    }
    // ... more settings
  }
};

// 🏷️ FORMATTING FUNCTIONS
export const getSettingLabel = (category, key, value) => {
  // Returns formatted label like "Movement Speed: 7.5"
};

export const getSettingConfig = (category, key) => {
  // Returns complete setting configuration
};
```

**AI Usage:** Add new user settings here with UI properties. The SettingsScreen component automatically generates UI from this configuration.

### 🛠️ **configHelpers.js - Configuration Utilities**

```javascript
// 🌍 WORLD MANAGEMENT
export function useWorldBounds() {
  // Returns world boundary configuration
}

export function isWithinBounds(position, bounds) {
  // Checks if position is within world boundaries
}

// ✅ THEME VALIDATION
export function validateTheme(theme) {
  // Ensures theme has required properties
}

// 🔀 CONFIGURATION MERGING
export function mergeThemeConfig(baseConfig, themeConfig) {
  // Deep merges theme overrides with base config
}

// 💡 LIGHTING & PARTICLES
export function createLightingConfig(themeLighting) {
  // Creates lighting setup from theme configuration
}
```

**AI Usage:** Use these utility functions for boundary checking, theme validation, and configuration processing throughout the game.

### 🔄 **atoms/ Folder - State Management**

#### **gameStateAtoms.js - Core Game State**
```javascript
export const gameStateAtom = atom(GAME_STATES.MENU);
export const scoreAtom = atom(0);
export const enemiesKilledAtom = atom(0);
```
**AI Usage:** Use these for managing global game state and progress tracking.

#### **playerAtoms.js - Player Runtime State**
```javascript
export const activePlayerHealthAtom = atom(gameConfig.player.health);
export const playerPositionAtom = atom([0, 0, 0]);
export const playerRotationAtom = atom(0);
export const currentProjectileTypeAtom = atom('default');
```
**AI Usage:** Track and modify player's current state during gameplay. These values change during active gameplay and are reset between games.

#### **entityAtoms.js - Game Entities**
```javascript
export const enemiesAtom = atom([]);
export const projectilesAtom = atom(createProjectilePool());
```
**AI Usage:** Manage collections of enemies and projectiles.

#### **collectibleAtoms.js - Collectible System**
```javascript
export const collectiblesAtom = atom(createCollectiblePool(20));
export const collectiblesCollectedAtom = atom(0);
export const totalHealthRestoredAtom = atom(0);
export const collectibleSpawnChanceSettingAtom = atom(0.3);
export const maxActiveCollectiblesSettingAtom = atom(5);
export const collectibleSpawnDelaySettingAtom = atom(3);
```
**AI Usage:** Manage collectible spawning, collection tracking, and statistics. Includes user-configurable settings for spawn behavior.

**To Add New Collectibles:**
1. **collectibleTypes.js** - Add new type with id, effect, value, duration
2. **useCollectibleCollector.js** - Add case to applyCollectibleEffect switch
3. **CollectibleManager.jsx** - Pass required state setters as props
4. **themes.js** - Add visual configuration for new type

#### **inputAtoms.js - Input System**
```javascript
export const keyPressedAtom = atom({});
export const mousePositionAtom = atom({ x: 0, y: 0 });
export const mouseClickedAtom = atom(false);
export const mobileControlsAtom = atom({ movement: { x: 0, y: 0 }, rotation: { x: 0, y: 0 } });
```
**AI Usage:** Track keyboard, mouse, and mobile touch input states for cross-platform control handling.

#### **settingsAtoms.js - User Preferences & Settings**
```javascript
export const basePlayerSpeedAtom = atom(gameConfig.player.speed);
export const basePlayerHealthAtom = atom(gameConfig.player.health);
export const playerFireRateMultiplierAtom = atom(1.0);
export const showHUDAtom = atom(true);
export const enemySpeedMultiplierAtom = atom(1.0);
export const difficultyMultiplierAtom = atom(1.0);
```
**AI Usage:** Store persistent user preferences that survive across game sessions. These are the user's preferred settings, not current gameplay values.

#### **inputAtoms.js - Multi-Platform Input State**
```javascript
export const forwardInputAtom = atom(false);
export const backwardInputAtom = atom(false);
export const leftInputAtom = atom(false);
export const rightInputAtom = atom(false);
export const primaryActionAtom = atom(false);
export const inputStateAtom = atom((get) => ({ /* combined state */ }));
```
**AI Usage:** Track real-time input state globally across all platforms (keyboard, mobile touch, future gamepad). Multiple components can subscribe to these for reactive input handling, UI indicators, input recording, or cross-platform control schemes.

### 🎯 **Atom Architecture Pattern**

The atoms follow a **"Settings vs Runtime"** pattern for better organization:

#### **Settings Atoms (Persistent User Preferences):**
- **Purpose**: User's preferred configuration values
- **Lifecycle**: Persist across game sessions (saved to localStorage)
- **Examples**: `basePlayerSpeedAtom`, `basePlayerHealthAtom`
- **Usage**: Settings screen, game initialization
- **Naming**: `base*Atom` prefix

#### **Runtime Atoms (Current Gameplay State):**
- **Purpose**: Current state during active gameplay
- **Lifecycle**: Reset every game session or updated continuously
- **Examples**: `activePlayerHealthAtom`, `playerPositionAtom`, `forwardInputAtom`
- **Usage**: Gameplay mechanics, real-time updates, input handling
- **Naming**: `active*Atom`, `*InputAtom`, or descriptive names

#### **Key Relationships:**
```javascript
// Game Reset Pattern:
const userPreferredHealth = get(basePlayerHealthAtom);  // User's setting
set(activePlayerHealthAtom, userPreferredHealth);       // Apply to runtime

// This ensures user preferences are always respected on game restart
```

### 📱 **Multi-Platform Input Architecture**

The input system is designed to support multiple input methods seamlessly:

#### **Current Implementation:**
- **Keyboard**: WASD + Arrow keys + Spacebar (via `useKeyControls` hook)
- **Mouse**: Mouse movement for rotation/aiming (via `useMouseControls` hook)
- **Mobile**: Dual joystick touch controls (via `useMobileControls` hook)
- **State Management**: Input-agnostic atoms that work with any input source

#### **Mobile Touch Controls (Implemented):**
```javascript
// useMobileControls.js - Dual joystick system
const useMobileControls = () => {
  const [, setForward] = useAtom(forwardInputAtom);
  const [, setInputPosition] = useAtom(inputPositionAtom);
  
  // Movement joystick handler
  const handleMove = (evt) => {
    const threshold = 0.3;
    setForward(evt.y > threshold);
    setBackward(evt.y < -threshold);
    // ... other directions
  };
  
  // Rotation joystick handler  
  const handleRotate = (evt) => {
    const worldX = evt.x * 4;
    const worldZ = -evt.y * 4;
    setInputPosition({ x: worldX, y: 0, z: worldZ });
  };
  
  return { onMove: handleMove, onRotate: handleRotate, ... };
};

// Multi-platform rotation system
const usePlayerRotation = (api, gameState, onRotationChange) => {
  const { mousePosition } = useMouseControls();
  const [mobilePosition] = useAtom(inputPositionAtom);
  
  // Mobile takes priority, fallback to mouse
  const inputPosition = mobilePosition || mousePosition;
};
```

#### **Cross-Platform Benefits:**
- **Unified API**: Same input atoms work with keyboard, mouse, touch, or gamepad
- **Input Priority**: Mobile input takes precedence when active, graceful fallback
- **No Logic Changes**: Movement/rotation/shooting systems work with any input method  
- **Smooth Integration**: Dual joystick controls with advanced rotation interpolation
- **Easy Testing**: Can simulate any input by setting atoms directly
- **Future-Proof**: Adding gamepad support requires no atom architecture changes

## 🔧 Modification Guidelines for AI

### **1. Adding New Settings:**
```javascript
// 1. Add to settingsConfig.js
export const settingsConfig = {
  newCategory: {
    newSetting: {
      label: 'New Setting',
      default: 10,
      min: 1, max: 100,
      step: 1,
      unit: '',
      description: 'What this setting does'
    }
  }
};

// 2. Create corresponding atom in settingsAtoms.js
export const newSettingAtom = atom(10);

// 3. Use in components
const [setting, setSetting] = useAtom(newSettingAtom);
```

### **2. Adding New Themes:**
```javascript
// 1. Add to THEMES in constants.js
export const THEMES = {
  NEW_THEME: 'newTheme'
};

// 2. Add theme definition in themes/themes.js
export const themes = {
  newTheme: {
    name: 'New Theme',
    player: { /* customizations */ },
    enemies: { /* customizations */ },
    environment: { /* customizations */ }
  }
};
```

### **3. Modifying Game Balance:**
```javascript
// 1. Update baseConfigs.js for core changes
export const PLAYER_BASE = {
  speed: 7,  // Increased from 5
  health: 120  // Increased from 100
};

// 2. Update DEFAULT_CONFIG in constants.js for theme-independent changes
export const DEFAULT_CONFIG = {
  physics: {
    gravity: [0, -12, 0]  // Stronger gravity
  }
};
```

## 🚨 Important Notes for AI Developers

### **⚠️ Configuration Hierarchy:**
1. **baseConfigs.js** - Foundation values (rarely changed)
2. **constants.js** - Theme-independent defaults
3. **themes/themes.js** - Theme-specific overrides
4. **Runtime** - User settings and dynamic changes

### **🔄 State Management:**
- Use atoms for reactive state that components need to share
- Import from `src/config/atoms/index.js` for backward compatibility
- Create new atom files for new state categories

### **🎯 Theme System:**
- Themes override base configurations
- Use `useCurrentTheme()` and related hooks in components
- Theme switching happens through `selectedThemeAtom`

### **⚡ Performance Considerations:**
- All themes are pre-loaded at startup
- Configuration is synchronous (no async loading)
- Atoms provide efficient reactive updates

## 📚 Integration Examples

### **Using Theme Data in Components:**
```javascript
import { useCurrentTheme, useCurrentPlayerConfig } from '../config/gameConfig';

function PlayerComponent() {
  const currentTheme = useCurrentTheme();
  const playerConfig = useCurrentPlayerConfig();

  // Use theme and player data
  return (
    <Player
      modelUrl={playerConfig.modelUrl}
      speed={playerConfig.speed}
      theme={currentTheme}
    />
  );
}
```

### **Using Settings in UI:**
```javascript
import { getSettingConfig, getAllCategories } from '../config/settingsConfig';
import { useAtom } from 'jotai';
import { basePlayerSpeedAtom } from '../config/atoms';

function SettingsComponent() {
  const [playerSpeed, setPlayerSpeed] = useAtom(basePlayerSpeedAtom);
  const speedConfig = getSettingConfig('player', 'speed');

  return (
    <Slider
      value={playerSpeed}
      onChange={setPlayerSpeed}
      min={speedConfig.min}
      max={speedConfig.max}
      step={speedConfig.step}
      label={speedConfig.label}
    />
  );
}
```

This configuration system provides a **complete, modular, and extensible** foundation for game development. AI developers can confidently modify settings, add themes, and extend functionality using the documented patterns and helper functions.