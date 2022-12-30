const { exec, query } = require("../../helpers/db_connect");
const { v4: uuidv4 } = require("uuid");
const { user } = require("../../Config");

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

const getUserComments = async (req, res) => {
  const user = req.info;
  try {
    const comments = await exec("getUserComments", { user_id: user.id });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addComment,
  deleteComment,

  getUserComments,
};
