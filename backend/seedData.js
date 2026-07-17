const seedCases = [
    {
        symptoms: [
            { name: "Fever", severity: "High" },
            { name: "Chills", severity: "High" },
            { name: "Headache", severity: "Medium" },
            { name: "Nausea", severity: "Low" },
            { name: "Sweating", severity: "Medium" }
        ],
        diagnosis: "Malaria",
        treatmentRecommendation: "Artemisinin-based combination therapy (ACT). Rest and stay hydrated.",
        caseOutcome: "Recovered in 5 days"
    },
    {
        symptoms: [
            { name: "Fever", severity: "Very High" },
            { name: "Abdominal Pain", severity: "Medium" },
            { name: "Weakness", severity: "High" },
            { name: "Headache", severity: "Medium" },
            { name: "Constipation", severity: "Low" }
        ],
        diagnosis: "Typhoid Fever",
        treatmentRecommendation: "Antibiotics (e.g., Ciprofloxacin). Ensure safe drinking water and hygiene.",
        caseOutcome: "Recovered in 10 days"
    },
    {
        symptoms: [
            { name: "Fever", severity: "High" },
            { name: "Joint Pain", severity: "Very High" },
            { name: "Rash", severity: "Medium" },
            { name: "Headache", severity: "High" },
            { name: "Eye Pain", severity: "Medium" }
        ],
        diagnosis: "Dengue Fever",
        treatmentRecommendation: "Pain relievers (Acetaminophen), lots of fluids, and rest. Avoid Aspirin.",
        caseOutcome: "Recovered in 7 days"
    },
    {
        symptoms: [
            { name: "Diarrhea", severity: "Very High" },
            { name: "Vomiting", severity: "High" },
            { name: "Leg Cramps", severity: "Medium" },
            { name: "Dehydration", severity: "Very High" }
        ],
        diagnosis: "Cholera",
        treatmentRecommendation: "Immediate Oral Rehydration Salts (ORS) or Intravenous fluids. Antibiotics in severe cases.",
        caseOutcome: "Recovered rapidly with hydration"
    }
];

module.exports = seedCases;
