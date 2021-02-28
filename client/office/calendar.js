let today = new Date();
let thisMonth = today.getMonth();
let thisYear = today.getFullYear();
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("calendar-month");
loadCalendar(thisMonth, thisYear);
//loadQuickAppointments();

function loadCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-date");

    // clearing all previous cells
    tbl.innerHTML = "";
    monthAndYear.innerHTML = "";
    
    var left_arrow = new Image(20, 20);
    left_arrow.src = '/assets/images/arrow-left-circle.svg';
    var right_arrow = new Image(20, 20);
    right_arrow.src = '/assets/images/arrow-right-circle.svg';
    left_arrow.addEventListener('click', function() {
        if (month != 0) {
            loadCalendar(month-1, year);
        } else {
            loadCalendar(11, year-1);
        }
    });
    right_arrow.addEventListener('click', function() {
        if (month != 11) {
            loadCalendar(month+1, year);
        } else {
            loadCalendar(0, year+1);
        }
    });
    var textnode = document.createTextNode("    " + months[month] + " " + year + "    "); 

    // filing data about month and in the page via DOM.
    monthAndYear.appendChild(left_arrow);
    monthAndYear.appendChild(textnode);
    monthAndYear.appendChild(right_arrow);

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            let cell = document.createElement("td");
            cell.id = date;
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
                cell.addEventListener('click', function() {
                    location.href = "appointments?date=" + year + "-" + (month+1) + "-" + cell.id;
                });
            }
            cell.classList.add("pt-2")
            cell.classList.add("pb-2")
            
        }

        tbl.appendChild(row); // appending each row into calendar body.
    }
}

function temp(value) {
    console.log(value)
}
/*
function loadQuickAppointments() {
    //Get data
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getUpcomingAppointments", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    var apptInfo = 'debug: asynchronicity is fun'
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            apptInfo = JSON.parse(xhttp.responseText);
        //console.log(apptInfo);

        

        ReactDOM.render(<Appt apptName={apptInfo[0].p_fname + " "+ apptInfo[0].p_lname} apptNum="1" apptTime={prettyDateAndTime(apptInfo[0].start)} />, document.getElementById('appt1'));
        ReactDOM.render(<Appt apptName={apptInfo[1].p_fname + " "+ apptInfo[1].p_lname} apptNum="2" apptTime={prettyDateAndTime(apptInfo[1].start)} />, document.getElementById('appt2'));
        ReactDOM.render(<Appt apptName={apptInfo[2].p_fname + " "+ apptInfo[2].p_lname} apptNum="3" apptTime={prettyDateAndTime(apptInfo[2].start)} />, document.getElementById('appt3'));
        }
    };
    xhttp.send(null);
    
    //console.log(apptInfo);
}

function prettyDateAndTime(dateAndTime) {
    var a = new Date(dateAndTime);
    return a.toLocaleDateString() + " @ " + a.toLocaleTimeString();
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
*/