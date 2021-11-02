const { CREATED, UNAUTHORIZED, OK } = require('http-status');
const taskListService = require('../services/taskListService');

const create = async (req, res) => {
  const { _id } = req.userData;
  const tasks = req.body;
  const response = await taskListService.create({ author: _id, tasks });

  return res.status(CREATED).json(response);
};

const update = async (req, res) => {
  const { userData } = req;
  const taskListId = req.params.id;
  const tasksListData = req.body;
  const response = await taskListService.update(userData, taskListId, tasksListData);

  if (error) {
    return res.status(UNAUTHORIZED).json(error);
  }
  return res.status(OK).json(response);
};

module.exports = {
  create,
  update,
};
