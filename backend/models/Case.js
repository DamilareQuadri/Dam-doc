const mongoose = require('mongoose');

// Representing the historical cases for Case-Based Reasoning
const caseSchema = new mongoose.Schema({
    symptoms: [{
        name: { type: String, required: true },
        severity: { type: String, required: true, enum: ['Very Low', 'Low', 'Medium', 'High', 'Very High'] }
    }],
    diagnosis: { type: String, required: true },
    treatmentRecommendation: { type: String, required: true },
    caseOutcome: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema);
