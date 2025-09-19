// ============================================================================
// 🔫 BULLET COMPONENT - Basic Projectile Type Implementation
// ============================================================================
//
// 🎯 HOW AI SHOULD USE THIS FILE:
// ✅ This is the simplest projectile type - a basic bullet with default behavior
// ✅ Serves as a wrapper around BaseProjectile with no modifications
// ✅ Acts as template for creating new projectile types with custom behavior
// ✅ Used as fallback projectile type when unknown types are requested
// ✅ Demonstrates the pattern for extending BaseProjectile functionality
//
// 📊 COMPONENT BEHAVIOR:
// - Pure passthrough wrapper - forwards all props to BaseProjectile unchanged
// - Inherits all BaseProjectile functionality (physics, collision, rendering)
// - Uses default spherical geometry and standard material from BaseProjectile
// - No custom logic or modifications to base projectile behavior
// - Serves as the 'default' projectile type in the projectile system
//
// 🔧 CUSTOMIZATION POINTS FOR AI:
// ============================================================================
//
// 🎨 VISUAL CUSTOMIZATION:
// ADD NEW (Create new components based on this pattern):
// - LaserProjectile: Custom geometry, different colors, trail effects
// - RocketProjectile: Larger size, explosion effects, smoke trails
// - PlasmaProjectile: Animated materials, energy effects, different physics
// - ArrowProjectile: Cylindrical geometry, rotation during flight
// - MagicProjectile: Particle effects, special visual behaviors
//
// MODIFY EXISTING (Customize Bullet behavior):
// - Add custom props processing before passing to BaseProjectile
// - Override specific props (size, color, speed) with bullet-specific values
// - Add bullet-specific sound effects or visual effects
// - Implement bullet-specific collision behavior or damage calculations
// - Add bullet-specific lifecycle management or cleanup logic
//
// 🎮 FUNCTIONAL MODIFICATIONS:
// ADD NEW (Extend Bullet with custom logic):
// - Add bullet drop/gravity effects by modifying direction over time
// - Implement bullet penetration by tracking hit enemies and continuing
// - Add bullet ricochet by detecting wall collisions and bouncing
// - Include bullet spread patterns for shotgun-style weapons
// - Add bullet tracer effects that fade over time
//
// MODIFY EXISTING (Change Bullet behavior):
// - Process props before passing to BaseProjectile (e.g., modify damage)
// - Add conditional logic based on bullet type or weapon configuration
// - Implement bullet-specific physics or movement patterns
// - Add bullet lifecycle hooks (onFire, onHit, onExpire callbacks)
// - Include bullet-specific collision detection or damage calculation
//
// 📱 PROJECTILE TYPE PATTERNS:
// CREATE NEW PROJECTILE TYPES:
// - Copy this file as template (e.g., LaserProjectile.jsx)
// - Add custom props and logic before <BaseProjectile />
// - Register in ProjectileTypes map in Projectiles.jsx
// - Add configuration to projectileTypes.js data file
// - Update weapon switching system to include new type
//
// EXTEND BULLET FUNCTIONALITY:
// - Add useRef hooks for stateful bullet behavior
// - Include useEffect for bullet lifecycle management
// - Add custom calculations or transformations to props
// - Implement bullet-specific rendering or effects
// - Include conditional behavior based on game state or settings
//
// 🔄 STATE MANAGEMENT:
// - Receives all props from parent Projectiles component
// - Props include: id, position, direction, speed, size, color, damage, etc.
// - No internal state management (stateless wrapper component)
// - All state handled by BaseProjectile and parent components
// - Supports prop transformation or processing before passing down
//
// 🎯 INTEGRATION POINTS:
// ============================================================================
//
// 📂 RELATED FILES TO MODIFY:
// - src/components/Projectiles.jsx: ProjectileTypes map registration
// - src/data/projectileTypes.js: Bullet configuration and properties
// - src/components/projectiles/BaseProjectile.jsx: Core functionality inherited
// - src/hooks/usePlayerShooting.js: Creates bullet data for this component
// - src/utils/gameUtils.js: Object pooling system for bullet lifecycle
//
// 🎨 COMPONENT ARCHITECTURE:
// - Wrapper Pattern: Simple passthrough to BaseProjectile
// - No Props Validation: Relies on BaseProjectile for prop handling
// - No State Management: Pure functional component with no hooks
// - Extensibility: Easy to add custom logic without breaking base functionality
//
// 🔗 PROJECTILE SYSTEM INTEGRATION:
// - ProjectileTypes['bullet']: Mapped in Projectiles component for rendering
// - Default Fallback: Used when unknown projectile types are requested
// - Object Pooling: Managed by parent components via gameUtils functions
// - Configuration: Properties defined in projectileTypes.js data file
//
// ⚠️ IMPORTANT NOTES:
// - This is a pure wrapper with no custom logic - all behavior from BaseProjectile
// - Serves as template for creating new projectile types with custom behavior
// - Props are passed through unchanged - no validation or transformation
// - Component is stateless and has no side effects or lifecycle management
// - Used as default/fallback projectile type in the projectile system
//
// 🚀 QUICK MODIFICATIONS FOR COMMON USE CASES:
// ============================================================================
//
// 📝 CREATE LASER PROJECTILE (Copy this file as LaserProjectile.jsx):
// ```javascript
// export const LaserProjectile = (props) => {
//   return (
//     <BaseProjectile 
//       {...props}
//       // Override props for laser-specific behavior
//       color="#ff0000"
//       emissiveIntensity={1.0}
//       speed={props.speed * 2}  // Lasers are faster
//     />
//   );
// };
// ```
//
// 🎮 ADD BULLET SPREAD (Modify this component):
// ```javascript
// export const Bullet = (props) => {
//   // Add random spread to bullet direction
//   const spreadAmount = 0.1;
//   const spreadDirection = [
//     props.direction[0] + (Math.random() - 0.5) * spreadAmount,
//     props.direction[1],
//     props.direction[2] + (Math.random() - 0.5) * spreadAmount
//   ];
//   
//   return (
//     <BaseProjectile 
//       {...props}
//       direction={spreadDirection}
//     />
//   );
// };
// ```
//
// 🎨 ADD BULLET TRACER EFFECTS (Extend this component):
// ```javascript
// export const Bullet = (props) => {
//   const [trail, setTrail] = useState([]);
//   
//   const handleUpdate = (id, position) => {
//     setTrail(prev => [...prev.slice(-10), [...position]]);
//     if (props.onUpdate) props.onUpdate(id, position);
//   };
//   
//   return (
//     <>
//       <BaseProjectile {...props} onUpdate={handleUpdate} />
//       {/* Render trail effect */}
//       <Trail positions={trail} color={props.color} />
//     </>
//   );
// };
// ```
//
// 📱 ADD CONDITIONAL BULLET BEHAVIOR (Smart wrapper):
// ```javascript
// export const Bullet = (props) => {
//   // Different behavior based on weapon type or game state
//   const bulletProps = useMemo(() => {
//     if (props.weaponType === 'sniper') {
//       return { ...props, damage: props.damage * 2, speed: props.speed * 1.5 };
//     }
//     if (props.weaponType === 'shotgun') {
//       return { ...props, size: props.size * 0.7, damage: props.damage * 0.8 };
//     }
//     return props;
//   }, [props]);
//   
//   return <BaseProjectile {...bulletProps} />;
// };
// ```
//
// ✏️ MODIFICATION EXAMPLES:
// ============================================================================
//
// 💥 ADD BULLET SOUND EFFECTS:
// ```javascript
// export const Bullet = (props) => {
//   useEffect(() => {
//     playSound('bullet_fire');
//   }, []);
//   
//   const handleHit = (id, enemyId, damage) => {
//     if (enemyId) playSound('bullet_impact');
//     props.onHit(id, enemyId, damage);
//   };
//   
//   return <BaseProjectile {...props} onHit={handleHit} />;
// };
// ```
//
// 🏃‍♂️ ADD BULLET DROP (GRAVITY):
// ```javascript
// export const Bullet = (props) => {
//   const modifiedDirection = useMemo(() => {
//     // Add slight downward trajectory for bullet drop
//     return [
//       props.direction[0],
//       props.direction[1] - 0.1,  // Gravity effect
//       props.direction[2]
//     ];
//   }, [props.direction]);
//   
//   return <BaseProjectile {...props} direction={modifiedDirection} />;
// };
// ```
//
// 🎯 ADD BULLET PENETRATION:
// ```javascript
// export const Bullet = (props) => {
//   const hitEnemies = useRef(new Set());
//   
//   const handleHit = (id, enemyId, damage) => {
//     if (enemyId && !hitEnemies.current.has(enemyId)) {
//       hitEnemies.current.add(enemyId);
//       // Don't destroy bullet on first hit - allow penetration
//       if (hitEnemies.current.size < 3) {
//         return; // Continue flying
//       }
//     }
//     props.onHit(id, enemyId, damage);
//   };
//   
//   return <BaseProjectile {...props} onHit={handleHit} />;
// };
// ```
// ============================================================================

