const express = require('express');
const apiProducts = require('../routers/products/products.routes')
const apiCarts = require('../routers/carts/carts.routes')
const apiAuth = require('../routers/auth/auth.routes')
const router = express.Router();

router.use('/products', apiProducts);
router.use('/carts', apiCarts);
router.use('/auth', apiAuth);
router.get('/', async(req,res,next)=>{
    res.render('register');
})
router.get('/login', async(req,res,next)=>{
    res.render('login');
})
module.exports= router