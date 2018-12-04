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
  res.status(200).send(process.env.SQL_USER);
});

app.get('/tournaments', (req, res) => {
  db.getTournaments().then(tournaments => {
    res.status(200).send(tournaments);
  });
});
app.get('/tournaments/:id', (req, res) => {
  db.getTournamentById(req.params.id).then(tournament => {
    res.status(200).send(tournament);
  });
});

app.get('/prizepools', (req, res) => {
  db.getPrizePools().then(prizepools => {
    res.status(200).send(prizepools);
  });
});
app.get('/prizepools/:tournamentId', (req, res) => {
  db.getPrizePoolByTournamentId(req.params.tournamentId).then(prizepool => {
    res.status(200).send(prizepool);
  });
});

// will need to change this
/*
app.get('/rankings/:tournamentId', (req, res) => {
  db.getTournamentTeamRankingByTournamentId(req.param.tournamentId).then(prizepool => {
    res.status(200).send(prizepool);
  });
});
*/

app.get('/teams', (req, res) => {
  db.getTeams().then(teams => {
    res.status(200).send(teams);
  });
});
app.get('/teams/:id', (req, res) => {
  db.getTeamById(req.params.id).then(team => {
    res.status(200).send(team);
  });
});

app.get('/games', (req, res) => {
  db.getGames().then(games => {
    res.status(200).send(games);
  });
});
app.get('/games/:id', (req, res) => {
  db.getGameById(req.params.id).then(game => {
    res.status(200).send(game);
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
