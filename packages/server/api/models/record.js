const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        rain: String
    });

module.exports = mongoose.model('image', recordSchema);