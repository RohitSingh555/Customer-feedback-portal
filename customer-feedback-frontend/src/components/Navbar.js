import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../src/Navbar.css'; 

const Navbar = ({ handleLogout }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      setIsAuthenticated(true);
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

  const handleToggleNavbar = () => {
    setIsNavbarOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleLogoutClick = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    handleLogout();
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-primary px-4 ${isNavbarOpen ? 'navbar-open' : ''}`}>
      <Link className="navbar-brand text-white" to="/">
        Brandish
      </Link>
      <button
        className={`navbar-toggler ${isNavbarOpen ? 'collapsed' : ''}`}
        type="button"
        onClick={handleToggleNavbar}
        aria-expanded={isNavbarOpen}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/" exact>
              Home
            </NavLink>
          </li>
        </ul>
        <ul className={`navbar-nav ms-auto ${isAuthenticated ? 'welcome-logout' : ''}`}>
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <span className="nav-link text-white">Welcome, {username}</span>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={handleLogoutClick}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/signup">
                  Signup
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;