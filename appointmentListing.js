
// function to get name of individual (implementation still required in backend stages, general implementation




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