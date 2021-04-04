//For sidbar:
//Contact, patient accounts
ReactDOM.render(<Sidebar />, document.getElementById('sidebar'));

function Sidebar() {
    return (
        <div>
        <div className="d-grid ms-1 mt-1">
            <input
                type='button'
                className="btn btn-primary btn-lg"
                name='contact'
                value='Contact a Patient'
                onClick={renderContact}
            />
            <input
                type='button'
                className="btn btn-primary btn-lg"
                name='addAcct'
                value='Add an Account'
                onClick={renderAddAcct}
            />
            <input
                type='button'
                className="btn btn-primary btn-lg"
                name='viewAcct'
                value='View Patient Accounts'
                onClick={renderViewAcct}
            />
        </div>
        </div>
    )
}

function renderContact() {
    ReactDOM.render(<Contact />, document.getElementById('maincontent'));
}

function renderAddAcct() {
    ReactDOM.render(<AddAccount />, document.getElementById('maincontent'));
}

function renderViewAcct() {
    ReactDOM.render(<ViewAccount />, document.getElementById('maincontent'));
}


class Contact extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
        
        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.searchPatients = this.searchPatients.bind(this);
        this.sendMail = this.sendMail.bind(this);
      }

    sendMail() {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/sendMail", true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        var req = {};
        req.emailaddr = this.state.patMail;
        req.message = this.state.message;
        xhttp.onload = function() {
        };
        xhttp.send([JSON.stringify(req)]);
    }

    searchPatients() { //take a patient name and search the db for it
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/getPatientByName", true); //synchronous (false) is not ideal
        xhttp.setRequestHeader('Content-Type', 'application/json');
        var req = {};
        //console.log("SearchPatients: " + thisClass.state.patName);
        var thisClass = this;
        req.name = thisClass.state.patName;
        xhttp.onload = function() {
            thisClass.state.patInfo = JSON.parse(xhttp.responseText);
            ReactDOM.render(<Contact />, document.getElementById('root'));
            //console.log(thisClass.state.patInfo)
        };
        //console.log("JSON: " + [JSON.stringify(req)]);
        xhttp.send([JSON.stringify(req)]);
    }

    getPatientNameResultsHTML() { //after db has seached for patients, get html to display those results
        //console.log("Getpatresults");
        if (!this.state) {
          return (<p>Loading...</p>);
        } else if (this.state.patInfo == null) {
          return (<p>Waiting for search...</p>);
        } else {
          //console.log("Returning patients");
          let ret = [];
          var i = 1;
          this.state.patInfo.forEach(pat => {
            ret.push(<input type="radio" className="btn-check" key={"i"+i} onClick={this.myChangeHandler} value={pat.email} name="patMail" id={"option" + i} autoComplete="off" defaultChecked></input>);
            ret.push(<label className="btn btn-primary" key={"l"+i} htmlFor={"option"+i}>{pat.fname} {pat.lname}</label>);
            i++;
            //ret.push(<button type="button" onClick={this.selectPatient(pat.id)}>{pat.fname} {pat.lname}</button>);
          });
          if (ret.length == 0) {
            return (<p>No patient with that name...</p>);
          }
          return ret;
        }
      }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        //console.log(nam + "; " + val)
        this.setState({[nam]: val});
    }

    render() {
        return (
            <div className="centerForm">
            <h1>Contact a Patient</h1>
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
                        className="btn btn-success btn-sm"
                        name='Search'
                        value="Search"
                        onClick={this.searchPatients}
                        />
                    </td>
                    </tr>
                </tbody>
            </table>
            <div id="patNameResults">
            {this.getPatientNameResultsHTML()}
            </div>
            <p></p>
            <input
                type='textarea'
                name='message'
                placeholder="Message"
                onChange={this.myChangeHandler}
            />
            <button onClick={this.sendMail}>Send</button>
            </div>
        );
    }
}


class AddAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        
        this.selectAddPatient = this.selectAddPatient.bind(this);
        this.selectAddDoctor = this.selectAddDoctor.bind(this);
        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.addPatientToDB = this.addPatientToDB.bind(this);
        this.addDoctorToDB = this.addDoctorToDB.bind(this);
      }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        //console.log(nam + "; " + val)
        this.setState({[nam]: val});
    }

    addDoctorToDB() {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/addDoctor", true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        var req = {};
        req.fname = this.state.docFName;
        req.lname = this.state.docLName;
        xhttp.onload = function() {
        };
        xhttp.send([JSON.stringify(req)]);
    }

    addPatientToDB() {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/addPatient", true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        var req = {};
        req.fname = this.state.patFName;
        req.lname = this.state.patLName;
        req.username = this.state.patUName;
        req.password = "temp";
        req.birthdate = this.state.birthDate;
        req.sex = this.state.sexId;
        req.phone_number = this.state.patPhone;
        req.email = this.state.patEmail;
        xhttp.onload = function() {
        };
        xhttp.send([JSON.stringify(req)]);
    }

    selectAddDoctor() {
        this.state.mode = "doc";
        ReactDOM.render(<AddAccount />, document.getElementById('maincontent'));
    }

    selectAddPatient() {
        this.state.mode = "pat";
        ReactDOM.render(<AddAccount />, document.getElementById('maincontent'));
    }

    render() {
        return (
            <div className="centerForm">
                <h1>Add Account</h1> {/**TODO as of 4/3 2021: validation of text inputs*/}
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary" onClick={this.selectAddPatient}>Add Patient</button>
                    <button type="button" className="btn btn-primary" onClick={this.selectAddDoctor}>Add Doctor</button>
                </div>
                {this.state.mode == "doc" &&
                <form>
                    <p>First Name</p>
                    <input
                        type='text'
                        name='docFName'
                        onChange={this.myChangeHandler}
                    />
                    <p>Last Name</p>
                    <input
                        type='text'
                        name='docLName'
                        onChange={this.myChangeHandler}
                    />
                    <br/>
                    <input type="button" className="btn btn-primary" value="Submit" onClick={this.addDoctorToDB}/>
                </form>
                }
                {this.state.mode == "pat" &&
                    <form>
                        <p>First Name</p>
                        <input
                            type='text'
                            name='patFName'
                            onChange={this.myChangeHandler}
                        />
                        <p>Last Name</p>
                        <input
                            type='text'
                            name='patLName'
                            onChange={this.myChangeHandler}
                        />
                        <p>Username</p>
                        <input
                            type='text'
                            name='patUName'
                            onChange={this.myChangeHandler}
                        />
                        <p>Date of Birth</p>
                        {/**TODO: better datepicker */}
                        <input
                            type='date' //NOTE: date type is not supported by Safari
                            name='birthDate'
                            onChange={this.myChangeHandler}
                        />
                        <p>Sex</p>
                        {/**radio with m,f,other */}
                        <select id="sexSel" name="sexId" value={this.state.docId} onChange={this.myChangeHandler}>
                            <option key={0} value={"Other"}>Other/Prefer Not To Say</option>
                            <option key={1} value={"Male"}>Male</option>
                            <option key={2} value={"Female"}>Female</option>
                        </select>
                        <p>Phone Number</p>
                        <input
                            type='text'
                            name='patPhone'
                            onChange={this.myChangeHandler}
                        />
                        <p>Email</p>
                        <input
                            type='text'
                            name='patEmail'
                            onChange={this.myChangeHandler}
                        />
                        <br/>
                        <input type="button" className="btn btn-primary" value="Submit" onClick={this.addPatientToDB}/>
                    </form>
                }
            </div>   
        );
        //selector for doc or patient
        //doc is form with fname and lname
        //pat is form with fname, lname, username, *autopassword?, bithdate, sex, phone#, email
    }

}


class ViewAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        
        this.selectAddPatient = this.selectAddPatient.bind(this);
        this.selectAddDoctor = this.selectAddDoctor.bind(this);
        this.listDocAccts = this.listDocAccts.bind(this);
        this.listPatAccts = this.listPatAccts.bind(this);
    }


    selectAddDoctor() {
        this.state.mode = "doc";
        ReactDOM.render(<ViewAccount />, document.getElementById('maincontent'));
    }

    selectAddPatient() {
        this.state.mode = "pat";
        ReactDOM.render(<ViewAccount />, document.getElementById('maincontent'));
    }

    listDocAccts() {
        if (!Array.isArray(this.state.docInfo)) { //if we already have doctor info, no need to get it again
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "/getDoctors", true); //synchronous (false) is not ideal
            xhttp.setRequestHeader('Content-Type', 'application/json');
            var doctorInfo = 'debug: asynchronicity is fun'
            var thisClass = this;
            xhttp.onload = function() {
                doctorInfo = JSON.parse(xhttp.responseText);
                //console.log(docInfo);
                thisClass.state.docInfo = doctorInfo;
                ReactDOM.render(<ViewAccount />, document.getElementById('maincontent'));
            };
            xhttp.send(null);
        } else {
            var i = 0
            let selection = [];
            this.state.docInfo.forEach(doc => {
                selection.push(<p key={i}>{doc.fname + " " + doc.lname}</p>);
                i++;
                });
            return selection;
        } 
    }

    listPatAccts() {
        if (!Array.isArray(this.state.patInfo)) { //if we already have patient info, no need to get it again
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "/getPatientAccts", true); //synchronous (false) is not ideal
            xhttp.setRequestHeader('Content-Type', 'application/json');
            var patientInfo = 'debug: asynchronicity is fun'
            var thisClass = this;
            xhttp.onload = function() {
                patientInfo = JSON.parse(xhttp.responseText);
                thisClass.state.patInfo = patientInfo;
                ReactDOM.render(<ViewAccount />, document.getElementById('maincontent'));
            };
            xhttp.send(null);
        } else {
            var i = 0
            let selection = [];
            this.state.patInfo.forEach(pat => {
                selection.push(<p key={i}>{"User: " + pat.username + " with name: " + pat.fname + " " + pat.lname}</p>);
                i++;
                });
            return selection;
        } 
    }
    
    render() {
        return (
            <div className="centerForm">
                <h1>View Accounts</h1>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary" onClick={this.selectAddPatient}>Patients</button>
                    <button type="button" className="btn btn-primary" onClick={this.selectAddDoctor}>Doctors</button>
                </div>
                {this.state.mode == "doc" &&
                    this.listDocAccts()
                }
                {this.state.mode == "pat" &&
                    this.listPatAccts()
                }
            </div>   
        );
    }
}
