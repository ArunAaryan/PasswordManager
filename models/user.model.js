const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
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

//Export the model
module.exports = mongoose.model("User", userSchema);
