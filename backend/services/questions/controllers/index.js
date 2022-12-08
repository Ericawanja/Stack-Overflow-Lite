const { exec } = require("../databaseHelpers/db_connect");

const getAllQuestions = async (req, res) => {
  const questions = await exec("getAllQuestions");
  res.status(200).json({ questions });
};

const getUserQuestions = async (req, res) => {
  let { user_id } = req.params;  
  const questions = await exec("getAllQuestions", { user_id });
  res.status(200).json({ questions });
};

const getQuestion = async (req, res) => {
  const {id} = req.params
  
  const question = await exec("getOneQuestion", {id})
  res.status(200).json({ question });



};
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
