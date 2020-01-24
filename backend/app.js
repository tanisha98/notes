const express = require('express');
const parser = require("body-parser")
const mongoose = require("mongoose");
const Post = require('./models/post')
const app = express();
const postsRoutes = require('./routes/posts')

mongoose.connect("mongodb+srv://tani:tanisha98@cluster0-wewgd.mongodb.net/node-angular?retryWrites=true&w=majority", { useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
  console.log("hello db");
}).catch(err => { // we will not be here...
  console.error('App starting error:', err);

});
app.use(parser.json());
// app.use.parser.urlencoded({extended: false})

app.use((req,res,next)=>{
res.setHeader("Access-Control-Allow-Origin","*")
res.setHeader("Access-Control-Allow-Headers","Origin, x-Requested-With,COntent-Type,Accept");
res.setHeader("Access-Control-Allow-Methods","GET,PUT,POST,PATCH,DELETE,OPITONS")
  next();
})
// d2RckjRY9lfzMBNp
app.use("/api/posts", postsRoutes);
module.exports = app;
