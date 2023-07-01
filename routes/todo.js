const router = require("express").Router();
const Todo = require("../models/todo");
const { addTodo, deleteTodo } = require("../controllers/todo");


router.post("/add/todo", addTodo );

router.get("/delete/todo/:id", deleteTodo);

module.exports = router;