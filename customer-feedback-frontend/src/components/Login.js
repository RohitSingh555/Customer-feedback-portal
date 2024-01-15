import React, { useState } from 'react';

const Login = ({ onLogin, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        if ('token' in data) {
          // Store the token in localStorage
          localStorage.setItem('authToken', data.token);

          // Use the username from the input field
          const usernameFromInput = username.trim(); // Trim to remove any leading/trailing spaces
          localStorage.setItem('username', usernameFromInput || 'DefaultUsername');

          // Call the onLogin function with both token and username
          onLogin({ token: data.token, username: usernameFromInput });

          // Close the login popup
          onClose();
        } else {
          console.error('Invalid response format');
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container bg-primary text-white p-4 rounded position-absolute top-50 start-50 translate-middle" style={{ width: '50%' }}>
      <h2 className="mb-4">Login</h2>
      <div className="mb-3">
        <label className="form-label">Username:</label>
        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Password:</label>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="btn btn-light" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
