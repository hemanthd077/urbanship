const retailShopData = require('../../server/RetailerShopDB');
const Login = require('./loginController')


const retailAccData = Login.AccountData();

const retaildata = (async(req,res)=>{
    await retailShopData.findOne({Email:retailAccData[0]}).then((result)=>{
        let retailAccountData = [];
        retailAccountData[0] = result.ShopStatus;
        retailAccountData[1] = result.Location;
        retailAccountData[2] = result.ShopName;
        res.status(200).json({retailAccountData});
    }).catch((e)=>{
        console.log("Error Occured while fetching retailAccountdata in retaildata ",e);
    })
})

const updateShopStatus = (async(req,res)=>{
    const updateResult = await retailShopData.updateOne(
        { Email: retailAccData[0] },
        { $set: { ShopStatus: req.body.state} }
      );
      if (updateResult.modifiedCount === 1) {
        console.log(`Updated status Successfull in updateShopStatus`);
      } else {
        console.log(`Update Status Failed in updateShopStatus`);
      }
})

module.exports={
    retaildata,
    updateShopStatus,
}