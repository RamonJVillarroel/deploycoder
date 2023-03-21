const MongoContainer = require('../containers/mongo.containers');
const ProductSchema = require('../schemas/products.schema');
const {HTTPError} = require('../../utils/errors.utils')
const { STATUS } = require('../../utils/api.utils')

const collection='products'

class ProductsDAO extends MongoContainer {
    constructor() {
        super(collection, ProductSchema)
      }

      async getByCategory(category) {
        const documents = await this.model.find({category}, { __v: 0 })
        if(documents.length === 0) {
          const message = `no hay productos con esta categoría ${category}`
          throw new HTTPError(STATUS.NOT_FOUND, message)
        }
        return documents
      } 
}
module.exports = ProductsDAO;