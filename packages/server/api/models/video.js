const { Schema, model } = require('mongoose');

const videoSchema = new Schema(
    {
        id: String,
        name: String,
        url: String
    });

module.exports = model('video', videoSchema);