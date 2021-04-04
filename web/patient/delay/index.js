var appointment = {};
const id = new URLSearchParams(window.location.search).get('id');
var delay_time = 0;

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
        appointment.start = new Date(appointment.start);
        ReactDOM.render(
            <div>
                {render(appointment)}
            </div>
            , document.getElementById('request')
        );
    };
    xhttp.send(JSON.stringify(body));
}

function request_delay() {
    var appt = {};
    appt.request = {};
    appt.appointment = {};
    
    let new_time = new Date(appointment.start);
    new_time.setMinutes(appointment.start.getMinutes() + Number(delay_time))

    appt.appointment = appointment;
    appt.appointment.status = 4;

    appt.request.datetime = new_time.toISOString().slice(0, 19).replace('T', ' ');;
    appt.request.urgent = 0
    appt.request.type = 1
    appt.request.description = document.getElementById('desc').value;
    // console.log(request.datetime)
    console.log(JSON.stringify(appt))
    var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/addRequest", true); //Synchronous (false) is not ideal
        xhttp.setRequestHeader('Content-Type', 'application/json');

        xhttp.onload = function() {
            //go back to main page
            alert("Successfully requested!");
            location.href = 'home';
        };
        xhttp.send([JSON.stringify(appt)]);
}

function render(app) {
    function show_modal(e) {
        e.preventDefault();
        var time_select = document.getElementById('delay-time');
        var time = time_select.options[time_select.selectedIndex].text;
        var check_label = document.getElementById('check-label');
        var modal = document.getElementById("check-modal");
        var close = document.getElementById("close-btn");
        check_label.innerText = "Do you really want to delay " + time + " minutes?"
        close.onclick = function() {
            modal.style.display = "none";
        }
        modal.style.display = "block";
    }
    
    function submit_request(e) {
        e.preventDefault();
        var time_select = document.getElementById('delay-time');
        var time = time_select.options[time_select.selectedIndex].text;
        delay_time = time;
        request_delay()
    }
    return (
        <div className="container">
            <p className="appts text-center">Delay Request</p>
            <div className="row justify-content-center">
                <div className="col-sm-6">
                    <div className="card-body">
                        <h4 className="card-subtitle text-center">Appointment with Dr. {app.d_lname}</h4>
                        <div className="mt-3 text-center">
                            <label htmlFor="delay-time">I will be late by</label>
                                <select id="delay-time" className="custom-select ml-1" style={{marginLeft: "5px", marginRight: "5px"}}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                </select>
                            <label htmlFor="delay-time">minutes.</label>
                        </div>
                        <div className="text-center">
                            <div className="row mt-2">
                                <label htmlFor="desc">Description </label>
                            </div>
                            <textarea name="Description" id="desc" cols="30" rows="5"></textarea>
                        </div>
                        <div className="justify-content-center row mt-3">
                            <button type="button" className="btn btn-success btn-sm col-sm-6" data-target="#modal" data-toggle="modal" onClick={show_modal}>Request</button>
                        </div>
                        <div className="container">
                            <div id="check-modal" className="modal">
                                <div className="modal-content col-sm-6">
                                    <h5 className="text-center mt-2" id="check-label"></h5>
                                    <div className="row justify-content-center">
                                        <button type="button" id="request-btn" className="btn btn-success btn-sm col-sm-6 mb-1 mt-3" onClick={submit_request}>Request</button>
                                    </div>
                                    <div className="row justify-content-center">
                                    <button type="button" id="close-btn" className="btn btn-secondary btn-sm col-sm-6">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

update()