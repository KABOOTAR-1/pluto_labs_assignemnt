import React from 'react';
import { Provider } from 'jotai';
import Scene from './components/Scene';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import SettingsScreen from './components/SettingsScreen';
import { useCurrentTheme } from './config/gameConfig';
import './App.css';

function App() {

const currentTheme = useCurrentTheme();
  return (
    <Provider>
      <div className="game-canvas">
        <Scene theme={currentTheme}/>
        <StartScreen theme={currentTheme} />
        <GameOverScreen theme={currentTheme} />
        <SettingsScreen theme={currentTheme}/>
      </div>
    </Provider>
  );
}

export default App;
