const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
const createDynamicSchema = (schema_name) => {
  var userSchema = new mongoose.Schema({
    url: {
      type: String,
      index: true,
    },
    username: {
      type: String,
      unique: true,
    },
    iv: {
      type: String,
    },
    encryptedData: {
      type: String,
      // required:true,
    },
  });

  return mongoose.model(schema_name, userSchema);
};
//Export the model
module.exports = createDynamicSchema;
