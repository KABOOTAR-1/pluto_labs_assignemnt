import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { projectilesAtom, enemiesAtom, scoreAtom, enemiesKilledAtom } from '../config/atoms';
import { gameConfig } from '../config/gameConfig';
import { Bullet } from './projectiles/Bullet';

const ProjectileTypes = {
  bullet: Bullet,
};

const Projectiles = () => {
  const [projectiles, setProjectiles] = useAtom(projectilesAtom);
  const [enemies, setEnemies] = useAtom(enemiesAtom);
  const [, setScore] = useAtom(scoreAtom);
  const [, setEnemiesKilled] = useAtom(enemiesKilledAtom);

  const handleHit = (projectileId, enemyId, damage) => {
    setProjectiles(prev => prev.filter(p => p.id !== projectileId));

    if (!enemyId) return;

    setEnemies(prevEnemies => {
      const enemyIndex = prevEnemies.findIndex(e => e.id === enemyId);
      if (enemyIndex === -1) return prevEnemies;

      const enemy = prevEnemies[enemyIndex];
      const newHealth = enemy.health - damage;

      if (newHealth <= 0) {
        const enemyType = gameConfig.enemies.types.find(t => t.id === enemy.type);
        const points = enemyType ? enemyType.points : 10;
        setScore(s => s + points * gameConfig.rules.scoreMultiplier);
        setEnemiesKilled(k => k + 1);

        return prevEnemies.filter(e => e.id !== enemyId);
      } else {
        return prevEnemies.map(e =>
          e.id === enemyId ? { ...e, health: newHealth } : e
        );
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setProjectiles(prev => prev.filter(p => now - p.createdAt < 5000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [setProjectiles]);
  
  return (
    <>
      {projectiles.map(proj => {
        const ProjectileComponent = ProjectileTypes[proj.type] || ProjectileTypes.bullet;
        return (
          <ProjectileComponent
            key={proj.id}
            {...proj}
            enemies={enemies}
            onHit={handleHit}
          />
        );
      })}
    </>
  );
};

export default Projectiles;
