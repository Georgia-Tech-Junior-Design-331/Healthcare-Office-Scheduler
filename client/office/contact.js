//Text box for message
//Button for submit
//search selector for patient to contact
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
            <div>
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


ReactDOM.render(<Contact />, document.getElementById('root'));