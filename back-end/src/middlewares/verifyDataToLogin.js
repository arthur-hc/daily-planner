const Joi = require('joi');
const { BAD_REQUEST } = require('http-status');

module.exports = (req, res, next) => {
  const userData = req.body;

  const { error } = Joi.object({
    email: Joi.string().email().not().empty()
.required(),
    password: Joi.not().empty().required(),
  }).validate(userData);

  if (error) {
    return res.status(BAD_REQUEST).json({ error: { message: error.details[0].message } });
  }

  next();
};