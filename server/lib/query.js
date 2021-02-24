/* Temporarily ignoring patient table
    Also needs callback
function addPatient(con, patient) {
    var sql = "INSERT INTO db.Patients (fname, lname, birthdate, sex) VALUES ?;";
    var values = [[patient.fname, patient.lname, patient.birth, patient.sex]];

    con.query(sql, [values], function(err, result) {
        if (err) {
            console.log('Query failed.');
            throw err;
        }

        console.log('Patient added.');
        con.end();         
    });
}

function getPatientID(con, patient) {
    var sql = "SELECT id FROM db.Patients WHERE fname='" + patient.fname
            + "' AND lname='" + patient.lname
            + "' AND age='" + patient.age
            + "' AND sex='" + patient.sex + "';";

    con.query(sql, function(err, result) {
        if (err) {
            console.log('Query failed.');
            throw err;
        }

        return result;
    });
}
*/

function getDoctors(con, callback) {
    var sql = "SELECT * FROM db.Doctors;";

    con.query(sql, function(err, result) {
        if (err) {
            console.log('Query failed to retrieve doctors.');
            throw err;
        }

        callback(err, result);
    });
}

function addDoctor(con, doctor, callback) {
    var sql = "INSERT INTO db.Doctors (fname, lname) VALUES ?;";
    var values = [[doctor.fname, doctor.lname]];

    con.query(sql, [values], function(err) {
        if (err) {
            console.log('Query failed to add doctor ' + doctor.fname + ' ' + doctor.lname + '.');
            throw err;
        }

        callback(err);
    });
}

function addAppointment(con, appointment, patient, doctor_id, callback) {
    var sql = "INSERT INTO db.Appointments (p_fname, p_lname, d_id, datetime, description, status) VALUES ?;";
    var values = [[appointment.p_fname, p_lname, doctor_id, appointment.datetime]];

    con.query(sql, [values], function(err) {
        if (err) {
            console.log('Query failed.');
            throw err;
        }
        
        callback(err);
    });
}

module.exports = {getDoctors, addDoctor, addAppointment};