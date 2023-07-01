const router = require("express").Router();
const Todo = require("../models/todo");
const { register, login } = require("../controllers/auth");

router.get("/", (req,res)=>{
    res.render("index");
})
router.get("/registration", (req,res)=>{
    res.render("registration");
})
router.post("/registration", register);
router.post("/login", login);

router.get("/todos", async (req,res)=>{
    console.log(req.session.userId);
    const allTodo = await Todo.find({ userID: req.session.userId });
    res.render("todo", { todo: allTodo, userId: req.session.userId});
})

module.exports = router;