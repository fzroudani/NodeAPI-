const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.getUsers = async (req, res) => {
  await User.find({}).then((users) => {
    res.status(200).json({ message: "ok", users: users });
  });
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(404).json({ message: "email does not exist", data: email });
  } else {
    bcrypt.compare(password, user.password).then((isValid) => {
      if (isValid) {
        res.status(200).json({ message: "password valid", data: user });
      } else {
        res.status(400).json({ message: "password not valid", data: user });
      }
    });
  }
};
exports.register = async (req, res) => {
  if (!req.body.email || !req.body.name || !req.body.password) {
    res.status(401).json({ message: "a part is messing" });
  } else {
    if (req.body.length < 8) {
      res.status(401).json({ message: "password less then 8 char" });
    } else {
      await bcrypt.hash(req.body.password, 10).then(async (hash) => {
        const user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        }).catch((err) => {
          console.log(err);
          res
            .status(400)
            .json({ message: "error in creation", body: req.body });
        });
        res.status(200).json({ message: "ok", user: user });
      });
    }
  }
};
