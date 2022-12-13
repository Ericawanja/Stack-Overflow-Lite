require('dotenv').config()
const express = require("express");
const cors = require('cors')
const userRoutes = require("./routes");

const app = express();
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("running");
});

app.use('/user', userRoutes)

const PORT = process.env.PORT || 5001;
app.listen(
  PORT, 
  () => console.log(`App running on port ${PORT}`)
);
