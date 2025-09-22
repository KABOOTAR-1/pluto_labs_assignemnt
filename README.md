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
└── src/
    ├── components/                  # React components
    │   ├── 🎮 GameRenderer.jsx     # 3D Entity Coordinator - Renders game entities in physics world
    │   ├── 🌍 Scene.jsx            # MAIN GAME COORDINATOR - passed data to game entities
    │   ├── 👤 Player.jsx           # Player character with modular hooks
    │   ├── 👹 Enemies.jsx          # Enemy management and rendering
    │   ├── 🚀 Projectiles.jsx      # Projectile system with collision
    │   ├── 🖥️ StartScreen.jsx      # Main menu interface
    │   ├── ⚙️ SettingsScreen.jsx   # Game configuration screen
    │   ├── 💀 GameOverScreen.jsx   # End game screen
    │   ├── 📱 MobileControls/      # Mobile touch control components
    │   │   ├── MobileGameControls.jsx  # Dual joystick + button UI component
    │   │   └── README.md           # 📝 COMPREHENSIVE mobile controls guide
    │   ├── 💎 collectibles/       # Collectible system components
    │   │   ├── CollectibleManager.jsx  # Collectible spawning and management
    │   │   └── BaseCollectible.jsx     # Individual collectible rendering
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
    │   ├── usePlayerRotation.js        # Multi-platform rotation (mouse + mobile)
    │   ├── usePlayerShooting.js        # Weapon and projectile system
    │   ├── usePlayerCamera.js          # Smooth camera following
    │   ├── usePlayerHealth.js          # Health management and damage
    │   ├── useKeyControls.js           # Keyboard input handling
    │   ├── useMouseControls.js         # Mouse input (prop-based)
    │   ├── useMobileControls.js        # Mobile dual-joystick input bridge
    │   ├── useEnemySpawner.js          # Dynamic enemy generation
    │   ├── useEnemyChase.js            # Enemy AI movement
    │   ├── useEnemyAttack.js           # Enemy combat system
    │   ├── useEnemyCleanup.js          # Enemy boundary cleanup
    │   ├── useEnemyFacing.js           # Enemy visual rotation
    │   ├── useCollectibleSpawner.js    # Collectible generation system
    │   ├── useCollectibleCollector.js  # Collectible collection logic
    │   ├── useSettingsNavigation.js    # Settings navigation (prop-based)
    │   └── useConditionalTexture.js    # Vite-compatible texture loading
    ├── config/                     # 📋 Configuration - SETTINGS & STATE
    │   ├── atoms/                  # Jotai state management
    │   │   ├── gameStateAtoms.js   # Game flow state
    │   │   ├── playerAtoms.js      # Player state
    │   │   ├── entityAtoms.js      # Enemies/projectiles
    │   │   ├── collectibleAtoms.js # Collectible system state
    │   │   ├── inputAtoms.js       # Input system state
    │   │   ├── settingsAtoms.js    # User settings
    │   │   └── index.js            # Atom exports
    │   ├── themes/
    │   │   └── themes.js           # 🎨 VISUAL THEMES - Change appearance here
    │   ├── gameConfig.js           # 🎯 MAIN SETTINGS - Core game configuration
    │   ├── baseConfigs.js          # Entity base stats (health, speed, damage)
    │   ├── settingsConfig.js       # Settings UI configuration
    │   └── constants.js            # Game constants
    ├── data/
    │   ├── projectileTypes.js      # 🔫 WEAPON TYPES - Add new weapons here
    │   └── collectibleTypes.js     # 💎 COLLECTIBLE TYPES - Add new collectibles here
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
2. **Main Game State**: `src/components/Scene.jsx` (manages core atoms, passes props to GameRenderer)
3. **Game Entities**: `src/components/GameRenderer.jsx` (manages enemies/projectiles via atoms)
4. **Game Logic**: `src/hooks/` (actual game loop via useFrame calls)
5. **3D Rendering**: `src/components/GameRenderer.jsx` (renders entities in physics world)
6. **Configuration**: `src/config/gameConfig.js` and `src/config/themes/themes.js`

