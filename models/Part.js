const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    category: String,
    price: Number,
    zipcode: Number
});

const Part = mongoose.model('Part', PartSchema);

module.exports = Part;
