filters = {
	office: true,
	id: 0,
	status: [0, 1, 2, 3, 4],
	p_id: 0,
	p_fname: '',
	p_lname: '',
	d_id: 0,
	d_fname: '',
	d_lname: '',
	upcoming: true,
	date: '',
	start: '',
	end: '',
	descend: true
}

function filter(con, filters, callback) {
	var office = (filters.office) ? "a.notes AS notes, " : "";

	var filler = "a.id IS NOT NULL ";

	var id = (filters.id) ? "a.id=" + filters.id + " " : filler;
	var status = (filters.status) ? "a.status IN (" + filters.status.toString() + ") " : filler;
	var p_id = (filters.p_id || filters.p_id === 0) ? "a.p_id=" + filters.p_id + " " : filler;
	var p_fname = (filters.p_fname) ? "p.fname LIKE '%" + filters.p_fname + "%' " : filler;
	var p_lname = (filters.p_lname) ? "p.lname LIKE '%" + filters.p_lname + "%' " : filler;
	var d_id = (filters.d_id || filters.d_id === 0) ? "a.d_id=" + filters.d_id + " " : filler;
	var d_fname = (filters.d_fname) ? "d.fname LIKE '%" + filters.d_fname + "%' " : filler;
	var d_lname = (filters.d_lname) ? "d.lname LIKE '%" + filters.d_lname + "%' " : filler;
	var date = (filters.date) ? "a.start BETWEEN '" + filters.date + " 00:00:00' AND '" + filters.date + " 23:59:59' " : filler;
	var month = (filters.start) ?  "a.start BETWEEN '" + filters.start + " 00:00:00' AND '" + filters.end + " 23:59:59' " : filler;
	var upcoming = (filters.upcoming) ? "a.start >= NOW() " : filler;
	var order = (filters.descend) ? "DESC;" : "ASC;";
	
	var sql = "SELECT " 
		+ "a.id AS id, "
		+ "a.start AS start, "
		+ "a.end AS end, "
		+ "a.description AS description, "
		+ office
		+ "a.status AS status, "
		+ "a.p_id AS p_id, "
		+ "p.fname AS p_fname, "
		+ "p.lname AS p_lname, "
		+ "a.d_id AS d_id, "
		+ "d.fname AS d_fname, "
		+ "d.lname AS d_lname "
		+ "FROM db.Appointments AS a "
		+ "LEFT JOIN db.Patients AS p ON a.p_id=p.id "
		+ "LEFT JOIN db.Doctors AS d ON a.d_id=d.id "
		+ "WHERE " + id
		+ "AND " + status
		+ "AND " + p_id
		+ "AND " + p_fname
		+ "AND " + p_lname
		+ "AND " + d_id
		+ "AND " + d_fname
		+ "AND " + d_lname
		+ "AND " + date
		+ "AND " + month
		+ "AND " + upcoming
		+ "ORDER BY a.start " + order;

	con.query(sql, function(err, result) {
		if (err) {
            console.log('Failed to retrieve list of appointments from database.');
            console.log(err);
        } else {
            console.log('Retrieved list of appointments from database.')
        }

        callback(err, result);
	});
}

module.exports = {
	filter
}