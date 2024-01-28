import React from 'react';
import { createBrowserRouter } from 'react-router-dom';


// import { Navi } from './components/Navigate';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Main from './components/Main/Main';
import Stage1 from './components/Stage1/Stage1';
import Stage2 from './components/Stage2/Stage2';
import Stage3 from './components/Stage3/Stage3';
import HomePage from './components/HomePage/HomePage';
import Headers2 from './components/Headers/Headers';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Headers2/>,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/SignIn',
        element: <SignIn />,
      },
      {
        path: '/SignUp',
        element: <SignUp />,
      },
      {
        path: '/main',
        element: <Main />,
      },
      {
        path: '/stage1',
        element: <Stage1 />,
      },
      {
        path: '/stage2',
        element: <Stage2 />,
      },
      {
        path: '/stage3',
        element: <Stage3 />,
      },

    ]
  },

]);
