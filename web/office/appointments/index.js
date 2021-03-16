function send_request(filters) {	
	const request = '/getAppointments';
	const body = {filters: filters};
	appointments.request_items(request, body);
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var filters = {};

urlParams.forEach(function(value, key) {
	filters[key] = value;
});

if (filters.date) {
	//indicate date in title of list using REACT
}

var appointments = new Dynamic_List('appointments', render_appointment_item);
send_request(filters);
