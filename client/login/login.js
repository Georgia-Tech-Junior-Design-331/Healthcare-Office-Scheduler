const mysql = require('mysql');
const query = require('../lib/query');
const con = require('../cfg/mysql').con;

function login() {
    con.connect(function(err) {
        if (err) throw err;
        
        query.verifyAccountInfo(con, 'test', 'test', function(err) {
            if (err) throw err;
        });
    });
}