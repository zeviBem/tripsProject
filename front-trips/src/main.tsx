import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'jotai';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './apolloClient/apolloClient';

import App from './app/app';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './trpcClaient/trpcClaient';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <StrictMode>
    <Provider>
      <BrowserRouter>
        <ApolloProvider client={apolloClient}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ApolloProvider>
      </BrowserRouter>
    </Provider>
  // </StrictMode>
);
