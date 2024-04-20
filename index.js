require('dotenv').config();
const express = require('express');
const ejs=require("ejs");
const app = express();
const userSchema=require("./models/user.js");
const mongoose=require("mongoose");
const path=require('path');
const posts=require("./routes/posts.js");  //routes
const user=require("./routes/user.js");  // user routes
const methodOverride = require('method-override');
const session=require("express-session");
const flash = require('connect-flash');
const passport=require("passport");
const LocalStrategy=require("passport-local");

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(flash());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
    }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(userSchema.authenticate()));
passport.serializeUser(userSchema.serializeUser());
passport.deserializeUser(userSchema.deserializeUser());

// app.all("*", (req,res,next) => {
//     next (new ExpressError(404, "Page Not Found !!!"));
// });

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curruser = req.user;
    next();
})

app.use("/",user);
app.use("/posts", posts);

// port and mongoose 
main().then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log(err);
});

async function main(){
   await mongoose.connect('mongodb://127.0.0.1:27017/socialmedia');
}

app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong"} = err;
    res.status(statusCode).send(message);
});

app.listen(8080,()=>{
    console.log("listening");
});