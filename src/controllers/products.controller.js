const {STATUS, succesResponse} = require('../utils/api.utils');
const ProductsDAO = require('../models/daos/products.dao');

const productsDAO = new ProductsDAO();


class ProductsController {
    async getProducts(req, res, next) {
      try {
        const products = await productsDAO.getAll()
        const response = succesResponse(products)
        res.json(response)
      } catch (err) {
        next(err)
      }
    }
  
    async getProductById(req, res, next) {
      const { id } = req.params
      try {
        const product = await productsDAO.getById(id)
        const response = succesResponse(product)
        res.json(response)
      } catch (err) {
        next(err)
      }
    }
  
    async saveProduct(req, res, next) {
      try {
        const newProduct = await productsDAO.save(req.body)
        const response = succesResponse(newProduct)
        res.status(STATUS.CREATED).json(response)
      } catch (err) {
        next(err)
      }
    }
  
    async updateProduct(req, res, next) {
      const { id } = req.params
      try {
        const updatedProduct = await productsDAO.update(id, req.body)
        const response = succesResponse(updatedProduct)
        res.json(response)
      } catch (err) {
        next(err)
      }
    }
  
    async deleteProduct(req, res, next) {
      const { id } = req.params
      try {
        const deletedProduct = await productsDAO.delete(id)
        const response = succesResponse(deletedProduct)
        res.json(response)
      } catch (err) {
        next(err)
      }
    }
  }
  
  module.exports= ProductsController;
