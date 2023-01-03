const env = require('../env.config');

module.exports = {
  mongodb: {
    connectTo: (database) => `mongodb+srv://ecommerce:${env.DB_PASSWORD}@ecommerce.vnr307k.mongodb.net/${database}?retryWrites=true&w=majority
    `,
  }
}