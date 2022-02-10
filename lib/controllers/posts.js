const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try{
      const newPost = await Post.insert({
        text: req.body.text,
        userId: req.user.id
      });
      console.log(newPost);
      res.send(newPost);
    }catch(error){
      next(error);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try{
      const postList = await Post.getPost();

      res.send(postList);
    }catch(error){
      next(error);
    }
  });
