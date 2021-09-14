const express = require("express");
const router = express.Router();
const User = require("../Models/User");
router.get("/signup", (req, res) => {
  let signup_data = {};
  res.json({ message: "signup" });
});

module.exports = router;
