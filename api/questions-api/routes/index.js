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
  search,
  _upvote,
  _downvote
} = require("../controllers");
const validateQuestion = require("../middlewares/validateQuestions");
const validateAnswer = require("../middlewares/validateAnswer");
const validateComment = require("../middlewares/validateComment");



router.get("/", verifyUser,  getAllQuestions);
router.get("/user/created", verifyUser, getUserQuestions);
router.get("/:id",verifyUser, getQuestion);

router.post("/",verifyUser, validateQuestion, postQuestion);
router.put("/:id",verifyUser, validateQuestion, updateQuestion);
router.delete("/:id", verifyUser, deleteQuestion);

router.post("/answer/add", verifyUser, validateAnswer, postAnswer);
router.put("/answer/preffer", verifyUser, setPrefferedAnswer);
router.put("/answer/unprefer", verifyUser, undoPrefferedAnswer);
router.delete("/answer/delete/:id",verifyUser, deleteAnswer)

router.post("/answer/comment",verifyUser, validateComment, addComment)
router.delete("/comment/:id", verifyUser, deleteComment)



router.get("/ordered/top", verifyUser, getQuestionWithMostAnswers)
router.post("/list/search", verifyUser, search)


router.post("/answer/upvote",verifyUser, _upvote)
router.post("/answer/downvote",verifyUser, _downvote)

module.exports = router;
