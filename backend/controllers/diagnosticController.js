const Case = require('../models/Case');
const DiagnosisHistory = require('../models/DiagnosisHistory');

// 1. RETRIEVE phase helper: calculate similarity index
const severityWeights = {
    'Very Low': 1,
    'Low': 2,
    'Medium': 3,
    'High': 4,
    'Very High': 5
};

const calculateSimilarity = (userSymptoms, caseSymptoms) => {
    let intersectionScore = 0;
    // Max score is if all symptoms match exactly with exact severity
    let maxPossibleScore = Math.max(userSymptoms.length, caseSymptoms.length) * 5; 
    
    userSymptoms.forEach(us => {
        const matchingCaseSymptom = caseSymptoms.find(cs => cs.name.toLowerCase() === us.name.toLowerCase());
        if (matchingCaseSymptom) {
            const userSeverity = severityWeights[us.severity] || 3;
            const caseSeverity = severityWeights[matchingCaseSymptom.severity] || 3;
            const severityDiff = Math.abs(userSeverity - caseSeverity);
            
            // Score out of 5 for this symptom match
            intersectionScore += (5 - severityDiff);
        }
    });
    
    return maxPossibleScore > 0 ? (intersectionScore / maxPossibleScore) * 100 : 0;
};

// 2. REUSE phase: Diagnose based on similarity
const diagnose = async (req, res) => {
    try {
        const { symptoms } = req.body;

        const cases = await Case.find();

        if (!cases || cases.length === 0) {
            return res.status(500).json({ message: 'Case base is empty.' });
        }

        let bestMatch = null;
        let highestScore = 0;

        // RETRIEVE: Find the most similar case
        cases.forEach(c => {
            const score = calculateSimilarity(symptoms, c.symptoms);
            if (score > highestScore) {
                highestScore = score;
                bestMatch = c;
            }
        });

        const THRESHOLD = 40; // Similarity threshold to consider a match

        const historyEntry = {
            user: req.user.id,
            symptoms,
            similarityScore: Math.round(highestScore * 100) / 100
        };

        // REUSE: Use the best match if score is above threshold
        if (highestScore >= THRESHOLD && bestMatch) {
            historyEntry.diagnosis = bestMatch.diagnosis;
            historyEntry.treatmentRecommendation = bestMatch.treatmentRecommendation;
            historyEntry.referredToDoctor = false;
        } else {
            historyEntry.diagnosis = "Unknown";
            historyEntry.treatmentRecommendation = "Please consult a doctor for accurate diagnosis.";
            historyEntry.referredToDoctor = true;
        }

        // RETAIN (history): persist this diagnosis for the user
        const saved = await DiagnosisHistory.create(historyEntry);

        res.json(saved);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// 4. RETAIN phase: Save a confirmed case back to the case base
const retainCase = async (req, res) => {
    try {
        const { symptoms, diagnosis, treatmentRecommendation } = req.body;
        
        if(!symptoms || !diagnosis) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newCase = await Case.create({
            symptoms,
            diagnosis,
            treatmentRecommendation: treatmentRecommendation || "General Care",
            caseOutcome: "Pending confirmation"
        });

        res.json({ message: 'Case retained successfully', newCase });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getHistory = async (req, res) => {
    try {
        const history = await DiagnosisHistory.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { diagnose, getHistory, retainCase };
