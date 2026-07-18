import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api';
import { Activity, EyeOff, Eye } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authApi.login(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      alert(err.message || 'Login failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-header">
        <div className="auth-logo">
          <Activity size={28} /> DAM-DOC
        </div>
      </div>
      
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-wrap">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
              {showPassword ?
                <Eye className="eye-icon" onClick={() => setShowPassword(false)} /> :
                <EyeOff className="eye-icon" onClick={() => setShowPassword(true)} />
              }
            </div>
          </div>
          <button type="submit" className="btn-primary" style={{marginTop: '1rem'}}>
            Login
          </button>
        </form>
        <div className="auth-links">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
