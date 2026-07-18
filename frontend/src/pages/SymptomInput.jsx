import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { diagnosisApi, symptomApi } from '../api';
import Layout from '../components/Layout';
import SymptomSelect from '../components/SymptomSelect';
import { Plus, Minus } from 'lucide-react';

// Fallback used only if the catalog can't be fetched (e.g. offline dev).
const fallbackSymptoms = [
  "Fever", "Headache", "Cold", "Cough", "Chills", "Nausea", "Sweating",
  "Abdominal Pain", "Weakness", "Constipation", "Joint Pain", "Rash",
  "Eye Pain", "Diarrhea", "Vomiting", "Leg Cramps", "Dehydration"
];

const SymptomInput = () => {
  const [symptomsList, setSymptomsList] = useState([{ name: '', severity: 'Medium' }]);
  const [symptomOptions, setSymptomOptions] = useState([]);
  const navigate = useNavigate();

  // Load the symptom catalog from the backend on mount.
  useEffect(() => {
    let active = true;
    symptomApi
      .getAll()
      .then((data) => {
        if (active) setSymptomOptions(data.map((s) => s.name));
      })
      .catch(() => {
        if (active) setSymptomOptions(fallbackSymptoms);
      });
    return () => {
      active = false;
    };
  }, []);

  // A symptom outside our known catalog may indicate something serious, so we
  // refer the user straight to a doctor instead of diagnosing locally.
  const handleUnrecognized = (name) => {
    navigate('/see-doctor', { state: { referredFor: name } });
  };

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
      const result = await diagnosisApi.diagnose(validSymptoms);

      // Store in local storage to track completion
      localStorage.setItem('symptomsCompleted', 'true');

      navigate('/result', { state: { result } });
    } catch (err) {
      alert(err.message || 'Failed to diagnose');
    }
  };

  return (
    <Layout>
      <div className="symptoms-container">
        <h1 className="page-title">How are you feeling?</h1>
        
        {symptomsList.map((symptom, index) => (
          <div className="symptom-row" key={index}>
            <div className="symptom-select">
              <SymptomSelect
                value={symptom.name}
                options={symptomOptions}
                onChange={(name) => handleUpdateSymptom(index, 'name', name)}
                onUnrecognized={handleUnrecognized}
              />

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
