const Joi = require('joi');
const { UNPROCESSABLE_ENTITY } = require('http-status');

module.exports = (req, res, next) => {

  const userData = req.body;

  const { error } = Joi.object({
    email: Joi.string().email().not().empty()
    .required(),
    password:  Joi.string().min(6).pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/).not().empty()
    .required(),
    nome: Joi.string().not().empty()
    .required(),

  }).validate(userData);

  if (error) {
    return res.status(UNPROCESSABLE_ENTITY).json({ message: error.details[0].message });
  };

  next();
};