import React from 'react'
import { Joystick } from 'react-joystick-component'
import { useMobileControls } from '../../hooks/useMobileControls'

/**
 * 📱 MOBILE GAME CONTROLS - Touch Control UI
 * ==========================================
 *
 * 🎯 WHAT THIS COMPONENT DOES:
 * ✅ Renders joystick and shoot button for mobile devices
 * ✅ Integrates with input atom system via useMobileControls hook
 * ✅ Provides same input functionality as keyboard controls
 * ✅ Uses existing react-joystick-component for smooth joystick experience
 * ✅ Shares input state with keyboard controls through atoms
 *
 * 🎮 CONTROL LAYOUT:
 * - Left side: Virtual joystick for movement (forward/backward/left/right)
 * - Right side: Shoot button for primary action
 * - Responsive design that works on different screen sizes
 *
 * 🔄 INTEGRATION:
 * - Uses useMobileControls hook for input atom management
 * - No longer needs onMove/onShoot props (uses atoms directly)
 * - Compatible with existing game logic (usePlayerMovement, usePlayerShooting)
 */
export default function MobileGameControls({
  enabled = true,
  joystickSize = 80,
  shootButtonSize = 60
}) {
  // 🎮 MOBILE CONTROLS HOOK - Manages input atoms and provides callbacks
  const { onMove, onStop, onRotate, onShoot } = useMobileControls();

  if (!enabled) return null

  return (
    <div className="mobile-game-controls">
      {/* Movement Joystick - Left side */}
      <div className="joystick-container movement-joystick">
        <Joystick
          size={joystickSize}
          sticky={false}
          baseColor="rgba(255,255,255,0.3)"
          stickColor="rgba(255,255,255,0.8)"
          move={onMove}
          stop={onStop}
          throttle={16}
        />
      </div>

      {/* Rotation Joystick - Right side */}
      <div className="joystick-container rotation-joystick">
        <Joystick
          size={joystickSize}
          sticky={false}
          baseColor="rgba(100,150,255,0.3)"
          stickColor="rgba(100,150,255,0.8)"
          move={onRotate}
          throttle={16}
        />
      </div>

      {/* Shoot Button - Center bottom */}
      <div className="shoot-container">
        <button
          className="shoot-button"
          onMouseDown={onShoot}
          onTouchStart={(e) => {
            e.preventDefault()
            onShoot()
          }}
          style={{
            width: shootButtonSize,
            height: shootButtonSize,
            borderRadius: '50%',
            border: '3px solid rgba(255,255,255,0.8)',
            background: 'rgba(255,255,255,0.3)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          🔫
        </button>
      </div>
    </div>
  )
}
