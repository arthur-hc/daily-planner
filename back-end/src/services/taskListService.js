const taskListModel = require('../model/taskListModel');
const { onlyCreatorEdit } = require('../helpers/errors');
const { isSameId } = require('../validations/index');

const create = async (listData) => {
  const response = await taskListModel.create(listData);
  
  return response;
};

const update = async (userData, taskListId, tasksListData) => {
  const { _id } = userData;
  const userId = _id;

  const taskListToEdit = await taskListModel.findTaskListById(taskListId);
  const createdBy = taskListToEdit.author;
  
  if (!isSameId(userId, createdBy)) {
    return { err: { message: onlyCreatorEdit } };
  }

  await recipesModel.update(taskListId, tasksListData);

  return { ...taskListToEdit, ...tasksListData };
};

module.exports = {
  create,
  update,
};
