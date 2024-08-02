const { AudioPlayer, createAudioPlayer, AudioResource, joinVoiceChannel, getVoiceConnection, VoiceConnectionStatus } = require('@discordjs/voice');
const { getQueue, setVolume, getVolume, playNextSong, clearQueue } = require('./queueService');
const axios = require('axios');
const { createReadStream } = require('fs');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

let player = createAudioPlayer();

async function playSong(guildId) {
    const queue = getQueue(guildId);
    
    if (queue.playing || queue.songs.length === 0) return;

    const song = queue.songs[0];
    const resource = await getAudioResource(song);
    player.play(resource);

    queue.playing = true;

    player.on('finish', () => {
        queue.songs.shift();
        if (queue.songs.length > 0) {
            playSong(guildId);
        } else {
            queue.playing = false;
        }
    });

    player.on('error', error => {
        console.error('Error playing song:', error);
        queue.playing = false;  // Reset playing status on error
        clearQueue(queue);       // Clear the queue to avoid issues
    });

    const connection = joinVoiceChannel({
        channelId: queue.voiceChannelId,
        guildId: guildId,
        adapterCreator: queue.adapterCreator,
    });

    connection.on(VoiceConnectionStatus.Ready, () => {
        console.log(`The bot has connected to the channel: ${queue.voiceChannelId}`);
    });

    connection.subscribe(player);
}

async function getAudioResource(song) {
    if (song.source === 'youtube') {
        return createAudioResource(ytdl(song.url, { filter: 'audioonly' }));
    } else if (song.source === 'spotify') {
        const trackData = await getSpotifyTrack(song.url);
        return createAudioResource(trackData.preview_url); // Assuming preview URL is available
    } else {
        throw new Error('Unsupported music source');
    }
}

async function getSpotifyTrack(url) {
    const trackId = extractSpotifyId(url);
    const data = await spotifyApi.getTrack(trackId);
    return {
        title: data.body.name,
        preview_url: data.body.preview_url,
    };
}

function extractSpotifyId(url) {
    const regex = /(?:track\/|album\/|playlist\/|artist\/)?([a-zA-Z0-9]{22})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}

async function stopSong(guildId) {
    const queue = getQueue(guildId);
    queue.songs = [];
    if (player) {
        player.stop();
    }
}

function skipSong(guildId) {
    const queue = getQueue(guildId);
    if (queue.songs.length > 0) {
        queue.songs.shift(); // Remove the current song
    }
    playSong(guildId); // Play the next song
}

async function searchVideo(query) {
    const searchResult = await ytSearch(query);
    if (searchResult.videos.length > 0) {
        return {
            title: searchResult.videos[0].title,
            url: searchResult.videos[0].url,
            source: 'youtube'
        };
    }
    throw new Error('No results found');
}

async function validateAndFetchSong(url) {
    // Example function to validate and fetch song details. 
    const isValidUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\S+/.test(url);
    if (!isValidUrl) {
        throw new Error('Invalid song URL.');
    }
    return {
        title: 'Sample Song from URL',
        url: url,
        source: 'youtube'
    };
}

module.exports = {
    playSong,
    stopSong,
    skipSong,
    searchVideo,
    validateAndFetchSong,
    setVolume,
    getVolume
};