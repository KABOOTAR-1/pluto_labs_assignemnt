import { useState, useEffect } from 'react';

export const useKeyControls = () => {
  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    space: false,
  });

  const handleKeyDown = (e) => {
    // Prevent default behavior for arrow keys and space to avoid scrolling
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'a', 's', 'd'].includes(e.key)) {
      e.preventDefault();
    }
    
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        setKeys(prev => ({ ...prev, forward: true }));
        break;
      case 'ArrowDown':
      case 's':
        setKeys(prev => ({ ...prev, backward: true }));
        break;
      case 'ArrowLeft':
      case 'a':
        setKeys(prev => ({ ...prev, left: true }));
        break;
      case 'ArrowRight':
      case 'd':
        setKeys(prev => ({ ...prev, right: true }));
        break;
      case ' ':
        setKeys(prev => ({ ...prev, space: true }));
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (e) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        setKeys(prev => ({ ...prev, forward: false }));
        break;
      case 'ArrowDown':
      case 's':
        setKeys(prev => ({ ...prev, backward: false }));
        break;
      case 'ArrowLeft':
      case 'a':
        setKeys(prev => ({ ...prev, left: false }));
        break;
      case 'ArrowRight':
      case 'd':
        setKeys(prev => ({ ...prev, right: false }));
        break;
      case ' ':
        setKeys(prev => ({ ...prev, space: false }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
};
