export const usePlayerHealth = (ref, playerHealth, onHealthChange, onGameOver) => {

  const takeDamage = (amount) => {
    const newHealth = playerHealth - amount;
    onHealthChange(newHealth);
    if (newHealth <= 0) onGameOver();
  };

  // attach function to mesh ref
  if (ref?.current) {
    ref.current.takeDamage = takeDamage;
  }
};
