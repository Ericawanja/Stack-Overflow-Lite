const express = require('express');
const { getAllQuestions, getUserQuestions, getQuestion, postQuestion, updateQuestion, deleteQuestion } = require('../controllers');
const router = express.Router()

router.get('/', getAllQuestions)
router.get('/user/:user_id', getUserQuestions)
router.get('/:id', getQuestion)

router.post('/', postQuestion)
router.update('/:id', updateQuestion)
router.delete('/:id', deleteQuestion)



module.exports = router;