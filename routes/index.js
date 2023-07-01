const router = require("express").Router();
const Todo = require("../models/todo");
const { register } = require("../controllers/auth");

router.get("/", (req,res)=>{
    res.render("index");
})
router.get("/registration", (req,res)=>{
    res.render("registration");
})
router.post("/registration", register);

router.get("/todos", async (req,res)=>{
    const allTodo = await Todo.find();
    res.render("index", { todo: allTodo});
})

module.exports = router;