const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CartSchema = new Schema({
    timestamp: { type: Date, default: new Date().toLocaleString() },
    products: { type: Array, required: true, default: [] }
})
module.exports= CartSchema;