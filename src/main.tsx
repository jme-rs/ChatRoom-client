// import React from 'react';
import ReactDOM from 'react-dom';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';

import App from './App';

ReactDOM.render(
  <FluentProvider theme={webLightTheme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FluentProvider>,
  document.getElementById('root'),
);
