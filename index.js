const express = require("express");
const app = express();
app.use(express.json());

const db = require("./config/mongodb");
// routes import
const auth = require("./controllers/auth");
const records = require("./controllers/records");
// declare routes
// example url = "localhost:3000/auth/signup"
app.use("/auth", auth);
app.use("/records", records);
app.listen(3000, () => {
  console.log("listening on 3000");
});
