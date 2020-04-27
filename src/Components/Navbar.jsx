import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    
    return (
      <ul className="Navbar">
          <li>
              <NavLink to="/">Home</NavLink>
          </li>
          <li>
              <NavLink to="/login">Login</NavLink>
          </li>
          <li>
              <NavLink to="/signup">Register</NavLink>
          </li>
          <li>
              <NavLink to="/profile">Profile</NavLink>
          </li>
      </ul>
    )
    
};

export default Navbar;
