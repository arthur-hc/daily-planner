const express = require('express');
const validationJWT = require('../auth/validationJWT');
const taskListController = require('../../controllers/taskListController');
const { verifyTaskListData, verifyIdFormat, verifyTaskListName } = require('../../middlewares');

const router = express.Router();

router.post('/', validationJWT, verifyTaskListName, taskListController.create);

router.put('/:id',
  verifyIdFormat,
  validationJWT,
  verifyTaskListData,
  taskListController.updateTasksById);

module.exports = router;
