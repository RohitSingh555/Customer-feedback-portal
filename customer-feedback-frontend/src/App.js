import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const [username, setUsername] = useState('');

  const handleLogin = (token) => {
    setAuthToken(token);
    setUsername("User"); 
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    // Additional logout logic if needed
  };

  return (
    <Router>
      <Navbar handleLogout={handleLogout} username={username} />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} onClose={() => window.location.href = '/'} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
