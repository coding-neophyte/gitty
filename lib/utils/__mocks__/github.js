const getCode = async (code) => {
  console.log(`MOCK INVOKED: getCode(${code})`);
  return `MOCK_TOKEN_FOR_CODE_${code}`;
};

const getUserProfile = async (token) => {
  console.log(`MOCK INVOKED: getUserProfile(${token})`);
  return {
    login: 'fake_github_user',
    avatar_url: 'https://www.placecage.com/gif/300/300',
    email: 'not-real@example.com',
  };
};

module.exports = { getCode, getUserProfile };
