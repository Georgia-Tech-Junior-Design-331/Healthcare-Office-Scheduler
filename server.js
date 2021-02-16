var express = require('express');
var app = express();
var path = require('path');
var mysql = require("mysql");

function addPatient(con, patient) {
    con.connect(function(err) {
        if (err) {
            console.log('Failed to connect to database.');
            throw err;
        }

        var sql = "INSERT INTO db.Patients (fname, lname, birthdate, sex) VALUES ?;";
        var values = [[patient.fname, patient.lname, patient.birth, patient.sex]];

        con.query(sql, [values], function(err, result) {
            if (err) {
                console.log('Query failed.');
                throw err;
            }

            console.log('Patient added.');
            con.end();         
        });
    });
}

function getPatientID(con, patient) {
    con.connect(function(err) {
        if (err) {
            console.log('Failed to connect to database.');
            throw err;
        }

        var sql = "SELECT id FROM db.Patients WHERE fname='" + patient.fname
                + "' AND lname='" + patient.lname
                + "' AND age='" + patient.age
                + "' AND sex='" + patient.sex + "';";

        con.query(sql, function(err, result) {
            if (err) {
                console.log('Query failed.');
                throw err;
            }

            return result;
        });
    });
}

function addAppointment(con, appointment, patient_id) {
    con.connect(function(err) {
        if (err) {
            console.log('Failed to connect to database.');
            throw err;
        }

        var sql = "INSERT INTO db.Appointments (patient_id, datetime) VALUES ?;";
        var values = [[patient_id, appointment.datetime]];

        con.query(sql, function(err) {
            if (err) {
                console.log('Query failed.');
                throw err;
            }
        });
    })
}

var con = mysql.createConnection({
    host: "localhost",
    user: "server",
    password: "Password123"

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
    addPatient(con, req.body);
});

app.post('/addAppointment', function(req, res) {
    console.log(req.body);\
    /*
    var result = await getPatientID(con, req.body.patient);
    if (result.length == 1) {
        addAppointment(...);
    } else if (result.length > 1) {
        console.log('Multiple patients with same specifications, cannot create appointment.');
    } else {
        //create patient
        addAppointment(...);
    }
    
    */
});

app.listen(8080);
