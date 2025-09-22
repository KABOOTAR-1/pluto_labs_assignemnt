// ============================================================================
// ❤️ HEALTH BAR COMPONENT - Visual Player Health Indicator
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is a visual health indicator showing current/max health as a colored bar
// ✅ Uses color coding: green (>70%), orange (30-70%), red (<30%) for health status
// ✅ Shows both visual bar representation and numerical health value
// ✅ Used in HUD during gameplay to provide real-time health feedback
// ✅ Pure presentational component that calculates percentage and color dynamically
//
// 📊 WHAT HEALTHBAR ACTUALLY DOES:
// - Percentage calculation: computes (current / max) * 100 for bar width
// - Color determination: applies green/orange/red based on health percentage thresholds
// - Visual rendering: displays filled bar with dynamic width and color
// - Numerical display: shows current health value rounded up with Math.ceil
//
// 📊 WHAT HEALTHBAR DOES NOT DO (happens elsewhere):
// - Health tracking: managed by activePlayerHealthAtom in game state
// - Health modification: handled by Player component and damage systems
// - Max health definition: comes from basePlayerHealthAtom configuration
// - Styling definitions: CSS classes defined in global stylesheets
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎯 HEALTH VISUALIZATION MODIFICATIONS:
// Since HealthBar is a visual indicator component, customization focuses on presentation:
//
// 📝 MODIFY HEALTH THRESHOLDS:
// - Change color breakpoints (currently 70% and 30%)
// - Add more color stages for granular health indication
// - Modify colors for different visual themes or accessibility
// - Add pulsing or flashing effects for critical health
//
// 🎭 ADD VISUAL ENHANCEMENTS:
// - Include health regeneration animations
// - Add damage flash effects when health decreases
// - Include shield or armor indicators alongside health
// - Add health trend indicators (increasing/decreasing arrows)
//
// 🔄 STATE MANAGEMENT:
// - current: Current health value (required prop, number)
// - max: Maximum health value (required prop, number)
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/components/HUD.jsx: Uses HealthBar with current and max health values
// - src/components/Player.jsx: Modifies health via setPlayerHealth when taking damage
// - src/config/atoms/playerAtoms.js: Defines health-related atoms for state management
// - src/hooks/usePlayerHealth.js: Handles health changes and game over conditions
//
// 🎭 HEALTH DISPLAY PIPELINE:
// 1. Player component tracks health via activePlayerHealthAtom
// 2. HUD component reads current health and basePlayerHealthAtom for max
// 3. HUD passes current and max as props to HealthBar
// 4. HealthBar calculates percentage and determines color
// 5. Component renders bar with appropriate width, color, and numerical value
//
// ⚠️ IMPORTANT NOTES:
// - HealthBar performs percentage calculation on every render
// - Color determination uses ternary operators for performance
// - Math.ceil ensures health value always rounds up (99.1 shows as 100)
// - Component assumes current and max are valid numbers
// - Bar width percentage is applied via inline styles for dynamic updates


import React from "react";

/**
 * ❤️ HEALTH BAR COMPONENT - Visual Player Health Indicator
 * =======================================================
 *
 * @description Dynamic health bar with color coding and numerical display
 * @param {number} current - Current health value (required)
 * @param {number} max - Maximum health value (required)
 * @returns {JSX.Element} Health bar container with label, visual bar, and numeric value
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Calculate health percentage for visual bar width
 * - Determine appropriate color based on health thresholds
 * - Render visual bar representation with dynamic styling
 * - Display numerical health value with proper formatting
 *
 * 📊 HEALTH VISUALIZATION:
 * - Bar Width: Percentage-based (current/max * 100)
 * - Color Coding: Green (>70%), Orange (30-70%), Red (<30%)
 * - Numerical Value: Current health rounded up (Math.ceil)
 * - Layout: Label, visual bar, and numeric display
 *
 * 🎨 COLOR THRESHOLDS:
 * - Healthy (>70%): #2ecc71 (green) - player in good condition
 * - Warning (30-70%): #f39c12 (orange) - player should be cautious
 * - Critical (<30%): #e74c3c (red) - player in danger
 *
 * 🎨 VISUAL STRUCTURE:
 * - .health-container: Main container for layout and spacing
 * - .health-label: "HEALTH" text label for identification
 * - .health-bar-container: Background container for the progress bar
 * - .health-bar-fill: Colored fill with dynamic width and background
 * - .health-value: Numerical health display (rounded up)
 *
 * 🚀 USAGE PATTERNS:
 * - HUD Integration: Real-time health monitoring during gameplay
 * - Status Indicators: Quick visual assessment of player condition
 * - UI Feedback: Immediate response to damage and healing
 * - Accessibility: Both visual and numerical health representation
 */
const HealthBar = ({ current, max }) => {
  // 📊 PERCENTAGE CALCULATION - Convert current/max to percentage for bar width
  const healthPercentage = (current / max) * 100;
  
  // 🎨 COLOR DETERMINATION - Apply color coding based on health thresholds
  const healthColor =
    healthPercentage > 70 ? "#2ecc71" :   // Green: Healthy state (>70%)
    healthPercentage > 30 ? "#f39c12" :   // Orange: Warning state (30-70%)
    "#e74c3c";                            // Red: Critical state (<30%)

  return (
    <div className="health-container">
      {/* 🏷️ HEALTH LABEL - Context identification for the health display */}
      <div className="health-label">HEALTH</div>
      
      {/* 📊 VISUAL HEALTH BAR - Dynamic width and color based on current health */}
      <div className="health-bar-container">
        <div
          className="health-bar-fill"
          style={{
            width: `${healthPercentage}%`,        // Dynamic width based on health percentage
            backgroundColor: healthColor,         // Dynamic color based on health thresholds
          }}
        />
      </div>
      
      {/* 🔢 NUMERICAL HEALTH VALUE - Current health rounded up for display */}
      <div className="health-value">{Math.ceil(current)}</div>
    </div>
  );
};

export default HealthBar;
