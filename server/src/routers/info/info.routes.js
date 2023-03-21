const { Router } = require('express')
const InfoController = require('../../controllers/info.controller')
const router = Router();

const infoController = new InfoController();

router.get('/infoserver', infoController.getInfoServer)

module.exports = router