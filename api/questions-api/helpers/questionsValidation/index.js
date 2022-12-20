const Joi = require("joi");

const schema = Joi.object({
  
  title: Joi.string().min(3).max(300).required(),
  question: Joi.string().min(3).required(),
  tags:Joi.string().required().max(50)
});

module.exports = {
  validateQuestion: (data) => {
    return schema.validate(data);
  },
};
