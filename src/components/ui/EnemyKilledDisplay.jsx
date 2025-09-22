
// ============================================================================
// 📈 ENEMY KILLED DISPLAY COMPONENT - Enemy Defeat Counter UI
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is a simple UI component that displays the number of enemies killed
// ✅ Shows a label "ENEMIES" with the current count value below it
// ✅ Used in HUD during gameplay and GameOverScreen for final statistics
// ✅ Receives count as prop and renders it with consistent styling
// ✅ Pure presentational component with no state or side effects
//
// 📊 WHAT ENEMYKILLEDDISPLAY ACTUALLY DOES:
// - Count display: renders the enemies killed count as a formatted number
// - Label rendering: shows "ENEMIES" label for context
// - CSS styling: applies consistent UI classes for visual integration
// - Data formatting: displays count directly without additional processing
//
// 📊 WHAT ENEMYKILLEDDISPLAY DOES NOT DO (happens elsewhere):
// - Count tracking: managed by enemiesKilledAtom in game state
// - Count incrementing: handled by Projectiles component when enemies are defeated
// - Data validation: parent components ensure count is a valid number
// - Styling definitions: CSS classes defined in global stylesheets
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎯 SIMPLE UI COMPONENT MODIFICATIONS:
// Since EnemyKilledDisplay is a pure presentational component, customization focuses on display:
//
// 📝 MODIFY DISPLAY FORMAT:
// - Change number formatting (thousands separators, abbreviations)
// - Add icons or visual elements alongside the count
// - Modify label text from "ENEMIES" to other terms
// - Add animations or transitions for count updates
//
// 🎭 ADD VISUAL ENHANCEMENTS:
// - Include progress indicators or achievement badges
// - Add color coding based on count thresholds
// - Include animated counters or count-up effects
// - Add contextual information (rate, time-based stats)
//
// 🔄 STATE MANAGEMENT:
// - count: Number of enemies killed (required prop, no default)
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/components/HUD.jsx: Uses EnemyKilledDisplay in gameplay overlay
// - src/components/GameOverScreen.jsx: Uses in final statistics display
// - src/components/Projectiles.jsx: Increments enemiesKilled when enemies defeated
// - src/config/atoms/gameStateAtoms.js: Defines enemiesKilledAtom for state management
//
// ⚠️ IMPORTANT NOTES:
// - EnemyKilledDisplay is a pure presentational component with no logic
// - Component requires count prop - will show undefined if not provided
// - No internal state or effects - renders immediately based on props
// - CSS classes must be defined in parent stylesheets for proper appearance
// - Count is displayed directly without validation or formatting


import React from "react";

/**
 * 📈 ENEMY KILLED DISPLAY COMPONENT - Enemy Defeat Counter UI
 * ==========================================================
 *
 * @description Simple counter component showing number of enemies defeated
 * @param {number} count - Number of enemies killed (required)
 * @returns {JSX.Element} Div container with label and count display
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Display enemies killed count with clear labeling
 * - Provide consistent visual formatting for statistics
 * - Render immediately based on provided count prop
 * - Apply CSS classes for integration with game UI theme
 *
 * 📊 DISPLAY FORMAT:
 * - Label: "ENEMIES" text for context identification
 * - Value: Numerical count displayed prominently
 * - Container: Structured layout for consistent positioning
 * - Styling: CSS classes for visual theme integration
 *
 * 🎨 VISUAL STRUCTURE:
 * - .enemies-killed-container: Main container for layout
 * - .enemies-killed-label: "ENEMIES" text styling
 * - .enemies-killed-value: Count number styling
 *
 * 🚀 USAGE PATTERNS:
 * - HUD Integration: Real-time display during gameplay
 * - GameOver Statistics: Final count in end-game summary
 * - Statistics Panels: Part of comprehensive game statistics
 * - Achievement Systems: Milestone tracking and display
 */
const EnemiesKilledDisplay = ({ count }) => {
  return (
    <div className="enemies-killed-container">
      <div className="enemies-killed-label">ENEMIES</div>
      <div className="enemies-killed-value">{count}</div>
    </div>
  );
};

export default EnemiesKilledDisplay;
