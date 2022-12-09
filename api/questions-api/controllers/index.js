const { exec } = require("../databaseHelpers/db_connect");
const { v4: uuidv4 } = require("uuid");

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

  console.log(question);

  const data = { ...question[0], answers: anc };

  res.status(200).json({ question: data });
};

const postQuestion = async (req, res) => {
  const question = req.body;
  const question_id = uuidv4();

  await exec("insertOrUpdateQuestion", { ...question, id: question_id });
  res.status(201).json({ message: "You have succesfully added the question" });
};

const updateQuestion = async (req, res) => {
  const question = req.body;

  await exec("insertOrUpdateQuestion", question);
  res
    .status(200)
    .json({ message: "You have successfully updted the question" });
};
const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  await exec("deleteQuestion", { id });
  res
    .status(200)
    .json({ message: "You have succesfully deleted the question" });
};


/*******************************ANSWER ENDPOINTS***************************** ********* */
module.exports = {
  getAllQuestions,
  getUserQuestions,
  getQuestion,
  postQuestion,
  updateQuestion,
  deleteQuestion,
};
