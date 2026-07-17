import React, { useEffect, useRef } from 'react';
import Layout from '../components/Layout';

const Consultation = () => {
  const jitsiContainerRef = useRef(null);
  
  useEffect(() => {
    // Dynamically load Jitsi Meet API
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    script.onload = () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const domain = 'meet.jit.si';
      const options = {
          roomName: `DamDocConsultation_${user.id || Math.floor(Math.random() * 1000)}`,
          width: '100%',
          height: '100%',
          parentNode: jitsiContainerRef.current,
          userInfo: {
              displayName: user.fullName || 'Patient'
          },
          configOverwrite: { startWithAudioMuted: true, startWithVideoMuted: false },
          interfaceConfigOverwrite: {
             DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
          }
      };
      const api = new window.JitsiMeetExternalAPI(domain, options);
      
      return () => {
        if(api) api.dispose();
      };
    };
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Layout title="Video Consultation">
      <p style={{marginBottom: '1rem'}}>You are being connected to an available doctor. Please allow camera and microphone permissions.</p>
      <div className="video-container" ref={jitsiContainerRef}>
        {/* Jitsi iframe will be injected here */}
      </div>
    </Layout>
  );
};

export default Consultation;
