# 🎨 3D Models Directory - Asset Organization Guide

## 📁 Models Folder Structure

The `src/models/` directory contains all 3D models, textures, and visual assets used in the Three.js game. Assets are organized by theme and type for efficient management and theme switching.

## 🏗️ Directory Structure Overview

```
src/models/
├── README.md              # 📖 This documentation
├── ground/                # 🏞️ Ground textures (shared across all themes)
├── skybox/                # 🌌 Environment skyboxes (shared across themes)
├── [theme-name]/          # 🎨 Theme-specific assets (medieval, space, post, etc.)
│   ├── *.glb             # 3D character and object models
│   ├── *.png             # Character and object textures
│   └── Textures/         # Additional material textures
└── [new-theme]/          # 🚀 New theme folders follow same structure
```

## 📂 Folder Purpose Guide

### **🏞️ ground/ - Shared Ground Textures**
**Contents:** Ground surface textures used across multiple themes
- **Format:** JPG/PNG image files
- **Usage:** Applied to floor/ground geometry
- **Examples:** Grass, concrete, metal, dirt textures
- **Resolution:** 512x512 to 2048x2048 pixels

### **🌌 skybox/ - Environment Skyboxes**
**Contents:** 360° environment backgrounds and lighting data
- **Format:** HDR (.exr) or high-res JPG
- **Usage:** Surrounds entire scene for realistic lighting
- **Examples:** Day/night skies, space environments, indoor scenes
- **Resolution:** 1K to 4K (1024x1024 to 4096x4096)

### **🎨 [theme-name]/ - Theme-Specific Assets**
**Contents:** All assets unique to a specific visual theme
- **Character Models:** Player and enemy 3D models (.glb)
- **Object Models:** Obstacles, collectibles, decorations (.glb)
- **Textures:** Character skins, material maps (.png/.jpg)
- **Subfolders:** `Textures/` for additional material files

### **📦 Asset Categories by Type**

#### **👤 Character Models (.glb)**
- **Player Models:** Main character 3D geometry and materials
- **Enemy Models:** AI-controlled opponent characters
- **NPC Models:** Non-player characters (if applicable)

#### **🏗️ Object Models (.glb)**
- **Obstacles:** Environmental barriers and blocking objects
- **Collectibles:** Items players can pick up (coins, power-ups)
- **Decorations:** Visual elements that enhance atmosphere
- **Interactive:** Objects that respond to player interaction

#### **🖼️ Texture Files (.png/.jpg)**
- **Color Maps:** Base colors and patterns for models
- **Normal Maps:** Surface detail without extra geometry
- **Emission Maps:** Glowing effects and self-illumination
- **Material Maps:** Surface properties (roughness, metalness)

#### **🌟 Special Assets**
- **Skyboxes:** HDR environment maps for realistic lighting
- **Ground Textures:** Reusable surface materials
- **Particle Textures:** Effects and visual flourishes

## 🎯 Naming Conventions

### **📂 Folder Names**
- **Themes:** lowercase, single word (e.g., `medieval`, `space`, `cyberpunk`)
- **Shared:** descriptive names (e.g., `ground`, `skybox`)
- **Subfolders:** `Textures/` for material files

### **📄 File Names**
- **Models:** `{theme}{AssetType}.glb` (e.g., `medievalPlayer.glb`)
- **Textures:** `{theme}{Purpose}.png` (e.g., `medievalColorMap.png`)
- **Skyboxes:** `{name}_{resolution}.{ext}` (e.g., `goegap_4k.exr`)

## 🔗 Integration with Game

### **🎨 Theme Configuration**
Assets are referenced in theme configuration files:

```javascript
// In src/config/themes/themes.js
export const themes = {
  medieval: {
    player: {
      modelUrl: '/src/models/medieval/medievalPlayer.glb'
    },
    enemies: {
      types: [{
        modelUrl: '/src/models/medieval/medievalEnemy1.glb'
      }]
    },
    environment: {
      ground: {
        texture: '/src/models/ground/medieval-stone.jpg'
      },
      skybox: {
        texturePath: '/src/models/skybox/medieval_sky_2k.exr'
      }
    }
  }
};
```

### **⚙️ Component Loading**
Models are loaded through React components with fallbacks:

```javascript
// BaseModel component handles loading with fallbacks
<BaseModel
  url="/src/models/medieval/medievalPlayer.glb"
  fallbackComponent={Box}
  size={1}
/>
```

## 🚀 Adding New Themes

### **Step 1: Create Theme Folder**
```bash
mkdir src/models/cyberpunk
mkdir src/models/cyberpunk/Textures
```

### **Step 2: Add Required Assets**
```
src/models/cyberpunk/
├── cyberpunkPlayer.glb     # Player character
├── cyberpunkEnemy1.glb     # Primary enemy
├── cyberpunkEnemy2.glb     # Secondary enemy
├── cyberpunkObstacle.glb   # Environmental object
├── cyberpunkCollectible.glb # Pickup item
├── cyberpunkPlayer.png     # Character texture
└── Textures/
    ├── metal.png          # Material texture
    └── glow.png           # Emission texture
```

### **Step 3: Update Theme Configuration**
Reference the new assets in `src/config/themes/themes.js`

### **Step 4: Add to Constants**
Register the new theme in `src/config/constants.js`

## 📋 File Format Specifications

### **🎭 3D Models**
- **Primary:** `.glb` (GL Transmission Format Binary)
- **Alternative:** `.gltf` (GL Transmission Format)
- **Purpose:** Character geometry, materials, animations

### **🖼️ Textures**
- **Standard:** `.png`, `.jpg`, `.jpeg`
- **HDR:** `.exr`, `.hdr`
- **Purpose:** Surface colors, normals, emissions

### **🌌 Skyboxes**
- **Format:** HDR (.exr) preferred, high-res JPG/PNG
- **Purpose:** Environment lighting and backgrounds

## ⚡ Performance Guidelines

### **📏 Asset Optimization**
- **Models:** Use gltf-pipeline for compression
- **Textures:** Power-of-2 sizes (256, 512, 1024, 2048)
- **Skyboxes:** Balance quality vs. loading time

### **🔄 Loading Strategy**
- **Critical:** Player models load first
- **On-demand:** Theme assets load when theme changes
- **Progressive:** Large assets load in background

### **💾 Memory Management**
- **LOD:** Multiple detail levels for distance
- **Pooling:** Reuse similar model instances
- **Cleanup:** Dispose unused geometries/materials

## 🛠️ Development Workflow

### **🎨 Asset Creation**
1. **Model in 3D software** (Blender, Maya, etc.)
2. **UV unwrap and texture** models
3. **Export to GLTF/GLB** format
4. **Optimize** using gltf-pipeline
5. **Test in game** environment
6. **Add to theme** configuration

### **🔍 Quality Assurance**
- **Visual:** Check lighting and materials
- **Performance:** Monitor frame rate impact
- **Fallback:** Verify default shapes work
- **Compatibility:** Test across different devices

This structure ensures **organized, scalable, and maintainable** asset management for theme-based Three.js games.