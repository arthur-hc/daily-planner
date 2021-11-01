const { CONFLICT, CREATED } = require('http-status');
const usersService = require('../services/usersService');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const response = await usersService.register({ name, email, password });

  const { error } = response;

  if (error) {
    return res.status(CONFLICT).json(error);
  }

  return res.status(CREATED).send(response);
};

module.exports = {
  register,
};
