# 📱 Mobile Controls Integration Guide

> **📍 Location**: `src/components/MobileControls/` - Comprehensive mobile controls documentation

## 🎯 Overview

Dual-joystick touch controls that integrate seamlessly with existing keyboard/mouse controls through shared input atoms. **Zero game logic changes needed**.

**Key Benefits:**
- ✅ Works with existing `usePlayerMovement`, `usePlayerRotation`, `usePlayerShooting` hooks
- ✅ Prop-based integration (mobile position passed as props)
- ✅ Shared input atoms with keyboard/mouse controls
- ✅ Automatic priority handling (mobile takes precedence when active)

## 🎮 Control Layout

```
[Movement Joystick]    🔫    [Rotation Joystick]
      (Left)         Shoot        (Right)
```

- **Left Joystick**: Movement (WASD equivalent)
- **Right Joystick**: Rotation/Aiming (mouse equivalent)  
- **Shoot Button**: Primary action (spacebar equivalent)

## 🚀 Quick Integration

### ✅ Automatic Mobile Detection

Mobile controls are **automatically shown only on mobile devices**. No setup required!

```jsx
// Mobile controls are already integrated in Scene.jsx
// They automatically appear on mobile devices only

// Scene.jsx includes:
const isMobile = useMemo(() => {
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}, []);

{isMobile && <MobileGameControls />}
```

### Manual Integration (If Needed)
```jsx
// If you want to add mobile controls elsewhere:
import MobileGameControls from './components/MobileControls/MobileGameControls';

const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

{isMobile && <MobileGameControls />}
```

## 🏗️ Architecture

```
Keyboard Input (useKeyControls) ──┐
Mouse Input (managed by hooks) ────┼──► Input Atoms ──► Game Logic
Mobile Input (useMobileControls) ──┘                    
```

**How it works:**
1. `usePlayerMovement` reads shared input atoms (works with mobile automatically)
2. `usePlayerRotation` receives mobile position as prop + manages mouse state internally
3. `useMobileControls` updates same input atoms as keyboard controls
4. **Same game logic, multiple input sources!**

## ⚙️ Configuration

```jsx
// Mobile controls automatically detect device type
// Optional customization:
<MobileGameControls 
  joystickSize={80}           // Joystick diameter (default: 80)
  shootButtonSize={60}        // Button diameter (default: 60)
/>
```

## 🔧 Key Files

- **`MobileGameControls.jsx`** - UI component (dual joysticks + button)
- **`useMobileControls.js`** - Converts touch input to atoms
- **Input atoms** - Shared state with keyboard/mouse controls

## 🐛 Troubleshooting

**Mobile controls not appearing?**
1. Check if you're on a mobile device (controls auto-detect)
2. Verify CSS positioning (controls might be off-screen)
3. Ensure game state is `'playing'` (movement gated by game state)

**Controls appearing on desktop?**
- Mobile detection uses user agent string
- Check browser dev tools device emulation

**Too sensitive/not sensitive?**
```jsx
// In useMobileControls.js, adjust threshold:
const threshold = 0.3; // Lower = more sensitive (default: 0.3)
```

## 📚 Related Files

- **`src/components/MobileControls/MobileGameControls.jsx`** - Main UI component
- **`src/hooks/useMobileControls.js`** - Mobile input logic and atom bridge
- **`src/config/atoms/inputAtoms.js`** - Shared input atoms
- **`src/hooks/useKeyControls.js`** - Keyboard input (for comparison)
- **`src/hooks/usePlayerMovement.js`** - Movement hook (works with mobile automatically)
- **`src/hooks/usePlayerRotation.js`** - Rotation hook (receives mobile position as prop)
- **`src/hooks/usePlayerShooting.js`** - Shooting hook (works with mobile automatically)
- **`src/components/Player.jsx`** - Uses all player hooks with mobile integration

## 📋 For AI Implementation

**Essential points:**
- Mobile controls are **already integrated** in Scene.jsx with automatic detection
- They **only appear on mobile devices** (phones, tablets)
- Existing hooks work unchanged (movement, rotation, shooting)
- Mobile input uses same atoms as keyboard/mouse
- No modifications needed to game logic
- Mobile position passed as props to `usePlayerRotation`
- **Zero setup required** - works out of the box!