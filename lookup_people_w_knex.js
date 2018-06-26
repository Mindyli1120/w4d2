const input = process.argv[2];
const moment = require('moment')
const pg = require("pg");
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

knex.select('*').from('famous_people')
.where('first_name', "=", input)
.asCallback(function(err, rows) {
    if (err) return console.error(err);
    function getResult(result) {
        console.log('Searching...');
        const number_of_persons = rows.length;
        console.log(`Found ${number_of_persons} person(s) by the name ${input}:`);
        for (const person in rows) {
            console.log(`- ${Number(person) + 1}: ${rows[person].first_name} ${rows[person].last_name}, born ${moment(rows[person].birthdate).format('YYYY-MM-DD')}`);
        }
    }
    getResult(rows);
})
.finally(function() {
    knex.destroy();
})
  


