const seedCases = require('./seedData');

const db = {
    users: [],
    cases: seedCases,
    history: [],
};

module.exports = db;
