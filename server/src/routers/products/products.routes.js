const express = require('express')
const {authMiddleware, adminMiddleware} = require('../../middleware/jwt.middleware')
const ProductsController = require('../../controllers/products.controller');

const productsController = new ProductsController()

const router= express.Router();



router.get('/', authMiddleware, productsController.getProducts);
router.get('/:id', authMiddleware, productsController.getProductById);
router.get("/category/:category", authMiddleware, productsController.getProductsByCategory);
router.post('/', productsController.saveProduct);
router.put('/:id',authMiddleware, adminMiddleware, productsController.updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, productsController.deleteProduct);


module.exports = router;