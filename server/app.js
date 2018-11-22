'use strict';

const express = require('express');
const db = require('./db');

const app = express();

// CORS middleware
const allowCrossDomain = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);

// Routes
app.get('/', (req, res) => {
  res.status(200).send('Hello, world test commit!');
});

app.get('/test', (req, res) => {
  db.getUsers().then(users => {
    res.status(200).send(users);
  });
});

if (module === require.main) {
  // Start the server
  const server = app.listen(process.env.PORT || 8081, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
}

module.exports = app;
