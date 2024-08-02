const express = require('express');
const { playSong, stopSong, skipSong, getCurrentSong, getQueue } = require('../services/musicService');
const { getQueue: getQueueService } = require('../services/queueService');
const { handleError } = require('../utils/errorHandler');
const { hasPermission } = require('../utils/permissionsHandler');

const router = express.Router();

// Play a song or search for a song
router.post('/play', async (req, res) => {
    const { guildId, input } = req.body;
    try {
        const queue = getQueueService(guildId);
        if (!queue) {
            return res.status(400).json({ message: 'No active queue. Start by adding a song.' });
        }
        const song = await playSong(guildId, input);
        return res.status(200).json({ message: `Added to queue: ${song.title}` });
    } catch (error) {
        console.error('Error in /play:', error);
        return handleError(res, error);
    }
});

// Stop the music and clear the queue
router.post('/stop', async (req, res) => {
    const { guildId } = req.body;
    try {
        await stopSong(guildId);
        return res.status(200).json({ message: 'Stopped the music and cleared the queue.' });
    } catch (error) {
        console.error('Error in /stop:', error);
        return handleError(res, error);
    }
});

// Skip the currently playing song
router.post('/skip', async (req, res) => {
    const { guildId } = req.body;
    try {
        await skipSong(guildId);
        return res.status(200).json({ message: 'Skipped the current song.' });
    } catch (error) {
        console.error('Error in /skip:', error);
        return handleError(res, error);
    }
});

// View the current song queue
router.get('/queue/:guildId', async (req, res) => {
    const { guildId } = req.params;
    const queue = getQueueService(guildId);
    if (!queue || queue.songs.length === 0) {
        return res.status(200).json({ message: 'The queue is currently empty.' });
    }

    const queueList = queue.songs.map((song, index) => ({
        position: index + 1,
        title: song.title,
        requestedBy: song.requestedBy,
    }));

    return res.status(200).json({
        queue: queueList,
    });
});

// Middleware to check user permission (assuming role-based access implemented)
router.use((req, res, next) => {
    try {
        hasPermission(req, 'MANAGE_CHANNELS'); // Modify this based on your permission schema
        next();
    } catch (error) {
        console.error('Permission error:', error);
        return res.status(403).json({ message: 'Insufficient permissions.' });
    }
});

module.exports = router;