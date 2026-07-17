import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import { Plus, Minus } from 'lucide-react';

const commonSymptoms = [
  "Fever", "Headache", "Cold", "Cough", "Chills", "Nausea", "Sweating", 
  "Abdominal Pain", "Weakness", "Constipation", "Joint Pain", "Rash", 
  "Eye Pain", "Diarrhea", "Vomiting", "Leg Cramps", "Dehydration"
];

const SymptomInput = () => {
  const [symptomsList, setSymptomsList] = useState([{ name: '', severity: 'Medium' }]);
  const navigate = useNavigate();

  const handleAddSymptom = () => {
    setSymptomsList([...symptomsList, { name: '', severity: 'Medium' }]);
  };

  const handleRemoveSymptom = (index) => {
    const newList = [...symptomsList];
    newList.splice(index, 1);
    setSymptomsList(newList);
  };

  const handleUpdateSymptom = (index, field, value) => {
    const newList = [...symptomsList];
    newList[index][field] = value;
    setSymptomsList(newList);
  };

  const handleDiagnose = async () => {
    const validSymptoms = symptomsList.filter(s => s.name);
    if(validSymptoms.length === 0) return alert('Please enter at least one symptom.');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/diagnose', { symptoms: validSymptoms }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Store in local storage to track completion
      localStorage.setItem('symptomsCompleted', 'true');
      
      navigate('/result', { state: { result: res.data } });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to diagnose');
    }
  };

  return (
    <Layout>
      <div className="symptoms-container">
        <h1 className="page-title">How are you feeling?</h1>
        
        {symptomsList.map((symptom, index) => (
          <div className="symptom-row" key={index}>
            <div className="symptom-select">
              <select 
                className="symptom-name"
                value={symptom.name}
                onChange={(e) => handleUpdateSymptom(index, 'name', e.target.value)}
              >
                <option value="" disabled></option>
                {commonSymptoms.map(sym => (
                  <option key={sym} value={sym}>{sym}</option>
                ))}
              </select>
              
              <select
                style={{ border: 'none', background: 'transparent', color: '#0A36E8', fontWeight: '700', outline: 'none', fontSize: '0.9rem', cursor: 'pointer' }}
                value={symptom.severity}
                onChange={(e) => handleUpdateSymptom(index, 'severity', e.target.value)}
              >
                <option value="Very Low">Very Low</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Very High">Very High</option>
              </select>
            </div>
            
            <button className="btn-icon remove" onClick={() => handleRemoveSymptom(index)}>
              <Minus size={20} />
            </button>
            
            {index === symptomsList.length - 1 && (
              <button className="btn-icon add" onClick={handleAddSymptom}>
                <Plus size={20} />
              </button>
            )}
          </div>
        ))}
        
        <div className="diagnose-btn-container">
          <button className="btn-primary" onClick={handleDiagnose}>Diagnose</button>
        </div>
      </div>
    </Layout>
  );
};

export default SymptomInput;
