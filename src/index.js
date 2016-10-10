import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import './index.css';

// Init DB
import './db';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
