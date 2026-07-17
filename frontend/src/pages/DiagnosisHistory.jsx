import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const DiagnosisHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, []);

  return (
    <Layout title="Diagnosis History">
      <div style={{ maxWidth: '800px' }}>
        {loading ? (
          <p>Loading history...</p>
        ) : history.length === 0 ? (
          <div className="content-card">
            <p>You have no past diagnosis history.</p>
          </div>
        ) : (
          history.map(item => (
            <div className="content-card" key={item.id || item._id}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
                <span style={{color: '#6b7280', fontSize: '0.9rem'}}>{new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString()}</span>
                <span style={{fontWeight: '700', color: '#0A36E8'}}>Match Score: {item.similarityScore}%</span>
              </div>
              <h3>{item.diagnosis}</h3>
              <p><strong>Symptoms:</strong> {item.symptoms.map(s => `${s.name} (${s.severity})`).join(', ')}</p>
              
              {item.treatmentRecommendation && (
                <div style={{marginTop: '15px', padding: '15px', backgroundColor: '#F8FAFC', borderRadius: '10px'}}>
                  <p style={{margin: 0}}><strong>Recommendation:</strong> {item.treatmentRecommendation}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default DiagnosisHistory;
