const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const fecha = new Date().toLocaleDateString();
const ProductSchema = new Schema({
    timestamp: { type: Date, default: fecha },
    name: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    imgUrl: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
})

module.exports = ProductSchema;