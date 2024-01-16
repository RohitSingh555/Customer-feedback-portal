import React, { useState } from 'react';

const Login = ({ onLogin, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);

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
          localStorage.setItem('authToken', data.token);

          const usernameFromInput = username.trim();
          localStorage.setItem('username', usernameFromInput || 'DefaultUsername');

          onLogin({ token: data.token, username: usernameFromInput });

          setAlert({
            type: 'success',
            message: 'Logged in successfully!',
          });

          onClose();
        } else {
          setAlert({
            type: 'danger',
            message: 'Invalid response format',
          });
        }
      } else {
        setAlert({
          type: 'danger',
          message: 'Invalid username or password. Please check and try again.',
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      setAlert({
        type: 'danger',
        message: 'An error occurred during login. Please try again later.',
      });
    }
  };

  const renderAlert = () => {
    if (!alert) {
      return null;
    }

    return (
      <div className={`alert alert-${alert.type} mt-3`} role="alert">
        {alert.message}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh' }}>
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
        {renderAlert()}
      </div>
    </div>
  );
};

export default Login;
