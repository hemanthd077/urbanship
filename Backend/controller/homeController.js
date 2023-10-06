const RetailerShopDB = require('../server/RetailerShopDB')
const ProductDataDB = require('../server/ProductDataDB')
const userData = require("../server/userSignupDB");
const Login = require('./loginController')
const AccData = Login.UserAccount();

let ProductFrontendId = [];

const userLandmarkSet = async(req,res)=>{
  const newvalues ={$set: {Landmark: req.body.Location}};
  const filter = {Email : AccData[2]}
  const options = { upsert: false };            
  await userData.updateOne(filter,newvalues,options, (err , collection) => {
      if(err){
          console.log('error'+err)
          res.status(401).json({}); 
      }
  }).then(()=>{
    console.log("Successfully Updated the Location");
    res.status(200).json({});
  })
  
}

const productShopSearch = (async(req,res)=>{
  const userACCdata = await userData.findOne({Email:AccData[2]})
    await RetailerShopDB.aggregate([
        {
          $match: {
            Location: userACCdata.Landmark,
            ShopStatus : true,
          },
        },
        {
          $sort: {
            ProductCategory: -1,
          },
        },
        {
          $group: {
            _id: "$Email",
            shopData: { $push: "$$ROOT" },
          },
        },
      ]).then((result) => {
            let availShopData = []
            ProductFrontendId = []
            result.forEach(async(item,indexOuter) => {
                item.shopData.forEach((product) => {
                    let tempShopData = [];
                    tempShopData[0] =
                        product.ShopImages.ContentType +
                        ";base64," +
                        product.ShopImages.data.toString("base64");
                        ProductFrontendId[indexOuter] = product.Email;
                        tempShopData[1] = product.ShopName;
                        tempShopData[2] = product.Location;
                        if(Number(product.Rating.currentRating)===0 || Number(product.Rating.count)===0){
                            tempShopData[3] =0.0;
                        }
                        else{
                            tempShopData[3] = (Number(product.Rating.currentRating)/Number(product.Rating.count)).toFixed(2);;
                        }
                        tempShopData[4] = product.ProductId;
                        availShopData[indexOuter] = tempShopData;
                });
            });
            res.status(200).json({availShopData})
      }).catch((e)=>{
        console.log("Error In fetch product and shop avail data in productShopSearch ",e);
      })

})

const productShopDetails = async(req,res)=>{
  let ShopTotalData = [];
  let ProductData = [];
  await RetailerShopDB.findOne({Email:ProductFrontendId[req.body.ProductIndex]}).then(async(shopData)=>{
    if(shopData){
      ShopTotalData[0] = shopData.ShopName;
      ShopTotalData[1] = shopData.Location;
      ShopTotalData[2] = shopData.ShopStatus;
      if(Number(shopData.Rating.currentRating)===0 || Number(shopData.Rating.count)===0){
        ShopTotalData[3] =0.0;
    }
    else{
      ShopTotalData[3] = (Number(shopData.Rating.currentRating)/Number(shopData.Rating.count)).toFixed(2);;
    }
      ShopTotalData[4] = shopData.ShopImages.ContentType +
      ";base64," +
      shopData.ShopImages.data.toString("base64");

      await ProductDataDB.aggregate([
        {
          $match: {
            Email: shopData.Email,
            Visibility:true,
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
              tempProductData[7] = product["ProductId"];
              GroupProduct[pindex] = tempProductData;
            });
            ProductData[resultIndex] = {
              productCategory: categoryGroup._id,
              products: GroupProduct,
            };
          });

          res.status(200).json({ShopTotalData, ProductData });
        })
        .catch((error) => {
          console.error(error);
          res.status(401).json({message:"Shop Not Accepting Order Right Now"});
        });
    }
    else{
      res.status(401).json({message:"Shop Not Found"});
    } 
  })
}

const userLandmarkFetch = async(req,res)=>{
  const userACCdata = await userData.findOne({Email:AccData[2]})
  const  Landmark = userACCdata.Landmark;
  res.status(200).json({Landmark})
}

