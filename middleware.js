const passport=require("passport");
const posts=require("./models/posts.js");

module.exports.isloggedin=(req,res,next)=>{
    if(! req.isAuthenticated()){
        req.flash("error","You must logged in!!!");
        return res.redirect("/login");
    }
    next();
}

module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
    let updatepost = await posts.findById(id);
    if (!updatepost) {
        req.flash("error", "Post not found");
        return res.redirect("/posts");
    }
    if (!updatepost.owner.equals(req.user._id)) {
        req.flash("error", "You don't have permission");
        return res.redirect("/posts");
    }
}