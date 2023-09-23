const mongoose = require('mongoose');

const retailerSchema = new mongoose.Schema({
    Email:{
        type: String,
        required:true,
    },
    Password:{
        type:String,
        required:true
    },
    ShopName:{
        type:String,
    },
    Location:{
        type:String,
    },
    ShopImages:[{
        data:Buffer,
        ContentType:String,
    }],
    ProductDetails:[{
        ProductName:String,
        Quantity:String,
        Price:String,
    }],
    ShopStatus:{
        type:Boolean,
    },
})

const collectionData = new mongoose.model('RetailerShopDatas',retailerSchema);

module.exports = collectionData


