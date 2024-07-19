import React from 'react';
import ReactDOM from 'react-dom/client';
import normalize from 'emotion-normalize';
import { css, Global } from '@emotion/react';
//
import App from './App';
import initializeMockupWorker from '@/__mock__';

const GlobalStyles = css`
  ${normalize}
`;

initializeMockupWorker().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Global styles={GlobalStyles} />
      <App />
    </React.StrictMode>
  );
});
