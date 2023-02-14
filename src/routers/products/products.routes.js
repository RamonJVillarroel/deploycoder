const express= require('express');
const{ adminMiddleware} = require('../../middleware/admin.middleware')
const ProductsController = require('../../controllers/products.controller');

const productsController = new ProductsController();
const router= express.Router();
router.get('/',productsController.getProducts);
router.get('/:id',productsController.getProductById);
router.post('/', adminMiddleware, productsController.saveProduct)
router.put('/:id', adminMiddleware, productsController.updateProduct)
router.delete('/:id', adminMiddleware, productsController.deleteProduct)


module.exports = router