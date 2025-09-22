// ============================================================================
// 📊 STATS PANEL COMPONENT - Flexible Statistics Display Grid
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is a flexible statistics display component for showing multiple data points
// ✅ Takes an array of stats objects with label and value properties
// ✅ Renders each stat as a label-value pair with consistent styling
// ✅ Used in GameOverScreen for final game statistics display
// ✅ Pure presentational component that maps over provided stats array
//
// 📊 WHAT STATSPANEL ACTUALLY DOES:
// - Array mapping: iterates over stats array to create individual stat displays
// - Label-value rendering: displays each stat with label and value elements
// - CSS styling: applies consistent classes for visual integration
// - Dynamic content: handles any number of stats without modification
//
// 📊 WHAT STATSPANEL DOES NOT DO (happens elsewhere):
// - Data collection: parent components gather and format statistics
// - Data calculation: stats values computed by game systems before display
// - Styling definitions: CSS classes defined in global stylesheets
// - State management: no internal state, purely renders provided data
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎯 FLEXIBLE STATISTICS MODIFICATIONS:
// Since StatsPanel is a data presentation component, customization focuses on display:
//
// 📝 MODIFY STAT PRESENTATION:
// - Change layout from vertical list to grid or horizontal arrangement
// - Add icons or visual elements for different stat types
// - Include progress bars or visual indicators for certain stats
// - Add conditional formatting based on stat values or types
//
// 🎭 ADD VISUAL ENHANCEMENTS:
// - Include color coding for different stat categories
// - Add animations or transitions for stat appearance
// - Include stat comparisons or trend indicators
// - Add tooltips or descriptions for complex statistics
//
// 🔄 STATE MANAGEMENT:
// - stats: Array of stat objects with label and value properties (required prop)
//   - Each object: { label: string, value: number/string }
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/components/GameOverScreen.jsx: Uses StatsPanel for final game statistics
// - src/components/HUD.jsx: Currently uses separate ScoreDisplay and EnemyKilledDisplay components (could use StatsPanel for unified display)
// - src/config/atoms/gameStateAtoms.js: Provides statistics data for display
// - src/utils/gameUtils.js: Could include statistics calculation utilities
//
// 📊 STATS ARRAY FORMAT:
// ```javascript
// const stats = [
//   { label: "SCORE:", value: 1250 },
//   { label: "ENEMIES DESTROYED:", value: 42 },
//   { label: "TIME PLAYED:", value: "3:45" },
//   { label: "ACCURACY:", value: "85%" }
// ];
// ```
//
// ⚠️ IMPORTANT NOTES:
// - StatsPanel requires stats array prop - will render empty if not provided
// - Each stat object must have label and value properties
// - Uses array index as React key (consider unique IDs for complex stats)
// - No validation performed on stats array structure
// - Component handles any number of statistics dynamically
//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASE

import React from "react";

/**
 * 📊 STATS PANEL COMPONENT - Flexible Statistics Display Grid
 * ==========================================================
 *
 * @description Flexible statistics display component for showing multiple data points
 * @param {Array} stats - Array of stat objects with label and value properties (required)
 * @returns {JSX.Element} Container with mapped stat displays
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Map over stats array to create individual stat displays
 * - Render each stat as label-value pair with consistent styling
 * - Handle dynamic number of statistics without modification
 * - Apply CSS classes for visual integration with game UI
 *
 * 📊 STATISTICS DISPLAY:
 * - Layout: Vertical list of label-value pairs
 * - Content: Dynamic based on provided stats array
 * - Styling: Consistent CSS classes for all stat items
 * - Flexibility: Handles any number and type of statistics
 *
 * 🎨 VISUAL STRUCTURE:
 * - .stats-container: Main container for all statistics
 * - .stat: Individual statistic item container
 * - .stat-label: Label/description text for each statistic
 * - .stat-value: Numerical or text value for each statistic
 *
 * 🚀 USAGE PATTERNS:
 * - GameOver Screen: Final game statistics summary
 * - Achievement Panels: Progress and completion statistics
 * - Performance Metrics: Detailed gameplay analytics
 * - Comparison Displays: Before/after or player vs player stats
 */
const StatsPanel = ({ stats }) => {
  return (
    <div className="stats-container">
      {stats.map(({ label, value }, index) => (
        <div className="stat" key={index}>
          <span className="stat-label">{label}</span>
          <span className="stat-value">{value}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsPanel;
