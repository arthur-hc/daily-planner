const usersModel = require('../model/usersModel');
const { emailInUse } = require('../helpers/errors');

const register = async (userData) => {
  const emailAlreadyinUse = await usersModel.findUserByEmail(userData.email);

  if (emailAlreadyinUse) {
    return { error: { message: emailInUse } };
  }

  const response = await usersModel.register(userData);

  return response;
};

module.exports = {
  register,
};