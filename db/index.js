// Load our .env file
require('dotenv').config()

// Require Client obj from the postgres node module
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: 'nassydev.synology.me',
    user: 'kyle',
    password: process.env.DB_PASSWORD,
    database:'api-express-database',
    timezone: 'utc',
  },
  debug: false,
});

const client = {
  query: async (str, values) => {
    // Get the connection string from process.env -
    // the dotenv library sets this variable based
    
    // on the contents of our env file

    // Create a new connection to the database using the Client

    // object provided by the postgres node module

    // connect a connection

    // execute the query
    const result = await knex.raw(str, values)
    // close the connection
    return result[0]
  }
}

module.exports = client;
