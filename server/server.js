const express = require('express');
const path = require('path');
const mysql = require('mysql');
const query = require('./lib/query');

const app = express();
const con = require('./cfg/mysql').con;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

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

app.post('/addPatient', function(req, res) {
    console.log(req.body);
    query.addPatient(con, req.body);
});

app.post('/addAppointment', function(req, res) {
    console.log(req.body);
    
});

app.listen(8080);
