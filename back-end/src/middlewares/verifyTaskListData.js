const Joi = require('joi');
const { BAD_REQUEST } = require('http-status');
const { invalidEntries } = require('../helpers/errors');

module.exports = (req, res, next) => {
  const taskListData = req.body;

  const { error } = Joi.object({
    ToDo: Joi.array().items(Joi.string())
    .required(),
    InProgress: Joi.array().items(Joi.string())
    .required(),
    Done: Joi.array().items(Joi.string())
    .required(),

  }).validate(taskListData);

  if (error) {
    return res.status(BAD_REQUEST).json({ error: { message: error.details[0].message } });
  }

  next();
};