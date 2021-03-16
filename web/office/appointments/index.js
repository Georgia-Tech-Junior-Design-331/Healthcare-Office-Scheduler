function send_request(filters) {
	const request = '/getAppointments';
	const body = {filters: filters};
	appointments.request_items(request, body);
}

var filters = {};
var appointments = new Dynamic_List('appointments', render_appointment_item);
send_request(filters);
