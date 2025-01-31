const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PartSchema = new Schema({
    name: String,
    category: String,
    tags: [String]
});

const Part = mongoose.model('Part', PartSchema);
module.exports = Part;
