
const EnemiesKilledDisplay = ({ count }) => {
  return (
    <div className="enemies-killed-container">
      <div className="enemies-killed-label">ENEMIES</div>
      <div className="enemies-killed-value">{count}</div>
    </div>
  );
};

export default EnemiesKilledDisplay;
