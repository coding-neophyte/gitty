const { Router } = require('express');
const GithubUser = require('../models/GithubUser');
const getCode = require('../utils/github');
const getUserProfile = require('../utils/github');
const jwt = require('jsonwebtoken');

module.exports = Router().get('/login', async (req, res, next) => {
  try{
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=user`);

  }catch(error){
    next(error);
  }
})
  .get('/login/callback', async (req, res, next) => {
    try{
      const token = await getCode(req.query.code);

      const profile = await getUserProfile(token);

      let user = await GithubUser.findByUsername(profile.login);

      if(!user){
        user = await GithubUser.insert({
          username: profile.login,
          email: profile.email,
          avatar: profile.avatar_url,
        });
      }

      const webToken = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });

      res.cookie(process.env.COOKIE_NAME, webToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });

      res.redirect('/');

    }catch(error){
      next(error);
    }

  });
