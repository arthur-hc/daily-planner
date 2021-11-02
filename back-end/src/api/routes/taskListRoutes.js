const express = require('express');
const validationJWT = require('../auth/validationJWT');
const taskListController = require('../../controllers/taskListController');
const { verifyTaskListData } = require('../../middlewares');

const router = express.Router();

router.post('/', validationJWT, verifyTaskListData, taskListController.create);

module.exports = router;
