//Script for generating dummy appointments. Run using "node [filename].js"

const con = require('../cfg/mysql').con;
const dp = require('./dummy_patients.js');
const dd = require('./dummy_doctors.js');
const da = require('./dummy_appointments.js');
const dr = require('./dummy_requests.js');


con.connect(function(err) {
	if (err) throw err;

	dp.dummy_patients(con, function() {
		dd.dummy_doctors(con, function() {
			da.dummy_appointments(con, function() {
				dr.dummy_requests(con, function() {
					con.end();
				});
			});
		});
	});
});