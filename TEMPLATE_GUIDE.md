# 🎮 Three.js Game Template - Comprehensive AI Developer Guide

## 📂 File Structure & Locations

### 🔧 MAIN FILES YOU'LL MODIFY:

**🎨 THEME CONFIGURATION**
- **File:** `src/config/themes/themes.js`
- **Purpose:** Contains all theme definitions and asset configurations
- **What to change:** Asset URLs, colors, lighting, enemy properties

**⚙️ GAME SETTINGS**
- **File:** `src/config/gameConfig.js`
- **Purpose:** Core game parameters and physics settings
- **What to change:** Rarely needed, mostly for advanced gameplay tweaks

### 📱 COMPONENT FILES (Usually don't modify):

**🧑‍🚀 PLAYER RENDERING**
- **File:** `src/components/Player.jsx`
- **Purpose:** Renders player using theme configuration
- **When to modify:** Only for custom player behavior

**👹 ENEMY RENDERING**
- **File:** `src/components/Enemies.jsx`
- **Purpose:** Renders enemies using theme configuration
- **When to modify:** Only for custom enemy behavior

**🎬 MAIN SCENE**
- **File:** `src/components/Scene.jsx`
- **Purpose:** Main 3D scene setup and game orchestration
- **When to modify:** Only for major gameplay changes

## 🚀 Quick Start for AI Developers

This template allows you to create custom top-down shooter games by simply swapping assets and modifying configuration files. No complex coding required!

## 📋 Prerequisites

- Basic understanding of JavaScript objects
- Familiarity with 3D model formats (GLTF/GLB)
- Knowledge of image formats (PNG/JPG for textures, HDR/EXR for skyboxes)

## 🎯 Step-by-Step Game Creation Process

### Step 1: Choose Your Base Theme

We have 4 themes available:

1. **`classic`** - Geometric shapes, perfect for testing
2. **`space`** - Full space environment with 3D models
3. **`postapocalyptic`** - Wasteland theme with 3D models
4. **`custom`** - Empty template for completely new themes

### Step 2: Get Your Asset URLs

**The user will provide asset URLs. You can use either:**
- **S3 URLs:** `https://bucket.s3.amazonaws.com/assets/model.glb`
- **Local paths:** `/src/models/themeName/model.glb`

#### Required Asset Types:

**🧑‍🚀 Player Models:**
- Format: GLTF or GLB
- Recommended: Single character model, properly centered
- Size: Under 5MB for web performance

**👹 Enemy Models:**
- Format: GLTF or GLB
- Recommended: 2 different enemy types per theme
- Size: Under 2MB each for performance

**🌌 Skybox Textures:**
- Format: HDR/EXR (best quality) or JPG/PNG (simple)
- Resolution: 2048x1024 or higher recommended
- Type: Equirectangular projection

**🏞️ Ground Textures:**
- Format: PNG or JPG
- Resolution: Power-of-2 dimensions (512x512, 1024x1024, etc.)
- Type: Seamless tileable texture

### Step 3: Modify Theme Configuration

#### PRIMARY FILE TO EDIT: `src/config/themes/themes.js`

#### Option A: Modify Existing Theme

```javascript
// FILE LOCATION: src/config/themes/themes.js

// Example: Modify space theme with custom player
// You can use either S3 URLs or local paths:
themes.space.player.modelUrl = 'https://user-provided-s3-url.com/models/custom-player.glb';
// OR
themes.space.player.modelUrl = '/src/models/custom-player.glb';

themes.space.player.color = 0xFF6B35; // Custom color

// Example: Change skybox only
themes.space.environment.skybox.texturePath = 'https://user-provided-s3-url.com/skyboxes/custom-sky.jpg';
// OR
themes.space.environment.skybox.texturePath = '/src/models/skyboxes/custom-sky.jpg';
```

#### Option B: Use Custom Theme Template

