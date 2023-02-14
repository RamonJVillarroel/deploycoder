const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    timestamp: { type: Date, default: new Date().toLocaleString() },
    name: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    imgUrl: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
})

module.exports = ProductSchema;