const express = require("express");
const { verifyUser } = require("../middlewares/verify");
const router = express.Router();

const {
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
  search
} = require("../controllers");
const validateQuestion = require("../middlewares/validateQuestions");
const validateAnswer = require("../middlewares/validateAnswer");
const validateComment = require("../middlewares/validateComment");



router.get("/", verifyUser,  getAllQuestions);
router.get("/author/:user_id", verifyUser, getUserQuestions);
router.get("/:id",verifyUser, getQuestion);

router.post("/",verifyUser, validateQuestion, postQuestion);
router.put("/:id",verifyUser, validateQuestion, updateQuestion);
router.delete("/:id", verifyUser, deleteQuestion);

router.post("/answer/add", verifyUser, validateAnswer, postAnswer);
router.put("/answer/preffered", verifyUser, setPrefferedAnswer);
router.put("/answer/unprefer", verifyUser, undoPrefferedAnswer);
router.delete("/answer/:id", deleteAnswer)

router.post("/answer/comment",verifyUser, validateComment, addComment)
router.delete("/comment/:id", verifyUser, deleteComment)

router.post("/answer/upvote", verifyUser, upvote)
router.post("/answer/downvote", verifyUser, downVote)

router.get("/ordered/top", verifyUser, getQuestionWithMostAnswers)
router.post("/", search)

module.exports = router;
