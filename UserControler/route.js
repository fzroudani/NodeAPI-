const express = require("express");
const { getUsers, register, login } = require("./Auth");
const router = express.Router();
router.route("/users").get(getUsers);
router.route("/register").post(register);
router.route("/login").post(login);
module.exports = router;
