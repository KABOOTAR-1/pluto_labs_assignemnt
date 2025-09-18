# Three.js Top-Down Shooter Game Template

A highly modular, extensible game template built with React Three Fiber, featuring a clean separation of concerns architecture. This template provides a robust foundation for creating top-down shooter games with configurable enemies, projectiles, and gameplay mechanics.

## 🎮 Main Functionalities

### Core Game Features
- **3D Top-Down Shooter Gameplay**: Player movement, aiming, and shooting mechanics
- **Dynamic Enemy System**: Multiple enemy types with unique behaviors and AI
- **Advanced Projectile System**: Multiple projectile types with different properties
- **Physics-Based Combat**: Realistic collision detection and movement using Cannon-es
- **Health & Scoring System**: Player health management and score tracking
- **Game State Management**: Menu, playing, paused, and game over states
- **Modern UI/UX**: Responsive HUD, start screen, and game over interface

### Technical Features
- **Modular Architecture**: Clean separation between data, logic, and presentation layers
- **Configuration-Driven**: Easy customization through external config files
- **Controller Pattern**: Business logic separated from React components
- **State Management**: Efficient state handling with Jotai atoms
- **Performance Optimized**: Object pooling and automatic cleanup systems

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Game**
   ```bash
   npm run dev
   ```

3. **Controls**
   - **Movement**: WASD or Arrow Keys
   - **Aim**: Mouse movement
   - **Shoot**: Mouse click (hold for continuous fire)

## 📁 Project Architecture

The project follows a three-layer modular architecture:

```
src/
├── components/              # 🎨 Presentation Layer (React Components)
│   ├── Scene.jsx           # Main 3D scene setup
│   ├── Player.jsx          # Player character rendering
│   ├── Enemies.jsx         # Enemy rendering coordinator
│   ├── Projectiles.jsx     # Projectile rendering coordinator
│   ├── enemies/            # Enemy-specific components
│   │   ├── BaseEnemy.jsx   # Base enemy component
│   │   ├── FastEnemy.jsx   # Fast enemy type
│   │   ├── TankEnemy.jsx   # Tank enemy type
│   │   └── EnemySpawner.jsx # Enemy spawning logic
│   ├── projectiles/        # Projectile-specific components
│   │   ├── BaseProjectile.jsx # Base projectile component
│   │   └── Bullet.jsx      # Bullet projectile type
│   └── ui/                 # User interface components
│       ├── HUD.jsx         # Heads-up display
│       ├── StartScreen.jsx # Main menu
│       └── GameOverScreen.jsx # Game over screen
├── controllers/            # 🧠 Business Logic Layer
│   └── ProjectileController.js # Projectile management logic
├── data/                   # 📊 Data Layer (External Configurations)
│   └── projectileTypes.js  # Projectile type definitions
├── config/                 # ⚙️ Core Configuration
│   ├── gameConfig.js       # Main game parameters
│   └── atoms.js            # Jotai state atoms
├── hooks/                  # 🎣 Custom React Hooks
│   ├── useEnemyAttack.js   # Enemy attack behavior
│   ├── useEnemyChase.js    # Enemy movement AI
│   ├── useEnemyCleanup.js  # Enemy cleanup logic
│   └── useEnemySpawner.js  # Enemy spawning system
└── App.jsx                 # Main application entry point
```

## 🏗️ Design Decisions

### Architecture Philosophy
The project implements a **three-layer modular architecture** inspired by clean architecture principles:

1. **Data Layer** (`src/data/`): External configuration files that define game entities
2. **Controller Layer** (`src/controllers/`): Business logic classes that manage game mechanics
3. **Component Layer** (`src/components/`): React components focused purely on rendering

### Key Design Benefits
- **Separation of Concerns**: Data, logic, and presentation are completely separated
- **Reusability**: Controllers can be used anywhere without React dependencies
- **Extensibility**: New entities can be added by simply editing data files
- **Maintainability**: Single responsibility principle throughout the codebase
- **Testability**: Business logic can be tested independently of React components

### Technology Choices
- **React Three Fiber**: Declarative 3D graphics with React patterns
- **Cannon-es**: Lightweight physics engine perfect for games
- **Jotai**: Atomic state management for better performance and less boilerplate
- **Vite**: Fast development server and optimized builds

## 🎯 Adding New Projectiles

### Step 1: Define Projectile Type
Add your new projectile to `src/data/projectileTypes.js`:

