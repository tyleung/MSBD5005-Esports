const Knex = require('knex');

const config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE
};

if (
  process.env.INSTANCE_CONNECTION_NAME &&
  process.env.NODE_ENV === 'production'
) {
  config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}

// Connect to the database
const knex = Knex({
  client: 'mysql',
  connection: config
});

// Get all users.
getUsers = () => {
  return knex
    .select()
    .from('users')
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

// Get all tournaments.
getTournaments = () => {
  return knex
    .select()
    .from('Tournament')
    .then(response => response)
    .catch(err => {
      console.log(err);
      throw err;
    });
};

// Get tournament by id.
getTournamentById = id => {
  return knex
    .select()
    .from('Tournament')
    .where('id', id)
    .then(response => response)
    .catch(err => {
      console.log(err);
      throw err;
    });
};

// Get prize pool by tournament id.
getPrizePoolByTournamentId = id => {
  return knex
    .select()
    .from('PrizePool')
    .where('tournamentId', id)
    .then(response => response)
    .catch(err => {
      console.log(err);
      throw err;
    });
};

// Get tournament team ranking by tournament id.
getTournamentTeamRankingByTournamentId = id => {
  return knex
    .select()
    .from('TournamentTeamRanking')
    .where('tournamentId', id)
    .then(response => response)
    .catch(err => {
      console.log(err);
      throw err;
    });
};

// Get prize pool by team id.
getTournamentTeamRankingByTournamentId = id => {
  return knex
    .select()
    .from('TournamentTeamRanking')
    .where('teamId', id)
    .then(response => response)
    .catch(err => {
      console.log(err);
      throw err;
    });
};

// Get all games.
getGames = () => {
  return knex
    .select()
    .from('Game')
    .then(response => response)
    .catch(err => {
      console.log(err);
      throw err;
    });
};

// Get game by id.
getGameById = id => {
  return knex
    .select()
    .from('Game')
    .where('id', id)
    .then(response => response)
    .catch(err => {
      console.log(err);
      throw err;
    });
};

// Get all teams.
getTeams = () => {
  return knex
    .select()
    .from('Team')
    .then(response => response)
    .catch(err => {
      console.log(err);
      throw err;
    });
};

// Get team by id.
getTeamById = id => {
  return knex
    .select()
    .from('Team')
    .where('id', id)
    .then(response => response)
    .catch(err => {
      console.log(err);
      throw err;
    });
};

module.exports = {
  getUsers
};
