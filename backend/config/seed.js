const Case = require('../models/Case');
const Symptom = require('../models/Symptom');
const seedCases = require('../seedData');
const seedSymptoms = require('../seedSymptoms');

// The catalog data file stores { id, name }; the model only needs { name }.
const symptomDocs = seedSymptoms.map((s) => ({ name: s.name }));

/**
 * Populate the reference data the app needs to function:
 *   - the Case base (used by the diagnosis engine)
 *   - the Symptom catalog (used by the symptom picker)
 *
 * Idempotent: by default each collection is only seeded when it is empty, so
 * this is safe to run on every startup. Pass { force: true } to wipe & reseed.
 */
const seedDatabase = async ({ force = false } = {}) => {
    if (force) {
        await Promise.all([Case.deleteMany({}), Symptom.deleteMany({})]);
    }

    if ((await Case.countDocuments()) === 0) {
        await Case.insertMany(seedCases);
        console.log(`🌱 Seeded ${seedCases.length} cases`);
    }

    if ((await Symptom.countDocuments()) === 0) {
        await Symptom.insertMany(symptomDocs);
        console.log(`🌱 Seeded ${symptomDocs.length} symptoms`);
    }
};

module.exports = seedDatabase;
