import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { apoloClient } from './apolloClient';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Provider } from 'jotai';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider>
      <ApolloProvider client={apoloClient}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </Provider>
  </StrictMode>
);
