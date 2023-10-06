const userSignupData = require("../server/userSignupDB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let detailsArray = [];

require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

const login = async (req, res) => {
  await userSignupData
    .findOne({ Email: req.body.userData.email })
    .then(async (result) => {
      if (result && result.Flag === false) {
        const validpassword = await bcrypt.compare(
          req.body.userData.password,
          result.Password
        );
        if (!validpassword) {
          res
            .status(401)
            .json({ message: "Password Not Match, Wrong Password!!" });
        } else {
          detailsArray[0] = result.FirstName.toUpperCase();
          detailsArray[1] = result.LastName.toUpperCase();
          detailsArray[2] = result.Email;
          res.status(200).json({ message: "Login successful" });
        }
      } else {
        res.status(404).json({ message: "No Account Found Create Now!!" });
      }
    });
};

const googleLogin = async (req, res) => {
  userSignupData
    .findOne({ Email: req.user.userData.email })
    .then(async (data1) => {
      if (data1) {
        if (data1.flag === false) {
          res
            .status(200)
            .json({
              res: "User Account Already Exist.Try with other E mail-id",
            });
        } else {
          detailsArray[0] = data1.FirstName.toUpperCase();
          detailsArray[1] = data1.LastName.toUpperCase();
          detailsArray[2] = data1.Email;
          res
            .status(200)
            .json({
              data: data1,
              value: data1.profileimage.data.toString("base64"),
            });
        }
      } else {
        axios
          .get(req.user.picture, { responseType: "arraybuffer" })
          .then(async (response) => {
            const imageBuffer = Buffer.from(response.data, "binary");
            const hashedpassword = await bcrypt.hash(req.user.sub, 10);
            const pwd = hashedpassword.toString();
            const newdata = new userSignupData({
              FirstName: req.user.given_name,
              LastName: req.user.family_name,
              Email: req.user.email,
              Password: pwd,
              Flag: true,
              profileimage: {
                data: imageBuffer,
                ContentType: "image/png",
              },
            });
            await newdata
              .save()
              .then(() => {
                console.log("google login account created");
              })
              .catch((err) => console.log(err));
            validation
              .findOne({ Email: req.user.email })
              .then(async (user) => {
                detailsArray[0] = user.fname.toUpperCase();
                detailsArray[1] = user.lname.toUpperCase();
                detailsArray[2] = user.Email;
                res.render("home", {
                  content: true,
                  data: user,
                  value: user.profileimage.data.toString("base64"),
                });
              })
              .catch((err) => console.log("error in finding"));
          });
      }
    });
};

function UserAccount() {
  return detailsArray;
}

module.exports = {
  login,
  googleLogin,
  UserAccount,
};
