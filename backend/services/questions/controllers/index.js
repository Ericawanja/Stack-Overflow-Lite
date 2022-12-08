const mssql = require("mssql");
const sqlConfig = require("../Config");
const { exec } = require("../databaseHelpers/db_connect");

const getAllQuestions = async (req, res) => {
  const pool = await mssql.connect(sqlConfig);
  const response = await pool.request().execute("getAllQuestions");
  const questions = await response.recordset;
  console.log(questions);
  res.status(200).json({ questions });
};

const getUserQuestions = async (req, res) => {

    let data = {user_id:'ghyd'}
    const question = await exec("getUserQuestions", data)
    console.log(question);
    res.status(200).json({question})

};

const getQuestion = (req, res) => {};
const postQuestion = (req, res) => {};

const updateQuestion = (req, res) => {};
const deleteQuestion = (req, res) => {};
module.exports = {
  getAllQuestions,
  getUserQuestions,
  getQuestion,
  postQuestion,
  updateQuestion,
  deleteQuestion,
};
