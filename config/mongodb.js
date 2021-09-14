const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
let options = {
  useUnifiedTopology: true,
};
mongoose
  .connect(process.env.db, options)
  .then(() => {
    console.log("connected to mongoose");
  })
  .catch((err) => {
    console.log(err);
    console.log("error in connecting to db");
  });
