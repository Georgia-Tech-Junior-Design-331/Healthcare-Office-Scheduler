//Script for generating dummy doctors. Run using "node [filename].js"
const mysql = require('mysql');
const query = require('../lib/query');
const con = require('../cfg/mysql').con;

function dummy_doctors(con, callback) {
	var d1 = {fname: 'Benjamin', lname: 'Harp'};
	var d2 = {fname: 'Tilman', lname: 'Gromme'};
	var d3 = {fname: 'Kyung Hoon', lname: 'Yeom'};
	var d4 = {fname: 'Dane', lname: 'Koval'};
	var d5 = {fname: 'Darren', lname: 'Chiang'};

	query.addDoctor(con, d1, function(err) {
		if (err) throw err;

		query.addDoctor(con, d2, function(err) {
			if (err) throw err;

			query.addDoctor(con, d3, function(err) {
				if (err) throw err;

				query.addDoctor(con, d4, function(err) {
					if (err) throw err;

					query.addDoctor(con, d5, function(err) {
						if (err) throw err;

						callback();
					});
				});
			});
		});
	});	
}

if (require.main === module) {
    con.connect(function(err) {
		if (err) throw err;

		dummy_doctors(con, function() {
			con.end();
		});
	});
}

module.exports = {
    dummy_doctors
};