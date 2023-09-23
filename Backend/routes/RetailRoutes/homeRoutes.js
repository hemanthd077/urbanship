const express = require('express');
const router = express.Router();
const HomeController = require('../../controller/RetailContoller/homeController')

//retail Login
router.get('/retailAccountData',HomeController.retaildata)

router.post('/updateShopStatus',HomeController.updateShopStatus)

module.exports = router;