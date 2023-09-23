const retailShopData = require('../../server/RetailerShopDB');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

let retailAccountData = []

const retailLogin = (async(req,res)=>{
    await retailShopData.findOne({Email:req.body.retailData.email}).then(async(result)=>{
        if(result){
            const validpassword = await bcrypt.compare(req.body.retailData.password,result.Password)
            if(!validpassword){
                res.status(401).json({message:"Password Not Match, Wrong Password!!"})
            }
            else{
                retailAccountData[0] = result.Email;
                res.status(200).json({ message: 'Login successful' });
            }
        } 
        else{
            res.status(404).json({message:"No Account Found Create Now!!"})
        }
      })
})

function AccountData(){
    return retailAccountData;
}

module.exports={
    AccountData,
    retailLogin,
}