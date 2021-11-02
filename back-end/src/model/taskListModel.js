const mongoConnection = require('./connection');
const { ObjectId } = require('mongodb');

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

module.exports = {
  findTaskListById,
  create,
};
