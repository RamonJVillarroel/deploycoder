const { Schema } = require('mongoose');


const ProductSchema = new Schema({
    timestamp: {type: Date, default: new Date()},
    title: {type: String, require: true},
    price: {type: Number, require: true},
    category: { type: String, required: true},
    thumbnail: {type: String, default: "https://www.pokemon.com/static-assets/app/static3/img/og-default-image.jpeg"},
    stock: {type: Number, require: true},
    description: {type: String}
})

module.exports = ProductSchema;