const UpdateCartData = async(req,res)=>{

  let TotalStockAvail =0;

  await ProductDataDB.findOne({ProductId:req.body.ProductId}).then((resultProductData)=>{
    if(resultProductData){
      TotalStockAvail=resultProductData.Quantity;
    }
  })

  await userData.findOne({Email:AccData[2]}).then(async(ResultData)=>{
    if(ResultData){
      try {
        const existingProductIndex = ResultData.CartDetails.findIndex(
          (item) => item.ProductId === req.body.ProductId,
        );
    
        if (existingProductIndex !== -1 && req.body.Status) {
          if(TotalStockAvail-(Number(ResultData.CartDetails[existingProductIndex].ProductCount)+ 1)>=0){
            ResultData.CartDetails[existingProductIndex].ProductCount = Number(ResultData.CartDetails[existingProductIndex].ProductCount)+ 1;
          }
        }
        else  if (existingProductIndex !== -1 && !(req.body.Status)) {
          if (Number(ResultData.CartDetails[existingProductIndex].ProductCount)  === 1) {
            ResultData.CartDetails.splice(existingProductIndex, 1);
          } else {
            ResultData.CartDetails[existingProductIndex].ProductCount = Number(ResultData.CartDetails[existingProductIndex].ProductCount)-1;
          }
        } else {
          ResultData.CartDetails.push({
            ProductId: req.body.ProductId,
            ProductCount: 1,
          }); 
        }
    
        const updateResult =  await userData.updateOne(
          { Email: AccData[2] },
          { $set: { CartDetails: ResultData.CartDetails } }
        );
        if (updateResult.modifiedCount === 1) {
          console.log(`Updated cart Successfull in usedb on CartUpdate`);
          res.status(200).json({Message : "Updated cart Successfully"})
        } else {
          console.log(`Update cart Failed in userdb on CartUpdate`);
          res.status(201).json({Message : "Update cart Failed in userdb"})
        } 
      } catch (error) {
        console.error('Error adding Cart item to user:', error);
        res.status(401).json({Message : "Error adding Cart item to user"})
      }
    }
  })
}

const FetchCartData =async(req,res)=>{
  await userData.findOne({Email:AccData[2]}).then(async(ResultCartData)=>{
    let CartData = [];
    let CartDataIndex =0;
    let TotalAmount=0;
    if(ResultCartData){
      for (let index = 0; index < ResultCartData.CartDetails.length; index++) {
        const ProductId = ResultCartData.CartDetails[index].ProductId;
        await ProductDataDB.findOne({ProductId:ProductId}).then((productData)=>{
          if(productData){
            if(productData.Visibility){
              let productDataArr = [];
              productDataArr[0] = productData.ProductType;
              productDataArr[1] = productData.ProductName;
              productDataArr[2] = productData.netWeight+"-"+productData.Standards;
              productDataArr[3] = productData.Price;
              productDataArr[4] = productData.ProductImages.ContentType +
              ";base64," +
              productData.ProductImages.data.toString("base64");
              productDataArr[5] = productData.Quantity;
              productDataArr[6] = productData.ProductId;  
              productDataArr[7] = productData.ProductCategory;
              TotalAmount+=productDataArr[3]*Number( ResultCartData.CartDetails[index].ProductCount)
              CartData[CartDataIndex++] = {product: productDataArr , count : ResultCartData.CartDetails[index].ProductCount };
            }
          }
          else{ 
            console.log("Product Not Found");
          }
        })
      }
      res.status(200).json({CartData,TotalAmount})
    }
    else{
      console.log("User Not Found");
      res.status(200).json({Message : "User Not Found"})
    }
  }).catch((e)=>{
    console.log("Error in fetching data in FetchCartData", e);
    res.status(401).json({Message : "Error in Fetching User Cart"})
  })
}

module.exports={
    userLandmarkSet,
    productShopSearch,
    productShopDetails,
    userLandmarkFetch,
    UpdateCartData,
    FetchCartData,
}