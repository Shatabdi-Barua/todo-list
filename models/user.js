const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
{
    name:{
        type: String,
        trim: true,
        required: true,
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max: 12
    },   
    gender:{
        type:String,
        enum: ['male', 'female']
    }
}, { timestamps:true, versionKey: false}
);

const User = mongoose.model("User", UserSchema);
module.exports = User;