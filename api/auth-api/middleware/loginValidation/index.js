const { validateLogin } = require("../../helpers/validation/login");

const validate = (req, res, next) => {
  const { email, password } = req.body;
  const { error, value } = validateLogin({email,password});
 
  if (error) {
    let errors = error.details.map(err=>err.message)
    return res.status(404).json({ errors });
  } else {
    return next();
  }
};

module.exports = validate