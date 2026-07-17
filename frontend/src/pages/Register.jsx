import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Activity, EyeOff, Eye } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords don't match");
    }
    
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });
      alert('Registration successful. Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
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
        <h2>Get Started</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              className="form-control" 
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <input 
              type={showPassword ? "text" : "password"} 
              className="form-control" 
              placeholder="New Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
            {showPassword ? 
              <Eye className="eye-icon" onClick={() => setShowPassword(false)} /> : 
              <EyeOff className="eye-icon" onClick={() => setShowPassword(true)} />
            }
          </div>
          <div className="form-group">
            <input 
              type={showPassword ? "text" : "password"} 
              className="form-control" 
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
            {showPassword ? 
              <Eye className="eye-icon" onClick={() => setShowPassword(false)} /> : 
              <EyeOff className="eye-icon" onClick={() => setShowPassword(true)} />
            }
          </div>
          <button type="submit" className="btn-primary" style={{marginTop: '1rem'}}>
            Register
          </button>
        </form>
        <div className="auth-links">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
