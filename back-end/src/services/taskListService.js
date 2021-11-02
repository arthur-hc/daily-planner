const taskListModel = require('../model/taskListModel');

const create = async (listData) => {
  const response = await taskListModel.create(listData);
  
  return response;
};

module.exports = {
  create,
};
