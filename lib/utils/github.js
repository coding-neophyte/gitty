const fetch = require('cross-fetch');

const getCode = async (code) => {
  const requestToken = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  const token = await requestToken.json();
  console.log(token);

  return token.access_token;
};

const getUserProfile = async (token) => {
  console.log(token);
  const getUserData = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `token ${token}`,
    }
  });
  const jsonProfile = getUserData.json();

  return jsonProfile;
};

module.exports = { getCode, getUserProfile };
