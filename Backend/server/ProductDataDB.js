const mongoose = require('mongoose');

const productdatadb = new mongoose.Schema({
    ProductId:{
        type:String,
    },
    Email:{
        type: String,
        required:true,
    },
    Visibility:{
        type:Boolean,
    },
    ProductImages:{
        data:Buffer,
        ContentType:String,
    },
    ProductName:{
        type:String,
    },
    ProductCategory:{
        type:String,
    },
    netWeight:{
        type:String,
    },
    Standards:{
        type:String,
    },
    Quanity:{
        type:String,
    },
    Price:{
        type:String,
    },
})
 
const collectionData = new mongoose.model('productdatadb',productdatadb);

module.exports = collectionData


