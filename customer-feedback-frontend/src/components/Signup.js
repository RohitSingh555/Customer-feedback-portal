import React, { useState } from 'react';

const Signup = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
        // Handle successful signup (optional)
        onClose(); // close the signup popup
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
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
    </div>
  );
};

export default Signup;
