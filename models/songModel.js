const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|spotify\.com|soundcloud\.com)\S+/.test(v);
            },
            message: props => `${props.value} is not a valid song URL!`
        }
    },
    requestedBy: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    source: {
        type: String,
        enum: ['youtube', 'spotify', 'soundcloud'],
        required: true
    }
}, {
    timestamps: true
});

songSchema.statics.validateAndFetchSong = async function(url) {
    const isValidUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|spotify\.com|soundcloud\.com)\S+/.test(url);
    if (!isValidUrl) {
        throw new Error('Invalid song URL.');
    }
    // Logic to fetch song metadata can be placed here, e.g., making a request to the respective API.
    return {
        title: 'Sample Title', // Placeholder, should replace with actual fetched title
        url: url, 
        duration: 180, // Placeholder for song duration
        source: 'youtube' // Placeholder for song source
    };
};

module.exports = mongoose.model('Song', songSchema);