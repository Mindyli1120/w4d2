const settings = require("./settings"); // settings.json
const pg = require('pg');

module.exports = {

  development: {
    client: 'pg',
    connection:{
        user     : settings.user,
        password : settings.password,
        database : settings.database,
        host     : settings.hostname,
        port     : settings.port,
        ssl      : settings.ssl
    }
  }
};
