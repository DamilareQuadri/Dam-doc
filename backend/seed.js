// Standalone seed script: wipes and repopulates the case base and symptom
// catalog. Run against a real database with:  MONGO_URI=... npm run seed
require('dotenv').config();

const { connectDB, disconnectDB } = require('./config/db');
const seedDatabase = require('./config/seed');

(async () => {
    try {
        await connectDB();
        await seedDatabase({ force: true });
        console.log('✅ Database reseeded');
    } catch (err) {
        console.error('❌ Seed failed:', err.message);
        process.exitCode = 1;
    } finally {
        await disconnectDB();
        process.exit();
    }
})();
