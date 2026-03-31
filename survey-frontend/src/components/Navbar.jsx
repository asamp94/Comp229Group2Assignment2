// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    authService.signout();
    navigate('/signin');
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Survey Site</Link>
        </li>
        {authService.isAuthenticated() ? (
          <>
            <li>
              <Link to="/create-survey">Create Survey</Link>
            </li>
            <li>
              <Link to="/surveys">My Surveys</Link>
            </li>
            <li>
              <button onClick={handleSignout}>Sign Out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
