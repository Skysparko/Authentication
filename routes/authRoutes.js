const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const createDB = require("../config/db");
const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validators");

const User = require("../models/userModels");
const { where } = require("sequelize");

createDB.sync().then(() => {
  console.log("DB is running");
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({
      where: {
        email,
      },
    });
    if (userExist) {
      return res.status(403).send("user exists");
    }

    if (!validateName(name)) {
      return res.status(400).send("invalid name");
    }
    if (!validateEmail(email)) {
      return res.status(400).send("invalid email");
    }
    if (!validatePassword(password)) {
      return res.status(400).send("invalid password");
    }

    const Epassword = await bcrypt.hash(password, 10);

    const saveToDB = {
      name,
      email,
      password: Epassword,
    };

    const createdUser = await User.create(saveToDB);

    return res.status(201).send(createdUser);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    let userExist = await User.findOne({
      where: {
        email,
      },
    });

    if (!userExist) {
      return res.status(403).send("bro create a account first");
    }

    console.log(userExist.password);

    let pwdMatch = await bcrypt.compare(password, userExist.password);

    if (!pwdMatch) {
      return res.status(400).send("at least enter right pass bro");
    }

    return res.status(200).send("sucess");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
