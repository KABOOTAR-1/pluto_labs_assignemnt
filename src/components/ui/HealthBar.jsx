const HealthBar = ({ current, max }) => {
  const healthPercentage = (current / max) * 100;
  const healthColor =
    healthPercentage > 70 ? "#2ecc71" :
    healthPercentage > 30 ? "#f39c12" : "#e74c3c";

  return (
    <div className="health-container">
      <div className="health-label">HEALTH</div>
      <div className="health-bar-container">
        <div
          className="health-bar-fill"
          style={{
            width: `${healthPercentage}%`,
            backgroundColor: healthColor,
          }}
        />
      </div>
      <div className="health-value">{Math.ceil(current)}</div>
    </div>
  );
};

export default HealthBar;
