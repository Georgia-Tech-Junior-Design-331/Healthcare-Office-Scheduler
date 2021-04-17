//Script for generating dummy patients. Run using "node [filename].js"
const mysql = require('mysql');
const query = require('../lib/query');
const con = require('../cfg/mysql').con;

con.connect(function(err) {
	if (err) throw err;

    // Dummy date variables
    var da2 = new Date();
	da2.setDate(da2.getDate() + 1);
	var da3 = new Date();
	da3.setDate(da3.getDate() + 2);
	var da4 = new Date();
	da4.setDate(da4.getDate() + 3);
	var da5 = new Date();
	da5.setDate(da5.getDate() + 4);
	var da6 = new Date();
	da6.setDate(da6.getDate() + 5);
	var da7 = new Date();
	da7.setDate(da7.getDate() + 6);
    var da8 = new Date();
	da8.setDate(da8.getDate() + 7);
	var da9 = new Date();
	da9.setDate(da9.getDate() + 8);
	var da10 = new Date();
	da10.setDate(da10.getDate() + 9);
	var da11 = new Date();
	da11.setDate(da11.getDate() + 10);
	var da12 = new Date();
	da12.setDate(da12.getDate() + 11);
	var da13 = new Date();
	da13.setDate(da13.getDate() + 12);
    var da14 = new Date();
	da14.setDate(da14.getDate() + 13);
	var da15 = new Date();
	da15.setDate(da15.getDate() + 14);
    var da16 = new Date();
	da16.setDate(da16.getDate() + 15);

    // Dummy patient data
	var p1 = {fname: 'Yoselin ', lname: 'Knight', username: 'yknight', password: '1234', age: 23, birthdate: da2, sex: "Female", phone_number: "8185408977", email: "yknight@gmail.com", email_notif: 1, text_notif: 1};
    var p2 = {fname: 'Jaylan ', lname: 'Bullock', username: 'jbullock', password: '1234', age: 63, birthdate: da3, sex: "Female", phone_number: "8185158551", email: "jbullock@gmail.com", email_notif: 0, text_notif: 1};
    var p3 = {fname: 'Payton ', lname: 'Whitaker', username: 'pwhitaker', password: '1234', age: 28, birthdate: da4, sex: "Female", phone_number: "8185405523", email: "pwhitaker@gmail.com", email_notif: 1, text_notif: 0};
    var p4 = {fname: 'Aliana ', lname: 'Sparks', username: 'asparks', password: '1234', age: 19, birthdate: da5, sex: "Female", phone_number: "4049873974", email: "asparks@yahoo.com", email_notif: 1, text_notif: 0};
    var p5 = {fname: 'Taniyah ', lname: 'Mercer', username: 'tmercer', password: '1234', age: 46, birthdate: da6, sex: "Female", phone_number: "4783658875", email: "tmercer@gatech.edu", email_notif: 0, text_notif: 1};
    var p6 = {fname: 'Mercedes ', lname: 'Pope', username: 'mpope', password: '1234', age: 25, birthdate: da7, sex: "Female", phone_number: "8007658702", email: "mpope@aol.com", email_notif: 1, text_notif: 0};
    var p7 = {fname: 'Natalya ', lname: 'Hutchinson', username: 'nhutchinson', password: '1234', birthdate: da8, age: 87, sex: "Female", phone_number: "3687646531", email: "nhutchinson@gmail.com", email_notif: 0, text_notif: 1};
    var p8 = {fname: 'Jaime ', lname: 'Osborn', username: 'josborn', password: '1234', age: 62, birthdate: da9, sex: "Male", phone_number: "9836749835", email: "josborn@ugabluh.com", email_notif: 1, text_notif: 0};
    var p9 = {fname: 'Saniya ', lname: 'French', username: 'sfrench', password: '1234', age: 69, birthdate: da10, sex: "Female", phone_number: "4973897256", email: "sfrench@gatech.edu", email_notif: 1, text_notif: 0};
    var p10 = {fname: 'Harry ', lname: 'McKinney', username: 'hmckinney', password: '1234', age: 21, birthdate: da11, sex: "Male", phone_number: "9742739276", email: "hmckinney@gmail.com", email_notif: 0, text_notif: 1};
    var p11 = {fname: 'Angelo ', lname: 'Salas', username: 'asalas', password: '1234', age: 55, birthdate: da12, sex: "Male", phone_number: "9864483333", email: "asalas@hotmail.com", email_notif: 0, text_notif: 1};
    var p12 = {fname: 'Killian ', lname: 'Brock', username: 'kbrock', password: '1234', age: 38, birthdate: da13, sex: "Female", phone_number: "9879998766", email: "kbrock@gmail.com", email_notif: 0, text_notif: 0};
    var p13 = {fname: 'Jaida ', lname: 'Webster', username: 'jwebster', password: '1234', age: 47, birthdate: da14, sex: "Female", phone_number: "5543760823", email: "jwebster@yahoo.com", email_notif: 1, text_notif: 1};
    var p14 = {fname: 'Misael ', lname: 'Wilkinson', username: 'mwilkinson', password: '1234', age: 18, birthdate: da15, sex: "Male", phone_number: "3782097463", email: "mwilkinson@earthlink.net", email_notif: 0, text_notif: 1};
    var p15 = {fname: 'Tianna ', lname: 'Walton', username: 'twalton', password: '1234', age: 76, birthdate: da16, sex: "Female", phone_number: "8182223456", email: "twalton@ix.netcom.com", email_notif: 1, text_notif: 1};

	query.addPatient(con, p1, function(err) {
		if (err) throw err;
	});

	query.addPatient(con, p2, function(err) {
		if (err) throw err;
	});

	query.addPatient(con, p3, function(err) {
		if (err) throw err;
	});

	query.addPatient(con, p4, function(err) {
		if (err) throw err;
	});

	query.addPatient(con, p5, function(err) {
		if (err) throw err;
	});

    query.addPatient(con, p6, function(err) {
		if (err) throw err;
	});

    query.addPatient(con, p7, function(err) {
		if (err) throw err;
	});

    query.addPatient(con, p8, function(err) {
		if (err) throw err;
	});

    query.addPatient(con, p9, function(err) {
		if (err) throw err;
	});

    query.addPatient(con, p10, function(err) {
		if (err) throw err;
	});

    query.addPatient(con, p11, function(err) {
		if (err) throw err;
	});

    query.addPatient(con, p12, function(err) {
		if (err) throw err;
	});

    query.addPatient(con, p13, function(err) {
		if (err) throw err;
	});

    query.addPatient(con, p14, function(err) {
		if (err) throw err;
	});

    query.addPatient(con, p15, function(err) {
		if (err) throw err;
	});
});