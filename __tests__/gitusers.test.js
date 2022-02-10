const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const GithubUser = require('../lib/models/GithubUser');

const agent = request.agent(app);
jest.mock('../lib/utils/github');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect user to github page', async () => {
    const res = await agent.get('/api/v1/github/login');

    expect(res.header.location).toMatch(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=user`);
  });

  it('should redirect user to the dashboard page', async () => {
    const res = await agent.get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'fake_github_user',
      avatar: expect.any(String),
      email: 'not-real@example.com',
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });
  it('should logout user', async () => {
    const res = await agent.delete('/api/v1/github/sessions').send({
      id: expect.any(String),
      username: 'fake_github_user',
      avatar: expect.any(String),
      email: 'not-real@example.com',
      iat: expect.any(Number),
      exp: expect.any(Number),
    });

    expect(res.body).toEqual({
      success: true,
      message: 'logout successful'
    });
  });
});
