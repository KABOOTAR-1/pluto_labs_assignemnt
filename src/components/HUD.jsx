
/**
 * 📊 HUD (Heads-Up Display) - 2D Game Information Overlay
 * ====================================================
 *
 * 🎯 WHAT THIS COMPONENT DOES:
 * ✅ Displays critical game information as 2D overlay on 3D scene
 * ✅ Shows player health, score, and enemies killed
 * ✅ Provides settings access during gameplay
 * ✅ Conditionally renders based on showHUD prop
 * ✅ Uses HTML/CSS for crisp text and UI elements
 *
 * 🎨 UI LAYOUT:
 * - Left side: Health bar and statistics (score, enemies killed)
 * - Right side: Settings button (only during gameplay)
 * - Responsive design that works on different screen sizes
 *
 * 🔄 VISIBILITY CONTROL:
 * - Completely hidden when showHUD is false
 * - Always visible during active gameplay (when showHUD is true)
 * - Settings button only appears during PLAYING state
 */

import { useAtom } from "jotai";
import { basePlayerHealthAtom } from "../config/atoms";
import { useSettingsNavigation } from "../hooks/useSettingsNavigation";
import { GAME_STATES } from "../config/constants";

/**
 * ❤️ HEALTH BAR - Visual health indicator component
 * Shows current health as colored bar with numeric values
 */
import HealthBar from "./ui/HealthBar";

/**
 * 🏆 SCORE DISPLAY - Current game score component
 * Shows accumulated points with formatting
 */
import ScoreDisplay from "./ui/ScoreDisplay";

/**
 * 📈 ENEMIES KILLED - Statistics display component
 * Shows number of defeated enemies
 */
import EnemiesKilledDisplay from "./ui/EnemyKilledDisplay";

const HUD = ({
  playerHealth,
  score,
  enemiesKilled,
  showHUD,
  gameState,
  setGameState
}) => {
  // 💊 MAX HEALTH - Get player's maximum health for health bar calculation
  const [maxPlayerHealth] = useAtom(basePlayerHealthAtom);

  // ⚙️ NAVIGATION - Hook for navigating to settings screen (prop-based, no atoms)
  const { goToSettings } = useSettingsNavigation(gameState, setGameState);

  // 👁️ VISIBILITY CHECK - Don't render anything if HUD is disabled
  if (!showHUD) return null;

  return (
    <div className="game-hud">
      {/* Consolidated stats container on the left */}
      <div className="stats-container">
        <HealthBar current={playerHealth} max={maxPlayerHealth} />
        <div className="stats-row">
          <ScoreDisplay score={score} />
          <EnemiesKilledDisplay count={enemiesKilled} />
        </div>
      </div>

      {/* Settings button on the right */}
      {gameState === GAME_STATES.PLAYING && (
        <div className="settings-button-container">
          <button className="settings-button" onClick={goToSettings}>
            ⚙️
          </button>
        </div>
      )}
    </div>
  );
};

export default HUD;
