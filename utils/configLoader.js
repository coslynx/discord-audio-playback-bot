const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

function loadConfig() {
    // Load environment variables from .env file
    const envFilePath = path.resolve(__dirname, '../.env');
    if (fs.existsSync(envFilePath)) {
        dotenv.config({ path: envFilePath });
    } else {
        throw new Error('.env file not found');
    }

    // Validate required environment variables
    const requiredEnvVariables = [
        'DISCORD_TOKEN',
        'MONGODB_URI',
        'YOUTUBE_API_KEY',
        'SPOTIFY_CLIENT_ID',
        'SPOTIFY_CLIENT_SECRET',
        'SOUNDCLOUD_CLIENT_ID'
    ];

    const missingEnvVariables = requiredEnvVariables.filter((variable) => !process.env[variable]);

    if (missingEnvVariables.length > 0) {
        throw new Error(`Missing required environment variables: ${missingEnvVariables.join(', ')}`);
    }

    // Loading configuration will return an object with the necessary parameters
    return {
        discordToken: process.env.DISCORD_TOKEN,
        mongodbUri: process.env.MONGODB_URI,
        youtubeApiKey: process.env.YOUTUBE_API_KEY,
        spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
        spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        soundcloudClientId: process.env.SOUNDCLOUD_CLIENT_ID,
        nodeEnv: process.env.NODE_ENV || 'development'
    };
}

module.exports = {
    loadConfig
};