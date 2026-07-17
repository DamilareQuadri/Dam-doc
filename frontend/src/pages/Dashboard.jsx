import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardPlus, History, HeartPulse, User as UserIcon } from 'lucide-react';
import Layout from '../components/Layout';

const Dashboard = () => {
  return (
    <Layout title="">
      <div className="dashboard-grid">
        <Link to="/symptoms" className="dashboard-card primary">
          <div className="card-icon" style={{ backgroundColor: 'transparent', color: 'white' }}>
            <ClipboardPlus size={50} />
          </div>
          <h3>Symptoms Input</h3>
          <p style={{color: 'white', marginTop: '10px'}}>List your symptoms here to get diagnosed</p>
        </Link>
        
        <Link to="/history" className="dashboard-card">
          <div className="card-icon" style={{ backgroundColor: 'black', color: 'white' }}>
            <History size={40} style={{margin: '10px'}} />
          </div>
          <h3>Diagnosis History</h3>
          <p style={{marginTop: '10px', color: '#666'}}>Get to see your past diagnosis</p>
        </Link>
        
        <Link to="/tips" className="dashboard-card">
          <div className="card-icon" style={{ backgroundColor: 'black', color: 'white' }}>
            <HeartPulse size={40} style={{margin: '10px'}} />
          </div>
          <h3>Health Tips</h3>
          <p style={{marginTop: '10px', color: '#666'}}>Get useful tips on tropical diseases and health</p>
        </Link>
        
        <Link to="/see-doctor" className="dashboard-card">
          <div className="card-icon" style={{ backgroundColor: 'black', color: 'white' }}>
            <UserIcon size={40} style={{margin: '10px'}} />
          </div>
          <h3>See Doctor</h3>
          <p style={{marginTop: '10px', color: '#666'}}>Meet with a healthcare professional (Video Conference)</p>
        </Link>
      </div>
    </Layout>
  );
};

export default Dashboard;
