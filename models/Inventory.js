const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    item: { type: Schema.Types.ObjectId, ref: 'Part' },
    location: String,
    qty: Number
});

const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;
