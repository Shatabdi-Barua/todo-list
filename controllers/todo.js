const Todo = require("../models/todo");
exports.addTodo = (req,res)=>{
    const { todo } = req.body;
    // console.log(todo);
    const newTodo = new Todo({ todo });
    newTodo.save()
        .then(()=>{
            console.log("Saved!");
            res.redirect("/");
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
            res.redirect("/");
        }) 
        .catch((err)=>{
            console.log(err);
        })
}