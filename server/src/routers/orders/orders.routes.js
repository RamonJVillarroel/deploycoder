const  express = require('express')
const OrdersController = require('../../controllers/orders.controller');
const {authMiddleware, adminMiddleware} = require('../../middleware/jwt.middleware')

const router= express.Router();

const ordersController = new OrdersController()


router.post('/', authMiddleware, ordersController.createOrder);
router.delete('/:id', [authMiddleware, adminMiddleware], ordersController.deleteOrder);
router.get('/:id', authMiddleware, ordersController.getOrderById);

module.exports = router;