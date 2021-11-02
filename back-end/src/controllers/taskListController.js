const { CREATED, UNAUTHORIZED, OK } = require('http-status');
const taskListService = require('../services/taskListService');

const create = async (req, res) => {
  const { _id } = req.userData;
  const { taskListName } = req.body;
  const response = await taskListService.create(_id, taskListName);

  return res.status(CREATED).json(response);
};

const updateTasksById = async (req, res) => {
  const { userData } = req;
  const taskListId = req.params.id;
  const tasksListData = req.body;
  const response = await taskListService.updateTasksById(userData, taskListId, tasksListData);

  const { error } = response;

  if (error) {
    return res.status(UNAUTHORIZED).json(error);
  }
  return res.status(OK).json(response);
};

const renameTaskListById = async (req, res) => {
  const { userData } = req;
  const taskListId = req.params.id;
  const { taskListName } = req.body;
  const response = await taskListService.renameTaskListById(userData, taskListId, taskListName);

  const { error } = response;

  if (error) {
    return res.status(UNAUTHORIZED).json(error);
  }
  return res.status(OK).json(response);
};

const deleteTaskListById = async (req, res) => {
  const { userData } = req;
  const taskListId = req.params.id;
  const response = await taskListService.deleteTaskListById(userData, taskListId);

  const { error } = response;

  if (error) {
    return res.status(UNAUTHORIZED).json(error);
  }
  return res.status(OK).json(response);
};

const getAllTaskListsByUser = async (req, res) => {
  const { _id } = req.userData;
  const response = await taskListService.getAllTaskListsByUser(_id);

  return res.status(OK).json(response);
};

const getTaskListById = async (req, res) => {
  const { _id } = req.userData;
  const taskListId = req.params.id;
  const response = await taskListService.getTaskListById(_id, taskListId);

  const { error } = response;

  if (error) {
    return res.status(UNAUTHORIZED).json(error);
  }

  return res.status(OK).json(response);
};

module.exports = {
  create,
  updateTasksById,
  renameTaskListById,
  deleteTaskListById,
  getAllTaskListsByUser,
  getTaskListById,
};
