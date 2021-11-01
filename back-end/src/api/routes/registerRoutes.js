const express = require('express');
const usersController = require('../../controllers/usersController');
const { verifyDataToRegister } = require('../../middlewares')

const router = express.Router();

router.post('/', verifyDataToRegister, usersController.register);

module.exports = router;
