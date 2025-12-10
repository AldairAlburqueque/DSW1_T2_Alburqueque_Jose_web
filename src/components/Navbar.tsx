import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Biblioteca</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink
            to="/books"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Libros
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/loans"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Préstamos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
