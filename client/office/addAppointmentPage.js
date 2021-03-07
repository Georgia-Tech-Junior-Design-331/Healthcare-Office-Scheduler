class ApptForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patname: '',
      docId: 0,
      stime: null,
      etime: null,
      date: null,
      description: '',
      docInfo: null
    }
    
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    appt.patient.fname = this.state.patFname;
    appt.patient.lname = this.state.patLname;
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
    xhttp.open("POST", "/addAppointment", false); //Synchronous is not ideal
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

  getDocInfo() {
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

  getDocSelHTML() {
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

  render() { //TODO as of Mar 7th: every change of any thing re-renders all of the form. not ideal
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