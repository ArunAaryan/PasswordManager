const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
router.post("/signup", (req, res) => {
  // console.log(req);
  const { name, email, password } = req.body;

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
