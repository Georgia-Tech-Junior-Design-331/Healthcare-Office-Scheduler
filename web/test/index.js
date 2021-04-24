function startend() {
	var start = new Date();
	start.setHours(8);
	start.setMinutes(0);
	start.setSeconds(0);
	var end = new Date(start.getTime());
	end.setHours(18);
	return [start, end];
}

var se = startend();
var cal = new Grid_Calendar(se[0], se[1]);
cal.render_grid();
var start = new Date();
start.setMonth(3);
start.setDate(25);
start.setHours(0);
start.setMinutes(0);
start.setSeconds(0);
var end = new Date();
end.setMonth(4);
end.setDate(1);
end.setHours(0);
end.setMinutes(0);
end.setSeconds(0);
cal.render_appointments({start: start, end: end});