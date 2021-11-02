const { CREATED } = require('http-status');
const tasksListsService = require('../services/tasksListsService');

const create = async (req, res) => {
  const { _id } = req.userData;
  const listData = req.body;
  const response = await tasksListsService.create({ author: _id, date: listData });

  return res.status(CREATED).json(response);
};

module.exports = {
  create,
};