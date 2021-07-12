const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const todoController = require('../controller/todoController');


router.use(bodyParser())
router.post('/add-todo',todoController.addTodo)

router.post('/get-alltodo',todoController.authorization,todoController.getTodo)

router.delete('/delete-todo/:id',todoController.deleteTodo)



module.exports = router;