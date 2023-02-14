const MongoContainer = require('../containers/mongo.containers');
const ProductSchema = require('../schemas/products.schema');
const collection='products'
class ProductsDAO extends MongoContainer {
    constructor() {
        super(collection, ProductSchema)
      }
}
module.exports= ProductsDAO;