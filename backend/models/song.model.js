const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    lyrics: {
        type: String,
        required: false,
        trim: true
    },
    artist: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;