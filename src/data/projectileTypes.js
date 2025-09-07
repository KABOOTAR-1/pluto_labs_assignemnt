export const projectileTypes = [
  {
    id: 'default',
    name: 'Projectile',
    size: 0.3,
    speed: 15,
    damage: 30,
    color: '#ffff00',
    emissiveIntensity: 0.5,
    mass: 0.1,
    lifetime: 5000, // 5 seconds
    description: 'Standard projectile'
  }
];

export const getDefaultProjectileType = () => {
  return projectileTypes[0];
};

export const getProjectileType = (id) => {
  return projectileTypes.find(type => type.id === id) || getDefaultProjectileType();
};

export const getProjectileTypeIds = () => {
  return projectileTypes.map(type => type.id);
};
