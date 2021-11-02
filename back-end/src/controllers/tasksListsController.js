const { CREATED } = require('http-status');
const tasksListsService = require('../services/tasksListsService');

const create = async (req, res) => {
  const { _id } = req.userData;
  const tasks = req.body;
  const response = await tasksListsService.create({ author: _id, tasks});

  return res.status(CREATED).json(response);
};

module.exports = {
  create,
};