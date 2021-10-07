const express = require("express");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.1.103:5000",
      "http://192.168.1.103:3000",
    ],
    credentials: true,
  })
);
// app.use(cors({ origin: "http://192.168.1.103:3000", credentials: true }));
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
app.listen(5000, () => {
  console.log("listening on 5000");
});
