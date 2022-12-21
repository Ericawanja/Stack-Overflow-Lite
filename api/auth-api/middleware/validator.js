const Joi = require("joi");

const validator = (schema, body) => (req, res, next) => {
  const { error } = schema.validate(req[body]);

  if (error)
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });

  next();
};

module.exports = validator;
