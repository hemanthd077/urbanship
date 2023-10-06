const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");

router.get("/productShopSearch", homeController.productShopSearch);

router.get("/userLandmarkFetch", homeController.userLandmarkFetch);

router.get("/FetchCartData", homeController.FetchCartData);

router.post("/productShopDetails", homeController.productShopDetails);

router.post("/userLandmarkSet", homeController.userLandmarkSet);

router.post("/UpdateCartData", homeController.UpdateCartData);



module.exports = router;
