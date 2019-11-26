const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const InventorySchema = new Schema({
    location: String,

});

const Inventory = mongoose.model('Inventory', InventorySchema);
module.exports = Inventory;