```javascript
// FILE LOCATION: src/config/themes/themes.js

themes.custom = {
  name: 'My Custom Game',
  player: {
    // Use either S3 URLs or local paths:
    modelUrl: 'https://user-provided-s3-url.com/models/player.glb',
    // OR
    // modelUrl: '/src/models/player.glb',
    fallbackGeometry: 'box',
    scale: [1, 1, 1],
    color: 0x4285f4,
    rotation: [0, -Math.PI, 0],
  },
  enemies: {
    types: [
      {
        modelUrl: 'https://user-provided-s3-url.com/models/enemy1.glb',
        // OR
        // modelUrl: '/src/models/enemy1.glb',
        speed: 4,
        health: 100,
        color: 0xFF0000,
        facePlayer: true,
      },
      {
        modelUrl: 'https://user-provided-s3-url.com/models/enemy2.glb',
        // OR
        // modelUrl: '/src/models/enemy2.glb',
        speed: 2,
        health: 150,
        color: 0x00FF00,
        facePlayer: true,
      },
    ],
  },
  environment: {
    ground: {
      // Use either S3 URLs or local paths:
      texture: 'https://user-provided-s3-url.com/textures/ground.jpg',
      // OR
      // texture: '/src/models/ground/ground.jpg',
      color: 0x8B7355,
      material: 'standard',
    },
    skybox: {
      texturePath: 'https://user-provided-s3-url.com/skyboxes/sky.jpg',
      // OR
      // texturePath: '/src/models/skyboxes/sky.jpg',
      skyType: 'day',
    },
    // ... rest of configuration
  },
  // ... complete the rest of the theme
};
```

### Step 4: AI Will Handle Project Setup & Testing

The AI will automatically:
1. Save the configuration changes to `src/config/themes/themes.js`
2. Use the project to load the game

## 🎨 Detailed Configuration Guide

### Player Configuration

```javascript
// 📍 MODIFY IN: src/config/themes/themes.js
player: {
  // 🎯 MAIN ASSET - Replace with user's asset URL
  modelUrl: 'https://user-s3-url.com/models/player.glb',
  // OR for local: modelUrl: '/src/models/player.glb',

  // 🔷 FALLBACK - Used if model fails to load
  fallbackGeometry: 'box', // 'box', 'sphere', 'cylinder'

  // 📏 SIZE - Scale the model
  scale: [1, 1, 1], // [width, height, depth] multipliers

  // 🎨 COLOR - Fallback color (hex format)
  color: 0x4285f4, // Blue color

  // 🔄 ROTATION - Initial rotation in radians
  rotation: [0, -Math.PI, 0], // [x, y, z] rotation
}
```

### Enemy Configuration

```javascript
// 📍 MODIFY IN: src/config/themes/themes.js
enemies: {
  types: [
    {
      // 🎯 MAIN ASSET - Replace with user's asset URL
      modelUrl: 'https://user-s3-url.com/models/enemy1.glb',
      // OR for local: modelUrl: '/src/models/enemy1.glb',

      // ⚡ GAMEPLAY - Enemy behavior
      speed: 4,        // Movement speed
      health: 100,     // Hit points

      // 🎨 APPEARANCE - Fallback color
      color: 0xFF0000, // Red color

      // 🤖 AI - Enemy behavior
      facePlayer: true, // Rotates to face player
    },
    // Add more enemy types...
  ]
}
```

### Environment Configuration

```javascript
// 📍 MODIFY IN: src/config/themes/themes.js
environment: {
  // 🏞️ GROUND - Floor appearance
  ground: {
    // 🎨 MAIN TEXTURE - Replace with user's asset URL
    texture: 'https://user-s3-url.com/textures/ground.jpg',
    // OR for local: texture: '/src/models/ground/ground.jpg',

    // 🔷 FALLBACK - Color if texture fails
    color: 0x8B7355,

    // ✨ MATERIAL - Visual properties
    material: 'standard', // 'standard', 'lambert', 'phong'
  },

  // ☁️ SKYBOX - Background environment
  skybox: {
    // 🎯 MAIN ASSET - Replace with user's asset URL
    texturePath: 'https://user-s3-url.com/skyboxes/sky.hdr',
    // OR for local: texturePath: '/src/models/skyboxes/sky.hdr',

    // 🌅 TIME OF DAY - Affects lighting
    skyType: 'day', // 'day', 'night', 'sunset', 'dusk'
  },

  // 💡 LIGHTING - Scene illumination
  lighting: {
    ambient: {
      color: 0x404040,  // Ambient light color
      intensity: 0.4    // Light brightness (0-1)
    },
    directional: {
      color: 0xffffff,  // Sun light color
      intensity: 0.8,   // Light brightness
      position: [1, 1, 0.5] // Light direction
    }
  }
}
```

## 🔧 Advanced Customization

