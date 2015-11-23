var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/vegan';


/* Create a single vegan. */
router.post('/v1/vegan', function (req, res) {
    console.log(req.body)
    var results = [];

    //Grab data from http request
    var data = {
        user: req.body.user,
        email: req.body.email,
        schedule: req.body.schedule
    };

    //Create inverse schedule for Query
    function matchSchedule(sched) {
        var opposite = '';
        for (var i = 0; i < 7; i++) {
            if (sched.charAt(i) === '0') {
                opposite += '1';
                console.log(opposite.charAt(i))
            } else {
                opposite += '0';
                console.log(opposite.charAt(i))
            }
        }
        console.log(opposite);
        return opposite;
    }

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


        //SQL Query > select data
        var match = matchSchedule(data.schedule);

        var query = client.query("SELECT * FROM vegans WHERE user_schedule = B'" + match + "' LIMIT 1");

        //Stream results back one row at a time
        query.on('row', function (row) {
            if (row.id) {
                data.partner = row.id;
                results.push(row);
            } else {

            }

        });

        //SQL Query > insert data
        client.query("INSERT INTO vegans(user_id, user_schedule, user_email, partner_id) VALUES($1, $2, $3, $4)", [data.user, data.schedule, data.email, data.partner]);

        //Stream results back one row at a time
        query.on('end', function () {
            //client.query("UPDATE vegans SET partner_id = SCOPE_IDENTITY() WHERE id = " + data.partner + "");
            done();
            return res.json(results);
        });


    });
});

module.exports = router;