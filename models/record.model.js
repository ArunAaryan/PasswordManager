const mongoose = require("mongoose"); // Erase if already required
const User = require("./user.model");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  url: {
    type: String,
    required: true,
  },
  iv: {
    type: String,
  },
  encryptedData: {
    type: String,
    // required:true,
  },
});

//Export the model
module.exports = mongoose.model("Record", userSchema);
