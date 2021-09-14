const express = require("express");
const router = express.Router();

const Record = require("../models/record.model");
const User = require("../models/user.model");

const { encrypt, decrypt } = require("../services/encryption-decryption");
router.post("/new", (req, res) => {
  let { username, email, password, url, userid, secret } = req.body;

  const string = JSON.stringify({ username: username, password: password });
  const { iv, encryptedData } = encrypt(string, secret);
  let record = new Record({
    username,
    url,
    iv,
    encryptedData,
  });
  record
    .save()
    .then(() => {
      User.findById(req.body.userid).then((user) => {
        if (user) {
          user.records.push(record);
          user.save();
          res.json({ message: "record saved" }).status(201);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/get", (req, res) => {
  User.findById(req.body.userid)
    .populate("records")
    .then((data) => {
      res.json(data["records"]);
    })
    .catch((err) => console.log(err));
});
module.exports = router;
