const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
var appointment = {};
var requests = new Dynamic_List('requests', render_request_item_app);

function update() {
    const request = '/getAppointments';
    const filters = {id: id};
    var body = {filters: filters};
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', request, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function() {
        var response = JSON.parse(xhttp.responseText);
        appointment = response[0];

        ReactDOM.render(
            <div className="container">
                {render(appointment)}
            </div>
            , document.getElementById('listing')
        );
    };
    xhttp.send(JSON.stringify(body));
}

function render(app) {
    const status = ['Completed', 'Scheduled', 'Delayed', 'In Progress', 'Delay Requested'];

    return (
        <div>
            <div className="element-container">
                <div className="info-container">
                    <div className="element-box"> <b>Appointment ID : </b>{`${app.id}`}</div>
                    <div className="element-box"> <b>Patient: </b>{`${app.p_lname + ', ' + app.p_fname}`}</div>
                    <div className="element-box"> <b>Doctor: </b>{`${app.d_lname + ', ' + app.d_fname}`}</div>
                    <div className="element-box"> <b>Start Time: </b>{`${pretty_datetime(app.start)}`}</div>
                    <div className="element-box"> <b>End Time: </b>{`${pretty_datetime(app.end)}`}</div>
                    <div className="element-box"> <b>Description: </b>{`${app.description}`}</div>
                    <div className="element-box"> <b>Status: </b>{`${status[app.status]}`}</div>
                </div>
                <div className="info-containerAdjust">
                    <div className="input-element-box">
                        <label htmlFor="start">New Start Time:</label>
                        <input type="datetime-local" fontSize="20px" id="start" name="startbox" defaultValue={app.start}></input>
                    </div>
                    <div className="input-element-box">
                        <label htmlFor="end">New End Time:</label>
                        <input type="datetime-local" fontSize="20px" id="end" name="endbox" defaultValue={app.end}></input>
                    </div>
                    <div className="input-element-box">
                        <label htmlFor="description">New Description:</label>
                        <input type="text" fontSize="20px" id="description" name="descriptionbox" required minLength="4" maxLength="255" defaultValue={app.description}></input>
                    </div>
                    <div className="input-element-box">
                        <label htmlFor="status">New Status:</label>
                        <select defaultValue={app.status} id="status" name="statusbox">
                            {
                                status.map((e, key) => {
                                    if (key == app.status) {
                                        return (<option key={key} value={key}>No Change</option>);
                                    }

                                    return (<option key={key} value={key}>{e}</option>);
                                })
                            }
                        </select>
                    </div>
                    <div className="input-element-box">
                        <input className="submit-button" type="submit" value="Submit" onClick={submit_changes}></input>
                    </div>
                </div>     
            </div>
            <button id="refresh" onClick={get_requests}>Show Requests</button>
            <div id="requests"></div>
        </div>
    );
}

function submit_changes() {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var desc = document.getElementById('description').value;
    var status = document.getElementById('status').value;

    var d_start = new Date(start);
    var d_a_start = new Date(appointment.start);
    var d_end = (end.length > 0) ? new Date(end) : null;
    var d_a_end = (appointment.end != null) ? new Date(appointment.end) : null;

    if ((start.length < 1 || d_start.getTime() == d_a_start.getTime()) 
            && d_end == d_a_end 
            && (desc.length < 1 || desc == appointment.description) 
            && status == appointment.status) {
        window.alert('No changes submitted.');
    } else {
        if (start.length < 1) {
            start = appointment.start;
        }

        if (end.length < 1) {
            end = null;
        }

        if (desc.length < 1) {
            desc = appointment.description;
        }

        var body = {appointment: {id: appointment.id, start: start, end: end, description: desc, status: status}};
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/setAppointment", true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.onload = function() {
            var response = JSON.parse(xhttp.responseText);
            appointment = response[0];
            ReactDOM.render(
                <div className="container">
                    {render(appointment)}
                </div>
                , document.getElementById('listing')
            );
        };
        xhttp.send(JSON.stringify(body));
    }
}

function get_requests() {
    const filters = {a_id: id};
    const body = {filters: filters};
    const request = '/getRequests';
    requests.request_items(request, body);
    var button = document.getElementById('refresh');
    button.innerHTML = 'Refresh';
}

update();


