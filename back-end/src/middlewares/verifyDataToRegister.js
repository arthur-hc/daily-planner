const Joi = require('joi');
const { BAD_REQUEST } = require('http-status');

module.exports = (req, res, next) => {
  const userData = req.body;

  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    email: Joi.string().email().not().empty()
.required(),
    password: Joi.string().min(6).pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/).not()
.empty()
    .required(),

  }).validate(userData);

  if (error) {
    return res.status(BAD_REQUEST).json({ error: { message: error.details[0].message } });
  }

  next();
};