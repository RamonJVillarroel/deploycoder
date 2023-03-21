const express = require('express')
const {authMiddleware} = require('../../middleware/jwt.middleware')
const usersController = require('../../controllers/users.controller');



const router = express.Router();

router.get('/infouser', authMiddleware, usersController.getUserInfo);


module.exports = router;
