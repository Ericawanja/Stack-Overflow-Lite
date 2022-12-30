const { exec, query } = require("../../helpers/db_connect");
const { v4: uuidv4 } = require("uuid");
const { user } = require("../../Config");

const getAllQuestions = async (req, res) => {
  const page = req.query.page ?? 1;
  const limit = req.query.limit ?? 10;
  try {
    const questions = await exec("getAllQuestions", { page, limit });
    if (questions.length === 0) {
      return res
        .status(404)
        .json({ message: "There are no questions found", questions });
    }

    const total = await query("select * from questions where isdeleted=0");

    res.status(200).json({ questions, total: total.length, all: total });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
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
  res
    .status(201)
    .json({ message: `The question added successfully. Thank you` });
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

const getUserQuestions = async (req, res) => {
  const page = req.query.page ?? 1;
  const limit = req.query.limit ?? 10;

  let user = req.info;
  let user_id = user.id;
  try {
    const questions = await exec("getAllQuestions", {
      user_id: user.id,
      page,
      limit,
    });
    const allQuestions = await exec("allUserQuestions", { user_id: user.id });
    if (questions.length > 0) {
      const total = await query(
        `select * from questions where user_id = '${user.id}' AND isdeleted=0`
      );

      res
        .status(200)
        .json({ questions, total: total.length, all: allQuestions });
    } else {
      res
        .status(404)
        .json({ message: "You haven't created any questions yet" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
      let votes = await exec("getVotes", { answer_id: id });
      let totalVotes = 0;
      if (votes.length === 0) {
        totalVotes = 0;
      } else {
        for (let i = 0; i < votes.length; i++) {
          totalVotes = totalVotes + votes[i].votes;
        }
      }

      let data = {
        ...answer,
        votes: totalVotes,
        comments,
      };
      return data;
    })
  );

  const data = { ...question[0], answers: anc };

  res.status(200).json({ question: data });
};

const getQuestionWithMostAnswers = async (req, res) => {
  try {
    let questions = await exec("getAllQuestions");
    if (questions.length > 1) {
      questions = questions.sort((x, y) => {
        return +y.answers - +x.answers;
      });
      let topQuiz = questions[0];
      return res.status(200).json(questions);
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

  const page = req.query.page ?? 1;
  const limit = req.query.limit ?? 2;

  try {
    let questions = await exec("search", { searchTerm, page, limit });

    if (questions.length !== 0) {
      let total = await query(`
        select * from questions
         where
      question Like '%' + '${searchTerm}' + '%'
      OR tags Like '%' + '${searchTerm}' + '%'
      OR title Like '%' + '${searchTerm}' + '%'
      AND isdeleted = 0
        `);

      return res.status(200).json({ questions, total: total.length });
    } else {
      return res
        .status(200)
        .json({ message: "There are no questions found", questions });
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
  getQuestionWithMostAnswers,
  search,
};
