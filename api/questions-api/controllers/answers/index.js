const { exec, query } = require("../../helpers/db_connect");
const { v4: uuidv4 } = require("uuid");
const { user } = require("../../Config");

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

const setPrefferedAnswer = async (req, res) => {
  const { id } = req.body;
  const ans = await exec("getAnswer", { id });
  if (ans.length > 0) {
    const user = req.info;
    let questionDb = await exec("getOneQuestion", { id: ans[0].question_id });

    if (questionDb.length === 0) {
      return res.status(401).json({
        message: "Invalid operation",
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

const upvote = async (req, res) => {
  const user = req.info;
  const { answer_id } = req.body;

  try {
    let has_voted = await exec("userVotes", {
      user_id: user.id,
      answer_id,
    });
    if (has_voted.length === 0) {
      await exec("insertVotes", {
        user_id: user.id,
        answer_id,
        vote: 1,
      });
      return res
        .status(200)
        .json({ message: "You have successfully upvoted the answer" });
    }
    if (has_voted[0].votes === 1) {
      return res
        .status(400)
        .json({ message: "You previously upvoted this answer" });
    }
    if (has_voted[0].votes === -1) {
      await exec("updateVotes", {
        user_id: user.id,
        answer_id,
        vote: 1,
      });
      return res
        .status(200)
        .json({ message: "You have successfully upvoted the answer" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const downvote = async (req, res) => {
  const user = req.info;
  const { answer_id } = req.body;

  try {
    let has_voted = await exec("userVotes", {
      user_id: user.id,
      answer_id,
    });
    if (has_voted.length === 0) {
      await exec("insertVotes", {
        user_id: user.id,
        answer_id,
        vote: -1,
      });
      return res
        .status(200)
        .json({ message: "You have successfully downvoted the answer" });
    }
    if (has_voted[0].votes === -1) {
      return res
        .status(400)
        .json({ message: "You previously downvoted this answer" });
    }
    if (has_voted[0].votes === 1) {
      await exec("updateVotes", {
        user_id: user.id,
        answer_id,
        vote: -1,
      });
      return res
        .status(200)
        .json({ message: "You have successfully downvoted the answer" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getUserAnswers = async (req, res) => {
  const user = req.info;
  try {
    const answers = await exec("getUserAnswers", { user_id: user.id });
    return res.status(200).json(answers);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postAnswer,
  setPrefferedAnswer,
  undoPrefferedAnswer,
  deleteAnswer,
  upvote,
  downvote,

  getUserAnswers,
};
