const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        videoPath: String
    });

module.exports = mongoose.model('video', videoSchema);