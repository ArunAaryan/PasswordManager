const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
	let = { username, email, password } = req.body;
	if (!username || !email || !password) {
		return res.status($22).json({ error: "complete all the fields" });
	}
	try {
		const userExist = await User.findOne({ email: email });
		if (userExist) {
			return res.status(422).json({ error: "email already exits" });
		}
		const user = new User({ username, email, password });
		await user.save();
		res.status(202).json({ message: "user register successfully" });
	} catch (err) {
		console.log(err);
	}
});

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    //console.log(req)
    if (!email || !password) {
      return res.status(400).json({ error: "invaild email and password" });
    }
    const userlogin = await User.findOne({ email });
    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      //genarate jsonwebtoken

      token = await userLogin.generateAuthToken();
      console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httponly: true,
      });
      if (isMatch) {
        res.json({ err: "invalid Crediential" });
      } else {
        res.json({ message: "user Signin Successfully" });
      }
      }
    } catch (err) {
      console.log(err);
  }
});


//router.post("/signup", (req, res) => {
//  // console.log(req);
//  const { username, email, password } = req.body;
//  const user = new User(req.body);
//  user
//    .save()
//    .then((data) => {
//      console.log(data);
//      res.json({ data });
//    })
//    .catch((err) => {
//      res.json(err);
//    });
//});

module.exports = router;
