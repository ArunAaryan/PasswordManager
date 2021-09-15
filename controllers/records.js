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

router.post("/getallcredentials", (req, res) => {
  User.findById(req.body.userid)
    .populate("records")
    .then((data) => {
      res.json(data["records"]);
    })
    .catch((err) => console.log(err));
});

router.post("/decryptcredentials", (req, res) => {
  const { userid, recordId, secret } = req.body;
  User.findById(userid)
    .populate({ path: "records", match: { _id: recordId } })
    .then((data) => {
      if (data._id == userid) {
        const { _id, encryptedData, url, iv } = data.records[0];

        const { username, password } = JSON.parse(
          decrypt(encryptedData, iv, secret)
        );
        res.status(200).send({ _id, username, password, url, userid });
      } else {
        res.status(401).send({ message: "UnAuthorized!" });
      }
      // console.log(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
module.exports = router;
