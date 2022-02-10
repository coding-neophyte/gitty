const { Router } = require('express');
const GithubUser = require('../models/GithubUser');
const { getCode, getUserProfile } = require('../utils/github');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

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
      console.log(profile);

      let user = await GithubUser.findByUsername(profile.login);
        console.log(user);
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
      console.log(webToken);
      res.cookie(process.env.COOKIE_NAME, webToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      }).redirect('/api/v1/github/dashboard');

    }catch(error){
      next(error);
    }

  })
  .get('/dashboard', authenticate, async (req, res) => {
      console.log('help', req.user);
    res.send(req.user);
  });
