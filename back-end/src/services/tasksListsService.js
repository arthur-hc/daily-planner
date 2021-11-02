const tasksListsModel = require('../model/tasksListsModel');

const create = async (listData) => {
  const response = await tasksListsModel.create(listData);
  
  return response;
};

module.exports = {
  create,
};
