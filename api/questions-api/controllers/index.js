const { exec } = require("../helpers/db_connect");
const { v4: uuidv4 } = require("uuid");
const { user } = require("../Config");

const getAllQuestions = async (req, res) => {
  try {
    const questions = await exec("getAllQuestions");
    if (questions.length !== 0) {
      return res.status(200).json({ questions });
    } else {
      return res
        .status(404)
        .json({ message: "There are no questions found", questions });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserQuestions = async (req, res) => {
  let { user_id } = req.params;
  let user = req.info
  try {
    const questions = await exec("getAllQuestions", { user_id : user.id });
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
      .status(404)
      .json({ message: "The question does not exist. Check the question id" });
  }
  const answers = await exec("getQuestionAnswers", { id });

  const anc = await Promise.all(
    answers.map(async (answer) => {
      let id = answer.id;
      let comments = await exec("getAnswerComments", { id });
      let downvotes = await exec("getAnswerDownvotes", { answer_id: id });
      let downvotes_value = downvotes.length > 0 ? downvotes[0].downvotes : 0;
      let upvotes = await exec("getAnswerUpvotes", { answer_id: id });

      let upvotes_value = upvotes.length > 0 ? upvotes[0].upvotes : 0;

      let data = {
        ...answer,
        downvotes: downvotes_value,
        upvotes: upvotes_value,
        comments,
      };
      return data;
    })
  );

  const data = { ...question[0], answers: anc };

  res.status(200).json({ question: data });
};

const postQuestion = async (req, res) => {
  
  const question = req.body;
  const question_id = uuidv4();
  const { id } = req.info;

  await exec("insertOrUpdateQuestion", {
    ...question,
    id: question_id,
    user_id: id,
  });
  res.status(201).json({ message: `The question added successfully. Thank you` });
};

const updateQuestion = async (req, res) => {
  let { id } = req.params;

  try {
    let questionDb = await exec("getOneQuestion", { id });

    if (questionDb.length >= 1) {
      const user = req.info;
      if (questionDb[0].user_id !== user.id) {
        return res.status(401).json({
          message: "You cannot edit this question",
        });
      }
      let { id } = req.params;
      const question = req.body;

      await exec("insertOrUpdateQuestion", {
        id,
        ...question,
        user_id: user.id,
      });
      return res
        .status(200)
        .json({ message: "You have successfully updated the question" });
    } else {
      return res.status(400).json({
        message: "The question does not exist. Check the question id",
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  let question = await exec("getOneQuestion", { id });
  if (question.length >= 1) {
    const user = req.info;
    if (question[0].user_id !== user.id) {
      return res.status(401).json({
        message: "You cannot delete this question",
      });
    }
    try {
      await exec("deleteQuestion", { id });
      res
        .status(200)
        .json({ message: "You have succesfully deleted the question" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(400).json({
      message: "The question does not exist. Check the question id",
    });
  }
};

/*******************************ANSWER ENDPOINTS***************************** ********* */

//POST ANSWERS

const postAnswer = async (req, res) => {
  const { question_id, answer } = req.body;
  const { id } = req.info;
  const ans_id = uuidv4();
  try {
    let question = await exec("getOneQuestion", { id: question_id });
    if (question.length > 0) {
      await exec("insertAnswer", {
        id: ans_id,
        user_id: id,
        question_id,
        answer,
      });
      return res.status(200).json({ message: "Thank for adding a answer" });
    } else {
      return res.status(400).json({
        message:
          "You cannot add answer to a question that does not exist.Check the question id",
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// set answer as preferred
const setPrefferedAnswer = async (req, res) => {
  const { id } = req.body;
  const ans = await exec("getAnswer", { id });
  if (ans.length > 0) {
    const user = req.info;
    let questionDb = await exec("getOneQuestion", { id: ans[0].question_id });

    if (questionDb.length === 0 ) {
      return res.status(401).json({
        message:
          "Invalid operation",
      });
    }
      if (questionDb[0].user_id !== user.id) {
        return res.status(401).json({
          message:
            "You cannot set this answer as preferred since you are not the author",
        });
    }
    try {
      await exec("updatePreferredAnswer", { id });
      res
        .status(200)
        .json({ message: "You have set this answer as preferred answer" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: "The entered id is incorect" });
  }
};

const undoPrefferedAnswer = async (req, res) => {
  const { id } = req.body;
  const ans = await exec("getAnswer", { id });
  if (ans.length > 0) {
    const user = req.info;
    let questionDb = await exec("getOneQuestion", { id: ans[0].question_id });

    if (questionDb[0].user_id !== user.id) {
      return res.status(401).json({
        message:
          "You cannot unprefer this answer since you are not the question author",
      });
    }
    try {
      await exec("undoPreferredAnswer", { id });
      res
        .status(200)
        .json({ message: "This answer is no longer the preffered answer" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: "The entered id is incorect" });
  }
};

const deleteAnswer = async (req, res) => {
  const { id } = req.params;
  const ans = await exec("getAnswer", { id });
  if (ans.length > 0) {
    const user = req.info;
    if (ans[0].user_id !== user.id) {
      return res.status(401).json({
        message: "You cannot delete this answer",
      });
    }
    try {
      await exec("deleteAnswer", { id });
      res
        .status(200)
        .json({ message: "You have successfully deleted the answer" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: "The entered id is incorect" });
  }
};

const addComment = async (req, res) => {
  const { answer_id, comment } = req.body;
  const { id } = req.info;
  const comment_id = uuidv4();

  const ans = await exec("getAnswer", { id: answer_id });
  console.log(ans);
  if (ans.length !== 0) {
    try {
      await exec("insertComment", {
        id: comment_id,
        user_id: id,
        answer_id,
        comment,
      });
      res.status(200).json({ message: "You have added a comment" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    res
      .status(400)
      .json({ message: `The entered answer id is incorect ${ans}` });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;

  const comment = await exec("getComment", { id });
  if (comment.length > 0) {
    const user = req.info;

    if (comment[0].user_id !== user.id) {
      console.log(comment[0].user_id, user.id);
      return res.status(401).json({
        message: "You dont have permission to delete this comment",
      });
    }
    try {
      await exec("deleteComment", { id });
      res
        .status(200)
        .json({ message: "You have succesfully deleted the comment" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    res
      .status(400)
      .json({ message: "The id is incorrect or the comment does not exist" });
  }
};

const upvote = async (req, res) => {
  const { answer_id } = req.body;

  try {
    const votes = await exec("getVotes", { answer_id });
    let vote_value = votes.length > 0 ? votes[0].votes : 0;

    let new_value = +vote_value + 1;
    console.log(new_value);
    await exec("insertOrUpdateVotes", { answer_id, votes: new_value });
    res
      .status(200)
      .json({ message: "You have succesfully upvoted the answer" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const downVote = async (req, res) => {
  const { answer_id } = req.body;

  try {
    const votes = await exec("getVotes", { answer_id });

    let vote_value = votes.length > 0 ? votes[0].votes : 0;

    let new_value = +vote_value - 1;
    console.log(new_value);
    await exec("insertOrUpdateVotes", { answer_id, votes: new_value });
    res
      .status(200)
      .json({ message: "You have succesfully downvoted the answer" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getQuestionWithMostAnswers = async (req, res) => {
  try {
    let questions = await exec("getAllQuestions");
    if (questions.length > 1) {
      questions = questions.sort((x, y) => {
        return +y.answers - +x.answers;
      });
      let topQuiz = questions[0];
      return res.status(200).json(topQuiz);
    } else {
      return res
        .status(200)
        .json({ message: "There are no questions found", questions });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const search = async (req, res) => {
  const { searchTerm } = req.body;
  try {
    let questions = await exec("search", { searchTerm });

    if (questions.length !== 0) {
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

const _upvote = async (req, res) => {
  const user = req.info;
  const { answer_id } = req.body;

  try {
    let has_voted = await exec("userUpvoted", { user_id: user.id, answer_id });
    if (has_voted.length !== 0) {
      return res
        .status(400)
        .json({ message: "You have already upvoted the answer" });
    } else {
      await exec("insertOrUpdateAnswerVotes", {
        user_id: user.id,
        answer_id,
        upvote: 1,
        downvote: 0,
      });
      return res
        .status(200)
        .json({ message: "You have successfully upvoted the answer" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const _downvote = async (req, res) => {
  const user = req.info;
  const { answer_id } = req.body;
  console.log(user.id);

  try {
    let has_voted = await exec("userDownvoted", {
      user_id: user.id,
      answer_id,
    });
    if (has_voted.length !== 0) {
      return res
        .status(400)
        .json({ message: "You have already downvoted the answer" });
    } else {
      await exec("insertOrUpdateAnswerVotes", {
        user_id: user.id,
        answer_id,
        upvote: 0,
        downvote: 1,
      });
      return res
        .status(200)
        .json({ message: "You have successfully downvoted the answer" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
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

  upvote,
  downVote,

  getQuestionWithMostAnswers,
  search,

  _upvote,
  _downvote,
};
