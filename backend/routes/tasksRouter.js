var express = require('express');
const { taskController, allTasksController, newTaskController, editTaskController, deleteTaskController, completeTaskController } = require('../controllers/tasksController');
const { authMiddleware } = require('../middleware')

var router = express.Router();


/* GET logged in user. */
router.get('/',authMiddleware, allTasksController);
router.get('/:id',taskController)
router.post('/',authMiddleware, newTaskController)
router.put('/:id',authMiddleware, editTaskController)
router.delete('/:id',authMiddleware, deleteTaskController)

module.exports = router;