### Adding New Enemy Types

```javascript
// 📍 MODIFY IN: src/config/themes/themes.js
enemies: {
  types: [
    // Existing enemies...
    {
      id: 'boss',  // Unique identifier
      modelUrl: 'https://user-s3-url.com/models/boss.glb',
      // OR for local: modelUrl: '/src/models/boss.glb',
      speed: 1,
      health: 500,
      color: 0x800080,
      facePlayer: true,
      scale: [2, 2, 2], // Make boss larger
    }
  ]
}
```

### Custom Lighting Setup

```javascript
// 📍 MODIFY IN: src/config/themes/themes.js
lighting: {
  // Multiple directional lights for dramatic effect
  directional: [
    {
      color: 0xFFF8DC,  // Warm sunlight
      intensity: 0.9,
      position: [1, 1, 0.5]
    },
    {
      color: 0xFFA500,  // Orange accent light
      intensity: 0.4,
      position: [-1, 0.5, -0.5]
    }
  ],

  // Point lights for specific areas
  point: [
    {
      color: 0xFFD700,  // Gold light
      intensity: 0.6,
      position: [0, 12, 0],  // Above center
      distance: 30
    }
  ]
}
```

### Particle Effects

```javascript
// 📍 MODIFY IN: src/config/themes/themes.js
particles: {
  // Floating particles
  fireflies: {
    count: 600,           // Number of particles
    color: 0xFFFF00,      // Particle color
    size: 2              // Particle size
  },

  // Magical effects
  magic: {
    count: 300,
    colors: [0x9370DB, 0xDA70D6, 0xFF69B4], // Multiple colors
    size: 3
  }
}
```

## 🎯 Specific Variable Changes Guide

### For Player Model Replacement:
```javascript
// Change this variable in themes[themeName].player:
modelUrl: 'YOUR_NEW_ASSET_URL_HERE'
```

### For Enemy Model Replacement:
```javascript
// Change this variable in themes[themeName].enemies.types[index]:
modelUrl: 'YOUR_NEW_ENEMY_ASSET_URL_HERE'
```

### For Skybox Texture Replacement:
```javascript
// Change this variable in themes[themeName].environment.skybox:
texturePath: 'YOUR_NEW_SKYBOX_URL_HERE'
```

### For Ground Texture Replacement:
```javascript
// Change this variable in themes[themeName].environment.ground:
texture: 'YOUR_NEW_GROUND_URL_HERE'
```

### For Color Changes:
```javascript
// Player color:
themes[themeName].player.color = 0xFF0000;

// Enemy colors:
themes[themeName].enemies.types[0].color = 0x00FF00;
themes[themeName].enemies.types[1].color = 0x0000FF;

// Ground color:
themes[themeName].environment.ground.color = 0x8B7355;
```

## 🚨 Troubleshooting

### Common Issues:

**❌ Model not loading:**
- Check asset URL is publicly accessible
- Verify CORS is enabled for S3 buckets
- Ensure model is in GLTF/GLB format

**❌ Texture not appearing:**
- Check image format (JPG/PNG for ground, HDR/EXR/JPG for skybox)
- Verify power-of-2 dimensions for textures
- Check asset URL permissions

**❌ Colors not showing:**
- Fallback colors only appear when models fail to load
- Check model file integrity
- Verify asset URL format

### Performance Tips:

- Keep model file sizes under 5MB
- Use compressed textures when possible
- Optimize 3D models for web (reduce polygons)
- Test on target devices

## 📞 Support

If you encounter issues:
1. Check browser console for error messages
2. Verify all asset URLs are accessible
3. Test with local files first, then switch to external URLs
4. Ensure proper file formats and sizes

## 🎉 You're Done!

Once you've configured your theme with asset URLs, your custom game will be ready to play with your unique assets and visual style!

---

## 📋 Quick Reference

**File to modify:** `src/config/themes/themes.js`

**Key variables to change:**
- `modelUrl` - for 3D models
- `texturePath` - for skybox textures
- `texture` - for ground textures
- `color` - for fallback colors

**Supported formats:**
- Models: GLTF, GLB
- Textures: PNG, JPG
- Skyboxes: HDR, EXR, JPG, PNG

**URL formats:**
- S3: `https://bucket.s3.amazonaws.com/assets/file.ext`
- Local: `/src/models/folder/file.ext`