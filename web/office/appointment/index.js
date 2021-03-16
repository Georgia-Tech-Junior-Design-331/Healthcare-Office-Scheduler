const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

function update() {
    const request = '/getAppointments';
    const filters = {id: id};
    const body = {filters: filters};
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/getAppointment", true); //Synchronous (false) is not ideal
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function() {
        
    };
    xhttp.send(JSON.stringify(body));
}

update();



function getName() {
    var name = ""
    if (name.length == 0) {
        name = "Name"
    }
    return name;
}
function getDate() {
    var date = "";
    if (date.length == 0) {
        date = "Temporary Date"
    }
    return date;
}
function getContact() {
    var contact = "";
    if (contact.length == 0) {
        contact = "Temporary Contact"
    }
    return contact;
}
function getInfo() {
    var info = "";
    if (info.length == 0) {
        info = "Temporary Info"
    }
    return info;
}
function getQuestion() {
    var question = "";
    var temp = 2
    if (temp == 1) {
        question = "Do you want to send appointment change to patient?"
    } else {
        question = "Do you want to send the patient a rescheduling notification?"
    }
    return question;
}