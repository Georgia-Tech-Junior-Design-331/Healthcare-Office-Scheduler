filters = {
	office: true,
	id: 0,
	urgent: 0,
	type: 0,
	a_id: 0,
	a_status: [0, 1, 2, 3, 4],
	p_id: 0,
	p_fname: '',
	p_lname: '',
	d_id: 0,
	d_fname: '',
	d_lname: '',
	upcoming: true,
	day: '',
	descend: true
}

function filter(con, filters, callback) {
	var office = (filters.office) ? "a.notes AS a_notes, " : "";

	var filler = "r.id IS NOT NULL ";

	var id = (filters.id) ? "r.id=" + filters.id + " " : filler;
	var urgent = (filters.urgent || filters.urgent === 0) ? "r.urgent=" + filters.urgent + " " : filler;
	var type = (filters.type || filters.type === 0) ? "r.type=" + filters.type + " " : filler;
	var a_id = (filters.a_id) ? "a.id=" + filters.a_id + " " : filler;
	var a_status = (filters.a_status) ? "a.status IN (" + filters.a_status.toString() + ") " : filler;
	var p_id = (filters.p_id || filters.p_id === 0) ? "a.p_id=" + filters.p_id + " " : filler;
	var p_fname = (filters.p_fname && filters.p_id == null) ? "p.fname LIKE '%" + filters.p_fname + "%' ": filler;
	var p_lname = (filters.p_lname && filters.p_id == null) ? "p.lname LIKE '%" + filters.p_lname + "%' ": filler;
	var d_id = (filters.d_id || filters.d_id === 0) ? "a.d_id=" + filters.d_id + " " : filler;
	var d_fname = (filters.d_fname && filters.d_id == null) ? "d.fname LIKE '%" + filters.d_fname + "%' ": filler;
	var d_lname = (filters.d_lname && filters.d_id == null) ? "d.lname LIKE '%" + filters.d_lname + "%' ": filler;
	var date = (filters.date) ? "a.start BETWEEN '" + filters.date + " 00:00:00' AND '" + filters.date + " 23:59:59' " : filler;
	var upcoming = (filters.upcoming) ? "a.start >= NOW() " : filler;
	var order = (filters.descend) ? "DESC;" : "ASC;";
	
	var sql = "SELECT " 
		+ "r.id AS id, "
		+ "r.urgent AS urgent, "
		+ "r.type AS type, "
		+ "r.description AS description, "
		+ "a.id AS a_id, "
		+ "a.start AS a_start, "
		+ "a.end AS a_end, "
		+ "a.description AS a_description, "
		+ office
		+ "a.status AS status, "
		+ "a.p_id AS p_id, "
		+ "p.fname AS p_fname, "
		+ "p.lname AS p_lname, "
		+ "a.d_id AS d_id, "
		+ "d.fname AS d_fname, "
		+ "d.lname AS d_lname "
		+ "FROM db.Requests AS r "
		+ "LEFT JOIN db.Appointments AS a ON r.a_id=a.id "
		+ "LEFT JOIN db.Patients AS p ON a.p_id=p.id "
		+ "LEFT JOIN db.Doctors AS d ON a.d_id=d.id "
		+ "WHERE " + id
		+ "AND " + urgent
		+ "AND " + type
		+ "AND " + a_id
		+ "AND " + a_status
		+ "AND " + p_id
		+ "AND " + p_fname
		+ "AND " + p_lname
		+ "AND " + d_id
		+ "AND " + d_fname
		+ "AND " + d_lname
		+ "AND " + date
		+ "AND " + upcoming
		+ "ORDER BY a.start " + order;

	con.query(sql, function(err, result) {
		if (err) {
            console.log('Failed to retrieve list of requests from database.');
            console.log(err);
        } else {
            console.log('Retrieved list of requests from database.')
        }

        callback(err, result);
	});
}

module.exports = {
	filter
}