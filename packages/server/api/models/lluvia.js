const { Schema, model } = require('mongoose');

const lluviaSchema = new Schema(
    {
        id: String,
        llueve: Boolean
    });

module.exports = model('lluvia', lluviaSchema);