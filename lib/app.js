const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use('/api/v1/github', require('../lib/controllers/gitusers'));
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
