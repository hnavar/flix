import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import TsParticles from './components/tsParticle/tsParticles';

import App from './components/App';

ReactDOM.render(
  <BrowserRouter>
    <App />
    <TsParticles />
  </BrowserRouter>
  , document.getElementById('app-root'));
