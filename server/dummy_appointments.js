const mysql = require('mysql');
const query = require('./lib/query');
const con = require('./cfg/mysql').con;

con.connect(function(err) {
	if (err) throw err;

	var d1 = {id: 1, fname: 'Benjamin', lname: 'Harp'};
	var d2 = {id: 2, fname: 'Tilman', lname: 'Gromme'};
	var d3 = {id: 3, fname: 'Hoon Yeom', lname: 'Kyung'};
	var d4 = {id: 4, fname: 'Dane', lname: 'Koval'};
	var d5 = {id: 5, fname: 'Darren', lname: 'Chiang'};

	var p1 = {fname: 'Evan', lname: 'Chiang'};
	var p2 = {fname: 'John', lname: 'Jones'};
	var p3 = {fname: 'Geraldo', lname: 'Riverman'};
	var p4 = {fname: 'Funny', lname: 'Man'};
	var p5 = {fname: 'Help', lname: 'Me'};

	var da2 = new Date();
	da2.setDate(da2.getDate() + 1);
	var da3 = new Date();
	da3.setDate(da3.getDate() + 2);
	var da4 = new Date();
	da4.setDate(da4.getDate() + 3);
	var da5 = new Date();
	da5.setDate(da5.getDate() + 4);
	var da6 = new Date();
	da6.setDate(da6.getDate() + 5);
	var da7 = new Date();
	da7.setDate(da7.getDate() + 6);

	var a1 = {start: new Date(), end: null, description: "Hey hello there.", status: 1};
	var a2 = {start: da2, end: null, description: "Hey hello there.", status: 1};
	var a3 = {start: da3, end: null, description: "Save me.", status: 1};
	var a4 = {start: da4, end: null, description: "Health checkup.", status: 1};
	var a5 = {start: da5, end: null, description: "Make it stop.", status: 1};
	var a6 = {start: da6, end: null, description: "Smile.", status: 1};
	var a7 = {start: da7, end: null, description: "Yep.", status: 1};

	query.addAppointment(con, a1, p1, d1, function(err) {
		if (err) throw err;
	});

	query.addAppointment(con, a2, p2, d2, function(err) {
		if (err) throw err;
	});

	query.addAppointment(con, a3, p3, d3, function(err) {
		if (err) throw err;
	});

	query.addAppointment(con, a4, p4, d4, function(err) {
		if (err) throw err;
	});

	query.addAppointment(con, a5, p5, d5, function(err) {
		if (err) throw err;
	});

	query.addAppointment(con, a6, p1, d3, function(err) {
		if (err) throw err;
	});

	query.addAppointment(con, a7, p4, d2, function(err) {
		if (err) throw err;
	});
});