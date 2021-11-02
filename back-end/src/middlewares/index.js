const verifyDataToRegister = require('./verifyDataToRegister');
const verifyDataToLogin = require('./verifyDataToLogin');
const verifyTaskListData = require('./verifyTaskListData');
const verifyIdFormat = require('./verifyIdFormat');
const verifyTaskListName = require('./verifyTaskListName');

module.exports = {
  verifyDataToRegister,
  verifyDataToLogin,
  verifyTaskListData,
  verifyIdFormat,
  verifyTaskListName,
};