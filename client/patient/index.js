var appointments = [];
load_appointments();

class Appointment extends React.Component {
    constructor(props, num, id, d_fname, d_lname, datetime, desc) {
        super(props);
        this.num = num;
		this.id = id;
		this.doctor = d_fname + " " + d_lname;
		this.datetime = datetime;
        if (desc == null) {
            this.desc = "No Description"
        } else {
            this.desc = desc;
        }
    }

    render() {
        return (
            <div className="row justify-content-sm-center">
                <div className="card col-sm-5 mb-3" style={{backgroundColor: "#76A5FF"}} key={this.id}>
                    <div className="date-time mt-2">{"Date: " + prettyDateAndTime(this.datetime)}</div>
                    <div className="doctor">{"Doctor: " + this.doctor}</div>
                    <div className="description">{"Description: " + this.desc}</div>
                    <div className="row justify-content-sm-center">
                        <button className="btn btn-info col-sm-9 mb-2 mt-1" style={{backgroundColor: "#C26FE9", border: "none"}} onClick={() => open_appointment(this.id)}>View</button>
                    </div>
                </div>
            </div>
        );
    }
}

function prettyDateAndTime(dateAndTime) {
	var a = new Date(dateAndTime);
	return a.toLocaleDateString() + " @ " + a.toLocaleTimeString();
}

function load_appointments() {
	var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getAppointmentWithPatient", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function() {
        var list = JSON.parse(xhttp.responseText);

        for (var i = 0; i < list.length; i++) {
            var app = list[i];
            appointments[i] = new Appointment({}, i + 1, app.id, app.fname, app.lname, app.start, app.description);
        }

        render_appointments();
    };
    xhttp.send();
}

function open_appointment(id) {
	location.href = '/appointment?id=' + id;
}

function render_appointments() {
	var child = [];

	for (var i = 0; i < appointments.length; i++) {
        child[i] = appointments[i].render();
    }

    ReactDOM.render(
        [child], 
        document.getElementById('list')
    );
}