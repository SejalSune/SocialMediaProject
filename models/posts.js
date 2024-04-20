const mongoose=require("mongoose");

let postSchema=new mongoose.Schema({
    username:String,
    caption:String,
    photo:{
        URL:String,
        filename:String,
    },
    location:String,
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
});

module.exports=mongoose.model("posts",postSchema);