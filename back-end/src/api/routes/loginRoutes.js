const express = require('express');
const usersController = require('../../controllers/usersController');
const { verifyDataToLogin } = require('../../middlewares');

const router = express.Router();

router.post('/', verifyDataToLogin ,usersController.login);

module.exports = router;
