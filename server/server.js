const express = require('express');
const path = require('path');
const mysql = require('mysql');
const query = require('./lib/query');

const app = express();
const con = require('./cfg/mysql').con;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
//app.use(express.static(__dirname + 'dir of public folder'));

// TESTING START
app.get('/testing', function(req, res) {
	res.sendFile(path.join(__dirname + '/testing.html'));
});

app.get('/getDoctors', function(req, res) {
	query.getDoctors(con, function(err, result) {
		res.send(result);
	});
});

app.post('/addDoctor', function(req, res) {
	query.addDoctor(con, req.body, function(err) {
		query.getDoctors(con, function(err, result) {
			res.send(result);
		});
	});
});
// TESTING END

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../client/office/index.html'));
});

app.get('/css/main.css', function(req, res) {
	res.sendFile(path.join(__dirname + '/../client/office/css/main.css'));
});

app.get('/images/person-icon.png', function(req, res) {
    res.sendFile(path.join(__dirname + '/../client/office/images/person-icon.png'));
});

app.get('/calendar.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/../client/office/calendar.js'));
});

app.get('/upcomingAppointments', function(req, res) {
    res.sendFile(path.join(__dirname + '/../client/office/upcomingAppointments.html'));
});

app.get('/upcomingAppointmentsStyle.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/../client/office/upcomingAppointmentsStyle.css'));
});

app.listen(8080);
console.log('Server is listening on port 8080.');
con.connect();
console.log('Connected to database.');


