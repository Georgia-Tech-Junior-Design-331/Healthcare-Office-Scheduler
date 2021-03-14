class ApptForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //patname: '',
      docId: 0,
      patId: 0,
      stime: null,
      etime: null,
      date: null,
      description: '',
      docInfo: null,
      patInfo: null
    }
    
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchPatients = this.searchPatients.bind(this);
    //this.getDocInfo(); //Mar 7th: using componentDidMount to load doc info
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.patFname);
    var appt = {};
    appt.patient = {};
    appt.doctor = {};
    appt.appointment = {};
    appt.patient.id = this.state.patId;
    appt.doctor.id = this.state.docId;
    appt.appointment.description = this.state.description;
     //This is format for MySQL

    if (this.state.date && this.state.stime) {
      appt.appointment.start = this.state.date + " " + this.state.stime + ":00";
      if (this.state.etime) {
        appt.appointment.end = this.state.date + " " + this.state.etime + ":00";
      } else {
        appt.appointment.end = null;
      }
    } else {
      alert('Please enter a date and starting time.');
      return;
    }
    
    appt.appointment.status = 1; //Any new appointment should be listed as "scheduled"
    //console.log(appt);

    
    //put data in database
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addAppointment", false); //Synchronous (false) is not ideal
    xhttp.setRequestHeader('Content-Type', 'application/json');
    //console.log(JSON.stringify(appt));
    xhttp.send([JSON.stringify(appt)]);
    
    //go back to main page
    event.preventDefault();
    window.location.pathname = "home"
  }

  componentDidMount() {
    this.getDocInfo();
  }

  getDocInfo() { //Queries Database for Doctor Info
    //console.log("getDocInfo");
    //get doctor names
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/getDoctors", true); //synchronous (false) is not ideal
    xhttp.setRequestHeader('Content-Type', 'application/json');
    var doctorInfo = 'debug: asynchronicity is fun'
    var thisClass = this;
    xhttp.onload = function() {
        doctorInfo = JSON.parse(xhttp.responseText);
        //console.log(docInfo);
        thisClass.state.docInfo = doctorInfo;
        ReactDOM.render(<ApptForm />, document.getElementById('root'));
    };
    xhttp.send(null);
    
  }

  getDocSelHTML() {  //Gets the HTML for rendering Doctor Info
    var i = 0
    let selection = [];
    //console.log("getDocSelHTML");
    if (Array.isArray(this.state.docInfo)) { //See if doc info has been loaded yet.
      //console.log(this.state.docInfo);
      this.state.docInfo.forEach(doc => {
        selection.push(<option key={i} value={doc.id}>{doc.fname + " " + doc.lname}</option>);
        i++;
      });
    }
    return selection;
  }

  searchPatients() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/getPatientByName", true); //synchronous (false) is not ideal
    xhttp.setRequestHeader('Content-Type', 'application/json');
    //var selectedPatients = 'debug: asynchronicity is fun'
    var thisClass = this;
    var req = {};
    //console.log("SearchPatients: " + thisClass.state.patName);
    req.name = thisClass.state.patName;
    xhttp.onload = function() {
        thisClass.state.patInfo = JSON.parse(xhttp.responseText);
        //console.log();
        ReactDOM.render(<ApptForm />, document.getElementById('root'));
        console.log(thisClass.state.patInfo)
    };
    //console.log("JSON: " + [JSON.stringify(req)]);
    xhttp.send([JSON.stringify(req)]);
  }

  getPatientNameResultsHTML() {
    //if null:
    //standard out
    //else
    //list of buttons that trigger this.setState({patFname: val}); and this.setState({patLname: val});
    //console.log("Getpatresults");
    if (!this.state) {
      return (<p>Loading...</p>);
    } else if (this.state.patInfo == null) {
      return (<p>Waiting for search...</p>);
    } else {
      //console.log("Returning patients");
      let ret = [];
      this.state.patInfo.forEach(pat => {
        ret.push(<button type="button" onClick={this.selectPatient(pat.id)}>{pat.fname} {pat.lname}</button>);
      });
      if (ret.length == 0) {
        return (<p>No patient with that name...</p>);
      }
      return ret;
    }
  }

  selectPatient(id) {
    this.state.patId = id;
  }

  render() { //TODO as of Mar 7th 21: every change of any thing re-renders all of the form. not ideal
    //console.log("rendered page");
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
                placeholder='Search Name'
                name='patName'
                onChange={this.myChangeHandler}
                />
              </td>
              <td>
                <input
                type='button'
                name='Search'
                value="Search"
                onClick={this.searchPatients}//{this.getPatientNameResults}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div id="patNameResults">
          {this.getPatientNameResultsHTML()}
        </div>
        <br></br>
        <p>Doctor name:</p>
        <select id="docSel" name="docId" value={this.state.docId} onChange={this.myChangeHandler}>
            <option value='0' disabled>Select Doctor</option> {/*TODO: validation */}
            {this.getDocSelHTML()}
        </select>
        <p></p>
        <p>Date:</p>
        <input
          type='date' //NOTE: date type is not supported by Safari
          name='date'
          onChange={this.myChangeHandler}
        />
        <p></p>
        <p>Start and End Time: (HH:MM AM/PM)</p>
        <input
          type='time' //NOTE: time type is not supported by Safari
          name='stime'
          onChange={this.myChangeHandler}
        />
        <input
          type='time' //NOTE: time type is not supported by Safari
          name='etime'
          onChange={this.myChangeHandler}
        />
        <p></p>
        <input
          type='textarea'
          name='description'
          placeholder="Appointment Description"
          onChange={this.myChangeHandler}
        />
        <p></p>
        <input type="submit" value="Submit" />
      </form>
    </div>
    );
  }
}

ReactDOM.render(<ApptForm />, document.getElementById('root'));