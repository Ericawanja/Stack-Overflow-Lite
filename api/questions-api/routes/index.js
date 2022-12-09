const express = require("express");
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
const { verifyUser } = require("../middlewares/verify");
const router = express.Router();

router.get("/", verifyUser,  getAllQuestions);
router.get("/user/:user_id", getUserQuestions);
router.get("/:id", getQuestion);

router.post("/", postQuestion);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

router.post("/answer/add", postAnswer);
router.put("/answer/preffered/set", setPrefferedAnswer);
router.put("/answer/preffered/undo", undoPrefferedAnswer);
router.delete("/answer/:id", deleteAnswer)

router.post("/answer/comment", addComment)
router.delete("/comment/:id", deleteComment)

module.exports = router;
