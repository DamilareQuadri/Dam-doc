const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    symptoms: [{
        name: { type: String },
        severity: { type: String }
    }],
    diagnosis: { type: String },
    treatmentRecommendation: { type: String },
    referredToDoctor: { type: Boolean, default: false },
    similarityScore: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('DiagnosisHistory', historySchema);
