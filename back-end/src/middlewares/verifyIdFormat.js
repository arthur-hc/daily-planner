const { ObjectId } = require('mongodb');
const { BAD_REQUEST } = require('http-status');
const { invalidId } = require('../helpers/errors');

module.exports = (req, res, next) => {
  const { id } = req.params;
  const isValidId = ObjectId.isValid(id);

  if (!isValidId) return res.status(BAD_REQUEST).json(invalidId);

  next();
};
