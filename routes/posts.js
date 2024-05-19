const express = require('express');
const router = express.Router();
const {postSchema}=require("../models/posts.js");
const wrapAsync=require ("../utils/wrapAsync.js");
const ExpressError=require ("../utils/ExpressError.js");
const posts=require("../models/posts.js");
const { isloggedin, isOwner } = require('../middleware.js');
const multer  = require('multer');
const {storage}=require("../cloudconfig.js");
const uploaddd = multer({ storage });

// route 
router.get("/create",(req,res)=>{
    res.render("create.ejs");
});

router.get("/",wrapAsync(async(req,res,next)=>{
    let uploads=await posts.find({}).populate("owner");
    res.render("home.ejs",{uploads});
}));

router.post("/",uploaddd.single('posts[photo]'), wrapAsync(async (req, res, next) => {
    if (!req.body.posts) {
        throw new ExpressError(400, "Request body is empty");
    }
    const newpost=new posts (req.body.posts);
    if (!newpost.caption) {
        throw new ExpressError(400, "caption is missing");
    }
    if (!newpost.location) {
        throw new ExpressError(400, "location is missing");
    }
    if (!newpost.photo) {
        throw new ExpressError(400, "photo is missing");
    }
    let URL=req.file.path;
    let filename=req.file.filename;
    newpost.owner=req.user._id;
    newpost.photo={URL,filename};
    await newpost.save();
    req.flash("success","Post Created Successfully!!");
    res.redirect("/posts");
}));


router.put("/:id", isloggedin, wrapAsync(async (req, res) => {
    const newpost = new posts(req.body.posts);
    let { id } = req.params;
    newpost.photo = { URL };
    let updatepost = await posts.findById(id);
    if (!updatepost) {
        req.flash("error", "Post not found");
        return res.redirect("/posts");
    }
    if (!updatepost.owner.equals(req.user._id)) {
        req.flash("error", "You don't have permission to edit");
        return res.redirect("/posts");
    }
    await posts.findByIdAndUpdate(id, { ...req.body });

    req.flash("success", "Post updated successfully");
    res.redirect("/posts");
}));


router.delete("/:id",isloggedin,wrapAsync(async (req,res,next)=>{
    let {id}=req.params;
    let updatepost = await posts.findById(id);
    if (!updatepost) {
        req.flash("error", "Post not found");
        return res.redirect("/posts");
    }
    if (!updatepost.owner.equals(req.user._id)) {
        req.flash("error", "You don't have permission to delete");
        return res.redirect("/posts");
    }
    let uploads=await posts.findByIdAndDelete(id);
    console.log(uploads);
    if (! uploads) {   //test remaining
        req.flash("error","Post does not exist!!");
        res.redirect("/posts");
    }
    req.flash("success","Post Deleted!!");
    res.redirect("/posts");
}));

router.get("/:id/edit",isloggedin,wrapAsync(async (req,res,next)=>{
    let {id}=req.params;
    let uploads=await posts.findById(id);
    if (! uploads) {
        req.flash("error","Post does not exist!!");
        res.redirect("/posts");
    }
    res.render("edit.ejs",{uploads});
}));

// 404 
router.use((req,res)=>{
    res.render("pagenot.ejs");
});

module.exports=router;