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
} = require("../controllers");
const validate = require("../middlewares/validateQuestions");


router.get("/", verifyUser,  getAllQuestions);
router.get("/author/:user_id", verifyUser, getUserQuestions);
router.get("/:id",verifyUser, getQuestion);

router.post("/",verifyUser, validate, postQuestion);
router.put("/:id",verifyUser, validate, updateQuestion);
router.delete("/:id", deleteQuestion);

router.post("/answer/add", postAnswer);
router.put("/answer/preffered/set", setPrefferedAnswer);
router.put("/answer/preffered/undo", undoPrefferedAnswer);
router.delete("/answer/:id", deleteAnswer)

router.post("/answer/comment", addComment)
router.delete("/comment/:id", deleteComment)

module.exports = router;