### **📍 Go Here For Specific Changes**
- **🎮 Gameplay Mechanics** → `src/hooks/` (player/enemy hooks)
- **🎨 Visual Themes** → `src/config/themes/themes.js` + `src/models/`
- **⚙️ Game Settings** → `src/config/gameConfig.js` + `src/config/settingsConfig.js`
- **🔫 Weapons/Projectiles** → `src/data/projectileTypes.js` + `src/components/projectiles/`
- **👹 Enemy Types** → `src/config/baseConfigs.js` + `src/components/enemies/`
- **💎 Collectibles** → `src/data/collectibleTypes.js` + `src/components/collectibles/`
- **📱 Mobile Controls** → `src/components/MobileControls/README.md` (comprehensive guide) + implementation files
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
- **usePlayerRotation.js** - Multi-platform player rotation (mouse + mobile) with smooth interpolation
- **usePlayerShooting.js** - Weapon system with projectile spawning and firing mechanics
- **usePlayerCamera.js** - Smooth third-person camera following with fixed timestep
- **usePlayerHealth.js** - Health management, damage processing, and game over detection
- **useKeyControls.js** - Keyboard input handling (WASD/Arrow keys)
- **useMouseControls.js** - Mouse movement tracking with callback-based state management
- **useMobileControls.js** - Mobile dual-joystick input bridge with movement and rotation control
- **useEnemySpawner.js** - Dynamic enemy generation with difficulty scaling and object pooling
- **useEnemyChase.js** - AI pursuit behavior using Kinematic physics velocity
- **useEnemyAttack.js** - Collision-based combat system with attack cooldown
- **useEnemyCleanup.js** - World boundary safety system for enemy removal
- **useEnemyFacing.js** - Visual enemy rotation to face player for better feedback
- **useCollectibleSpawner.js** - Dynamic collectible generation with type randomization and object pooling (currently health only)
- **useCollectibleCollector.js** - Collectible collection system with effect application and statistics tracking
  - *To add new collectibles: Update collectibleTypes.js → Add effect logic to applyCollectibleEffect function → Add required props*
- **useSettingsNavigation.js** - Settings screen navigation with state preservation (prop-based)
- **useConditionalTexture.js** - Vite-compatible texture loading with error handling

