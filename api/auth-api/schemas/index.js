const Joi = require("joi");

const loginSchema = Joi.object({
  password: Joi.string().required().min(8).max(20),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const registerSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password:Joi.string().min(8).max(20).required()

});

module.exports = { loginSchema, registerSchema };
