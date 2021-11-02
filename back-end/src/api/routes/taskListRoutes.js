const express = require('express');
const validationJWT = require('../auth/validationJWT');
const taskListController = require('../../controllers/taskListController');

const router = express.Router();

router.post('/', validationJWT, taskListController.create);

module.exports = router;
