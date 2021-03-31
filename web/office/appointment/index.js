const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

function update() {
    const request = '/getAppointments';
    const filters = {id: id};
    const body = {filters: filters};
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/getAppointments", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function() {
        var response = JSON.parse(xhttp.responseText);
        const appointment = response[0];
        ReactDOM.render(
            <div className="container">
                {render(appointment)}
            </div>
            , document.getElementById("listing")
        );
    };
    xhttp.send(JSON.stringify(body));
}

function render(app) {
    return (
        <div className="element-container">
            <div className="info-container">
                <div className="element-box"> <b>Appointment ID: </b>{`${app.id}`}</div>
                <div className="element-box"> <b>Patient ID: </b>{`${app.p_id}`}</div>
                <div className="element-box"> <b>Doctor ID: </b>{`${app.d_id}`}</div>
                <div className="element-box"> <b>Start Time: </b>{`${app.start}`}</div>
                <div className="element-box"> <b>End Time: </b>{`${app.end}`}</div>
                <div className="element-box"> <b>Description: </b>{`${app.description}`}</div>
                <div className="element-box"> <b>Status: </b>{`${app.status}`}</div>
            </div>
            <div className="info-containerAdjust">
                <div className="input-element-box">
                    <label htmlFor="start">New Start Time:</label>
                    <input type="text" fontSize="20px" id="start" name="startbox" required minLength="4" maxLength="8" size="10"></input>
                </div>
                <div className="input-element-box">
                    <label htmlFor="end">New End Time:</label>
                    <input type="text" fontSize="20px" id="end" name="endbox" required minLength="4" maxLength="8" size="10" ></input>
                </div>
                <div className="input-element-box">
                    <label htmlFor="description">New Description:</label>
                    <input type="text" fontSize="20px" id="description" name="descriptionbox" required minLength="4" maxLength="8" size="10" ></input>
                </div>
                <div className="input-element-box">
                    <label htmlFor="status">New Status:</label>
                    <input type="text" fontSize="20px" id="status" name="statusbox" required minLength="4" maxLength="8" size="10" ></input>
                </div>
                <div className="input-element-box">
                    <input className="submit-button" type="submit" value="Submit"></input>
                </div>
            </div>
        </div>
    );
}

update();


