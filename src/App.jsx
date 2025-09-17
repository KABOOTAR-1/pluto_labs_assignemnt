import React from 'react';
import { Provider } from 'jotai';
import Scene from './components/Scene';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import SettingsScreen from './components/SettingsScreen';
import './App.css';

function App() {
  return (
    <Provider>
      <div className="game-canvas">
        <Scene />
        <StartScreen />
        <GameOverScreen />
        <SettingsScreen />
      </div>
    </Provider>
  );
}

export default App;
