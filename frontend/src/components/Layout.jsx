import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Home, ClipboardPlus, History, HeartPulse, User, LogOut, Activity } from 'lucide-react';

const Layout = ({ children, title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-logo">
          <Activity size={28} /> DAM-DOC
        </div>
        
        <div className="sidebar-nav">
          <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Home size={22} /> Home
          </NavLink>
          
          <NavLink to="/symptoms" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <ClipboardPlus size={22} /> Symptoms Input
          </NavLink>
          
          <NavLink to="/history" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <History size={22} /> Diagnosis History
          </NavLink>
          
          <NavLink to="/tips" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <HeartPulse size={22} /> Health Tips
          </NavLink>
          
          <NavLink to="/see-doctor" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <User size={22} /> See Doctor
          </NavLink>
        </div>
        
        <div className="sidebar-bottom">
          <div className="nav-item" style={{cursor: 'pointer'}} onClick={handleLogout}>
            <LogOut size={22} /> Log Out
          </div>
        </div>
      </div>
      
      <div className="main-content">
        <div className="topbar">
           {title ? <h2>{title}</h2> : <div></div>}
           <div style={{display: 'flex', alignItems: 'center', gap: '15px', fontWeight: '700', fontSize: '1.2rem'}}>
             Hi, {user.fullName ? user.fullName.split(' ')[0] : 'User'}
             <img src={`https://ui-avatars.com/api/?name=${user.fullName || 'User'}&background=random`} alt="Profile" className="profile-pic" />
           </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
