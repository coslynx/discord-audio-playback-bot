const mongoose = require('mongoose');
const Playlist = require('../models/playlistModel');
const User = require('../models/userModel');

// Function to create a new playlist for a user
async function createPlaylist(discordId, name) {
    try {
        const user = await User.findByDiscordId(discordId);
        if (!user) throw new Error('User not found.');

        const newPlaylist = new Playlist({ name, owner: user._id });
        await newPlaylist.save();

        user.playlists.push(newPlaylist._id);
        await user.save();

        return newPlaylist;
    } catch (error) {
        console.error('Error creating playlist:', error);
        throw error;
    }
}

// Function to add a song to the playlist
async function addSongToPlaylist(playlistId, songId) {
    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) throw new Error('Playlist not found.');

        if (!playlist.songs.includes(songId)) {
            playlist.songs.push(songId);
            await playlist.save();
        } else {
            throw new Error('Song already exists in the playlist.');
        }
    } catch (error) {
        console.error('Error adding song to playlist:', error);
        throw error;
    }
}

// Function to remove a song from the playlist
async function removeSongFromPlaylist(playlistId, songId) {
    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) throw new Error('Playlist not found.');

        playlist.songs = playlist.songs.filter(id => id.toString() !== songId.toString());
        await playlist.save();
    } catch (error) {
        console.error('Error removing song from playlist:', error);
        throw error;
    }
}

// Function to retrieve a user's playlists
async function getUserPlaylists(discordId) {
    try {
        const user = await User.findByDiscordId(discordId).populate('playlists');
        if (!user) throw new Error('User not found.');

        return user.playlists;
    } catch (error) {
        console.error('Error retrieving user playlists:', error);
        throw error;
    }
}

// Function to delete a playlist
async function deletePlaylist(playlistId, discordId) {
    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) throw new Error('Playlist not found.');

        if (playlist.owner.toString() !== discordId) {
            throw new Error('You do not have permission to delete this playlist.');
        }

        await Playlist.deleteOne({ _id: playlistId });
        await User.updateOne({ discordId }, { $pull: { playlists: playlistId } });
    } catch (error) {
        console.error('Error deleting playlist:', error);
        throw error;
    }
}

// Function to get a specific playlist including songs
async function getPlaylist(playlistId) {
    try {
        const playlist = await Playlist.findById(playlistId).populate('songs');
        if (!playlist) throw new Error('Playlist not found.');

        return playlist;
    } catch (error) {
        console.error('Error getting playlist:', error);
        throw error;
    }
}

// Exporting the playlist service functions
module.exports = {
    createPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    getUserPlaylists,
    deletePlaylist,
    getPlaylist,
};