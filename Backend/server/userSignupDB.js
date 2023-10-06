const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    countrycode: String,
    number: String,
  },
  Address: {
    type: String,
  },
  Gender: {
    type: String,
  },
  Flag: {
    type: Boolean,
    required: true,
  },
  ProfileImage: {
    data: Buffer,
    ContentType: String,
  },
  Landmark: {
    type: String,
  },
  CartDetails:[{
    ProductId:String,
    ProductCount:String,
  }]
});

const collectionData = new mongoose.model("UserDetails", userSchema);

module.exports = collectionData;