```javascript
export const projectileTypes = [
  // ... existing types
  {
    id: 'laser',
    name: 'Laser Beam',
    size: 0.2,
    speed: 25,
    damage: 45,
    color: '#ff0000',
    emissiveIntensity: 0.8,
    mass: 0.05,
    lifetime: 3000,
    description: 'High-speed laser projectile'
  }
];
```

### Step 2: Configure Weapon Properties
Modify weapon properties directly in `src/data/projectileTypes.js`:

```javascript
export const projectileTypes = [
  // ... existing types
  {
    id: 'laser',
    name: 'Laser Beam',
    size: 0.2,
    speed: 25,        // Adjust speed for weapon type
    damage: 45,       // Adjust damage for weapon type
    color: '#ff0000',
    emissiveIntensity: 0.8,
    mass: 0.05,
    lifetimeMs: 3000, // Adjust lifetime for weapon type
    description: 'High-speed laser projectile'
  }
];
```

### Step 3: Create Component (Optional)
For custom rendering, create `src/components/projectiles/Laser.jsx`:

```javascript
import React from 'react';
import { BaseProjectile } from './BaseProjectile';

export const Laser = (props) => {
  return (
    <BaseProjectile {...props}>
      {/* Custom laser rendering */}
      <cylinderGeometry args={[0.1, 0.1, 1]} />
      <meshBasicMaterial color={props.color} />
    </BaseProjectile>
  );
};
```

### Step 4: Register Component
Add to the component registry in `src/components/Projectiles.jsx`:

```javascript
import { Laser } from './projectiles/Laser';

const ProjectileComponents = {
  default: BaseProjectile,
  bullet: Bullet,
  laser: Laser, // Add your new component
};
```

## 👾 Adding New Enemies

### Step 1: Define Enemy Type
Add to `src/config/gameConfig.js`:

```javascript
enemies: {
  types: [
    // ... existing types
    {
      id: 'sniper',
      speed: 1.0,
      health: 60,
      size: 0.7,
      color: '#9C27B0',
      damage: 30,
      points: 40,
      spawnRate: 0.6,
    }
  ]
}
```

### Step 2: Create Enemy Component
Create `src/components/enemies/SniperEnemy.jsx`:

```javascript
import React from 'react';
import { BaseEnemy } from './BaseEnemy';

export const SniperEnemy = (props) => {
  return (
    <BaseEnemy {...props}>
      {/* Custom sniper rendering */}
      <boxGeometry args={[props.size, props.size * 1.5, props.size]} />
      <meshStandardMaterial color={props.color} />
    </BaseEnemy>
  );
};
```

### Step 3: Register Enemy Component
Add to `src/components/Enemies.jsx`:

```javascript
import { SniperEnemy } from './enemies/SniperEnemy';

const EnemyComponents = {
  fast: FastEnemy,
  tank: TankEnemy,
  sniper: SniperEnemy, // Add your new enemy
};
```

## 🎮 Configuring for Different Game Genres

### Space Shooter Configuration
```javascript
// Create spaceConfig.js
import { createCustomConfig } from './src/config/gameConfig';

export const spaceConfig = createCustomConfig({
  world: {
    backgroundColor: '#000011',
    floorColor: '#001122',
  },
  player: {
    color: '#00FFFF',
    speed: 8,
    fireRate: 5,
  },
  enemies: {
    types: [
      {
        id: 'alien',
        speed: 3,
        health: 40,
        color: '#FF00FF',
        damage: 15,
        points: 20,
        spawnRate: 1.5,
      }
    ]
  }
});
```

### Medieval/Fantasy Configuration
```javascript
export const medievalConfig = createCustomConfig({
  player: {
    color: '#8B4513',
    projectileSpeed: 8, // Slower arrows
    fireRate: 1, // Slower bow
  },
  enemies: {
    types: [
      {
        id: 'orc',
        speed: 2,
        health: 80,
        color: '#228B22',
        damage: 20,
        points: 15,
        spawnRate: 1,
      },
      {
        id: 'goblin',
        speed: 4,
        health: 30,
        color: '#8B0000',
        damage: 10,
        points: 10,
        spawnRate: 2,
      }
    ]
  }
});
```

### Zombie Survival Configuration
```javascript
export const zombieConfig = createCustomConfig({
  world: {
    backgroundColor: '#2F1B14',
    floorColor: '#1A1A1A',
  },
  player: {
    health: 150,
    fireRate: 3,
  },
  enemies: {
    maxOnScreen: 25,
    types: [
      {
        id: 'walker',
        speed: 1.5,
        health: 50,
        color: '#556B2F',
        damage: 25,
        points: 5,
        spawnRate: 3,
      },
      {
        id: 'runner',
        speed: 5,
        health: 30,
        color: '#8B0000',
        damage: 15,
        points: 15,
        spawnRate: 1,
      }
    ]
  }
});
```

