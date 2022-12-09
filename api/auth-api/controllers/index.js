require("dotenv").config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const { exec } = require("../helpers/db");

const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const exists = await exec("getUser", { email });
    console.log(exists);

    const id = v4();
    const hashedpassword = await bcrypt.hash(password, 8);
    const data = { id, username, email, password: hashedpassword };
    await exec("insertUser", data);
    return res.status(201).json({ message: "sucess", error: "" });
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.message, message: "The user exists" });
  }
};

const updateUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedpassword = await bcrypt.hash(password, 8);
  try {
    await exec("updateUser", { username, email, password: hashedpassword });
    return res
      .status(200)
      .json({ message: "User Updated Succesfully", error: "" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await exec("getUser", { email });
  const correct = await bcrypt.compare(password, user[0].password);
  if (correct) {
  
    let {user_id, email, username} = user[0]
    let payload= {user_id, email, username}
    let token = await jwt.sign(payload, process.env.SECRET, {expiresIn:'120s'})
    res.status(200).json({ token});

  }else{
    res.status(404).json({message:"The password is not correct"});
  }
};

module.exports = {
  signupUser,
  loginUser,
  updateUser,
};
