const { Queue } = require('@discordjs/voice');

const queues = new Map();

function getQueue(guildId) {
    if (!queues.has(guildId)) {
        queues.set(guildId, createQueue());
    }
    return queues.get(guildId);
}

function createQueue() {
    return {
        songs: [],
        volume: 1,
        playing: false,
    };
}

function addToQueue(queue, song) {
    queue.songs.push(song);
}

function removeFromQueue(queue) {
    if (queue.songs.length > 0) {
        return queue.songs.shift();
    }
    return null;
}

function getCurrentSong(queue) {
    return queue.songs[0] || null;
}

function isQueueEmpty(queue) {
    return queue.songs.length === 0;
}

function clearQueue(queue) {
    queue.songs = [];
}

function setVolume(queue, volume) {
    if (volume < 0 || volume > 2) {
        throw new Error('Volume must be between 0 and 2.');
    }
    queue.volume = volume;
}

function getVolume(queue) {
    return queue.volume;
}

function playNextSong(guildId, player) {
    const queue = getQueue(guildId);
    if (isQueueEmpty(queue)) {
        queue.playing = false;
        return;
    }

    const nextSong = removeFromQueue(queue);
    player.play(nextSong.url, { volume: queue.volume });
    queue.playing = true;
}

module.exports = {
    getQueue,
    addToQueue,
    removeFromQueue,
    getCurrentSong,
    isQueueEmpty,
    clearQueue,
    setVolume,
    getVolume,
    playNextSong,
};