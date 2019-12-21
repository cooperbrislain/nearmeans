const mongoose = require('mongoose');
const { Schema } = mongoose;

const BinSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    contents: [{ type: Schema.Types.ObjectId, ref: 'Inventory' }],
    location: { type: Schema.Types.ObjectId, ref: 'Location' },
    name: String,
    status: String,
    type: String,
    props: {}
});

const Inventory = mongoose.model('Inventory', InventorySchema);
module.exports = Inventory;
