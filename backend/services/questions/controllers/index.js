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
  const { id } = req.params;

  let question = await exec("getOneQuestion", { id });
  const answers = await exec("getQuestionAnswers", { id });

  const anc = await Promise.all(
    answers.map(async (answer) => {
      let id = answer.id;
      let comments = await exec("getAnswerComments", { id });
      let data = { ...answer, comments };
      return data;
    })
  );

  res.status(200).json({ question: anc });
};

const postQuestion = async (req, res) => {
  const question = req.body;
  console.log(question);
  await exec("insertOrUpdateQuestion", question);
  res.status(201).json({ message: "You have succesfully added the question" });
};

const updateQuestion = async (req, res) => {
  /**update  */
};
const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  await exec("deleteQuestion", { id });
  res
    .status(200)
    .json({ message: "You have succesfully deleted the question" });
};

// const  getAnswer = async (req, res)=>{
//   const {id} = req.params
//   const answer = await exec("getQuestionAnswer", {id})
//   res.status(200).json({answer})

// }
module.exports = {
  getAllQuestions,
  getUserQuestions,
  getQuestion,
  postQuestion,
  deleteQuestion,
};
