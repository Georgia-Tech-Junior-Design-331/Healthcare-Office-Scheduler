const mysql = require('mysql');

const con = require('./cfg/mysql').con;

con.connect(function(err) {
    if (err) throw err;

    console.log('Connected.');

    // If database db already exists, drop it. This will remove any existing database db and all its data.
    var checkDB = "DROP DATABASE IF EXISTS db;";

    con.query(checkDB, function(err, result) {
        if (err) throw err;
    });

    // Create a new database db.
    var createDB = "CREATE DATABASE db;";

    con.query(createDB, function(err, result) {
        if (err) throw err;
        console.log('Database created.');
    });

    // Create a table for db called Patients. (id, fname, lname, age, sex)
    var createPatients = "CREATE TABLE db.Patients(id int UNIQUE NOT NULL AUTO_INCREMENT,"
        + "username varchar(255) UNIQUE NOT NULL, "
        + "password varchar(255) NOT NULL, "
        + "fname varchar(255) NOT NULL, "
        + "lname varchar(255) NOT NULL, "
        + "birthdate datetime NOT NULL, "
        + "sex ENUM('Male', 'Female'), "
        + "phone_number varchar(255), "
        + "email varchar(255), "
        + "PRIMARY KEY(id));";
    
    con.query(createPatients, function(err, result) {
        if (err) throw err;
        console.log('Patients table created.');
    });

    // Create a table for db called Doctors. (id, fname, lname)
    var createDoctors = "CREATE TABLE db.Doctors (id int UNIQUE NOT NULL AUTO_INCREMENT, "
        + "fname varchar(255) NOT NULL, "
        + "lname varchar(255) NOT NULL, "
        + "PRIMARY KEY (id));";
    
    con.query(createDoctors, function(err, result) {
        if (err) throw err;
        console.log('Doctors table created.');
    });

    // Create a table for db called Appointments. (id, p_fname, p_lname, d_id, datetime, end, description, status)
    var createAppointments = "CREATE TABLE db.Appointments(id int UNIQUE NOT NULL AUTO_INCREMENT, "
        + "p_id int NOT NULL, "
        + "d_id int NOT NULL, "
        + "start datetime NOT NULL, "
        + "end datetime, "
        + "description varchar(255), "
        + "notes varchar(255), "
        + "status int NOT NULL, "
        + "PRIMARY KEY (id), "
        + "FOREIGN KEY (p_id) REFERENCES db.Patients(id), "
        + "FOREIGN KEY (d_id) REFERENCES db.Doctors(id));";

    con.query(createAppointments, function(err, result) {
        if (err) throw err;
        console.log('Appointments table created.');
    });

    var createRequests = "CREATE TABLE db.Requests(id int UNIQUE NOT NULL AUTO_INCREMENT, "
        + "a_id int NOT NULL, "
        + "urgent int NOT NULL,"
        + "type int NOT NULL, "
        + "description varchar(255), "
        + "PRIMARY KEY (id), "
        + "FOREIGN KEY (a_id) REFERENCES db.Appointments(id));";

    con.query(createRequests, function(err, result) {
        if (err) throw err;
        console.log('Requests table created.');
    });
});