### **Configuration** (`src/config/`)
- **atoms/** - Jotai state atoms for reactive game state management
  - `gameStateAtoms.js` - Game flow control (menu, playing, gameOver, settings)
  - `playerAtoms.js` - Player state (health, position, rotation, settings)
  - `entityAtoms.js` - Dynamic entities (enemies array, projectiles array)
  - `collectibleAtoms.js` - Collectible state and statistics tracking
  - `inputAtoms.js` - Input system state (keyboard, mouse, mobile)
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
- **Dynamic Object Pooling** - Performance optimization with automatic pool expansion
- **Theme System** - Swappable visual themes with 3D models
- **Modular Hooks** - Separated game logic for easy customization
- **Per-Projectile Properties** - Individual damage, speed, size, color, fire rate, and lifetime for different weapon types
- **Multi-Platform Input** - Keyboard, mouse, and dual-joystick mobile controls
- **Smooth Rotation** - Advanced angle interpolation with shortest-path calculation
- **AI Documentation** - Fragment-system comments in every file

## 🔧 Tech Stack
React Three Fiber, @react-three/cannon, Jotai, Three.js, Vite

## 🎮 Controls

### **Desktop Controls:**
- **WASD/Arrow Keys** - Movement
- **Mouse** - Rotation/Aiming  
- **Spacebar** - Shooting

### **Mobile Controls (Dual Joystick):**
- **Left Joystick (White)** - Movement (Forward/Backward/Left/Right)
- **Right Joystick (Blue)** - Rotation/Aiming (Smooth directional facing)
- **Center Button** - Shooting (🔫 with cooldown)

### **Multi-Platform Integration:**
All input methods work simultaneously through shared input atoms. Mobile controls take priority when active, with graceful fallback to desktop controls.

## 📖 For AI
Every file includes comprehensive documentation with purpose, integration points, usage examples, and customization guides.

## 🤖 Implementing New Features

**If a functionality is not implemented in the project, AI should implement it following the current architecture of the codebase so that we can have new features when needed by just adding components to the current system.**

### 🏗️ Architecture Pattern to Follow

This codebase uses a **modular, component-based architecture** with specific patterns that must be maintained:

#### **1. 🎯 State Management Pattern (Jotai Atoms)**
```javascript
// ALWAYS create atoms following this pattern:
// src/config/atoms/[feature]Atoms.js
export const [feature]Atom = atom(defaultValue);
export const active[Feature]Atom = atom(defaultValue);

// Add to src/config/atoms/index.js
export const reset[Feature]Atom = atom(null, (get, set) => {
  set([feature]Atom, get(base[Feature]Atom));
});
```

#### **2. 🎮 Component Integration Pattern**
```javascript
// ALWAYS integrate new systems into these core files:
// 1. GameRenderer.jsx - Add 3D rendering
// 2. Scene.jsx - Add state management  
// 3. atoms/index.js - Add reset logic
// 4. settingsConfig.js - Add user controls (if needed)
```

#### **3. 🔄 Object Pooling Pattern**
```javascript
// ALWAYS use object pooling for dynamic entities:
// Follow patterns in src/utils/gameUtils.js
export const create[Entity]Pool = (size) => { /* pool creation */ };
export const activate[Entity] = (pool, data) => { /* activation */ };
export const deactivate[Entity] = (pool, id) => { /* deactivation */ };
```

#### **4. 🎨 Theme Integration Pattern**
```javascript
// ALWAYS add theme support in src/config/themes/themes.js
export const themes = {
  classic: { [newFeature]: { /* geometric fallbacks */ } },
  space: { [newFeature]: { /* sci-fi assets */ } },
  postapocalyptic: { [newFeature]: { /* wasteland assets */ } },
  custom: { [newFeature]: { /* user-defined */ } }
};
```

### 🛠️ Implementation Steps for New Features

#### **Step 1: Data Layer** (Create atoms and types)
```javascript
// 1. src/config/atoms/[feature]Atoms.js - State management
// 2. src/data/[feature]Types.js - Type definitions  
// 3. src/config/atoms/index.js - Add reset logic
```

#### **Step 2: Component Layer** (Create React components)
```javascript
// 4. src/components/[feature]/Base[Feature].jsx - Core logic
// 5. src/components/[feature]/[Specific].jsx - Specific types
// 6. src/components/[Feature]Manager.jsx - System coordinator
```

#### **Step 3: Integration Layer** (Connect to existing systems)
```javascript
// 7. src/components/GameRenderer.jsx - Add to 3D world
// 8. src/components/Scene.jsx - Add state management
// 9. src/utils/gameUtils.js - Add utility functions
```

#### **Step 4: Configuration Layer** (Add settings and themes)
```javascript
// 10. src/config/settingsConfig.js - User settings
// 11. src/config/themes/themes.js - Theme assets
// 12. src/components/SettingsScreen.jsx - UI controls
```

### 🎯 Example: Adding Health Powerups

**Following the architecture pattern:**

```javascript
// 1. ATOMS (src/config/atoms/collectibleAtoms.js)
export const collectiblesAtom = atom([]);
export const activeCollectiblesAtom = atom([]);

// 2. TYPES (src/data/collectibleTypes.js)
export const collectibleTypes = [
  { id: 'health', healAmount: 25, spawnRate: 0.3, modelUrl: '/models/health.glb' }
];

// 3. COMPONENTS (src/components/collectibles/)
// - BaseCollectible.jsx (physics + collision)
// - HealthCollectible.jsx (specific rendering)
// - CollectibleManager.jsx (spawning + lifecycle)

// 4. INTEGRATION (existing files)
// - GameRenderer.jsx: Add <CollectibleManager />
// - Scene.jsx: Add collectible state
// - Player.jsx: Add collection detection
// - atoms/index.js: Add reset logic

