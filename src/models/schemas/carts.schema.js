const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const fecha = new Date().toLocaleDateString();
const CartSchema = new Schema({
    timestamp: { type: Date, default: fecha },
    products: { type: Array, required: true, default: [] }
})
module.exports= CartSchema;