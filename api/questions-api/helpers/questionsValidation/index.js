const Joi = require("joi");

const schema = Joi.object({
  user_id: Joi.string().required(),
  title: Joi.string().min(3).max(100).required(),
  question: Joi.string().min(40).max(400).required(),
  tags:Joi.string().required().max(50)
});

module.exports = {
  validateQuestion: (data) => {
    return schema.validate(data);
  },
};
