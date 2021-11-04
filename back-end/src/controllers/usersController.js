const { CONFLICT, CREATED, UNAUTHORIZED, OK } = require('http-status');
const usersService = require('../services/usersService');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const response = await usersService.register({ name, email, password });

  const { error } = response;

  if (error) {
    return res.status(CONFLICT).json(response);
  }

  return res.status(CREATED).json(response);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const response = await usersService.login({ email, password });

  const { error } = response;

  if (error) {
    return res.status(UNAUTHORIZED).json(response);
  }

  return res.status(OK).json(response);
};

module.exports = {
  register,
  login,
};
