import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { HeartPulse } from 'lucide-react';

const tipsData = [
  {
    title: "Preventing Malaria",
    content: "Use mosquito nets, wear long-sleeved clothing, and apply insect repellent to prevent mosquito bites, especially during the evening."
  },
  {
    title: "Staying Hydrated",
    content: "Drink at least 8 glasses of water a day. Dehydration can lead to fatigue, headaches, and a weakened immune system, making you susceptible to illnesses."
  },
  {
    title: "Typhoid Awareness",
    content: "Always drink clean, purified water and ensure your food is well-cooked. Avoid eating raw or street foods in areas where typhoid is prevalent."
  },
  {
    title: "Hand Hygiene",
    content: "Wash your hands frequently with soap and water for at least 20 seconds. This is the most effective way to prevent the spread of infectious diseases."
  },
  {
    title: "Recognizing Dengue",
    content: "Severe joint pain, high fever, and rashes are common signs of Dengue. If you experience these, avoid aspirin and seek medical attention immediately."
  }
];

const HealthTips = () => {
  const [randomTips, setRandomTips] = useState([]);

  useEffect(() => {
    // Shuffle and pick top 3 tips for this session
    const shuffled = [...tipsData].sort(() => 0.5 - Math.random());
    setRandomTips(shuffled.slice(0, 3));
  }, []);

  return (
    <Layout title="Health Tips">
      <div style={{ maxWidth: '800px' }}>
        <p style={{marginBottom: '2rem', fontSize: '1.1rem', color: '#666'}}>
          Here are some curated health tips and guidelines on tropical diseases and general wellness:
        </p>
        
        {randomTips.map((tip, index) => (
          <div className="content-card" key={index} style={{display: 'flex', gap: '20px', alignItems: 'flex-start'}}>
            <div style={{
              backgroundColor: '#0A36E8', 
              color: 'white', 
              padding: '15px', 
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <HeartPulse size={30} />
            </div>
            <div>
              <h3 style={{marginTop: '5px', marginBottom: '10px'}}>{tip.title}</h3>
              <p style={{lineHeight: '1.6'}}>{tip.content}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default HealthTips;
