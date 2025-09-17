export const settingsConfig = {
  player: {
    speed: {
      label: 'Speed',
      default: 5,
      min: 1,
      max: 15,
      step: 0.5,
      unit: '',
      description: 'Player movement speed'
    },
    health: {
      label: 'Health',
      default: 100,
      min: 1,
      max: 300,
      step: 1,
      unit: '',
      description: 'Player health (max for new games, healing up to 300)'
    },
    fireRate: {
      label: 'Fire Rate',
      default: 2,
      min: 0.5,
      max: 10,
      step: 0.1,
      unit: '/s',
      description: 'Shots per second'
    }
  },
  enemies: {
    speedMultiplier: {
      label: 'Speed',
      default: 1.0,
      min: 0.5,
      max: 3.0,
      step: 0.1,
      unit: 'x',
      description: 'Enemy movement speed multiplier'
    },
    spawnRate: {
      label: 'Spawn Rate',
      default: 1.0,
      min: 0.5,
      max: 3.0,
      step: 0.1,
      unit: 'x',
      description: 'Enemy spawn rate multiplier'
    },
    maxCount: {
      label: 'Max Count',
      default: 15,
      min: 5,
      max: 50,
      step: 1,
      unit: '',
      description: 'Maximum enemies on screen'
    }
  },
  difficulty: {
    multiplier: {
      label: 'Multiplier',
      default: 1.0,
      min: 0.5,
      max: 5.0,
      step: 0.1,
      unit: 'x',
      description: 'Overall difficulty multiplier'
    }
  }
};

// Helper function to get formatted label with unit
export const getSettingLabel = (category, key, value) => {
  const setting = settingsConfig[category]?.[key];
  if (!setting) return `${key}: ${value}`;

  const unit = setting.unit ? setting.unit : '';
  const formattedValue = typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value;

  return `${setting.label}: ${formattedValue}${unit}`;
};

// Helper function to get setting config
export const getSettingConfig = (category, key) => {
  return settingsConfig[category]?.[key] || null;
};

// Helper function to get all settings in a category
export const getCategorySettings = (category) => {
  return settingsConfig[category] || {};
};

// Helper function to get all categories
export const getAllCategories = () => {
  return Object.keys(settingsConfig);
};