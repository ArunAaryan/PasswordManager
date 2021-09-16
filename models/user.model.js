const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Declare the Schema of the Mongo model
var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  records: [{ type: mongoose.Schema.Types.ObjectId, ref: "Record" }],
});

userSchema.pre("save", async function (next) {
  const user = this;
  console.log("this", this);
  // console.log("password", user.password);
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

userSchema.methods.checkPassword = async function (password) {
  const user = this;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
};

//Export the model
module.exports = Model("User", userSchema);
