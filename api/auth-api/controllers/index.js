const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const { exec } = require("../helpers/db");

const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // const exists = await exec("getUser", { email });

    const id = v4();
    const hashedpassword = await bcrypt.hash(password, 8);

    await exec("insertUser", { id, username, email, password: hashedpassword });
    return res.status(201).json({ message: "sucess", error: "" });
  } catch (error) {
    return res.status(400).json({ error: "The user exists" });
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

  if (user.length <= 0) {
    return res.status(400).send({ message: "Incorrect credentials!" });
  }

  const correct = await bcrypt.compare(password, user[0].password);

  if (!correct)
    return res.status(400).send({ message: "Incorrect credentials!" });

  let token = await jwt.sign(
    { id: user[0].id, email: user[0].email },
    process.env.SECRET,
    {
      expiresIn: "24h",
    }
  );

  const { password: p, ...rest } = user[0];

  res.status(200).json({ token, user: rest });
};

const getLoggedInUser = async (req, res) => {
  try {
    const { id } = req.info;
    const user = await exec("getUserById", { id });

    if (user.length <= 0) {
      return res.status(400).send({ message: "Invalid email provided" });
    }

    let token = await jwt.sign({ id: user[0].id }, process.env.SECRET, {
      expiresIn: "10000s",
    });

    const { password: p, ...rest } = user[0];

    res.status(200).json({ token, user: rest });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "An Error occurred. Please try again later" });
  }
};

module.exports = {
  signupUser,
  loginUser,
  updateUser,
  getLoggedInUser,
};
