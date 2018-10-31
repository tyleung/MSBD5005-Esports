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
const knex = require('knex')({
  client: 'mysql',
  connection: config
});

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

module.exports = {
  getUsers
};
