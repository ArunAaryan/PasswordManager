const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;
const bcrypt = require('bcrypt');
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
  console.log("hi from inside");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 1);
  }
  next();
})
//we are generating token
userSchema.method.generateAuthToken = async function (){ try{
  let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
  this.token = this.tokens.concat({ token: token });
  await this.save();
  return token;
}catch (err) {
  console.log(err);
}
}

//Export the model
module.exports = Model("User", userSchema);
