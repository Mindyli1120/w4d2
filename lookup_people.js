const input = process.argv[2];
const moment = require('moment')
const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [input], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Searching...');
    const number_of_persons = result.rows.length;
    console.log(`Found ${number_of_persons} person(s) by the name ${input}:`);
    getResult(result);
    client.end();
  });
});

function getResult(result) {
    for (const person in result.rows) {
        console.log(`- ${Number(person) + 1}: ${result.rows[person].first_name} ${result.rows[person].last_name}, born ${moment(result.rows[person].birthdate).format('YYYY-MM-DD')}`);
    }
}


