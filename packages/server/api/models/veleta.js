const { Schema, model } = require('mongoose');

const veletaSchema = new Schema(
    {
        id: String,
        direction: String
    });

module.exports = model('veleta', veletaSchema);