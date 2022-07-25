const mongoose = require("mongoose");

const user = new mongoose.Schema({
  userId:{type:Number},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String},
  isDeleted: { type: Boolean },
  role:{type:String, default:"User"}
});

module.exports = mongoose.model("user", user);
