const { Schema, model } = require('mongoose');

const imageSchema = new Schema(
    {
        id: String,
        name: String,
        url: String
    });

module.exports = model('image', imageSchema);