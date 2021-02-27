let today = new Date();
let thisMonth = today.getMonth();
let thisYear = today.getFullYear();
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("calendar-month");
loadCalendar(thisMonth, thisYear);
loadQuickAppointments();


function loadCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-date");

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            let cell = document.createElement("td");
            if (i === 0 && j < firstDay) {
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-success");
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
            cell.classList.add("pt-2")
            cell.classList.add("pb-2")
        }

        tbl.appendChild(row); // appending each row into calendar body.
    }
}

function loadQuickAppointments() {
    //Get data
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getUpcomingAppointments", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    var apptInfo = 'debug: asynchronicity is fun'
    xhttp.onload = function() {
        apptInfo = JSON.parse(xhttp.responseText);
        //console.log(apptInfo);

        ReactDOM.render(<Appt apptName={apptInfo[0].p_fname + " "+ apptInfo[0].p_lname} apptNum="1" apptTime={apptInfo[0].start} />, document.getElementById('appt1'));
        ReactDOM.render(<Appt apptName={apptInfo[1].p_fname + " "+ apptInfo[1].p_lname} apptNum="2" apptTime={apptInfo[1].start} />, document.getElementById('appt2'));
        ReactDOM.render(<Appt apptName={apptInfo[2].p_fname + " "+ apptInfo[2].p_lname} apptNum="3" apptTime={apptInfo[2].start} />, document.getElementById('appt3'));
    };
    xhttp.send(null);
    
    //console.log(apptInfo);
}

function Appt(props) {

    return (
        <li className="list-group-item">
        <div className="row">
          <h6>
            Appointment {props.apptNum}
          </h6>
          <table>
            <tbody>
              <tr>
                  <td style={{ width: '60%' }}>{props.apptName}</td>
                  <td rowSpan="2">
                      <button className="btn btn-primary">View</button>
                  </td>
              </tr>
              <tr>
                  <td>{props.apptTime}</td>
              </tr>
            </tbody>
          </table>
        </div>
        </li>
    );
}