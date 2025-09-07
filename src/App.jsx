import React from 'react';
import { Provider } from 'jotai';
import Scene from './components/Scene';
import HUD from './components/HUD';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import './App.css';

function App() {
  return (
    <Provider>
      <div className="game-canvas">
        <Scene />
        <HUD />
        <StartScreen />
        <GameOverScreen />
      </div>
    </Provider>
  );
}

export default App;
