//Script for generating dummy appointment requests. Run using "node [filename].js"
const mysql = require('mysql');
const query = require('../lib/query');
const con = require('../cfg/mysql').con;

function dummy_requests(con, callback) {
	query.getAppointments(con, function(err, result) {
		if (err) throw err;

		var appointments = result;
		var a0 = appointments[0];
		var a1 = appointments[1];
		var a2 = appointments[2];
		var a3 = appointments[3];
		var a4 = appointments[4];
		
		var r0 = {datetime: new Date(), urgent: 0, type: 0, description: "cancel plz"};
		var r1 = {datetime: new Date(), urgent: 1, type: 1, description: "delay plz"};
		var r2 = {datetime: new Date(), urgent: 0, type: 1, description: "hello"};
		var r3 = {datetime: new Date(), urgent: 0, type: 0, description: "help"};
		var r4 = {datetime: new Date(), urgent: 1, type: 0, description: "yo"};

		query.addRequest(con, r0, a0, function(err) {
			if (err) throw err;

			query.addRequest(con, r1, a1, function(err) {
				if (err) throw err;

				query.addRequest(con, r2, a2, function(err) {
					if (err) throw err;

					query.addRequest(con, r3, a3, function(err) {
						if (err) throw err;

						query.addRequest(con, r4, a4, function(err) {
							if (err) throw err;

							callback();
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
		
		dummy_requests(con, function() {
			con.end();
		});
	});
}

module.exports = {
    dummy_requests
};