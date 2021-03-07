function getPatientById(con, patient, callback) {
    var sql = "SELECT * FROM db.Patients WHERE id=" + patient.id + ";";

    con.query(sql, function(err, result) {
        if (err) {
            console.log('Query failed.');
        } else {
            console.log('Retrieved patient from datatbase.');
        }

        callback(err, result);
    });
}

function getPatientByName(con, patient, callback) {
    var sql = "SELECT * FROM db.Patients WHERE fname LIKE '%" + patient + "%' OR lname LIKE '%" + patient + "%'";

    con.query(sql, function(err, result) {
        if (err) {
            console.log('Query failed.');
        } else {
            console.log('Retrieved patient from datatbase.');
        }

        callback(err, result);
    });
}

function addPatient(con, patient, callback) {
    var sql = "INSERT INTO db.Patients (username, password, fname, lname, birthdate, sex, phone_number, email) VALUES ?;";
    var values = [[patient.username, patient.password, patient.fname, patient.lname, patient.birthdate, patient.sex, patient.phone_number, patient.email]];

    con.query(sql, [values], function(err) {
        if (err) {
            console.log('Failed to add patient ' + patient.fname + ' ' + patient.lname + ' to database.');
        } else {
            console.log('Added patient ' + patient.fname + ' ' + patient.lname + ' to database.');
        }

        callback(err);
    });
}

function getPatients(con, callback) {
    var sql = "SELECT * FROM db.Patients;";

    con.query(sql, function(err, result) {
        if (err) {
            console.log('Failed to retrieve list of patients from database.');
            console.log(err);
        } else {
            console.log('Retrieved all of patients from database.');
        }

        callback(err, result);
    })
}
function getDoctors(con, callback) {
    var sql = "SELECT * FROM db.Doctors;";

    con.query(sql, function(err, result) {
        if (err) {
            console.log('Failed to retrieve list of doctors from database.');
            console.log(err);
        } else {
            console.log('Retrieved all of doctors from database.');
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
            console.log(err);
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
            console.log(err);
        } else {
            console.log('Retrieved all appointments from database.');
        }

        callback(err, result);
    });
}

function getUpcomingAppointments(con, callback) {
    var sql = "SELECT * FROM db.Appointments WHERE status!=0 AND start >= NOW() ORDER BY start ASC;";

    con.query(sql, function(err, result) {
        if (err) {
            console.log('Failed to retrieve list of upcoming appointments from database.');
            console.log(err);
        } else {
            console.log('Retrieved all upcoming appointments from database.');
        }

        callback(err, result);
    });
}

function getAppointmentsOnDay(con, date, callback) {
    var sql = "SELECT * FROM db.Appointments WHERE START BETWEEN '" + date + " 00:00:00' AND '" + date + " 23:59:59' ORDER BY start ASC;";

    con.query(sql, date, function(err, result) {
        console.log(sql)
        if (err) {
            console.log('Failed to retrieve list of upcoming appointments from database.');
            console.log(err);
        } else {
            console.log('Retrieved all upcoming appointments from database.');
        }

        callback(err, result);
    });
}

function getEarliestUpcomingAppointments(con, num, callback) {
    var sql = "SELECT * FROM db.Appointments WHERE status!=0 ORDER BY start ASC LIMIT " + num + ';';

    con.query(sql, function(err, result) {
        if (err) {
            console.log('Failed to retrieve list of earliest ' + num + ' upcoming appointments from database.');
            console.log(err);
        } else {
            console.log('Retrieved earliest ' + num + ' upcoming appointments from database.');
        }

        callback(err, result);
    });
}

function getPastAppointments(con, callback) {
    var sql = "SELECT * FROM db.Appointments WHERE status=0 ORDER BY start ASC;";

    con.query(sql, function(err, result) {
        if (err) {
            console.log('Failed to retrieve list of past appointments from database.');
            console.log(err);
        } else {
            console.log('Retrieved all past appointments from database.');
        }

        callback(err, result);
    });
}

function getAppointmentById(con, appointment, callback) {
    var sql = "SELECT * FROM db.Appointments WHERE id=" + appointment.id + ";";

    con.query(sql, function(err, result) {
        if (err) {
            console.log('Failed to retrieve appointment from database.');
            console.log(err);
        } else {
            console.log('Retrieved appointment from database.');
        }

        callback(err, result);
    });
}

function addAppointment(con, appointment, patient, doctor, callback) {
    var sql = "INSERT INTO db.Appointments (p_id, d_id, start, end, description, status) VALUES ?;";
    var values = [[patient.id, doctor.id, appointment.start, appointment.end, appointment.description, appointment.status]];

    con.query(sql, [values], function(err) {
        if (err) {
            console.log('Failed to add appointment to database.'); 
            console.log(err);
        } else {
            console.log('Added appointment to database.');
        }  

        callback(err);
    });
}

function setAppointment(con, appointment, callback) {
    var sql = "UPDATE db.Appointments SET start=" + appointment.start 
        + ", end=" + appointment.end 
        + ", description=" + appointment.description 
        + ", status=" + appointment.status
        + " WHERE id=" + appointment.id + ";";

    con.query(sql, function(err) {
        if (err) {
            console.log('Failed to update appointment in database.');
            console.log(err);
        } else {
            console.log('Updated appointment in database.');
        }

        callback(err);
    });
}

function getAppointmentWithPatient(con, patient_id, callback) {
    var sql = "SELECT Appointments.id, Doctors.fname, Doctors.lname, Appointments.start, Appointments.description, Appointments.id "
        + "FROM db.Appointments "
        + "LEFT JOIN db.Doctors ON Appointments.d_id = Doctors.id "
        + "WHERE p_id=" + patient_id + " AND start > NOW() ORDER BY start ASC";
    con.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Appointments Retrieved');
        }

        callback(err, result);
    })
}

module.exports = {
    getPatientById,
    getPatientByName,
    addPatient,
    getPatients,
    getDoctors, 
    addDoctor, 
    getAppointments, 
    getUpcomingAppointments,
    getAppointmentsOnDay,
    getEarliestUpcomingAppointments,
    getPastAppointments,
    getAppointmentById,
    addAppointment,
    setAppointment,
    getAppointmentWithPatient
};