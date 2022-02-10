const { Router } = require('express');

module.exports = Router().get('/login', async (req, res, next) => {
  try{
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=user`);

  }catch(error){
    next(error);
  }
});
