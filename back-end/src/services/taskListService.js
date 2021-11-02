const taskListModel = require('../model/taskListModel');
const { onlyCreatorEdit } = require('../helpers/errors');
const initalTaskList = require('../helpers/initalTaskList');
const { isSameId } = require('../validations/index');

const create = async (author, taskListName) => {
  const listData = { author, taskListName, tasks: initalTaskList};

  const response = await taskListModel.create(listData);
  
  return response;
};

const updateTasksById = async (userData, taskListId, tasksListData) => {
  const { _id } = userData;
  const userId = _id;

  const taskListToEdit = await taskListModel.findTaskListById(taskListId);
  
  // I USE THE SAME MESSAGE TO DON'T TELL TO REQUEST IF THIS ID RELLY EXISTS OR NOT AND IMPROVE MY SECURITY
  if (!taskListToEdit || !isSameId(userId, taskListToEdit.author)) {
    return { error: { message: onlyCreatorEdit } };
  }

  await taskListModel.updateTasksById(taskListId, tasksListData);

  return { ...taskListToEdit, tasks: tasksListData };
};

module.exports = {
  create,
  updateTasksById,
};
