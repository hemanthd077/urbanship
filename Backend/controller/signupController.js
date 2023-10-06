const userSignupData = require("../server/userSignupDB");
const bcrypt = require("bcrypt");
const fs = require("fs");

const Signup = async (req, res) => {
  await userSignupData
    .aggregate([
      {
        $match: {
          Email: req.body.userData.email,
        },
      },
    ])
    .then(async (result) => {
      if (result.length === 0) {
        const hashedpassword = await bcrypt.hash(
          req.body.userData.password,
          10
        );
        let Password = hashedpassword.toString();
        const NewData = new userSignupData({
          FirstName: req.body.userData.fname,
          LastName: req.body.userData.lname,
          Email: req.body.userData.email,
          Password: Password,
          Flag: false,
          Landmark:"",
          ProfileImage: {
            data: fs.readFileSync("public/images/kfc-restaurant.jpg"),
            ContentType: "image/png",
          },
          CartDetails:[],
        });
        await NewData.save()
          .then((data) => {
            if (data) {
              console.log("Successfully User Account Created");
              res
                .status(200)
                .json({ message: "User Account Created Successfully" });
            } else {
              console.log("Failed to Create User Account");
              res.status(401).json({ message: "User Account Creation Failed" });
            }
          })
          .catch((e) => {
            console.log(e);
            res.status(401).json({ message: "User Account Creation Failed" });
          });
      } else {
        res.status(200).json({ message: "User Already Exist in this Email" });
      }
    });
};

module.exports = {
  Signup,
};
