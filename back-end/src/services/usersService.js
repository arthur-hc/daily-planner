const usersModel = require('../model/usersModel');
const { emailInUse, incorrectUserOrPass } = require('../helpers/errors');
const generateJWT = require('../api/auth/generateJWT');

const register = async (userData) => {
  const emailAlreadyinUse = await usersModel.findUserByEmail(userData.email);

  if (emailAlreadyinUse) {
    return { error: { message: emailInUse } };
  }

  const response = await usersModel.register(userData);

  return response;
};

const login = async (dataToLogin) => {
  const { email, password } = dataToLogin;

  const userData = await usersModel.findUserByEmail(email);
  
  if (!userData || userData.password !== password) {
    return { err: { message: incorrectUserOrPass } };
  }

  const { _id } = userData;
  const token = generateJWT({ _id, email });

  return token;
};

module.exports = {
  register,
  login,
};