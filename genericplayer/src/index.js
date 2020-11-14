import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './popup.js';

ReactDOM.render(
  <React.StrictMode>
    <Popup loggedIn={true} />
  </React.StrictMode>,
  document.body
);