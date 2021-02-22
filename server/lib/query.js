function addPatient(con, patient) {
    con.connect(function(err) {
        if (err) {
            console.log('Failed to connect to database.');
            throw err;
        }

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
    });
}

function getPatientID(con, patient) {
    con.connect(function(err) {
        if (err) {
            console.log('Failed to connect to database.');
            throw err;
        }

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
    });
}

function addAppointment(con, appointment, patient_id) {
    con.connect(function(err) {
        if (err) {
            console.log('Failed to connect to database.');
            throw err;
        }

        var sql = "INSERT INTO db.Appointments (patient_id, datetime) VALUES ?;";
        var values = [[patient_id, appointment.datetime]];

        con.query(sql, function(err) {
            if (err) {
                console.log('Query failed.');
                throw err;
            }
        });
    })
}

module.exports = {addPatient, getPatientID, addAppointment};