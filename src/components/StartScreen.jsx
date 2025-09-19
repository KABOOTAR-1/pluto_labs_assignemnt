// ============================================================================
// 🚀 START SCREEN COMPONENT - Main Menu Interface
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is the first screen players see when launching the game
// ✅ Controls navigation FROM menu TO gameplay and settings
// ✅ Uses conditional rendering based on game state atom
// ✅ Provides entry point to start new game sessions
//
// 📊 COMPONENT BEHAVIOR:
// - Only renders when gameState === 'menu'
// - Shows game title and basic instructions
// - Provides "START GAME" button to begin playing
// - Provides "SETTINGS" button to configure game options
// - Uses resetGameAtom ONLY when "START GAME" button is clicked
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎨 VISUAL CUSTOMIZATION:
// - Game Title: Change "TOP-DOWN SHOOTER" to match your theme
// - Instructions: Update movement/control descriptions
// - Button Text: Modify "START GAME" and "SETTINGS" labels
// - CSS Classes: Customize .start-screen, .game-screen, .screen-content
//
// 🎮 FUNCTIONAL MODIFICATIONS:
// - Add new buttons (e.g., "TUTORIAL", "ACHIEVEMENTS", "CREDITS")
// - Implement different game modes (EASY/NORMAL/HARD quick-start)
// - Add theme selection directly on start screen
// - Include high score display or player stats
//
// 📱 LAYOUT CHANGES:
// - Add background video or animated elements
// - Include character preview or theme showcase
// - Add social features (leaderboards, sharing)
// - Implement responsive design for mobile devices
//
// 🔄 STATE MANAGEMENT:
// - gameStateAtom: Controls which screen is visible ('menu', 'playing', 'gameOver', 'settings')
// - resetGameAtom: Initializes fresh game state and transitions FROM 'menu' TO 'playing'
// - useSettingsNavigation: Handles navigation FROM 'menu' TO 'settings' with state preservation
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/App.css: Styling for .game-screen, .screen-content, .game-button
// - src/config/atoms/gameStateAtoms.js: Game state management
// - src/hooks/useSettingsNavigation.js: Settings navigation logic
// - src/components/SettingsScreen.jsx: Settings interface
// - src/components/GameRenderer.jsx: Main game view
//
// 🎨 STYLING DEPENDENCIES:
// - .game-screen: Full-screen overlay positioning
// - .screen-content: Centered content container with max-width
// - .game-button: Primary button styling with hover effects
// - .game-button.secondary: Secondary button with translucent background
//
// 🔗 ATOM DEPENDENCIES:
// - gameStateAtom (read): Determines when to render this component
// - resetGameAtom (write): Initializes new game when "START GAME" clicked
// - useSettingsNavigation: Provides goToSettings() function
//
// ⚠️ IMPORTANT NOTES:
// - Component returns null when gameState !== 'menu' (conditional rendering)
// - resetGame() transitions state to 'playing' and resets all game variables
// - Settings navigation preserves current state in sessionStorage
// - Button styling includes advanced CSS effects (transforms, shadows, gradients)
//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASES:
// ============================================================================
//
// 📝 Change Game Title:
// Replace "TOP-DOWN SHOOTER" with your game name
//
// 🎮 Add Game Mode Selection:
// Add buttons for different difficulties or game types before handleStartGame()
//
// 🎨 Change Theme:
// Modify CSS classes or add theme-specific styling
//
// 📱 Add Mobile Support:
// Include touch controls information in instructions
//
// 🏆 Add High Scores:
// Import score atoms and display best scores on menu
// ============================================================================

import React from 'react';
import { useAtom } from 'jotai';
import { gameStateAtom, resetGameAtom } from '../config/atoms';
import { useSettingsNavigation } from '../hooks/useSettingsNavigation';

/**
 * 🚀 START SCREEN COMPONENT - Main Menu Interface
 * ==============================================
 *
 * @description The primary menu screen that welcomes players and provides navigation options
 * @returns {JSX.Element|null} Full-screen menu interface or null if not in menu state
 *
 * 🎯 COMPONENT RESPONSIBILITIES:
 * - Display game title and basic instructions
 * - Provide "START GAME" button to begin new game session
 * - Provide "SETTINGS" button to configure game options
 * - Handle conditional rendering based on game state
 * - Initialize fresh game state when starting new game
 *
 * 🔄 STATE INTERACTIONS:
 * - Reads gameStateAtom to determine visibility
 * - Writes to resetGameAtom to start new game
 * - Uses settings navigation hook for settings access
 *
 * 🎨 STYLING CLASSES:
 * - .game-screen: Full-screen positioning overlay
 * - .start-screen: Specific styling for this screen
 * - .screen-content: Centered content container
 * - .game-button: Primary action button styling
 * - .game-button.secondary: Secondary action button styling
 */
const StartScreen = () => {
  // 🎲 GAME STATE MANAGEMENT
  // gameState determines which screen is currently visible
  // Only render this component when in 'menu' state
  const [gameState] = useAtom(gameStateAtom);
  
  // 🔄 GAME RESET FUNCTIONALITY
  // resetGame initializes fresh game state and transitions to 'playing'
  // This includes: player health, position, score, enemies, projectiles
  const [, resetGame] = useAtom(resetGameAtom);
  
  // ⚙️ SETTINGS NAVIGATION
  // goToSettings preserves current state and transitions to settings screen
  const { goToSettings } = useSettingsNavigation();
  
  // 👁️ CONDITIONAL RENDERING
  // Only show start screen when game state is 'menu'
  // Returns null otherwise to hide component completely
  if (gameState !== 'menu') return null;
  
  /**
   * 🎮 START GAME HANDLER - Initialize New Game Session
   * =================================================
   *
   * @description Triggers complete game state reset and begins gameplay
   * @effects:
   * - Resets player to full health at starting position
   * - Clears all enemies and projectiles from game world
   * - Resets score and statistics to zero
   * - Changes game state from 'menu' to 'playing'
   * - Initializes default weapon/projectile type
   */
  const handleStartGame = () => {
    resetGame(); // Comprehensive game state initialization
  };

  /**
   * ⚙️ SETTINGS HANDLER - Navigate to Settings Screen
   * ===============================================
   *
   * @description Opens settings menu while preserving current game state
   * @effects:
   * - Stores current state ('menu') in sessionStorage
   * - Changes game state to 'settings'
   * - Allows return to exact previous state when settings closed
   */
  const handleSettings = () => {
    goToSettings(); // Navigate with state preservation
  };

  // 🎨 RENDER START SCREEN INTERFACE
  return (
    <div className="game-screen start-screen">
      {/* 📦 CONTENT CONTAINER - Centered content with max-width constraint */}
      <div className="screen-content">
        {/* 🎯 GAME TITLE - Main branding and identification */}
        <h1>TOP-DOWN SHOOTER</h1>
        
        {/* 📝 INSTRUCTIONS - Basic control information for new players */}
        <p>Use WASD or arrow keys to move. Aim and shoot with mouse.</p>
        
        {/* 🎮 PRIMARY ACTION - Start new game session */}
        <button className="game-button" onClick={handleStartGame}>
          START GAME
        </button>
        
        {/* ⚙️ SECONDARY ACTION - Access game configuration */}
        <button className="game-button secondary" onClick={handleSettings}>
          SETTINGS
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
