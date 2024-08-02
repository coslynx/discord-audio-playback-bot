const mongoose = require('mongoose');

// User schema definition
const userSchema = new mongoose.Schema({
    discordId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    playlists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist'
    }],
    roles: [{
        type: String
    }]
});

// Method to find a user by Discord ID
userSchema.statics.findByDiscordId = async function(discordId) {
    try {
        return await this.findOne({ discordId });
    } catch (error) {
        throw new Error('Error fetching user by Discord ID');
    }
};

// Method to create or update a user
userSchema.statics.updateOrCreate = async function(discordId, username) {
    try {
        const user = await this.findOneAndUpdate(
            { discordId },
            { username },
            { new: true, upsert: true }
        );
        return user;
    } catch (error) {
        throw new Error('Error creating or updating user');
    }
};

// Method to add a playlist to a user
userSchema.methods.addPlaylist = async function(playlistId) {
    if (!this.playlists.includes(playlistId)) {
        this.playlists.push(playlistId);
        return await this.save();
    }
    throw new Error('Playlist already exists for this user');
};

// Method to remove a playlist from a user
userSchema.methods.removePlaylist = async function(playlistId) {
    this.playlists = this.playlists.filter(id => id.toString() !== playlistId.toString());
    return await this.save();
};

// Export the user model
module.exports = mongoose.model('User', userSchema);