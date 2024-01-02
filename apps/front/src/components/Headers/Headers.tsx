import '../../styles.css'
import { Link } from 'react-router-dom';


// Header.js
import React from 'react';

export default function Headers()  {
  return (
    <header className="bg-slate-400 text-white p-4">
      {/* Your header content goes here */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">Your Site Name</h1>
        </div>
        <nav>
          {/* Navigation links go here */}
          <a href='/home/signIn'>SignIn</a>
    
        </nav>
      </div>
    </header>
  );
};
