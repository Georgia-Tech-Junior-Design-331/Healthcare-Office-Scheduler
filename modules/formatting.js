function pretty_datetime(datetime) {
	var a = new Date(datetime);
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	return months[a.getMonth()] + " " + a.getDate() + " " + a.getFullYear() + " @ " + a.toLocaleTimeString();
}