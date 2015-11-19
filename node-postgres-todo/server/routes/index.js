var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/vegan';


/* Create a single vegan. */
router.post('/api/v1/schedules', function (req, res) {
    console.log(req.body)
    var results = [];

    //Grab data from http request
    var data = {
        user: req.body.user,
        schedule: req.body.schedule
    };


    //Get client from connection pool
    pg.connect(connectionString, function (err, client, done) {
        //Connection error handling
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        //SQL Query > insert data
        client.query("INSERT INTO schedules(user_id, user_schedule) values($1, $2)", [data.user, data.schedule]);

        //SQL Query > select data
        var query = client.query("SELECT * FROM schedules ORDER BY id ASC");

        //Stream results back one row at a time
        query.on('row', function (row) {
            console.log('here');
            results.push(row);
        });

        //Stream results back one row at a time
        query.on('end', function () {
            done();
            return res.json(results);
        });

    });
});

module.exports = router;