const express = require('express');
const validationJWT = require('../auth/validationJWT');
const taskListController = require('../../controllers/taskListController');
const { verifyTaskListData, verifyIdFormat } = require('../../middlewares');

const router = express.Router();

router.post('/', validationJWT, verifyTaskListData, taskListController.create);

router.put('/:id', verifyIdFormat, validationJWT, verifyTaskListData, taskListController.update);

module.exports = router;
