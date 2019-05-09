import React, { FC } from 'react';
import { interval } from 'rxjs';
import './App.css';
import logo from './logo.svg';
import { Observing } from './Observing';
import { delay } from 'rxjs/operators';

const App: FC = () => {
  const local = {
    o1: interval(3000),
    o2: interval(2000).pipe(delay(5000)),
    nested: {
      o3: interval(4000)
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          <Observing {...local} />
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
    </div>
  );
};

export default App;
