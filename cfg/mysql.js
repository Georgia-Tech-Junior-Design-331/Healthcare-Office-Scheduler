const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "server",
    password: "Password123"
});

module.exports = {con};