const express = require('express');
const router = express.Router();
const addProductController = require('../../controller/RetailContoller/addProductController')

//retail addProduct
router.post('/retailAddProduct',addProductController.AddProduct)

module.exports = router;