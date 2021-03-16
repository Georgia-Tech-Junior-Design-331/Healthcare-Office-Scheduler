document.getElementById("view_all").onclick = function() {
	location.href= './appointments';
};

var appointments = new Dynamic_List('appointments', render_appointment_item);
appointments.request_items('/getUpcomingAppointments');