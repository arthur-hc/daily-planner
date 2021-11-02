const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const findTaskListById = async (id) => {
  const db = await mongoConnection.getConnection();
  const user = await db.collection('taskList').findOne({ _id: ObjectId(id) });
  return user;
};

const create = async (listData) => {
  const db = await mongoConnection.getConnection();
  const response = await db.collection('taskList').insertOne(listData);
  return response;
};

const update = async (id, tasks) => {
  const db = await mongoConnection.getConnection();
  const response = await db.collection('taskList')
  .updateOne({ _id: ObjectId(id) }, { $set: tasks });
  return response;
};

module.exports = {
  findTaskListById,
  create,
  update,
};
