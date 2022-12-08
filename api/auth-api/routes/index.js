const express = require("express");
const routes = express.Router();

const { loginUser, signupUser } = require("../controllers");

routes.get("/login",loginUser);
routes.post("/signup", signupUser)
module.exports = routes;
