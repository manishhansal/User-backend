const userModel = require("../Models/user");
const JWTService = require("../CommonLib/JWTtoken");
const encryptDecrypt = require("../CommonLib/encryption-decryption");

async function signIn(req, res, next) {
  //Validate email and password
  const userDetail = await userModel.findOne({ email: req.body.email });
  console.log(userDetail, req.body.password);

  if (userDetail.role === "Admin") {
    const isValidPassword = encryptDecrypt.decryptPassword(
      req.body.password,
      userDetail.password
    );
    if (isValidPassword) {
      let userData = {
        email: req.body.email,
        firstName: userDetail.firstName,
        lastName: userDetail.lastName,
        role: "ADMIN",
      };

      //Generate JWT token and send back to frontend
      let JWTtoken = JWTService.generateToken(userData);
      res.json({
        status: "success",
        token: JWTtoken,
      });
    } else {
      res.json({ message: "password is not valid" });
    }
  } else {
    res.json({ message: "User is not valid" });
  }
}

async function signUp(req, res, next) {
  let userDetail = req.body;
  let data = userModel.find();

  const encryptPassword = encryptDecrypt.encryptPassword(userDetail.password);
  console.log(encryptPassword);
  userDetail.password = encryptPassword;
  userDetail.userId = +data.length + 1;
  console.log(userDetail);
  const response = await userModel.insertMany([userDetail]);
  res.json(response);
}

async function getAllUsers(req, res, next) {
  try {
    let response = await userModel.find({});
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function createUser(req, res, next) {
  //fetch info from request body
  try {
    let userDetail = req.body;
    
    let data = await userModel.find();
    
    const encryptPassword = encryptDecrypt.encryptPassword(userDetail.password);
    
    userDetail.password = encryptPassword;
    userDetail.userId = +(data.length + 1);
    
    console.log(userDetail);
    
    let response = await userModel.insertMany([userDetail]);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
}

async function deleteUser(req, res, next) {
  let userId = req.params.userId;
  let response = await userModel.deleteOne({ _id: userId });
  res.json(response);
}

async function updateUser(req, res, next) {
  let userId = req.params.userId;
  let body = req.body;
  let response = await userModel.updateOne({ _id: userId }, { $set: body });
  res.json(response);
}

module.exports = {
  signIn,
  signUp,
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
};
