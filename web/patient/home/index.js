function send_request(filters) {
	const request = '/getAppointments';
	const body = {filters: filters};
	appointments.request_items(request, body);
}

var filters = {p_id: 3};
var appointments = new Dynamic_List('appointments', render_appointment_item_patient);
send_request(filters);