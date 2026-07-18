// Initial symptom catalog. New symptoms created from the UI are appended to the
// in-memory store (see mockDB.js) at runtime.
const symptomNames = [
    "Fever", "Headache", "Cold", "Cough", "Chills", "Nausea", "Sweating",
    "Abdominal Pain", "Weakness", "Constipation", "Joint Pain", "Rash",
    "Eye Pain", "Diarrhea", "Vomiting", "Leg Cramps", "Dehydration"
];

const seedSymptoms = symptomNames.map((name, index) => ({
    id: (index + 1).toString(),
    name,
}));

module.exports = seedSymptoms;
