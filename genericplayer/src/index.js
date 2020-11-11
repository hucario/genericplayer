import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './popup.js';

ReactDOM.render(
  <React.StrictMode>
    <Popup loggedOn={false} />
  </React.StrictMode>,
  document.getElementById('root')
);