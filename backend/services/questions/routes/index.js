const express = require('express');
const { getAllQuestions, getUserQuestions, getQuestion } = require('../controllers');
const questionRoutes = express.Router()

questionRoutes.get('/all', getAllQuestions)
questionRoutes.get('/users', getUserQuestions)
questionRoutes.get('/:id', getQuestion)


module.exports = questionRoutes;