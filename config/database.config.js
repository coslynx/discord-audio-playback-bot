const mongoose = require('mongoose');
const { loadConfig } = require('../utils/configLoader');

const config = loadConfig();

async function connectToDatabase() {
    try {
        await mongoose.connect(config.mongodbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to the database');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}

module.exports = {
    connectToDatabase,
};