const express = require("express");
const router = express.Router();
const loginController = require("../../controller/RetailContoller/loginController");
const passport = require("passport");

//retail Login
router.post("/retaillogin", loginController.retailLogin);

module.exports = router;
