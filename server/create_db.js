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

    /* Removing Patient Table for now.
    // Create a table for db called Patients. (id, fname, lname, age, sex)
    var createPatients = "CREATE TABLE db.Patients (id int NOT NULL AUTO_INCREMENT, fname varchar(255) NOT NULL, lname varchar(255) NOT NULL, birthdate date NOT NULL, sex varchar(1) NOT NULL, PRIMARY KEY (id));";
    
    con.query(createPatients, function(err, result) {
        if (err) throw err;
        console.log('Patients table created.');
    });
    */

    // Create a table for db called Doctors. (id, fname, lname)
    var createDoctors = "CREATE TABLE db.Doctors (id int NOT NULL AUTO_INCREMENT, fname varchar(255) NOT NULL, lname varchar(255) NOT NULL, PRIMARY KEY (id));";
    
    con.query(createDoctors, function(err, result) {
        if (err) throw err;
        console.log('Doctors table created.');
    });

    // Create a table for db called Appointments. (id, p_fname, p_lname, d_id, datetime, end, description, status)
    var createAppointments = "CREATE TABLE db.Appointments (id int NOT NULL AUTO_INCREMENT, p_fname varchar(255) NOT NULL, p_lname varchar(255) NOT NULL, d_id int NOT NULL, datetime datetime NOT NULL, end datetime, description varchar(255), status int NOT NULL, PRIMARY KEY (id), FOREIGN KEY (d_id) REFERENCES db.Doctors(id));";

    con.query(createAppointments, function(err, result) {
        if (err) throw err;
        console.log('Appointments table created.');
    });
});
