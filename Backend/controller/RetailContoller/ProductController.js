const multer = require("multer");
const addProductDB = require("../../server/ProductDataDB");
const Login = require("./loginController");
const fs = require("fs");
const ProductDataDB = require("../../server/ProductDataDB");

const retailAccData = Login.AccountData();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/productImages/");
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("ProductImage");

const AddProduct = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      const addProductData = JSON.parse(req.body.addProductData);

      if (err instanceof multer.MulterError) {
        console.log("Error in upload3 file not working: " + err);
      } else {
        const newvalues = new addProductDB({
          ProductId: retailAccData[0] + Date.now(),
          Email: retailAccData[0],
          Visibility: true,
          ProductImages: {
            data: fs.readFileSync("uploads/productImages/" + req.file.filename),
            ContentType: "image/png",
          },
          ProductName: addProductData.ProductName,
          ProductCategory: addProductData.Catagory,
          netWeight: addProductData.netWeight,
          Standards: addProductData.Standards,
          Quantity: addProductData.Quantity,
          ProductType: addProductData.ProductType,
          Price: addProductData.Price,
        });

        newvalues
          .save()
          .then(() => {
            console.log("successfully product Added");
            res.status(200).json({ message: "Successfully Product Added" });
          })
          .catch((err) => {
            console.log("Error Occur in Adding Product Data : " + err);
            res.status(401).json({ message: "failed to Addded Product" });
          });
      }
    });
  } catch (e) {
    console.log("Error in Addproduct Function", e);
  }
};

const retailProductData = async (req, res) => {
  let ProductData = [];
  await ProductDataDB.aggregate([
    {
      $match: {
        Email: retailAccData[0],
      },
    },
    {
      $sort: {
        ProductCategory: -1,
      },
    },
    {
      $group: {
        _id: "$ProductCategory",
        products: { $push: "$$ROOT" },
      },
    },
  ])
    .then((result) => {
      result.forEach((categoryGroup, resultIndex) => {
        const products = categoryGroup.products;

        let GroupProduct = [];
        products.forEach((product, pindex) => {
          let tempProductData = [];
          tempProductData[0] =
            product["ProductImages"]["ContentType"] +
            ";base64," +
            product["ProductImages"]["data"].toString("base64");
          tempProductData[1] = product["ProductName"];
          tempProductData[2] =
            product["netWeight"] + "-" + product["Standards"];
          tempProductData[3] = product["Visibility"];
          tempProductData[4] = product["Quantity"];
          tempProductData[5] = product["Price"];
          tempProductData[6] = product["ProductType"];
          GroupProduct[pindex] = tempProductData;
        });
        ProductData[resultIndex] = {
          productCategory: categoryGroup._id,
          products: GroupProduct,
        };
      });
    })
    .catch((error) => {
      console.error(error);
    });
  res.status(200).json({ ProductData });
};

module.exports = {
  AddProduct,
  retailProductData,
};
