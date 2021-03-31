getAppointment();
function getAppointment() {
    let appointmentID = sessionStorage.getItem('appointmentID');
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getAppointmentById?id=" + appointmentID, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    var apptInfo = "I dont know what im doing."
    xhttp.onload = function() {
        apptInfo = JSON.parse(xhttp.responseText);
        const element = apptInfo[0];
        const item = (<TableElement objt={element}/>);
        ReactDOM.render(
            <div className="container">
                {item}
            </div>
            , document.getElementById("Listing"));
    };
    xhttp.send(null);
};

function TableElement(props) {
    // Access to the current appointment, passed in to the component as a prop
    const currElement = props.objt;

    return (
        <div className="element-container">
            <div className="info-container">
                <div className="element-box"> <b>Appointment ID: </b>{`${currElement.id}`}</div>
                <div className="element-box"> <b>Patient ID: </b>{`${currElement.p_id}`}</div>
                <div className="element-box"> <b>Doctor ID: </b>{`${currElement.d_id}`}</div>
                <div className="element-box"> <b>Start Time: </b>{`${currElement.start}`}</div>
                <div className="element-box"> <b>End Time: </b>{`${currElement.end}`}</div>
                <div className="element-box"> <b>Description: </b>{`${currElement.description}`}</div>
                <div className="element-box"> <b>Status: </b>{`${currElement.status}`}</div>
            </div>
            <div className="info-containerAdjust">
                <div className="input-element-box">
                    <label htmlFor="start">New Start Time:</label>
                    <input type="text" font-size="20px" id="start" name="startbox" required minLength="4" maxLength="8" size="10"></input>
                </div>
                <div className="input-element-box">
                    <label htmlFor="end">New End Time:</label>
                    <input type="text" font-size="20px" id="end" name="endbox" required minLength="4" maxLength="8" size="10" ></input>
                </div>
                <div className="input-element-box">
                    <label htmlFor="end">New Description:</label>
                    <input type="text" font-size="20px" id="end" name="endbox" required minLength="4" maxLength="8" size="10" ></input>
                </div>
                <div className="input-element-box">
                    <label htmlFor="end">New Status:</label>
                    <input type="text" font-size="20px" id="end" name="endbox" required minLength="4" maxLength="8" size="10" ></input>
                </div>
                <div className="input-element-box">
                    <input className="submit-button" type="submit" value="Submit"></input>
                </div>
            </div>
        </div>
    );
};