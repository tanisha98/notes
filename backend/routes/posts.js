const express = require('express');
const multer =require("multer");
const router = express.Router();
const Post = require('../models/post');
const mime_type ={
  'images/png':'png',
  'image/jpeg': 'jpg',
  'images/jpg': 'jpg'
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isvalid = mime_type[file.mimetype];
    let error = new Error("invalid mime type");
    if(isvalid){
      error = null;
    }
    cb(null, "backend/images");
  },
  file: (req,file,cb) => {
    const name = file.orginalname.toLowerCase().split(' ').join('-');
    const ext = mime_type[file.mimetype];
    cb(null,name + '-'+ Date.now() + '-' +ext);
  }
});
router.post("",multer({storage: storage}).single("image"),(req,res,next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result =>{
    res.status(201).json({
      message: "Post added",
      postId: result._id
    });
  });
  });
  router.put("/:id",(req,res,next) => {
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.connect
    })
    Post.updateOne({_id: req.params.id},post).then(result => {
      console.log(result);
      res.status(200).json({message: "Update successful"});
    })
  });
  router.get('',(req,res,next)=>{
    Post.find()
    .then(documents =>{
      res.status(200).json({
        messgae:' post fetched succ',
        posts: documents
      });
    });
  });
    router.get('/:id',(req,res,next)=>{
      Post.findById(req.params.id)
      .then(post =>{
      if(post){
        res.status(200).json(post);
      }else{
        res.status(404).json({message: 'Post not found! '});
      }
      });

    });

    router.delete("/:id",(req,res,next) => {
      Post.deleteOne({_id : req.params.id}).then(result =>{
        console.log(result);
      })
  res.status(200).json({ message: "post deleted" });
    });

    module.exports = router;
