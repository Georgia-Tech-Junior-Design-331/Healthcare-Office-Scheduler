function addPatient() {
    var patient = {};
    patient.fname = document.getElementById("p_fname").value;
    patient.lname = document.getElementById("p_lname").value;
    patient.birth = document.getElementById("p_birth").value;
    patient.sex = document.getElementById("p_sex").value;

    var req = {};
    req.fname = (patient.fname && patient.fname.length > 0);
    req.lname = (patient.lname && patient.lname.length > 0);
    req.birth = (patient.birth != null);
    req.sex = (["M", "F"].includes(patient.sex));

    for (var key in req) {
        if (!req[key]) {
            window.alert("One or more of the fields on not properly submitted!");
            return;
        }
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addPatient", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(patient));
}