
// ============================================================================
// 📋 SCREEN HEADER COMPONENT - Universal Page Title UI
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is a universal header component for displaying screen titles
// ✅ Renders an H1 element with consistent styling across all game screens
// ✅ Used in GameOverScreen and other full-screen UI components
// ✅ Receives title as prop and renders it with standard typography
// ✅ Pure presentational component with semantic HTML structure
//
// 📊 WHAT SCREENHEADER ACTUALLY DOES:
// - Title rendering: displays provided title text in H1 element
// - CSS styling: applies .screen-header class for consistent appearance
// - Semantic HTML: uses proper heading hierarchy for accessibility
// - Typography: provides standardized title formatting across screens
//
// 📊 WHAT SCREENHEADER DOES NOT DO (happens elsewhere):
// - Title generation: parent components provide the title text
// - Dynamic titles: theme-based title switching handled by parent components
// - Styling definitions: CSS classes defined in global stylesheets
// - State management: no internal state or side effects
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎯 UNIVERSAL HEADER MODIFICATIONS:
// Since ScreenHeader is a simple typography component, customization focuses on presentation:
//
// 📝 MODIFY TITLE PRESENTATION:
// - Add icons or visual elements alongside titles
// - Include subtitle or description text below main title
// - Add animations or transitions for title appearance
// - Modify HTML element (h1 to h2, div, etc.) for different hierarchy
//
// 🎭 ADD VISUAL ENHANCEMENTS:
// - Include theme-based styling or color variations
// - Add background effects or decorative elements
// - Include animated text effects or typewriter animations
// - Add responsive typography for different screen sizes
//
// 🔄 STATE MANAGEMENT:
// - title: Title text to display (required prop, string)
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/components/GameOverScreen.jsx: Uses ScreenHeader for "GAME OVER" title
// - src/components/StartScreen.jsx: Uses <h1>TOP-DOWN SHOOTER</h1> directly (could use ScreenHeader for consistency)
// - src/components/SettingsScreen.jsx: Uses <h1>SETTINGS</h1> directly (could use ScreenHeader for consistency)
// - src/config/themes/themes.js: Could define theme-specific titles for dynamic headers
//
// ⚠️ IMPORTANT NOTES:
// - ScreenHeader is a pure presentational component with no logic
// - Component requires title prop - will show undefined if not provided
// - Uses H1 element for proper semantic HTML structure
// - CSS class must be defined in stylesheets for proper appearance
// - No validation or formatting applied to title text

import React from "react";

/**
 * 📋 SCREEN HEADER COMPONENT - Universal Page Title UI
 * ===================================================
 *
 * @description Simple header component for displaying consistent screen titles
 * @param {string} title - Title text to display (required)
 * @returns {JSX.Element} H1 element with title and CSS class
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Display screen titles with consistent typography
 * - Provide semantic HTML structure with proper heading hierarchy
 * - Apply standardized styling through CSS classes
 * - Ensure accessibility with proper heading elements
 *
 * 📋 TITLE PRESENTATION:
 * - Element: H1 for semantic importance and accessibility
 * - Styling: .screen-header class for consistent appearance
 * - Content: Title text passed from parent components
 * - Typography: Standardized across all game screens
 *
 * 🎨 VISUAL STRUCTURE:
 * - HTML Element: <h1> for proper semantic hierarchy
 * - CSS Class: .screen-header for styling integration
 * - Text Content: Dynamic title provided by parent
 *
 * 🚀 USAGE PATTERNS:
 * - GameOver Screen: Uses ScreenHeader for "GAME OVER" title display
 * - Modal Headers: Consistent title formatting for popups and dialogs
 * - Screen Navigation: Clear page identification where implemented
 * - Future Consistency: StartScreen and SettingsScreen could adopt ScreenHeader
 */
const ScreenHeader = ({ title }) => {
  return <h1 className="screen-header">{title}</h1>;
};

export default ScreenHeader;
