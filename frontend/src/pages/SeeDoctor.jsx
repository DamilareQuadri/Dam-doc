import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Video } from 'lucide-react';

const SeeDoctor = () => {
  const [showPrompt, setShowPrompt] = useState(true);
  const [inConsultation, setInConsultation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // We check if the user has completed the symptom input in this session
    const hasCompletedSymptoms = localStorage.getItem('symptomsCompleted');
    if (!hasCompletedSymptoms) {
      setShowPrompt(true);
    } else {
      setShowPrompt(false);
      setInConsultation(true);
    }
  }, []);

  const handlePromptResponse = (didSymptoms) => {
    if (didSymptoms) {
      setShowPrompt(false);
      setInConsultation(true);
    } else {
      navigate('/symptoms');
    }
  };

  return (
    <Layout title="See Doctor">
      <div style={{ maxWidth: '800px' }}>
        {showPrompt && !inConsultation && (
          <div className="content-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Have you passed through the "Symptoms Input" section?</h3>
            <p style={{ marginBottom: '2rem', color: '#666' }}>To serve you better, we require patients to use our intelligent diagnosis system before seeing a doctor.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button className="btn-primary" style={{ width: '150px' }} onClick={() => handlePromptResponse(true)}>Yes, I have</button>
              <button className="btn-white" style={{ width: '150px', border: '2px solid #0A36E8' }} onClick={() => handlePromptResponse(false)}>No, take me there</button>
            </div>
          </div>
        )}
        
        {inConsultation && (
          <div className="content-card" style={{ textAlign: 'center' }}>
            <div style={{
              width: '80px', height: '80px', backgroundColor: '#E0E7FF', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#0A36E8'
            }}>
              <Video size={40} />
            </div>
            <h3>Please hold on...</h3>
            <p style={{ fontSize: '1.2rem', color: '#444' }}>There is a consultation currently going on.</p>
            
            <div className="video-container" style={{ backgroundColor: '#1f2937', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3rem', height: '400px' }}>
              <p style={{ color: 'white' }}>Waiting for the doctor to join the meeting...</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SeeDoctor;