## ⚙️ Core Configuration

The game uses a layered configuration system:

### Main Game Config (`src/config/gameConfig.js`)
```javascript
export const gameConfig = {
  player: {
    speed: 5,
    health: 100,
    size: 1,
    color: '#4285F4',
    fireRate: 2,
    projectileSpeed: 15,
    projectileSize: 0.3,
  },
  enemies: {
    types: [
      {
        id: 'fast',
        speed: 4,
        health: 30,
        size: 0.6,
        color: '#FBBC05',
        damage: 5,
        points: 15,
        spawnRate: 1,
      }
    ],
    maxOnScreen: 15,
    spawnRadius: 20,
  },
  world: {
    size: 40,
    floorColor: '#222222',
    backgroundColor: '#000000',
  },
  physics: {
    gravity: [0, -9.81, 0],
    defaultMass: 1,
    restitution: 0.2,
    friction: 0.5,
  }
};
```

### State Management (`src/config/atoms.js`)
The game uses Jotai for atomic state management:

- `gameStateAtom`: Current game state ('menu', 'playing', 'paused', 'gameOver')
- `playerHealthAtom`: Player's current health
- `playerPositionAtom`: Player's 3D position [x, y, z]
- `scoreAtom`: Current game score
- `enemiesAtom`: Array of active enemy entities
- `projectilesAtom`: Array of active projectile entities
- `currentProjectileTypeAtom`: Currently selected projectile type

## 🔧 Advanced Customization

### Creating Custom Controllers
Extend the controller pattern for new game mechanics:

```javascript
// src/controllers/PowerUpController.js
export class PowerUpController {
  constructor() {
    this.powerUps = [];
    this.activePowerUps = new Map();
  }

  createPowerUp(type, position) {
    const powerUp = {
      id: this.nextId++,
      type,
      position: [...position],
      createdAt: Date.now(),
      duration: 10000, // 10 seconds
    };
    this.powerUps.push(powerUp);
    return powerUp;
  }

  updatePowerUps(deltaTime) {
    // Update logic here
  }
}
```

### Custom Hook Integration
Create specialized hooks for new behaviors:

```javascript
// src/hooks/useCustomBehavior.js
import { useFrame } from '@react-three/fiber';

export const useCustomBehavior = (api, config) => {
  useFrame((_, delta) => {
    // Custom behavior logic
  });
};
```


## 🎨 Visual Customization

### Material and Lighting
- Emissive materials for glowing effects
- Shadow mapping for realistic lighting
- Fog effects for atmospheric depth
- Environment mapping with HDR backgrounds

### Camera Configuration
- Fixed top-down perspective optimized for gameplay
- Configurable field of view and positioning
- Smooth camera transitions (can be extended)

## 🚀 Performance Optimization

### Built-in Optimizations
- **Automatic Cleanup**: Projectiles auto-expire after 5 seconds
- **Entity Limits**: Maximum enemy count prevents performance degradation
- **Efficient Collision Detection**: Spatial optimization for collision checks
- **Object Pooling Ready**: Architecture supports object pooling implementation

### Recommended Enhancements
- Implement object pooling for frequently created/destroyed entities
- Add level-of-detail (LOD) for distant objects
- Use instanced rendering for similar objects
- Implement frustum culling for off-screen entities

## 📦 Dependencies

```json
{
  "dependencies": {
    "@react-three/cannon": "^6.6.0",
    "@react-three/drei": "^10.7.4",
    "@react-three/fiber": "^9.3.0",
    "jotai": "^2.13.1",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "three": "^0.180.0",
    "zustand": "^5.0.8"
  }
}
```

## 🎯 Getting Started with Your Own Game

1. **Clone and Setup**: Fork this repository and install dependencies
2. **Define Your Theme**: Create a custom config file for your game genre
3. **Design Entities**: Add your enemy types and projectile types to data files
4. **Customize Visuals**: Modify colors, materials, and models in components
5. **Extend Mechanics**: Add new controllers for game-specific features
6. **Test and Iterate**: Use the modular architecture to rapidly prototype

The modular architecture ensures that your customizations remain maintainable and extensible as your game grows in complexity.
