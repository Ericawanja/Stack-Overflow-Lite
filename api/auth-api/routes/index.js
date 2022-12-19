const express = require("express");
const router = express.Router();

const { loginUser, signupUser, updateUser, getLoggedInUser } = require("../controllers");
const Auth = require("../middleware/auth");
const validator = require("../middleware/validator");
const { loginSchema, registerSchema } = require("../schemas");

router.post("/me", Auth,  getLoggedInUser);
router.post("/login", validator(loginSchema, "body"), loginUser);
router.post("/signup", validator(registerSchema, "body"), signupUser);
router.post("/update", validator(registerSchema, "body"), updateUser);
module.exports = router;
