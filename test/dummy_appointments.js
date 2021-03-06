//Script for generating dummy appointments. Run using "node [filename].js"
const mysql = require('mysql');
const query = require('../lib/query');
const con = require('../cfg/mysql').con;

function dummy_appointments(con, callback) {
	var da2 = new Date();
	da2.setDate(da2.getDate() + 1);
	da2.setHours(10);
	var da3 = new Date();
	da3.setDate(da3.getDate() + 2);
	da3.setHours(12);
	var da4 = new Date();
	da4.setDate(da4.getDate() + 3);
	da4.setHours(9);
	var da5 = new Date();
	da5.setDate(da5.getDate() + 4);
	da5.setHours(15);
	var da6 = new Date();
	da6.setDate(da6.getDate() + 5);
	da6.setHours(14);
	var da7 = new Date();
	da7.setDate(da7.getDate() + 6);
	da7.setHours(11);

	var a1 = {start: new Date(), end: null, description: "Hey hello there.", status: 1};
	var a2 = {start: da2, end: null, description: "Hey hello there.", status: 1};
	var a3 = {start: da3, end: null, description: "Save me.", status: 1};
	var a4 = {start: da4, end: null, description: "Health checkup.", status: 1};
	var a5 = {start: da5, end: null, description: "Make it stop.", status: 1};
	var a6 = {start: da6, end: null, description: "Smile.", status: 1};
	var a7 = {start: da7, end: null, description: "Yep.", status: 1};

	var doctors = {};
	var patients = {};

	query.getDoctors(con, function(err, result) {
        if (err) throw err;

		doctors = result;

		query.getPatients(con, function(err, result) {
	        if (err) throw err;

			patients = result;

			query.addAppointment(con, a1, patients[0], doctors[0], function(err) {
				if (err) throw err;

				query.addAppointment(con, a2, patients[1], doctors[1], function(err) {
					if (err) throw err;

					query.addAppointment(con, a3, patients[2], doctors[2], function(err) {
						if (err) throw err;

						query.addAppointment(con, a4, patients[3], doctors[3], function(err) {
							if (err) throw err;

							query.addAppointment(con, a5, patients[4], doctors[4], function(err) {
								if (err) throw err;

								query.addAppointment(con, a6, patients[5], doctors[2], function(err) {
									if (err) throw err;

									query.addAppointment(con, a7, patients[6], doctors[4], function(err) {
										if (err) throw err;

										callback();
									});
								});
							});
						});
					});
				});
			});			
		});
    });
}

if (require.main === module) {
    con.connect(function(err) {
		if (err) throw err;
		
		dummy_appointments(con, function() {
			con.end();
		});
	});
}

module.exports = {
    dummy_appointments
};