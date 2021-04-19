import './topbar.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export const Topbar = () => {
  const [logged, setLogged] = useState(false);
  const [name, setName] = useState('matt');
  return (
    <div style={{ 'background-color': '#b3937f' }}>
      {logged ? (
        <p className="navig">
          <Link to="/">Home</Link>
          <p>Welcome, {name}</p>
          <Link to="/profile">View Profile</Link>
          <Link to="/newrecipe">New Recipe</Link>
        </p>
      ) : (
        <p className="navig">
          <Link to="/">Home</Link>
          <Link to="/signRegister">Login</Link>
        </p>
      )}
      <h2 id="logo">
        <i>Chef Masters</i>
      </h2>
    </div>
  );
};
