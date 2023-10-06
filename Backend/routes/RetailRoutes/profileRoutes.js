const express = require("express");
const router = express.Router();
const ProfileController = require("../../controller/RetailContoller/profileController");

//RetailProfile get
router.get("/retailProfileData", ProfileController.retailProfileData);

//Retailprofile Post

module.exports = router;
