// ============================================================================
// 🏆 SCORE DISPLAY COMPONENT - Game Score Counter UI
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is a simple UI component that displays the current game score
// ✅ Shows a label "SCORE" with the current score value below it
// ✅ Used in HUD during gameplay and GameOverScreen for final statistics
// ✅ Receives score as prop and renders it with consistent styling
// ✅ Pure presentational component with no state or side effects
//
// 📊 WHAT SCOREDISPLAY ACTUALLY DOES:
// - Score display: renders the current score as a formatted number
// - Label rendering: shows "SCORE" label for context
// - CSS styling: applies consistent UI classes for visual integration
// - Data formatting: displays score directly without additional processing
//
// 📊 WHAT SCOREDISPLAY DOES NOT DO (happens elsewhere):
// - Score tracking: managed by scoreAtom in game state
// - Score incrementing: handled by Projectiles component when enemies are defeated
// - Score calculation: computed based on enemy points and score multipliers
// - Styling definitions: CSS classes defined in global stylesheets
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎯 SIMPLE UI COMPONENT MODIFICATIONS:
// Since ScoreDisplay is a pure presentational component, customization focuses on display:
//
// 📝 MODIFY DISPLAY FORMAT:
// - Change number formatting (thousands separators, abbreviations like 1.2K)
// - Add icons or visual elements alongside the score
// - Modify label text from "SCORE" to other terms
// - Add animations or transitions for score updates
//
// 🎭 ADD VISUAL ENHANCEMENTS:
// - Include score multiplier indicators or combo counters
// - Add color coding based on score thresholds or achievements
// - Include animated score counters or count-up effects
// - Add contextual information (high score comparisons, rank indicators)
//
// 🔄 STATE MANAGEMENT:
// - score: Current game score (required prop, number)
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/components/HUD.jsx: Uses ScoreDisplay in gameplay overlay
// - src/components/GameOverScreen.jsx: Uses in final statistics display
// - src/components/Projectiles.jsx: Increments score when enemies defeated
// - src/config/atoms/gameStateAtoms.js: Defines scoreAtom for state management
// - src/config/gameConfig.js: Defines score multipliers and point values
//
// ⚠️ IMPORTANT NOTES:
// - ScoreDisplay is a pure presentational component with no logic
// - Component requires score prop - will show undefined if not provided
// - No internal state or effects - renders immediately based on props
// - CSS classes must be defined in parent stylesheets for proper appearance
// - Score is displayed directly without validation or formatting
//

import React from "react";

/**
 * 🏆 SCORE DISPLAY COMPONENT - Game Score Counter UI
 * =================================================
 *
 * @description Simple score counter component showing current game score
 * @param {number} score - Current game score (required)
 * @returns {JSX.Element} Div container with label and score display
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Display current game score with clear labeling
 * - Provide consistent visual formatting for statistics
 * - Render immediately based on provided score prop
 * - Apply CSS classes for integration with game UI theme
 */
const ScoreDisplay = ({ score }) => {
  return (
    <div className="score-container">
      <div className="score-label">SCORE</div>
      <div className="score-value">{score}</div>
    </div>
  );
};

export default ScoreDisplay;
