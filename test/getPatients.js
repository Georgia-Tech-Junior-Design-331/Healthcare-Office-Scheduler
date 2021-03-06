//Test script for getting patients from the database.
const mysql = require('mysql');
const query = require('../lib/query');
const con = require('../cfg/mysql').con;

con.connect(function(err) {
    if (err) throw err;

    query.getPatients(con, function(err, result) {
        if (err) throw err;

        console.log(result);
    });
});