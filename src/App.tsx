

import React from 'react';
import './App.css';

import Weather from './weather';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Weather Forecast App</h1>
      <Weather />
    </div>
  );
};

export default App;
