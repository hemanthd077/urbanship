const multer  = require('multer')
const addProductDB = require('../../server/ProductDataDB');
const Login = require('./loginController')
const fs = require('fs');

const retailAccData = Login.AccountData();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/productImages/")
    },
    filename: function (req, file, cb) {
       return cb(null,file.originalname)
    },
})

const upload = multer({storage:storage}).single('ProductImage')

const AddProduct = (async(req,res)=>{
    try{
        upload(req,res,async(err)=>{
            const addProductData = JSON.parse(req.body.addProductData);
 
            if (err instanceof multer.MulterError) {
                console.log("Error in upload3 file not working: "+err);
            } 
            else{
                const newvalues = new addProductDB({
                    ProductId:retailAccData[0]+Date.now(),
                    Email:retailAccData[0],
                    Visibility:true,
                    ProductImages:{
                        data: fs.readFileSync('uploads/productImages/' + req.file.filename),
                        ContentType: 'image/png'
                    },
                    ProductName:addProductData.ProductName,
                    ProductCategory:addProductData.Catagory,
                    netWeight:addProductData.netWeight,
                    Standards:addProductData.Standards,
                    Quanity:addProductData.Quantity,
                    Price:addProductData.Price,
                })
    
                newvalues.save().then(()=>{
                    console.log('successfully product Added')
                    res.status(200).json({'message':'Successfully Product Added' })
                }).catch(err=>{
                    console.log("Error Occur in Adding Product Data : "+err)
                    res.status(401).json({'message':'failed to Addded Product' })
                })
            }
        })
    }
    catch(e){
        console.log("Error in Addproduct Function" , e);
    }
})

module.exports={
    AddProduct,
}