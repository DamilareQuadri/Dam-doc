import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';
import DoctorIllustration from '../assets/Doctor Illustration.png';
import PadlockIcon from '../assets/Padlock Icon.svg';
import LicensedIcon from '../assets/Licensed Icon 2.svg';

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="landing-header">
        <div className="auth-logo">
          <Activity size={28} /> DAM-DOC
        </div>
        <div className="auth-nav">
          <Link to="/login">Sign in</Link>
          <Link to="/register" className="btn-register">Register</Link>
        </div>
      </div>
      
      <div className="landing-content">
        <div className="landing-left">
          <h4>Welcome to Dam-Doc</h4>
          <h1>Start your journey to better health right away</h1>
          <p>Just tell us how you are feeling and we'd help diagnose you and suggest possible problem</p>
          
          <div className="landing-buttons">
            <Link to="/register" className="btn-get-started">
              Get Started →
            </Link>
            <Link to="/about" className="btn-learn-more">
              Learn more
            </Link>
          </div>
          
          <div className="landing-features">
            <div className="feature-item">
              <img src={PadlockIcon} alt="Secured" className="feature-icon" />
              Secured &amp; confidential
            </div>
            <div className="feature-item">
              <img src={LicensedIcon} alt="Licensed" className="feature-icon" />
              Licensed professionals
            </div>
          </div>
        </div>
        
        <div className="landing-right">
          <div className="hero-illustration">
            <img src={DoctorIllustration} alt="Doctor illustration" className="hero-doctor-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
