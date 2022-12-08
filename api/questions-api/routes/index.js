const express = require('express');
const { getAllQuestions, getUserQuestions, getQuestion, postQuestion, deleteQuestion } = require('../controllers');
const router = express.Router()

router.get('/', getAllQuestions)
router.get('/user/:user_id', getUserQuestions)
router.get('/:id', getQuestion)

router.post('/', postQuestion)

router.delete('/:id', deleteQuestion)



module.exports = router;