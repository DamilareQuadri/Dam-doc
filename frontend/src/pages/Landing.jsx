import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="auth-header" style={{ position: 'relative', padding: '2rem 4rem' }}>
        <div className="auth-logo">
          <Activity size={28} /> DAM-DOC
        </div>
        <div className="auth-nav">
          <Link to="/login">Sign in</Link>
          <Link to="/register" className="btn-white">Register</Link>
        </div>
      </div>
      
      <div className="landing-content">
        <div className="landing-left">
          <h4>Welcome to Dam-Doc</h4>
          <h1>Start your journey to better health right away</h1>
          <p>Just tell us how you are feeling and we'd help diagnose you and suggest possible problem.</p>
          
          <div className="landing-buttons">
            <Link to="/register" className="btn-primary" style={{width: 'auto', display: 'inline-block'}}>
              Get Started →
            </Link>
            <Link to="/about" className="btn-white">
              Learn more
            </Link>
          </div>
          
          <div className="landing-features">
            <div>🔒 Secured & confidential</div>
            <div>🏥 Licensed professionals</div>
          </div>
        </div>
        
        <div className="landing-right">
          <div className="hero-illustration">
             {/* Simple inline SVG replacing the image for now, keeping it clean */}
             <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="#0A36E8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
               <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
             </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
