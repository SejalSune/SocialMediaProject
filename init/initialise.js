const mongoose=require("mongoose");
const posts=require("../models/posts.js");
const initdata=require("./data.js");


main().then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log(err);
});

async function main(){
   await mongoose.connect('mongodb://127.0.0.1:27017/socialmedia');
}


const initialise=async ()=>{
    await posts.deleteMany({});
    await posts.insertMany(initdata.data);
    console.log("data was initialised");
}

initialise();