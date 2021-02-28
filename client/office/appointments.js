loadQuickAppointments();

function loadQuickAppointments() {

    let appointments_date = document.getElementById("appointments_date");

    var url_string = window.location.href
    var url = new URL(url_string);
    var date = url.searchParams.get("date");
    console.log(date);

    appointments_date.innerText = date;
  // Styles for Upcoming Appointments from original HTML
  const divStyle = {
    fontFamily:'Roboto Light, Arial, Arial, Tahoma',
    textAlign: 'center',
    fontSize:'14px',
    marginTop:'7vw',
    width: '50vw',
    marginLeft: '25vw'
  };

  //Get the upcoming appointments data
  // First get the doctors list
  var doctorsReq = new XMLHttpRequest();
  doctorsReq.open("GET", "/getDoctors", true);
  doctorsReq.setRequestHeader("Content-Type", "applicaiton/json");
  var doctors = "doesn't matter";
  doctorsReq.onload = function() {
    doctors = JSON.parse(doctorsReq.responseText);

    // Get the appointments list next
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getAppointmentsOnDay?date=" + date, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    var apptInfo = 'debug: asynchronicity is fun'
    xhttp.onload = function() {

        // Now that we have all the information we need, dynamically render the page
        apptInfo = JSON.parse(xhttp.responseText);
        const items = [];
        for (const element of apptInfo) {
          items.push(<TableElement objt={[element, doctors[element.d_id - 1].lname]}/>);
        }
        ReactDOM.render(
          <div className="container">
            {items}
          </div>
        , document.getElementById("appointments"));
    };
    xhttp.send(null);
  };
  doctorsReq.send(null);
}

function prettyDateAndTime(dateAndTime) {
  var a = new Date(dateAndTime);
  return a.toLocaleDateString() + " @ " + a.toLocaleTimeString();
}

function TableElement(props) {
  // Access to the current appointment, passed in to the component as a prop
  const [currElement, dr] = props.objt;
  return (

    <div className="element-container">
      <div className="info-container">
        <div className="element-box"> <b>Patient: </b>{`${currElement.p_lname}, ${currElement.p_fname}`}</div>
        <div className="element-box"><b>Appointment Time: </b>{`${prettyDateAndTime(currElement.start)}`}</div>
        <div className="element-box"><b>Reason For Visit: </b>{`${currElement.description}`}</div>
        <div className="element-box"><b>Doctor: </b>Dr. {`${dr}`}</div>
      </div>
      <button className='view-button'>View</button>
    </div>
  );
}