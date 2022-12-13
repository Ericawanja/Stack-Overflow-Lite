const Joi = require("joi");

const validator = (schema, property) => (req, res, next) => {
  const { error } = schema.validate(req[property]);

  if (error)
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });

  next();
};

module.exports = validator;
