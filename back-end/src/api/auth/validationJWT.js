const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../../model/usersModel');
const { UNAUTHORIZED } = require('http-status')
const { jwtMalformed, missingAuthToken } = require('../../helpers/errors');

const secret = require('../../helpers/secretKey');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: missingAuthToken });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const userTokenExists = await findUserByEmail(decoded.data.email);
    if (!userTokenExists) {
      return res.status(UNAUTHORIZED).json({ message: jwtMalformed });
    }

    const { _id, email } = userTokenExists;

    req.userData = { _id, email };

    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: jwtMalformed });
  }
};
