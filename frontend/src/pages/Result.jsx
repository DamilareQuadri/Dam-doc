import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state || {};

  if (!result) {
    return (
      <Layout title="Diagnosis Result">
        <p>No diagnosis data found. Please submit symptoms first.</p>
        <button className="btn-primary" onClick={() => navigate('/symptoms')} style={{marginTop: '1rem', width: 'auto'}}>Go to Symptoms</button>
      </Layout>
    );
  }

  return (
    <Layout title="Diagnosis Result">
      <div className="result-card">
        {result.referredToDoctor ? (
          <>
            <div className="referral-banner">
              <strong>Attention:</strong> We could not find a confident match for your symptoms in our case base.
            </div>
            <h3>Referral to Doctor Required</h3>
            <p>Your symptoms do not clearly match common tropical diseases like Malaria, Typhoid, Dengue, or Cholera in our records.</p>
            <p>It is highly recommended that you consult a doctor immediately for a proper diagnosis.</p>
            <button className="btn-primary" onClick={() => navigate('/see-doctor')} style={{marginTop: '2rem'}}>
              Start Video Consultation Now
            </button>
          </>
        ) : (
          <>
            <h3>{result.diagnosis}</h3>
            <p><strong>Similarity Score:</strong> {Math.round(result.similarityScore)}%</p>
            <div style={{marginTop: '2rem'}}>
              <h4 style={{color: '#0A36E8', marginBottom: '0.5rem'}}>Recommended Treatment:</h4>
              <p>{result.treatmentRecommendation}</p>
            </div>
            
            <div style={{marginTop: '3rem', fontSize: '0.9rem', color: '#6b7280'}}>
              *This is a preliminary diagnosis based on Case-Based Reasoning. Please consult a doctor if symptoms persist or worsen.
            </div>
            <button className="btn-primary" onClick={() => navigate('/symptoms')} style={{marginTop: '2rem', width: 'auto', background: '#6b7280'}}>
              Assess Another Case
            </button>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Result;
