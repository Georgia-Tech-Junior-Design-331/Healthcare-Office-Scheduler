const express = require('express');
const mysql = require('mysql');
const path = require('path');
const nodemailer = require("nodemailer");

const lib = require('./lib');
const query = lib.query;
const app_list = lib.appointment_list;
const req_list = lib.request_list;
const login = lib.login;
const app = express();
const con = require('./cfg/mysql').con;

const office = __dirname + '/web/office/';
const patient = __dirname + '/web/patient/'

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', express.static(__dirname + '/public/'));
app.use('/modules', express.static(__dirname + '/modules/'));

app.get('/', function(req, res) {
	res.redirect('/temp');
});

app.get('/temp', function(req, res) {
	res.sendFile(path.join(__dirname + '/web/temp.html'));
});

app.get('/login', function(req, res) {
	res.sendFile(path.join(__dirname + '/web/login/index.html'));
});

app.get('/login/index.js', function(req, res) {
	res.sendFile(path.join(__dirname + '/web/login/index.js'));
});

app.get('/office', function(req, res) {
	res.redirect('/office/home');
});

app.get('/office/home', function(req, res) {
    res.sendFile(path.join(office + 'home/index.html'));
});

app.get('/office/home/index.js', function(req, res) {
	res.sendFile(path.join(office + 'home/index.js'));
});

app.get('/office/appointments', function(req, res) {
	res.sendFile(path.join(office + 'appointments/index.html'));
});

app.get('/office/appointments/index.js', function(req, res) {
	res.sendFile(path.join(office + 'appointments/index.js'));
});

app.get('/office/requests', function(req, res) {
	res.sendFile(path.join(office + 'requests/index.html'));
});

app.get('/office/requests/index.js', function(req, res) {
	res.sendFile(path.join(office + 'requests/index.js'));
});

app.get('/office/profile', function(req, res) {
	res.sendFile(path.join(office + 'profile.html'));
});

app.get('/office/appointment', function(req, res) {
	var a_id = req.query.id;
	res.sendFile(path.join(office + 'appointment/index.html'));
});

app.get('/office/appointment/index.js', function(req, res) {
	res.sendFile(path.join(office + 'appointment/index.js'));
});

app.get('/office/delays', function(req, res) {
	res.sendFile(path.join(office + 'delays/index.html'));
});

app.get('/office/new_appointment', function(req, res) {
    res.sendFile(path.join(office + 'new_appointment/index.html'));
});

app.get('/office/new_appointment/index.js', function(req, res) {
    res.sendFile(path.join(office + 'new_appointment/index.js'));
});

app.get('/office/manage_patients', function(req, res) {
    res.sendFile(path.join(office + 'manage_patients/index.html'));
});

app.get('/office/manage_patients/index.js', function(req, res) {
    res.sendFile(path.join(office + 'manage_patients/index.js'));
});

app.get('/patient', function(req, res) {
	res.redirect('/patient/home');
});

app.get('/patient/home', function(req, res) {
	res.sendFile(path.join(patient + 'home/index.html'));
});

app.get('/patient/home/index.js', function(req, res) {
	res.sendFile(path.join(patient + 'home/index.js'));
});

app.post('/sendMail', function(req, res) {
	console.log('/sendMail');
	
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: '', //if using gmail, you have to enable "access for less secure apps"
			pass: ''
		}
  	});
  
	var mailOptions = {
		from: '', //your email
		to: req.body.emailaddr,
		subject: req.body.message,
		text: req.body.message
	};
  
  	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
  	}); 
});

app.post('/verify', function(req, res) {
	var account = req.body.account;

	login.login(con, account.username, account.password, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			console.log(result);
		}
	});
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

app.post('/getDoctors', function(req, res) {
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

app.post('/getPatientAccts', function(req, res) {
	console.log('/getPatientAccts');
	query.getPatientAccts(con, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.post('/addPatient', function(req, res) {
	console.log('/addPatient');
	query.addPatient(con, req.body, function(err) {
	});
});

app.post('/getAppointments', function(req, res) {
	console.log('/getAppointments');
	var filters = req.body.filters;
	app_list.filter(con, filters, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.post('/getAppointmentsByPatient', function(req, res) {
	console.log('/getAppointmentsByPatient');
	var patient = req.body;
	query.getAppointmentsByPatient(con, patient.id, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.post('/getUpcomingAppointments', function(req, res) {
	console.log('/getUpcomingAppointments');
	query.getUpcomingAppointments(con, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.post('/getAppointmentsOnDay', function(req, res) {
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

app.post('/setAppointment', function(req, res) {
	console.log('/addAppointment');
	var appointment = req.body.appointment;
	query.setAppointment(con, appointment, function(err) {
		app_list.filter(con, {id: appointment.id}, function(err, result) {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		});
	});
});

app.post('/getRequests', function(req, res) {
	console.log('/getRequests');
	var filters = req.body.filters;
	req_list.filter(con, filters, function(err, result) {
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