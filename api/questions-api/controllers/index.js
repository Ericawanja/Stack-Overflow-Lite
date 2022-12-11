const { exec } = require("../helpers/db_connect");
const { v4: uuidv4 } = require("uuid");

const getAllQuestions = async (req, res) => {
  try {
    const questions = await exec("getAllQuestions");
    if (questions.length > 1) {
      return res.status(200).json({ questions });
    } else {
      return res
        .status(200)
        .json({ message: "There are no questions found", questions });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getUserQuestions = async (req, res) => {
  let { user_id } = req.params;
  console.log(req.info);
  try {
    const questions = await exec("getAllQuestions", { user_id });
    if (questions.length > 0) {
      res.status(200).json({ questions });
    } else {
      res
        .status(200)
        .json({ message: "You haven't created any questions yet" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getQuestion = async (req, res) => {
  const { id } = req.params;

  let question = await exec("getOneQuestion", { id });
  if (question.length === 0) {
    return res
      .status(400)
      .json({ message: "The question does not exist. Check the question id" });
  }
  const answers = await exec("getQuestionAnswers", { id });

  const anc = await Promise.all(
    answers.map(async (answer) => {
      let id = answer.id;
      let comments = await exec("getAnswerComments", { id });
      let data = { ...answer, comments };
      return data;
    })
  );

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
  let { id } = req.params;

 
  try {
    let question = await exec("getOneQuestion", { id });
    
    if (question.length >= 1){
      let { id } = req.params;
      const question = req.body;
   
      await exec("insertOrUpdateQuestion", { id, ...question });
      return res
        .status(200)
        .json({ message: "You have successfully updated the question" });
    }
    else  {
      return res
        .status(400)
        .json({
          message: "The question does not exist. Check the question id",
        });
    } 
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    await exec("deleteQuestion", { id });
    res
      .status(200)
      .json({ message: "You have succesfully deleted the question" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/*******************************ANSWER ENDPOINTS***************************** ********* */

//POST ANSWERS

const postAnswer = async (req, res) => {
  const { user_id, question_id, answer } = req.body;
  const id = uuidv4();
  try {
    console.log(req.body);
    await exec("insertAnswer", { id, user_id, question_id, answer });
    res.status(200).json({ message: "Thank for adding a answer" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// set answer as preferred
const setPrefferedAnswer = async (req, res) => {
  const { id } = req.body;

  try {
    await exec("updatePreferredAnswer", { id });
    res
      .status(200)
      .json({ message: "You have set this answer as preferred answer" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const undoPrefferedAnswer = async (req, res) => {
  const { id } = req.body;

  try {
    await exec("undoPreferredAnswer", { id });
    res
      .status(200)
      .json({ message: "This answer is no longer the preffered answer" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteAnswer = async (req, res) => {
  const { id } = req.paams;
  try {
    await exec("deleteAnswer", { id });
    res
      .status(200)
      .json({ message: "You have successfully deleted the answer" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const addComment = async (req, res) => {
  const { user_id, answer_id, comment } = req.body;
  const id = uuidv4();

  try {
    await exec("insertComment", { id, user_id, answer_id, comment });
    res.status(200).json({ message: "You have added a comment" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    await exec("deleteComment", { id });
    res
      .status(200)
      .json({ message: "You have succesfully deleted the comment" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const upvote = async (req, res) => {
  const { answer_id } = req.params;
};
const downVote = async (req, res) => {};
module.exports = {
  getAllQuestions,
  getUserQuestions,
  getQuestion,
  postQuestion,
  updateQuestion,
  deleteQuestion,

  postAnswer,
  setPrefferedAnswer,
  undoPrefferedAnswer,
  deleteAnswer,

  addComment,
  deleteComment,
};
