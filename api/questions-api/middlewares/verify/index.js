const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyUser = async (req, res, next) => {
  try {
    const bearer = req.headers["authorization"];
    if (!bearer || !bearer.startsWith("Bearer ")) {
      res.status(401).json({ message: "You don't have access. Log in first" });
    } else {
      const token = bearer.split(" ")[1];
      const decodedData = await jwt.verify(token, process.env.SECRET);
      console.log({decodedData});
      req.info = decodedData;
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = {verifyUser}
