import React, { useState } from 'react';

const Signup = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ type: null, content: '' });

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setMessage({
          type: 'success',
          content: 'User created successfully. Redirecting to login...',
        });

        setTimeout(() => {
          window.location.href = '/login';
        }, 2000); // Redirect after 2 seconds
      } else {
        const data = await response.json();
        setMessage({
          type: 'error',
          content: data.message || 'User with the same username already exists. Please try again with a different username.',
        });
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setMessage({
        type: 'danger',
        content: 'An error occurred during signup. Please try again later.',
      });
    }
  };

  const renderMessage = () => {
    if (!message.content) {
      return null;
    }
  
    const alertClass = message.type === 'error' ? 'danger' : message.type;
  
    return (
      <div className={`alert alert-${alertClass} mt-3`} role="alert" style={{ borderColor: 'lightcoral' }}>
        {message.content}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="signup-container bg-primary text-white p-4 rounded position-absolute top-50 start-50 translate-middle" style={{ width: '50%' }}>
        <h2 className="mb-4">Signup</h2>
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-light" onClick={handleSignup}>
          Signup
        </button>
        {renderMessage()}
      </div>
    </div>
  );
};

export default Signup;
