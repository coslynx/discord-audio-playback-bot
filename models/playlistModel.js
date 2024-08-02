const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }]
}, {
    timestamps: true
});

// Method to add a song to the playlist
playlistSchema.methods.addSong = async function(songId) {
    if (!this.songs.includes(songId)) {
        this.songs.push(songId);
        await this.save();
    } else {
        throw new Error('Song already exists in the playlist.');
    }
};

// Method to remove a song from the playlist
playlistSchema.methods.removeSong = async function(songId) {
    this.songs = this.songs.filter(id => id.toString() !== songId.toString());
    await this.save();
};

// Method to get all songs in the playlist
playlistSchema.methods.getSongs = async function() {
    return await mongoose.model('Song').find({ _id: { $in: this.songs } });
};

// Method to clear the playlist
playlistSchema.methods.clear = async function() {
    this.songs = [];
    await this.save();
};

// Exporting the Playlist model
module.exports = mongoose.model('Playlist', playlistSchema);