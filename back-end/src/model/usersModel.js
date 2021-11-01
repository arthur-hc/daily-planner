const mongoConnection = require('./connection');

const findUserByEmail = async (email) => {
  const db = await mongoConnection.getConnection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

const register = async (newUserData) => {
  const db = await mongoConnection.getConnection();
  const { name, email } = newUserData;
  const response = await db.collection('users').insertOne(newUserData);
  return { user: { email, name, _id: response.insertedId } };
};

module.exports = {
  findUserByEmail,
  register,
};
