import React from 'react';

import './App.css';

import Dashboard from './Dashboard'
import Store from './Store'

function App() {
  return (
    <div className="App">
      <Store>
        <Dashboard />
      </Store>
    </div>

  );
}

export default App;

//orginal content
/* <div className="App">
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
</div> */