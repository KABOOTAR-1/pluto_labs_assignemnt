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
