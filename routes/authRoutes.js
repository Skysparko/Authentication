const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validators");
const users = {};

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    const userExist = users.hasOwnProperty(email);

    if (userExist) {
      res.send("user exists");
    }

    if (!validateName(name)) {
      res.send("invalid name");
    }
    if (!validateEmail(email)) {
      res.send("invalid email");
    }
    if (!validatePassword(password)) {
      res.send("invalid password");
    }

    const Epassword = await bcrypt.hash(password, 10);
    console.log(Epassword);

    users[email] = { name, password: Epassword };
    res.send("sucsess");
  } catch (e) {
    res.send(e);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = users.hasOwnProperty(email);

    if (!userExist) {
      res.send("bro create a account first");
    }
    const pwdMatch = await bcrypt.compare(password, users[email].password);

    if (!pwdMatch) {
      res.send("at least enter right pass bro");
    } else {
      res.send("sucess");
    }
  } catch (error) {
    res.send("error");
  }
});

module.exports = router;
