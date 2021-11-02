const express = require('express');
const validationJWT = require('../auth/validationJWT');
const taskListController = require('../../controllers/taskListController');
const { verifyTaskListData, verifyIdFormat, verifyTaskListName } = require('../../middlewares');

const router = express.Router();

router.post('/', validationJWT, verifyTaskListName, taskListController.createTaskList);

router.get('/', validationJWT, taskListController.getAllTaskListsByUser);

router.get('/:id', verifyIdFormat, validationJWT, taskListController.getTaskListById);

router.put('/:id/updatetasks',
  verifyIdFormat,
  validationJWT,
  verifyTaskListData,
  taskListController.updateTasksById);

router.put('/:id/rename',
  verifyIdFormat,
  validationJWT,
  verifyTaskListName,
  taskListController.renameTaskListById);

router.delete('/:id',
  verifyIdFormat,
  validationJWT,
  taskListController.deleteTaskListById);

module.exports = router;
