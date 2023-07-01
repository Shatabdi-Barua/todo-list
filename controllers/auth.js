const User = require("../models/user");
const Todo = require("../models/todo");
const { hashPassword, comparePassword } = require('../helpers/auth');
// const jwt = require("jsonwebtoken");

exports.register = async (req,res) => {
    console.log(req);
    try{
        const { name, email, password, gender } = req.body;
        if(!name.trim())
        {
            return res.json({ error : "Name is required"});
        }
        if(!email)
        {
            return res.json({ error : "Email is required"});
        }
        if(!password || password.length < 6)
        {
            return res.json({ error: "Password must be at least 6 characters long" });
        }
        const existEmail = await User.findOne({email});
        if(existEmail)
        {
            return res.json({ error: "email is taken"});
        }

        const hashedPassword = await hashPassword(password);
        const user = await new User({
            name,
            email,
            password: hashedPassword,            
            gender
        }).save();
        //create signed jwt for id
        // const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY, {expiresIn: "7d"}, )
        // res.json({
        //     user:{
        //         name: user.name,
        //         email: user.email,               
        //         gender: user.gender
        //     }, token,
        // });        
        // res.render("index", { msg: "Registration Success"});
        res.redirect("/")
    }catch (err)
    {
        console.log(err);
    }
}

exports.login = async (req, res)=>{
    try{
        const { email, password } = req.body;
        //check email & password
        if(!email)
        {
            return res.json({ error: "Email field is required "});
        }
        if(!password || password.length < 6)
        {
            return res.json({ error: "Password must be at least 6 characters long"});
        }
        //check if email match
        const user = await User.findOne({email});
        if(!user)
        {
            return res.json({error:"User not found"});
        }
        //compare password
        const match = await comparePassword(password, user.password);
        if(!match)
        {
            return res.json({error:"Invalid password"})
        }
        // const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY, {expiresIn: "7d"}, )

        // res.json({
        //     msg: "Login Succussful",
        //     // token: token,
        // }
        const allTodo = await Todo.find();
        res.render("todo", {todo: allTodo});
    }catch (err)
    {
        console.log(err);
    }
}

exports.secret = async (req,res)=>{
    res.json({
        currentUser: req.user,
        msg: "admin successfully entered in the controller"
    });
};
// update profile
exports.updateProfile = async (req,res)=>{
    try {
        const { name, password, gender } = req.body;
        const user = await User.findById(req.user._id);

        if(password && password.length < 6)
        {
            return res.json({
                error: "Password must be at least 6 digits"
            });
        }
        const hasedPassword = password ? await hashPassword(password) : undefined;
        const updated = await User.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hasedPassword || user.password,
                gender: gender || user.gender,
            },
            { new: true }
        )
        updated.password = undefined;
        res.json(updated);
    }
    catch(err){
        console.log(err);
    }
}