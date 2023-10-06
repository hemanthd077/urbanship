const multer = require("multer");
const fs = require("fs");
const Login = require("./loginController");
const ProductDataDB = require("../../server/ProductDataDB");
const retailShopData = require("../../server/RetailerShopDB");

const retailAccData = Login.AccountData();

const retailProfileData = async (req, res) => {
  await retailShopData
    .findOne({ Email: retailAccData[0] })
    .then((resultData) => {
      let ProfileData = [];
      ProfileData[0] =
        resultData.ShopImages.ContentType +
        ";base64," +
        resultData.ShopImages.data.toString("base64");
      ProfileData[1] = resultData.ShopStatus;
      ProfileData[2] = resultData.ShopName;
      ProfileData[3] = resultData.Location;
      ProfileData[4] = resultData.Email;
      res.status(200).json({ ProfileData });
    })
    .catch((e) => {
      res.status(401).json({message : "Fetching Failed"});
      console.log("Error occured in the RetailProfilDAta ", e);
    });
};

module.exports = {
  retailProfileData,
};
