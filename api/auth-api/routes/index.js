const express = require("express");
const routes = express.Router();

const { loginUser, signupUser, updateUser } = require("../controllers");

routes.post("/login",loginUser);
routes.post("/signup", signupUser)
routes.post("/update", updateUser)
module.exports = routes;
