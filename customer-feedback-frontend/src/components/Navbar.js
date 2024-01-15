import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ handleLogout }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if the authentication token is present in localStorage
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // If token is present, set isAuthenticated to true
      setIsAuthenticated(true);

      // Get the username from localStorage
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

  const handleLogoutClick = () => {
    // Perform logout logic
    // Set isAuthenticated to false and remove the token
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    handleLogout(); // Call the provided logout handler
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary px-4">
  <Link className="navbar-brand text-white" to="/">
    Brandish
  </Link>
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarNav"
    aria-controls="navbarNav"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link text-white" to="/">
          Home
        </Link>
      </li>
    </ul>
    <ul className="navbar-nav">
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
            <Link className="nav-link text-white" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/signup">
              Signup
            </Link>
          </li>
        </>
      )}
    </ul>
  </div>
</nav>

  );
};

export default Navbar;
