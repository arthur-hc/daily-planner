const taskListModel = require('../model/taskListModel');
const { onlyCreatorEdit, onlyCreatorDelete, onlyCreatorSee } = require('../helpers/errors');
const initalTaskList = require('../helpers/initalTaskList');
const { isSameId } = require('../validations/index');

const create = async (author, taskListName) => {
  const listData = { author, taskListName, tasks: initalTaskList };

  const response = await taskListModel.create(listData);
  
  return response;
};

const updateTasksById = async (userData, taskListId, tasksListData) => {
  const { _id } = userData;
  const userId = _id;

  const taskListToEdit = await taskListModel.getTaskListById(taskListId);
  
  // I USE THE SAME MESSAGE TO DON'T TELL TO REQUEST IF THIS ID RELLY EXISTS OR NOT AND IMPROVE MY SECURITY
  if (!taskListToEdit || !isSameId(userId, taskListToEdit.author)) {
    return { error: { message: onlyCreatorEdit } };
  }

  await taskListModel.updateTasksById(taskListId, tasksListData);

  return { ...taskListToEdit, tasks: tasksListData };
};

const renameTaskListById = async (userData, taskListId, taskListName) => {
  const { _id } = userData;
  const userId = _id;

  const taskListToEdit = await taskListModel.getTaskListById(taskListId);
  
  if (!taskListToEdit || !isSameId(userId, taskListToEdit.author)) {
    return { error: { message: onlyCreatorEdit } };
  }

  await taskListModel.renameTaskListById(taskListId, taskListName);

  return { ...taskListToEdit, taskListName };
};

const deleteTaskListById = async (userData, taskListId) => {
  const { _id } = userData;
  const userId = _id;

  const taskListToEdit = await taskListModel.getTaskListById(taskListId);
  
  if (!taskListToEdit || !isSameId(userId, taskListToEdit.author)) {
    return { error: { message: onlyCreatorDelete } };
  }

  await taskListModel.deleteTaskListById(taskListId);

  return { ...taskListToEdit };
};

const getAllTaskListsByUser = async (id) => {
  const response = await taskListModel.getAllTaskListsByUser(id);

  return response;
};

const getTaskListById = async (userId, taskListId) => {
  const taskList = await taskListModel.getTaskListById(taskListId);
  
  if (!taskList || !isSameId(userId, taskList.author)) {
    return { error: { message: onlyCreatorSee } };
  }

  return taskList;
};

module.exports = {
  create,
  updateTasksById,
  renameTaskListById,
  deleteTaskListById,
  getAllTaskListsByUser,
  getTaskListById,
};
