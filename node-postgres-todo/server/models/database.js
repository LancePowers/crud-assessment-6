var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/vegan';
var client = new pg.Client(connectionString);
client.connect();

var query = client.query('CREATE TABLE IF NOT EXISTS vegans(id SERIAL PRIMARY KEY, user_id VARCHAR(30) NOT NULL, user_email VARCHAR(30) NOT NULL, user_schedule BIT(7) NOT NULL, partner_id VARCHAR(10))')
query.on('end', function () {
    console.log('vegans table created')
    client.end();
});