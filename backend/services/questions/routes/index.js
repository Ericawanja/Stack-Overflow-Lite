const express = require('express');
const { getAllQuestions, getUserQuestions, getQuestion, postQuestion, deleteQuestion } = require('../controllers');
const questionRoutes = express.Router()

questionRoutes.get('/', getAllQuestions)
questionRoutes.get('/user/:user_id', getUserQuestions)
questionRoutes.get('/:id', getQuestion)

questionRoutes.post('/', postQuestion)

questionRoutes.delete('/:id', deleteQuestion)



module.exports = questionRoutes;