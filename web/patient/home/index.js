function send_request(filters) {
	const request = '/getAppointments';
	const body = {filters: filters};
	appointments.request_items(request, body);
}

var filters = {p_id: -1};

function get_patient_id()
{
    var xhttp = new XMLHttpRequest();
    xhttp.open( "POST", '/getPatientID', true ); // false for synchronous request
    xhttp.send( null );
    xhttp.onload = function() {
		var response = JSON.parse(xhttp.response);
        filters.p_id = response.id;
        send_request(filters);
    }
}

get_patient_id();

var appointments = new Dynamic_List('appointments', render_appointment_item_patient);

function cancel_btn(id) {
	var check_label = document.getElementById('check-label');
	var modal = document.getElementById("check-modal");
	var close = document.getElementById("close-btn");
	check_label.innerHTML = "Do you really want to cancel this appointment?"
	close.onclick = function() {
		modal.style.display = "none";
	}
	modal.style.display = "block";
}

function request_cancel(appointment) {
    var appt = {};
    appt.request = {};
    appt.appointment = {};
    
    appt.appointment.id = appointment.id;
    appt.appointment.status = 4;

    appt.request.datetime = new Date(appointment.start).toISOString().slice(0, 19).replace('T', ' ');
    appt.request.urgent = 0;
    appt.request.type = 0;
    appt.request.description = "Cancel Requested";
    console.log(appointment);
    console.log(JSON.stringify(appt));

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addRequest", true); //Synchronous (false) is not ideal
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onload = function() {
        //go back to main page
        alert("Successfully requested!");
        location.href = 'home';
    };
    xhttp.send([JSON.stringify(appt)]);
}