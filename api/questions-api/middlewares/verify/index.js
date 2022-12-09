const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    if (!token) {
      res.status(401).json({ message: "You don't have access. Log in first" });
    } else {
      const decodedData = await jwt.verift(token, process.env.SECRET);
      req.info = decodedData;
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = {verifyUser}
