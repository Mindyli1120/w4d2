const firstName = process.argv[2];
const lastName = process.argv[3];
const birthDate = process.argv[4];
const settings = require("./settings"); // settings.json

const knex = require('knex')({
    client: 'pg',
    connection:{
        user     : settings.user,
        password : settings.password,
        database : settings.database,
        host     : settings.hostname,
        port     : settings.port,
        ssl      : settings.ssl
    }
});

knex.select('first_name', 'last_name', 'birthdate').from('famous_people')
.insert({first_name: firstName, last_name: lastName, birthdate: birthDate}).into('famous_people')
.catch(function(error) {
    console.error(error)
})
.finally(function() {
    knex.destroy();
});
  


