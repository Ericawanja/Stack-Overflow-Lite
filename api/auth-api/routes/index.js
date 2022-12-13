const express = require("express");
const router = express.Router();

const { loginUser, signupUser, updateUser } = require("../controllers");
const validator = require("../middleware/validator");
const { loginSchema, registerSchema } = require("../schemas");

router.post("/login", validator(loginSchema, "body"), loginUser);
router.post("/signup", validator(registerSchema, "body"), signupUser);
router.post("/update", validator(registerSchema, "body"), updateUser);
module.exports = router;
