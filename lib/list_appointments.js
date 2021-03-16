filters = {
	office: true,
	status: [0, 1, 2, 3, 4],
	p_id: 0,
	p_fname: '',
	p_lname: '',
	d_id: 0,
	d_fname: '',
	d_lname: '',
	ascending: true,
}

function getAppointments(con, filters, callback) {
	var office = (filters.office) ? "a.notes AS notes, " : "";

	var status = (filters.status) ? "a.status IN (" + filters.status.toString() + ") " : "";
	var p_id = (filters.p_id || filters.p_id === 0) ? "a.p_id=" + filters.p_id + " " : "";
	var p_fname = (filters.p_fname && filters.p_id == null) ? "p.fname LIKE '%" + filters.p_fname + "%' ": "";
	var p_lname = (filters.p_lname && filters.p_id == null) ? "p.lname LIKE '%" + filters.p_fname + "%' ": "";
	var d_id = (filters.d_id || filters.d_id === 0) ? "a.d_id=" + filters.d_id + " " : "";
	var d_fname = (filters.d_fname && filters.d_id == null) ? "d.fname LIKE '%" + filters.d_fname + "%' ": "";
	var d_lname = (filters.d_lname && filters.d_id == null) ? "d.lname LIKE '%" + filters.d_fname + "%' ": "";

	var where = (status.length + p_id.length + p_fname.length + p_lname.length + d_id.length + d_fname.length + d_lname.length) ? "WHERE " : "";
	var and1 = (status.length && p_id.length) ? "AND " : "";
	var and2 = (p_id.length && p_fname) ? "AND " : "";
	var and3 = (p_fname && p_lname) ? "AND " : "";
	var and4 = (p_lname && d_id) ? "AND " : "";
	var and5 = (d_id && d_fname) ? "AND " : "";
	var and6 = (d_fname && d_lname) ? "AND " : "";
	
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
		+ where
		+ status + and1
		+ p_id + and2
		+ p_fname + and3
		+ p_lname + and4
		+ d_id + and5
		+ d_fname + and6
		+ d_lname + ";";

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
	getAppointments
}