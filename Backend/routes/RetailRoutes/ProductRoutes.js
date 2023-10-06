const express = require("express");
const router = express.Router();
const ProductController = require("../../controller/RetailContoller/ProductController");

//retailProduct get
router.get("/retailProduct", ProductController.retailProductData);

//retailProduct Post
router.post("/retailAddProduct", ProductController.AddProduct);

module.exports = router;
