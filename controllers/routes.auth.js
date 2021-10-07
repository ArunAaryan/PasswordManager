const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { signup, signin } = require("../auth/joi.validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validateJwtCookie } = require("../auth/cookie.validator");
const oneDayToSeconds = 10 * 60 * 1000;
router.post("/signup", async (req, res) => {
  try {
    const { error, value } = await signup.validate(req.body);
    console.log(value);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const isUser = await User.findOne({ email: value.email });
    if (isUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const { username, password, email } = value;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
    });
    res.json(user).status(200);
  } catch (error) {
    res.status(400).json({ error: "Some Error Occured" });
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error, value } = await signin.validate(req.body);
    console.log(value);
    if (error) {
      return res.status(401).json({ error: error.details[0].message });
    }
    const user = await User.findOne({ email: value.email });
    if (!user) {
      res.status(401).json({ error: "user doesn't exist" });
    }
    const status = await bcrypt.compare(value.password, user.password);
    console.log(user.password, value.password);
    if (!status) {
      res.status(401).json({ error: "Wrong Password" });
    } else {
      const token = await jwt.sign(
        {
          id: user._id,
          email: user.email,
          username: user.username,
          secret: req.body.password,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "10d",
        }
      );

      //alligator.io/nodejs/express-cookies/
      res.cookie("authtoken", token, {
        maxAge: oneDayToSeconds,
        // You can't access these tokens in the client's javascript
        httpOnly: true,
      });
      res.json({ message: "logged in " });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Some Error Occured" });
  }
});
router.get("/refresh_token", validateJwtCookie, (req, res) => {
  res.cookie("authtoken", token, {
    maxAge: oneDayToSeconds,
    // You can't access these tokens in the client's javascript
    httpOnly: true,
  });
});
router.get("/check_auth", validateJwtCookie, (req, res) => {
  res.status(200).json({ message: "Authorized" });
});
router.get("/logout", (req, res) => {
  res.clearCookie("authtoken");
  res.json({ message: "logged out..." });
});

module.exports = router;
