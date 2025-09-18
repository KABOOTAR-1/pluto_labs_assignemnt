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
      projectileSpeed: 20,              // Bullet speed (faster projectiles)
      fireRate: 3                       // Shots per second (rapid fire)
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
          scale: [0.8, 0.8, 0.8]       // Smaller size
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
          scale: [1.5, 1.5, 1.5]       // Larger size
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
      coin: {
        modelUrl: '/src/models/cyberpunk/dataChip.glb',
        fallbackGeometry: 'box',
        material: { color: 0xFFFF00, emissive: 0x444400 }
      },
      gem: {
        modelUrl: '/src/models/cyberpunk/energyCore.glb',
        fallbackGeometry: 'sphere',
        material: { color: 0xFF00FF, emissive: 0x440044 }
      }
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
      speed: 6,          // Faster movement
      fireRate: 3        // Faster shooting
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
- `scale`: Size multiplier [x, y, z]
- `color`: Hex color for fallback geometry
- `rotation`: Initial rotation [x, y, z] in radians
- `speed`: Movement speed (units/second)
- `health`: Maximum health points
- `projectileSpeed`: Bullet travel speed
- `fireRate`: Shots per second

### **👹 Enemy Properties**
- `name`: Display name for enemy type
- `modelUrl`: Path to enemy 3D model
- `speed`: Movement speed
- `health`: Hit points
- `damage`: Damage dealt to player
- `facePlayer`: Whether enemy rotates to face player
- `scale`: Size multiplier
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
  projectileSpeed: 15, // Bullet travel speed
  fireRate: 2,        // Shots per second
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

#### **playerAtoms.js - Player State**
```javascript
export const playerHealthAtom = atom(gameConfig.player.health);
export const playerPositionAtom = atom([0, 0, 0]);
export const playerRotationAtom = atom(0);
```
**AI Usage:** Track and modify player-related state across components.

#### **entityAtoms.js - Game Entities**
```javascript
export const enemiesAtom = atom([]);
export const projectilesAtom = atom(createProjectilePool());
```
**AI Usage:** Manage collections of enemies and projectiles.

#### **settingsAtoms.js - User Settings**
```javascript
export const basePlayerSpeedAtom = atom(gameConfig.player.speed);
export const showHUDAtom = atom(true);
```
**AI Usage:** Store user preferences and runtime settings.

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