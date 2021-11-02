const mongoConnection = require('./connection');
const { ObjectId } = require('mongodb');

const findTaskListById = async (id) => {
  const db = await mongoConnection.getConnection();
  const user = await db.collection('taskLists').findOne({ _id: ObjectId(id) });
  return user;
};

const create = async (listData) => {
  const db = await mongoConnection.getConnection();
  const response = await db.collection('taskLists').insertOne(listData);
  return response;
};

module.exports = {
  findTaskListById,
  create,
};
