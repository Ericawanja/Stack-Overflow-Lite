const express = require("express");
const routes = express.Router();

const { loginUser, signupUser, updateUser } = require("../controllers");
const validateLogin = require("../middleware/loginValidation");
const validateSignup = require("../middleware/signup");

routes.post("/login",validateLogin, loginUser);
routes.post("/signup", validateSignup,signupUser)
routes.post("/update", validateSignup, updateUser)
module.exports = routes;
