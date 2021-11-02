const { CREATED } = require('http-status');
const taskListService = require('../services/taskListService');

const create = async (req, res) => {
  const { _id } = req.userData;
  const tasks = req.body;
  const response = await taskListService.create({ author: _id, tasks});

  return res.status(CREATED).json(response);
};

module.exports = {
  create,
};
