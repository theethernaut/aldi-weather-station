const { Schema, model } = require('mongoose');

const uvRaySchema = new Schema(
    {
        id: String,
        uv: Int
    });

module.exports = model('uvRay', uvRaySchema);