import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Elevator from './Elevator';
import reportWebVitals from './reportWebVitals';

if (window.location.host === 'elevator-game.herokuapp.com') {
  if (
    window.location.protocol === 'http' ||
    window.location.protocol === 'http:'
  ) {
    window.location.protocol = 'https';
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Elevator />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
