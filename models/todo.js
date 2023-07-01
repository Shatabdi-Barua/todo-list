const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
    todo:{
        type: String,
        required: true,
    }
});

const todo = mongoose.model("Todo", todoSchema);
module.exports = todo;