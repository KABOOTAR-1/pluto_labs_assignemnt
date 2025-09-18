import { useFrame } from "@react-three/fiber";
import { gameConfig } from "../config/gameConfig";
import { GAME_STATES } from "../config/constants";
import { useKeyControls } from "../hooks/useKeyControls";

/**
 * Player movement hook using cannon.js physics body
 * @param {Object} api - Cannon.js body API (from use-cannon)
 * @param {Array} playerPosition - Current [x, y, z] position
 * @param {string} gameState - Current game state ("playing", etc.)
 * @param {Function} handleGameOver - Called if player goes out of bounds
 * @param {number} playerSpeed - Player movement speed
 */
export const usePlayerMovement = (api, playerPosition, gameState, handleGameOver, playerSpeed = gameConfig.player.speed, worldBounds = gameConfig.world.bounds) => {
  const { forward, backward, left, right } = useKeyControls();

  useFrame((_, delta) => {
    if (gameState !== GAME_STATES.PLAYING) return;

    const moveSpeed = playerSpeed * delta;
    let x = playerPosition[0];
    let z = playerPosition[2];

    if (forward) z -= moveSpeed;
    if (backward) z += moveSpeed;
    if (left) x -= moveSpeed;
    if (right) x += moveSpeed;

    // Boundaries
    if (x < worldBounds.minX || x > worldBounds.maxX || z < worldBounds.minZ || z > worldBounds.maxZ) {
      handleGameOver();
    }
    const velX = (x - playerPosition[0]) / delta;
    const velZ = (z - playerPosition[2]) / delta;
    api.velocity.set(velX, 0, velZ);
  });
};
