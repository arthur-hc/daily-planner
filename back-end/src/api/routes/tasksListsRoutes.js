const express = require('express');
const validationJWT = require('../auth/validationJWT');
const tasksListsController = require('../../controllers/tasksListsController');

const router = express.Router();

router.post('/', validationJWT, tasksListsController.create);

module.exports = router;
