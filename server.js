var express = require('express');
var app = express();
var path = require('path');
var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password"
});

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/index.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.js'));
});

app.post('/addPatient', function(req, res) {
    console.log(req.body);

    con.connect(function(err) {
        var addPatient = 'INSERT INTO db.Patients (fname, lname, birthdate, sex) VALUES ?';
        var values = [[req.body.fname, req.body.lname, req.body.birth, req.body.sex]];

        con.query(addPatient, [values], function(err, result) {
            if (err) throw err;
            console.log('Patient added.');
        })

        con.end();
    })
});

app.listen(8080);
