const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const todoCtrl = require('../controllers/todo');

router.post('/',auth, todoCtrl.createTodo); //create todo
router.get('/',auth, todoCtrl.getAllTodos); //all Todo related to a user
router.get('/:idTodo',auth, todoCtrl.getOneTodo); //display one todo
router.put('/:idTodo',auth, todoCtrl.modifyOneTodo); //modify one todo
router.put('/:idTodo/state',auth, todoCtrl.modifyTodoState); //modify one todo
router.delete('/:idTodo',auth, todoCtrl.deleteOneTodo); //delete to session

module.exports = router;