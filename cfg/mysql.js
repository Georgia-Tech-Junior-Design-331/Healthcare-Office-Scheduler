const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "server",
    password: "Password123",
    multipleStatements: true
});

module.exports = {con};