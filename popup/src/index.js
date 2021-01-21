import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './popup.js';

ReactDOM.render(
  <React.StrictMode>
    <Popup loggedIn={false} />
  </React.StrictMode>,
  document.getElementById('main')
);
