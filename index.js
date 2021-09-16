const express = require("express");
const passport = require("passport");
const app = express();
app.use(express.json());
require("./auth/auth");
const db = require("./config/mongodb");
// routes import
// const auth = require("./controllers/auth");
// ...
const auth = require("./controllers/routes.auth");
const records = require("./controllers/records");
// declare routes
// example url = "localhost:3000/auth/signup"
app.use("/auth", auth);
app.use("/records", passport.authenticate("jwt", { session: false }), records);
app.listen(3000, () => {
  console.log("listening on 3000");
});
