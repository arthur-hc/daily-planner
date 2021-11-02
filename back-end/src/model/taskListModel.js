const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const getTaskListById = async (id) => {
  const db = await mongoConnection.getConnection();
  const user = await db.collection('taskList').findOne({ _id: ObjectId(id) });
  return user;
};

const getAllTaskListsByUser = async (id) => {
  const db = await mongoConnection.getConnection();
  const user = await db.collection('taskList').find({ author: ObjectId(id) }).toArray();
  return user;
};

const create = async (listData) => {
  const db = await mongoConnection.getConnection();
  const response = await db.collection('taskList').insertOne(listData);
  return response;
};

const updateTasksById = async (id, taskData) => {
  const db = await mongoConnection.getConnection();
  const response = await db.collection('taskList')
  .updateOne({ _id: ObjectId(id) }, { $set: { tasks: taskData } });
  return response;
};

const renameTaskListById = async (id, taskListName) => {
  const db = await mongoConnection.getConnection();
  const response = await db.collection('taskList')
  .updateOne({ _id: ObjectId(id) }, { $set: { taskListName } });
  return response;
};

const deleteTaskListById = async (id) => {
  const db = await mongoConnection.getConnection();
  const response = await db.collection('taskList')
  .deleteOne({ _id: ObjectId(id) });
  return response;
};

module.exports = {
  getTaskListById,
  create,
  updateTasksById,
  renameTaskListById,
  deleteTaskListById,
  getAllTaskListsByUser,
};
