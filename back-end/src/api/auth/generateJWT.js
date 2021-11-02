const jwt = require('jsonwebtoken');
const secret = require('../../helpers/secretKey');

module.exports = (data) => {
  const jwtConfig = {
    expiresIn: '10m',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data }, secret, jwtConfig);

  return { token };
};