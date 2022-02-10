const { Router } = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try{
    const postList = await Post.getPost();

    res.send(postList);
  }catch(error){
    next(error);
  }
})
  .post('/', authenticate, async () => {
    const newPost = await Post.insert({
      text: req.body.text,
    });
    res.send(newPost);
  });
