var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "server",
    password: "Password123"
});

con.connect(function(err) {
    if (err) throw err;

    console.log("Connected.");

    // If database db already exists, drop it. This will remove any existing database db and all its data.
    var checkDB ="DROP DATABASE IF EXISTS db;";

    con.query(checkDB, function(err, result) {
        if (err) throw err;
    });

    // Create a new database db.
    var createDB = "CREATE DATABASE db;";

    con.query(createDB, function(err, result) {
        if (err) throw err;
        console.log("Database created.");
    });

    // Create a table for db called Patients. (id, fname, lname, age, sex)
    var createPatients = "CREATE TABLE db.Patients (id int NOT NULL AUTO_INCREMENT, fname varchar(255) NOT NULL, lname varchar(255) NOT NULL, birthdate date NOT NULL, sex varchar(1) NOT NULL, PRIMARY KEY (id));";
    
    con.query(createPatients, function(err, result) {
        if (err) throw err;
        console.log("Patients table created.");
    });

    // Create a table for db called Appointments. (id, patient_id, datetime)
    var createAppointments = "CREATE TABLE db.Appointments (id int NOT NULL AUTO_INCREMENT, patient_id int NOT NULL, datetime datetime NOT NULL, PRIMARY KEY (id), FOREIGN KEY (patient_id) REFERENCES db.Patients(id));";

    con.query(createAppointments, function(err, result) {
        if (err) throw err;
        console.log("Appointments table created.");
    });

    con.end(); 
});
