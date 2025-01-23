import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Store the token in localStorage
        navigate('/home'); // Redirect to dashboard after successful login
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred during login');
    }
  };

  return (
    <div className='auth-page'>
    <div className="auth-container">
      {/* Banner Section */}
      <div className="banner">
        <h1>AdventureAtlas</h1>
        <p>Your journey begins here! Login or Signup to explore.</p>
      </div>

      {/* Login Form */}
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
      <p>
        forgot password ?? <a href="/forgetpassword">Forgot Password</a>
      </p>
    </div>
    </div>
  );
};
export default Login;
