const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const sessions = require("express-session")
const port = process.env.port||8000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(helmet());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(sessions({
    secret: process.env.SECRET_KEY,
    saveUninitialized:true,
    resave: false     
}));

app.use(require("./routes/index"));
app.use(require("./routes/todo"));

mongoose.connect(process.env.DATABASE).then(()=>{
    app.listen(port, ()=>{
        console.log(`Server run success in`);
    })
})
.catch((err)=> console.log(err));