// 5. SETTINGS (existing files)
// - settingsConfig.js: Add spawn rate setting
// - themes.js: Add collectible models for all themes
```

## 🎮 Adding New Game States

The game uses centralized state management with clearly defined states. Here's how AI should add new states:

### Current Game States
- `'menu'` - Start screen
- `'playing'` - Active gameplay  
- `'gameOver'` - Game over screen
- `'settings'` - Settings configuration

### Step-by-Step Implementation

#### 1. Create Screen Component
```javascript
// src/components/PauseScreen.jsx (example: adding pause state)
import { useAtom } from 'jotai';
import { gameStateAtom } from '../config/atoms';
import { useSettingsNavigation } from '../hooks/useSettingsNavigation';

const PauseScreen = ({ theme = {} }) => {
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const { goToSettings } = useSettingsNavigation(gameState, setGameState);
  
  if (gameState !== 'pause') return null; // Only render when in pause state

  return (
    <div className="game-screen pause-screen">
      <div className="screen-content">
        <h1>GAME PAUSED</h1>
        <button className="game-button" onClick={() => setGameState('playing')}>
          RESUME
        </button>
        <button className="game-button secondary" onClick={goToSettings}>
          SETTINGS
        </button>
      </div>
    </div>
  );
};

export default PauseScreen;
```

#### 2. Add to Scene Component
```javascript
// src/components/Scene.jsx - Add to render list
import PauseScreen from './PauseScreen';

return (
  <>
    {/* Existing screens */}
    <StartScreen theme={theme} />
    <GameOverScreen theme={theme} />
    <SettingsScreen theme={theme} />
    <PauseScreen theme={theme} /> {/* Add new screen */}
    
    {/* Update HUD visibility if needed */}
    <HUD showHUD={gameState === 'playing' || gameState === 'pause'} />
  </>
);
```

#### 3. Update Hook Logic
```javascript
// All game hooks should check new state appropriately:

// src/hooks/usePlayerMovement.js - Pause movement
if (gameState !== 'playing') return; // Automatically handles pause

// src/hooks/useKeyControls.js - Add pause key
case 'Escape':
  if (gameState === 'playing') setGameState('pause');
  else if (gameState === 'pause') setGameState('playing');
  break;

// src/components/GameRenderer.jsx - Conditional rendering
{(gameState === 'playing' || gameState === 'pause') && (
  <>
    <Player />
    {gameState === 'playing' && <EnemySpawner />} {/* Only spawn when playing */}
  </>
)}
```

#### 4. Add CSS Styling
```css
/* src/App.css */
.pause-screen {
  background: rgba(0, 0, 0, 0.9);
}
```

### State Transition Patterns

**Preserve Previous State** (for settings navigation):
```javascript
// Before going to settings
sessionStorage.setItem('previousGameState', currentState);
```

**Mobile Controls** (update visibility):
```javascript
// Only show during active states
{isMobile && (gameState === 'playing' || gameState === 'pause') && (
  <MobileGameControls />
)}
```

### ⚠️ Important Considerations

- **Performance**: Paused states should stop expensive operations (enemy spawning, collision detection)
- **State Persistence**: Consider what needs to be preserved across state transitions
- **User Experience**: Provide clear visual feedback for state changes
- **Keyboard Shortcuts**: Add intuitive key bindings for state transitions
- **Mobile Support**: Ensure new states work well on mobile devices

## 💎 Adding New Collectible Types

The collectible system is data-driven with automatic spawning and collection. Here's how AI should add new collectible types:

### Implementation Steps

#### 1. Define Collectible Type
```javascript
// src/data/collectibleTypes.js - Add to array
{
  id: 'shield',
  name: 'Shield Boost',
  spawnRate: 0.15,
  value: 50,
  color: '#00aaff',
  size: 1.0,
  glowColor: '#88ccff',
  modelUrl: '/models/shield.glb' // Optional
}
```

#### 2. Add Effect Logic
```javascript
// src/hooks/useCollectibleCollector.js - Add to applyCollectibleEffect switch
case 'shield':
  const currentShield = get(playerShieldAtom) || 0;
  set(playerShieldAtom, Math.min(currentShield + collectible.value, 100));
  break;
