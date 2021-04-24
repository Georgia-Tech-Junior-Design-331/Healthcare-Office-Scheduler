function login(con, username, password, callback) {
	var sql = "SELECT * FROM db.Patients WHERE "
		+ "username='" + username + "' and "
		+ "password='" + password + "';";

    con.query(sql, function(err, result) {
		if (err) {
			console.log('Query failed.');
		} else {
			if (result.length == 1) {
				console.log('Verified.');
			} else {
				result = [{id: -1}]
				console.log('Incorrect.');
			}
		}

        callback(err, result);
    });
}

module.exports = {
	login
}