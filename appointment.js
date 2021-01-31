class AppointDet {
    constructor(schDate, reqDate, location, doctor, info) {
        this.schDate = schDate
        this.reqDate = reqDate
        this.location = location
        this.doctor = doctor
        this.info = info
    }
}

var testSchDate = new Date();
testSchDate.setFullYear(2020, 11, 25);
testSchDate.setHours(9, 30);
var testReqDate = new Date();
testReqDate.setFullYear(2020, 11, 25);
testReqDate.setHours(9, 30);
var testLoc = "STAMPS Health Services"
var testDoc = "George P. Burdell"
var testInfo = "Checkup"


let details = new AppointDet(testSchDate, testReqDate, testLoc, testDoc, testInfo);
var doctor = details.doctor;
var date = details.schDate;
document.getElementById("apptTitle").innerHTML = "Appointment with " + doctor;
CreateTable(details);


function niceDateTimeFormat(dat) {
    return dat.getHours() + ":" + dat.getMinutes() + " " + (dat.getMonth() + 1) + "-" + dat.getDate() + "-" + dat.getFullYear();
}

function niceTimeFormat(dat) {
    return dat.getHours() + ":" + dat.getMinutes()
}

function niceDateFormat(dat) { //American Date Format
    return (dat.getMonth() + 1) + "-" + dat.getDate() + "-" + dat.getFullYear();
}

function CreateTable(apptDet) {
    //Build a table of appointment details/

    var details = new Array();
    
    details.push(["Scheduled Time: ", niceTimeFormat(apptDet.schDate)]);
    details.push(["Scheduled Date: ", niceDateFormat(apptDet.schDate)]);
    if (apptDet.schDate.getDate() !== apptDet.reqDate.getDate()) {
        //Only add requested dates to the table if they are the different from the scheduled date
        details.push(["Requested Time: ", niceTimeFormat(apptDet.reqDate)]);
        details.push(["Requested Date: ", niceDateFormat(apptDet.reqDate)]);
    }
    
    details.push(["Location: ", apptDet.location]);
    details.push(["Doctor: ", apptDet.doctor]);
    details.push(["Info: ", apptDet.info]);

    //Create a HTML Table element.
    var table = document.createElement("TABLE");
    table.border = "1";

    //Get the count of columns.
    var columnCount = details[0].length;


    //Add the data rows.
    for (var i = 0; i < details.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = details[i][j];
        }
    }

    var detTable = document.getElementById("detTable");
    detTable.innerHTML = "";
    detTable.appendChild(table);
}

function cancel() {
    confirm("Do you want to delete your appointment?");
}

function searchDay() {
    var date = document.getElementById("date").value;
    document.getElementById("results").innerHTML = "Searched: "+ date;
}