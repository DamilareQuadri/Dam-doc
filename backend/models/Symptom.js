const mongoose = require('mongoose');

// Catalog of selectable symptoms. Users can add new ones from the diagnosis UI.
const symptomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Symptom', symptomSchema);
