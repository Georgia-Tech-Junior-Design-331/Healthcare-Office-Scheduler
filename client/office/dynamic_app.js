var appointments = [];
const list_display_count = 3;
load_appointments();

class Appointment extends React.Component {
    constructor(props, num, id, p_fname, p_lname, datetime) {
        super(props);
        this.num = num;
		this.id = id;
		this.p_name = p_lname + ', ' + p_fname;
        this.datetime = datetime;     
    }

    render() {
        return (
        	<li className="list-group-item" key={this.id}>
		        <div className="row">
		        	<h6>Appointment {this.num}</h6>
		          	<table>
		            	<tbody>
		              		<tr>
		                  		<td style={{width: '60%'}}>{this.p_name}</td>
		                  		<td rowSpan="2">
		                      		<button className="btn btn-primary" onClick={() => open_appointment(this.id)}>View</button>
		                  		</td>
		              		</tr>
		              		<tr>
		                  		<td>{this.datetime}</td>
		              		</tr>
		            	</tbody>
		          	</table>
		        </div>
		    </li>
        );
    }
}

function load_appointments() {
	var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getUpcomingAppointments", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function() {
        var list = JSON.parse(xhttp.responseText);

        for (var i = 0; i < list.length; i++) {
        	var app = list[i];
        	appointments[i] = new Appointment({}, i + 1, app.id, app.p_fname, app.p_lname, app.start);
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

	for (var i = 0; i < list_display_count; i++) {
        child[i] = appointments[i].render();
    }

    ReactDOM.render(
    	[child], 
    	document.getElementById('list')
    );
}