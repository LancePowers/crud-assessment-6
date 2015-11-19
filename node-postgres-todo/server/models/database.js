var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/vegan';
var client = new pg.Client(connectionString);
client.connect();

var query = client.query('CREATE TABLE schedules(id SERIAL PRIMARY KEY, user_id VARCHAR(30) NOT NULL, user_schedule BIT(7) NOT NULL)')
query.on('end', function () {
    console.log('schedules table created')
    client.end();
});