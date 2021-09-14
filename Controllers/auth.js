const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
router.post("/signup", (req, res) => {
  // console.log(req);
  const { username, email, password } = req.body;
  const user = new User(req.body);
  user
    .save()
    .then((data) => {
      console.log(data);
      res.json({ data });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
