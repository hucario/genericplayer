import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './popup.js';

ReactDOM.render(
  <React.StrictMode>
    <Popup loggedIn={true} pageOn={2} />
  </React.StrictMode>,
  document.body
);