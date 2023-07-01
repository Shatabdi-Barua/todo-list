const Todo = require("../models/todo");

exports.addTodo = async (req,res)=>{
    const { todo } = req.body;
    // console.log(todo);
    // const { userID } = req.session.userId;
    console.log(req.session.userId);
    const newTodo = new Todo({ todo: todo, userID: req.session.userId });
    newTodo.save()
        .then(()=>{
            console.log("Saved!");
            res.redirect("/todos");
            // const allTodo = Todo.find();
            // res.render("todo", {todo: allTodo, userId: req.session.userId});
        })
        .catch((err)=>{
            console.log(err);
        })
}

exports.deleteTodo = async (req,res)=>{    
    const { id } = req.params;
    Todo.deleteOne({ _id: id})
        .then(()=>{
            console.log("Deleted Todo Successfully!");
            res.redirect("/todos");
        }) 
        .catch((err)=>{
            console.log(err);
        })
}