import React from 'react';
import { BaseProjectile } from './BaseProjectile';

/**
 * 🔫 BULLET COMPONENT - Basic Projectile Type Implementation
 * ========================================================
 *
 * @description Simple wrapper around BaseProjectile with no modifications
 * @param {Object} props - All props passed through to BaseProjectile unchanged
 * @returns {JSX.Element} BaseProjectile component with default bullet behavior
 *
 * 🎯 COMPONENT PURPOSE:
 * - Serves as the basic/default projectile type in the game
 * - Acts as template for creating new projectile types (Laser, Rocket, etc.)
 * - Provides clean separation between projectile types and base functionality
 * - Used as fallback when unknown projectile types are requested
 * - Demonstrates the wrapper pattern for extending BaseProjectile
 *
 * 🔄 COMPONENT BEHAVIOR:
 * - Pure passthrough wrapper with no custom logic
 * - Inherits all BaseProjectile functionality (physics, collision, rendering)
 * - Uses default spherical geometry and glowing material
 * - No prop validation or transformation (relies on BaseProjectile)
 * - Stateless functional component with no hooks or side effects
 *
 * 🎨 PROP FORWARDING:
 * All props are forwarded unchanged to BaseProjectile:
 * - id: Unique projectile identifier
 * - position: [x,y,z] position array
 * - direction: [x,y,z] movement direction
 * - speed: Movement speed (units/second)
 * - size: Visual size and collision radius
 * - color: Projectile color and emissive glow
 * - damage: Damage dealt on collision
 * - mass: Physics mass (unused for Kinematic)
 * - emissiveIntensity: Glow brightness (0-1)
 * - enemies: Enemy array for collision detection
 * - onHit: Collision callback function
 * - onUpdate: Optional position tracking callback
 *
 * 🚀 USAGE IN PROJECTILE SYSTEM:
 * 1. Registered in ProjectileTypes map as 'bullet'
 * 2. Used as default/fallback projectile type
 * 3. Instantiated by Projectiles component for each active bullet
 * 4. Configured via projectileTypes.js data file
 * 5. Managed through object pooling system in gameUtils.js
 */
export const Bullet = (props) => {
  return (
    <BaseProjectile 
      {...props}
    />
  );
};
