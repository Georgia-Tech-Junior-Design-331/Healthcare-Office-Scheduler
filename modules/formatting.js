//Any pure formatting functions belong here
/*
	Takes a datetime and converts it to a user-friendly format.
*/
function pretty_datetime(datetime) {
	if (datetime == null) {
		return '';
	}
	
	var a = new Date(datetime);
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	return months[a.getMonth()] + " " + a.getDate() + " " + a.getFullYear() + " @ " + a.toLocaleTimeString();
}