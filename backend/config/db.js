const mongoose = require('mongoose');

let memoryServer = null;

/**
 * Connect to MongoDB.
 *
 *  - If MONGO_URI is set, connect to it (local mongod, MongoDB Atlas, Render…).
 *  - If it's NOT set and we're not in production, spin up an in-memory MongoDB
 *    (mongodb-memory-server) so the app runs with zero setup.
 *    NOTE: in-memory data is wiped when the process stops.
 *  - In production, MONGO_URI is required — we fail fast so the app never
 *    silently runs on a throwaway database.
 */
const connectDB = async () => {
    let uri = process.env.MONGO_URI;

    if (!uri) {
        if (process.env.NODE_ENV === 'production') {
            throw new Error(
                'MONGO_URI is not set. Add your MongoDB connection string to the ' +
                'environment (e.g. in your Render dashboard).'
            );
        }
        // Lazy-require so production never loads this dev-only package.
        const { MongoMemoryServer } = require('mongodb-memory-server');
        memoryServer = await MongoMemoryServer.create();
        uri = memoryServer.getUri();
        console.log('⚠️  No MONGO_URI set — using an in-memory MongoDB (data is NOT persisted).');
    }

    await mongoose.connect(uri);
    const { host, name } = mongoose.connection;
    console.log(`✅ MongoDB connected: ${host}/${name}`);
};

const disconnectDB = async () => {
    await mongoose.disconnect();
    if (memoryServer) {
        await memoryServer.stop();
        memoryServer = null;
    }
};

module.exports = { connectDB, disconnectDB };
