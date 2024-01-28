import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { apoloClient } from './apolloClient';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
// import { Provider } from 'jotai';
import { store } from './redux/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <ApolloProvider client={apoloClient}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </Provider>
  </StrictMode>
);
