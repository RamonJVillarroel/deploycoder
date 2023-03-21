const express = require('express');
const apiProducts= require('./products/products.routes');
const apiCarts = require('./carts/carts.routes');
const apiAuth = require('./auth/auth.routes');
const apiUsers = require('./users/users.routes');
const apiOrders = require('./orders/orders.routes');
const apiInfo = require('./info/info.routes')

const router = express.Router();

router.use('/products', apiProducts);
router.use('/carts', apiCarts);
router.use('/auth', apiAuth);
router.use('/users', apiUsers);
router.use('/orders', apiOrders);
router.use('/server', apiInfo)


module.exports= router