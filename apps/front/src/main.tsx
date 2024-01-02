import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'jotai';

import App from './components/app/app';
import SignIn from './components/SignIn/SignIn';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import Headers2 from './components/Headers2/Headers2';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>
);
