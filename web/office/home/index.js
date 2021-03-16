const request = '/getAppointments';
var filters = {status: [1, 2, 3, 4], upcoming: true};
var body = {filters: filters}




var appointments = new Dynamic_List('appointments', render_appointment_item);
appointments.list_display_count = 3;
appointments.request_items(request, body);

document.getElementById("view_all").onclick = function() {
	location.href= './appointments';
};