import React from 'react';
import { gameConfig, useCurrentEnemies } from '../config/gameConfig';
import { Bullet } from './projectiles/Bullet';
import { deactivateProjectile, deactivateEnemy } from '../utils/gameUtils';

const ProjectileTypes = {
  bullet: Bullet,
};

const Projectiles = ({
  projectiles,
  setProjectiles,
  enemies,
  setEnemies,
  setScore,
  setEnemiesKilled,
  projectileConfig
}) => {
  const currentEnemies = useCurrentEnemies();

  const handleHit = (projectileId, enemyId, damage) => {
    setProjectiles(prev => deactivateProjectile(prev, projectileId));

    if (!enemyId) return;

    setEnemies(prevEnemies => {
      const enemyIndex = prevEnemies.findIndex(e => e.id === enemyId);
      if (enemyIndex === -1) return prevEnemies;

      const enemy = prevEnemies[enemyIndex];

      // If enemy is already inactive (killed by another projectile), don't process
      if (!enemy.active) return prevEnemies;

      const newHealth = enemy.health - damage;

      if (newHealth <= 0) {
        const enemyType = currentEnemies.types.find(t => t.id === enemy.type);
        const points = enemyType ? enemyType.points : 10;
        setScore(s => s + points * gameConfig.rules.scoreMultiplier);
        setEnemiesKilled(k => k + 1);

        return deactivateEnemy(prevEnemies, enemyId);
      } else {
        return prevEnemies.map(e =>
          e.id === enemyId ? { ...e, health: newHealth } : e
        );
      }
    });
  };

  const activeProjectiles = projectiles.filter(p => p.active);

  return (
    <>
      {activeProjectiles.map(proj => {
        const ProjectileComponent = ProjectileTypes[proj.type] || ProjectileTypes.bullet;
        
        return (
          <ProjectileComponent
            key={proj.id}
            {...proj}
            size={projectileConfig.size}
            color={projectileConfig.color}
            speed={projectileConfig.speed}
            damage={projectileConfig.damage}
            emissiveIntensity={projectileConfig.emissiveIntensity}
            mass={projectileConfig.mass}
            enemies={enemies}
            onHit={handleHit}
          />
        );
      })}
    </>
  );
};

export default Projectiles;
