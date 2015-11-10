var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';
var client = new pg.client(connectionString);
client.connect();
var query = clieng.query('CREAT TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)')
query.on('end', function () {
    client.end();
});