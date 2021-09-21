const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const validateJwtCookie = require("./auth/cookie.validator");
app.use(express.json());
app.use(cookieParser());
const db = require("./config/mongodb");
// routes import
// const auth = require("./controllers/auth");
// ...
const records = require("./controllers/records");
const auth = require("./controllers/routes.auth");
// declare routes
// example url = "localhost:3000/auth/signup"
app.use("/auth", auth);
app.use("/records", records);
app.listen(3000, () => {
  console.log("listening on 3000");
});
