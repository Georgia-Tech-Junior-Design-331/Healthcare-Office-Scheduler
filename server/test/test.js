const mysql = require('mysql');
const query = require('../lib/query');
const con = require('../cfg/mysql').con;

// Testing various query functions from query.js (REMEMBER to export ALL functions in query.js!)

con.connect(function(err) {
	if (err) throw err;

	/*
	query.getAppointments(con, function(err, result) {
		if (err) throw err;

		console.log(result);
	});
	*/

	/*
	query.getUpcomingAppointments(con, function(err, result) {
		if (err) throw err;

		console.log(result);
	});
	*/

	/*
	query.getEarliestUpcomingAppointments(con, 1, function(err, result) {
		if (err) throw err;

		console.log(result);
	});
	*/

	/*
	query.getPastAppointments(con, function(err, result) {
		if (err) throw err;

		console.log(result);
	});
	*/

	/*
	var app = {'start': new Date(), 'end': null, 'description': 'Hello.', 'status': 1};
	var patient = {'fname': 'Joe', 'lname': 'Cain'};
	var doctor = {'id': 1};

	query.addAppointment(con, app, patient, doctor, function(err) {
		if (err) throw err;
		console.log('Success.');
	});
	*/

	/*
	var app = {'id': 1};

	query.getAppointmentById(con, app, function(err, result) {
		if (err) throw err;
		console.log(result);
	});
	*/

	/*
	query.getRequestsOffice(con, function(err, result) {
		if (err) throw err;
		console.log(result);
	});
	*/

	/*
	var da2 = new Date();
	da2.setDate(da2.getDate() + 1);
	var p1 = {fname: 'Bean ', lname: 'Hart', username: 'bharp', password: '1234', age: 21, birthdate: da2, sex: "Male", phone_number: "4045408977", email: "benharp@gatech.edu"};
	query.addPatient(con, p1, function(err) {
		if (err) throw err;
	});
	*/
});