```

#### 3. Add New Atoms (if needed)
```javascript
// src/config/atoms/playerAtoms.js
export const playerShieldAtom = atom(0);

// src/config/atoms/index.js - Add to reset logic
set(playerShieldAtom, 0);
```

#### 4. Add UI Display (optional)
```javascript
// src/components/ui/ShieldBar.jsx - Create new UI component
// src/components/HUD.jsx - Import and add <ShieldBar />
```

### Properties Reference

**Required**: `id`, `name`, `spawnRate`, `value`, `color`, `size`  
**Optional**: `glowColor`, `modelUrl`, `duration`, `maxStack`, `rarity`

### Integration Points
- ✅ **Auto-handled**: Spawning, rendering, collection, object pooling
- 🔧 **Manual**: Effect logic, new atoms, UI components, settings

### 🔍 Key Principles to Maintain

1. **🔄 Object Pooling**: All dynamic entities use pooling for performance
2. **🎨 Theme Compatibility**: All visual elements work across 4 themes
3. **⚙️ Settings Integration**: User-configurable options in settings screen
4. **📊 State Consistency**: All state managed through Jotai atoms
5. **🎯 Manual Collision**: Distance-based collision detection (not physics events)
6. **🏗️ Modular Hooks**: Game logic separated into reusable hooks
7. **📖 Documentation**: Every file includes comprehensive AI documentation

### ⚠️ Critical Requirements

- **NEVER** break existing object pooling patterns
- **ALWAYS** support all 4 themes (classic, space, postapocalyptic, custom)  
- **ALWAYS** add reset logic to `atoms/index.js`
- **ALWAYS** use manual collision detection (distance-based)
- **ALWAYS** follow the component naming conventions
- **ALWAYS** include comprehensive documentation comments

### 🎯 Integration Points Reference

- **3D Rendering**: `GameRenderer.jsx` - Add new physics entities here
- **State Management**: `Scene.jsx` - Add state atoms here  
- **Physics World**: `GameRenderer.jsx` Physics component
- **User Settings**: `settingsConfig.js` + `SettingsScreen.jsx`
- **Theme Assets**: `src/config/themes/themes.js`
- **Game Reset**: `src/config/atoms/index.js` resetGameAtom
- **Utility Functions**: `src/utils/gameUtils.js`

By following these patterns, any new feature will integrate seamlessly with the existing architecture while maintaining performance, theme compatibility, and code consistency.

## 🔧 Common Issues & Troubleshooting

### Settings Button Not Working
**Problem:** Settings button in HUD doesn't open settings during gameplay
**Solution:** Ensure `setGameState` prop is passed from Scene to HUD component
```javascript
// src/components/Scene.jsx - Make sure this prop is included
<HUD 
  // ... other props
  setGameState={setGameState}  // ← This prop is required
/>

// src/components/HUD.jsx - Use the prop correctly
const { goToSettings } = useSettingsNavigation(gameState, setGameState); // Not () => {}
```

### Mobile Controls Not Appearing
**Problem:** Mobile joysticks don't show on mobile devices
**Solution:** Check mobile detection logic in Scene component
```javascript
// Mobile detection should be in Scene.jsx
const isMobile = useMemo(() => {
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}, []);

{isMobile && <MobileGameControls />}
```

### Player Rotation Resetting
**Problem:** Player rotation resets to 0 when mobile joystick is released
**Solution:** Ensure `onRotateStop` is not being called
```javascript
// src/hooks/useMobileControls.js - Should NOT include onRotateStop
return {
  onMove, onStop, onRotate, onShoot  // No onRotateStop
};

// src/components/MobileControls/MobileGameControls.jsx - No stop prop
<Joystick move={onRotate} />  // No stop={onRotateStop}
```

### Game State Issues
**Problem:** Game gets stuck in wrong state or transitions don't work
**Solution:** Check state management and hook dependencies
```javascript
// All hooks should check game state properly
if (gameState !== GAME_STATES.PLAYING) return;

// Components should pass state correctly
const [gameState, setGameState] = useAtom(gameStateAtom);
const { goToSettings } = useSettingsNavigation(gameState, setGameState);
```
