const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();


// Built in middleware
app.use(express.json());
app.use(cookieParser());

// App routes

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use('/api/v1/github', require('../lib/controllers/gitusers'));
app.use('/api/v1/posts', require('../lib/controllers/posts'));
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
