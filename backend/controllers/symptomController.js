const Symptom = require('../models/Symptom');

// Serialize a Mongoose document to the shape the frontend expects: { id, name }.
const toDTO = (doc) => ({ id: doc._id, name: doc.name });

// Escape user input before using it inside a regular expression.
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// GET /symptoms?search=head
// Returns the symptom catalog, optionally filtered by a case-insensitive
// substring match on the name. Sorted alphabetically for a predictable dropdown.
const getSymptoms = async (req, res) => {
    try {
        const search = (req.query.search || '').trim();

        const filter = search
            ? { name: { $regex: escapeRegex(search), $options: 'i' } }
            : {};

        const symptoms = await Symptom.find(filter).sort({ name: 1 });
        res.json(symptoms.map(toDTO));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getSymptoms };
