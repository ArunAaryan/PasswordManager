const express = require("express");
const app = express();

// routes import
const auth = require("./Authenticate/auth");

// declare routes
// example url = "localhost:3000/auth/signup"
app.use("/auth", auth);
app.listen(3000, () => {
  console.log("listening on 3000");
});
