const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    item: { type: Schema.Types.ObjectId, ref: 'Part' },
    location: {
        longitude: Number,
        latitude: Number
    },
    qty: Number
});

const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;