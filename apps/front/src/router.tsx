import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Navi } from './components/Navigate';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Headers from './components/Headers/Headers';
import Main from './components/Main/Main';
import Stage1 from './components/Stage1/Stage1';
import Stage2 from './components/Stage2/Stage2';
import Headers2 from './components/Headers2/Headers2';
import Stage3 from './components/Stage3/Stage3';

export const router = createBrowserRouter([
  // {
  //   path: '/home',
  //   element: <Headers />,
  // },
  {
    path: '/home/Headers2',
    element: <Headers2 />,
  },
  {
    path: '/home/SignIn',
    element: <SignIn />,
  },
  {
    path: '/home/SignUp',
    element: <SignUp />,
  },
  {
    path: '/home/main',
    element: <Main />,
  },
  {
    path: '/home/stage1',
    element: <Stage1 />,
  },
  {
    path: '/home/stage2',
    element: <Stage2 />,
  },
  {
    path: '/home/stage3',
    element: <Stage3 />,
  },

]);
