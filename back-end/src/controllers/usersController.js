// const usersService = require('../services/usersService');
const { CREATED } = require('http-status');
// const { invalidEntries, emailInUse } = require('../helpers/errors');

const register = async (req, res) => {

  const { name, email, password } = req.body;

  // const response = await usersService.register(name, email, password);

  // const { err } = response;

  // if (err && err.message === invalidEntries) {
  //   return res.status(badRequest).json(err);
  // }

  // if (err && err.message === emailInUse) {
  //   return res.status(conflict).json(err);
  // }

  return res.status(CREATED).send('response');
};

module.exports = {
  register,
};
