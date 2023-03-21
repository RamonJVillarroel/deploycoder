const { STATUS ,succesResponse } = require('../utils/api.utils');
const { HTTPError } = require('../utils/errors.utils')
const { getProducts, getProductById, getProductsByCategory, saveProduct, updateProduct, deleteProduct } = require('../services/products.services.js')

class ProductsController {
  async getProducts(req, res, next) {
    try {
      const allProducts = await getProducts()
      const response = succesResponse(allProducts)
      res.status(STATUS.OK).json(response)
    } catch (err) {
      next(new HTTPError(STATUS.BAD_REQUEST, "no hay productos para mostrar"))
    }
  }

  async getProductById(req, res, next) {
    const { id } = req.params
    try {
      const product = await getProductById(id)
      const response = succesResponse(product)
      res.status(STATUS.OK).json(response)
    } catch (err) {
      next(new HTTPError(STATUS.BAD_REQUEST, "no hay productos con este codigo"))
    }
  }
  async getProductsByCategory(req, res, next) {
    const { category } = req.params
    try {
      const productsCategory = await getProductsByCategory(category)
      const response = succesResponse(productsCategory)
      res.status(STATUS.OK).json(response)
    } catch (err) {
      next(err)
    }
  }

  async saveProduct(req, res, next) {
    try {
      const newProduct = await saveProduct(req.body)
      const response = succesResponse(newProduct)
      res.status(STATUS.OK).json(response)
    } catch (err) {
      next(new HTTPError(STATUS.BAD_REQUEST))
    }
  }

  async updateProduct(req, res, next) {
    const { idProduct } = req.params
    try {
      const updatedProduct = await updateProduct(idProduct, req.body)
      const response = succesResponse(updatedProduct)
      res.status(STATUS.OK).json(response)
    } catch (err) {
      next(new HTTPError(STATUS.BAD_REQUEST, "no hay productos con este codigo"))
    }
  }

  async deleteProduct(req, res, next) {
    const { idProduct } = req.params
    try {
      const deletedProduct = await deleteProduct(idProduct)
      const response = succesResponse(deletedProduct)
      res.status(STATUS.OK).json(response)
    } catch (err) {
      next(new HTTPError(STATUS.BAD_REQUEST, "no hay productos con este codigo"))
    }
  }
}

module.exports = ProductsController;
