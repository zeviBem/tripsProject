import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'jotai';
<<<<<<< HEAD
=======
import { ApolloProvider } from '@apollo/client';
import apolloClient from './apolloClient/apolloClient';
>>>>>>> ef131c762f079e8a3124bcd6f79e297caa2f842d

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
