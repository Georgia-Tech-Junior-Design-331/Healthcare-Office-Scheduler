/* Temporarily ignoring patient table
function addPatient(con, patient, callback) {
    var sql = "INSERT INTO db.Patients (fname, lname, birthdate, sex) VALUES ?;";
    var values = [[patient.fname, patient.lname, patient.birth, patient.sex]];

    con.query(sql, [values], function(err) {
        if (err) console.log('Query failed.');
        callback(err);
    });
}

function getPatientID(con, patient, callback) {
    var sql = "SELECT id FROM db.Patients WHERE fname='" + patient.fname
            + "' AND lname='" + patient.lname
            + "' AND age='" + patient.age
            + "' AND sex='" + patient.sex + "';";

    con.query(sql, function(err, result) {
        if (err) console.log('Query failed.');
        callback(err, result);
    });
}
*/

function getDoctors(con, callback) {
    var sql = "SELECT * FROM db.Doctors;";

    con.query(sql, function(err, result) {
        if (err) {
            console.log('Failed to retrieve list of doctors from database.');
        } else {
            console.log('Retrieved all of doctors from database.');
            console.log(result);
        }

        callback(err, result);
    });
}

function addDoctor(con, doctor, callback) {
    var sql = "INSERT INTO db.Doctors (fname, lname) VALUES ?;";
    var values = [[doctor.fname, doctor.lname]];

    con.query(sql, [values], function(err) {
        if (err) { 
            console.log('Failed to add doctor ' + doctor.fname + ' ' + doctor.lname + ' to database.');
        } else {
            console.log('Added doctor ' + doctor.fname + ' ' + doctor.lname + ' to database.')
        }

        callback(err);
    });
}

function getAppointments(con, callback) {
    var sql = "SELECT * FROM db.Appointments;";

    con.query(sql, function(err, result) {
        if (err) {
            console.log('Failed to retrieve list of appointments from database.');
        } else {
            console.log('Retrieved all appointments from database.');
        }

        callback(err, result);
    });
}

function getUpcomingAppointments(con, callback) {
    var sql = "SELECT * FROM db.Appointments WHERE status!=0 ORDER BY datetime ASC;";

    con.query(sql, function(err, result) {
        if (err) {
            console.log('Failed to retrieve list of appointments from database.');
        } else {
            console.log('Retrieved all appointments from database.');
        }

        callback(err, result);
    });
}

function getLatestUpcomingAppointments(con, num, callback) {
    var sql = "SELECT * FROM db.Appointments WHERE status!=0 ORDER BY datetime ASC LIMIT " + num + ';';

    con.query(sql, function(err, result) {
        if (err) {
            console.log('Failed to retrieve list of appointments from database.');
        } else {
            console.log('Retrieved all appointments from database.');
        }

        callback(err, result);
    });
}

function addAppointment(con, appointment, patient, doctor, callback) {
    var sql = "INSERT INTO db.Appointments (p_fname, p_lname, d_id, datetime, description, status) VALUES ?;";
    var values = [[appointment.p_fname, p_lname, doctor.id, appointment.datetime]];

    con.query(sql, [values], function(err) {
        if (err) {
            console.log('Failed to add appointment to database.'); 
        } else {
            console.log('Added appointment to database.');
        }  

        callback(err);
    });
}

module.exports = {getDoctors, addDoctor, addAppointment};