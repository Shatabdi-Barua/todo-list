const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const todoSchema = new Schema({
    todo:{
        type: String,
        required: true,
    },
    userID: {
        type: ObjectId,
        ref: "User"
    },
}, { timestamps:true, versionKey: false});

const todo = mongoose.model("Todo", todoSchema);
module.exports = todo;