class ApptForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patname: '',
      docId: 0,
      time: null
    }
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.patname);
    var appt = {};
    appt.patient = {};
    appt.doctor = {};
    appt.appointment = {};
    appt.patient.fname = this.state.patFname;
    appt.patient.lname = this.state.patLname;
    appt.doctor.id = this.state.docId;
    appt.appointment.start = this.state.time;
    appt.appointment.end = null;
    //console.log(appt);

    
    //put data in database
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/addAppointment", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    //console.log(JSON.stringify(appt));
    xhttp.send([JSON.stringify(appt)]);
    
    //TODO: go back to main page
    event.preventDefault();
    //window.location.pathname = "home"
  }

  getDocSel() {
    //get doctor names
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getDoctors", false); //synchronous (false) is not ideal
    xhttp.setRequestHeader('Content-Type', 'application/json');
    var docInfo = 'debug: asynchronicity is fun'
    let selection = [];
    xhttp.onload = function() {
        docInfo = JSON.parse(xhttp.responseText);
        //console.log(docInfo);

        var i = 0
        docInfo.forEach(doc => {
          selection.push(<option key={i} value={doc.id}>{doc.fname + " " + doc.lname}</option>);
          i++;
        });
        //console.log(selection);
        

            
    };
    xhttp.send(null);

    //console.log(selection);
    return selection
  }

  render() {
    return (
      <div className="centerForm">
      <form onSubmit={this.handleSubmit}>
        <p>Patient name:</p>
        <table className="centerForm">
          <tbody>
            <tr>
              <td>
                <input
                type='text'
                placeholder='First'
                name='patFname'
                onChange={this.myChangeHandler}
                />
              </td>
              <td>
                <input
                type='text'
                placeholder='Last'
                name='patLname'
                onChange={this.myChangeHandler}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <p>Doctor name:</p>
        <select name="docId" value={this.state.docId} onChange={this.myChangeHandler}>
            <option value='0' disabled>Select Doctor</option> {/*TODO: validation */}
            {this.getDocSel() /*Note: as of Feb 27th this implementation sends requests to database anytime you type. Not ideal. */}
        </select>
        <p>Start Time: (HH:MM AM/PM)</p>
        <input
          type='time' //NOTE: time type is not supported by Safari
          name='time'
          onChange={this.myChangeHandler}
        />
        <input type="submit" value="Submit" />
      </form>
      </div>
    );//Debug: <h1>{this.state.patname} {this.state.docname} {this.state.time}</h1>
  }
}

function Appt(props) {
  //seachbox
  
  
  //results
  
  //time

  //doctorsearch

  //doctorresults

  //confirmbutton-> to main page, plus new data

  //cancel-> to main page

  return (
    <p>Test</p>
  );
}

ReactDOM.render(<ApptForm />, document.getElementById('root'));