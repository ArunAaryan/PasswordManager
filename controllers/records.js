const express = require("express");
const { Model } = require("mongoose");
const router = express.Router();

const Record = require("../models/record.model");
const User = require("../models/user.model");

const { encrypt, decrypt } = require("../services/encryption-decryption");
const { re_encrypt } = require("../services/re_encrypt");
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
    .then((data) => {
      User.findById(req.body.userid).then((user) => {
        if (user) {
          // user.records.push(record);
          user.records.push(data);
          user.save();
          res.json({ message: "record saved", id: data._id }).status(201);
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
  // run a query to see the docs created by the user
  User.findById(userid)
    .populate({ path: "records", match: { _id: recordId } })
    .then((data) => {
      if (data._id == userid) {
        // populate and find the record with match since it return an array use records[0]
        const { _id, encryptedData, url, iv } = data.records[0];
        // decrypt returns a string. JSON.parse() to convert into js object
        const { username, password } = JSON.parse(
          decrypt(encryptedData, iv, secret)
        );
        res.status(200).send({ _id, username, password, url, userid });
      } else {
        res.status(401).send({ message: "UnAuthorized!" });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post("/re-encrypt", (req, res) => {
  const { userid, oldSecret, newSecret } = req.body;
  // find all the records of user
  User.findById(userid)
    .populate("records")
    .then((data) => {
      // send data.records <user records> to re_encrypt()
      //  which will created an array of updated docs with new encryption
      let bulkOps = re_encrypt(data.records, oldSecret, newSecret);
      Record.collection.bulkWrite(bulkOps).then((results) => {
        res.json(results);
      });
    })
    .catch((err) => console.log(err));
});
module.exports = router;
