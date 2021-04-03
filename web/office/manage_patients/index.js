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
                value='Add a Patient Account'
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
      }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        //console.log(nam + "; " + val)
        this.setState({[nam]: val});
    }

    addDoctorToDB() {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/sendMail", true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        var req = {};
        req.fname = this.state.docFName;
        req.lname = this.state.docLName;
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
                <h1>Add Account</h1>
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
                            name='patLName'
                            onChange={this.myChangeHandler}
                        />
                        <p>Date of Birth</p>
                        {/**datepicker */}
                        <p>Sex</p>
                        {/**radio with m,f,other */}
                        <p>Phone Number</p>
                        <input
                            type='text'
                            name='patLName'
                            onChange={this.myChangeHandler}
                        />
                        <p>Email</p>
                        <input
                            type='text'
                            name='patLName'
                            onChange={this.myChangeHandler}
                        />
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
        return (
            <p>docs</p>
        );
    }

    listPatAccts() {
        return (
            <p>pats</p>
        );
    }
    
    render() {
        return (
            <div className="centerForm">
                <h1>View Accounts</h1>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary" onClick={this.selectAddPatient}>Add Patient</button>
                    <button type="button" className="btn btn-primary" onClick={this.selectAddDoctor}>Add Doctor</button>
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

