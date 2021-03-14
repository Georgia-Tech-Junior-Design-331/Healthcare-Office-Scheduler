const express = require('express');
const mysql = require('mysql');
const query = require('./lib/query');
const path = require('path');

const app = express();
const con = require('./cfg/mysql').con;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const office = __dirname + '/../client/office/';
const login = __dirname + '/../client/login/';

app.use('/assets', express.static(office + 'assets'));

// TESTING
app.get('/testing', function(req, res) {
	res.sendFile(path.join(__dirname + '/testing.html'));
});

app.get('/', function(req, res) {
	res.redirect('/home');
});

// Temporary get request to test login page functionality
app.get('/login', function(req, res) {
	res.sendFile(path.join(login + 'login.html'));
});

app.get('/home', function(req, res) {
    res.sendFile(path.join(office + 'index.html'));
});

app.get('/menuBar.js', function(req, res) {
    res.sendFile(path.join(office + 'menuBar.js'));
});

app.get('/calendar.js', function(req, res) {
    res.sendFile(path.join(office + 'calendar.js'));
});

app.get('/dynamic_app.js', function(req, res) {
	res.sendFile(path.join(office + 'dynamic_app.js'));
});

app.get('/TableElement.js', function(req, res) {
    res.sendFile(path.join(office + 'TableElement.js'));
});

app.get('/profile', function(req, res) {
	res.sendFile(path.join(office + 'profile.html'));
});

app.get('/appointment', function(req, res) {
	console.log('Client requests page for appointment id: ' + req.query.id);
});

app.get('/appointments', function(req, res) {
	res.sendFile(path.join(office + 'appointments.html'));
});

app.get('/appointments.js', function(req, res) {
	res.sendFile(path.join(office + 'appointments.js'));
});

app.get('/appointmentListing', function(req, res) {
	res.sendFile(path.join(office + 'appointmentListing.html'));
});

app.get('/appointmentListing.js', function(req, res) {
	res.sendFile(path.join(office + 'appointmentListing.js'));
});

app.get('/delays', function(req, res) {
	res.sendFile(path.join(office + '/delays'));
});

app.get('/upcomingAppointments', function(req, res) {
    res.sendFile(path.join(office + 'upcomingAppointments.html'));
});

app.get('/upcomingAppointments.js', function(req, res) {
    res.sendFile(path.join(office + 'upcomingAppointments.js'));
});

app.get('/addAppointmentPage', function(req, res) {
    res.sendFile(path.join(office + 'addAppointmentPage.html'));
});

app.get('/addAppointmentPage.js', function(req, res) {
    res.sendFile(path.join(office + 'addAppointmentPage.js'));
});

app.get('/contact', function(req, res) {
    res.sendFile(path.join(office + 'contact.html'));
});

app.get('/contact.js', function(req, res) {
    res.sendFile(path.join(office + 'contact.js'));
});

app.post('/getPatientByName', function(req, res) {
	console.log('/getPatientByName');
	query.getPatientByName(con, req.body.name, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}			
	});
});

app.get('/getDoctors', function(req, res) {
	console.log('/getDoctors');
	query.getDoctors(con, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.post('/addDoctor', function(req, res) {
	console.log('/addDoctor');
	query.addDoctor(con, req.body, function(err) {
		query.getDoctors(con, function(err, result) {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}			
		});
	});
});

app.get('/getAppointments', function(req, res) {
	console.log('/getAppointments');
	query.getAppointments(con, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.get('/getUpcomingAppointments', function(req, res) {
	console.log('/getUpcomingAppointments');
	query.getUpcomingAppointments(con, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.get('/getAppointmentsOnDay', function(req, res) {
	console.log('/getAppointmentsOnDay');
	query.getAppointmentsOnDay(con, req.query.date, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.post('/addAppointment', function(req, res) {
	console.log('/addAppointment');
	var appointment = req.body.appointment;
	var patient = req.body.patient;
	var doctor = req.body.doctor;
	query.addAppointment(con, appointment, patient, doctor, function(err) {
		query.getUpcomingAppointments(con, function(err, result) {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		});
	});
});

app.get('/requests', function(req, res) {
	res.sendFile(path.join(office + 'requests/index.html'));
});

app.get('/requests/index.js', function(req, res) {
	res.sendFile(path.join(office + 'requests/index.js'));
});

app.get('/getRequestsOffice', function(req, res) {
	console.log('/getRequestsOffice');
	query.getRequestsOffice(con, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.listen(8080, function(err) {
	if (err) {
		throw err;
	}

	console.log('Server is listening on port 8080.');
});

con.connect(function(err) {
	if (err) {
		console.log('Failed to connect to database.');
		console.log(err);
	} else {
		console.log('Connected to database.');
	}	
});