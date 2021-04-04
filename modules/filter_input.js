let doctors = [];
getDocInfo();
ReactDOM.render(<div> {filter_input()} </div>, document.getElementById('filter_input'));
/*
   Used to get the names of all doctors to be used to filter by each doctor
*/
function getDocInfo() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/getDoctors", true); //synchronous (false) is not ideal
    xhttp.setRequestHeader('Content-Type', 'application/json');
    var doctorInfo = 'debug: asynchronicity is fun'
    xhttp.onload = function () {
        doctorInfo = JSON.parse(xhttp.responseText);
        doctors = doctorInfo;
    };
    xhttp.send(null);
}
/*
    Takes a string and searches for patient names containing that string, then forms search results
    that are clickable and will load the appointments for that patient upon being clicked.
*/
function searchByName(name) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/getPatientByName", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    var req = {};
    let boxes = [];
    var results = "what";
    req.name = name;
    xhttp.onload = function() {
        results = JSON.parse(xhttp.responseText);
        var i = 0;
        results.forEach(pat => {
            boxes.push(<input type="radio" className="btn-check" key={"i"+i} value={pat.id} onClick={() => search_load(pat.id)} name="patId" id={"option" + i} autoComplete="off" defaultChecked></input>);
            boxes.push(<label className="btn btn-primary" key={"l"+i} htmlFor={"option"+i}>{pat.fname} {pat.lname}</label>);
            i++;
        });
        ReactDOM.render(<div style={{marginLeft: '40px'}}> {boxes} </div>, document.getElementById('search_results'));
    };
    xhttp.send([JSON.stringify(req)]);
}
/*
   Upon selecting a method with which to filter, this function loads the input fields needed for the differing filtering methods
   to function
*/
function user_input() {
    let element = {};
    var temp = document.getElementById('filter_list');
    if (temp.value == "doctor") {
        var i = 0;
        let selection = [];
        doctors.forEach(doc => {
            selection.push(<option key={i} value={doc.id}>{doc.fname + " " + doc.lname}</option>);
            i++;
        });
        element = (
            <div style={{margin: '15px'}}>
                <div style={{margin: '15px'}}>
                    <label htmlFor="doctor_filter" style={{fontSize: '20px', marginLeft: '15px'}}>Doctor Name:</label>
                    <select id="doctor_filter" name="doctor_filter" style={{marginLeft: '15px', fontSize: '15px'}}>
                        <option value='0' disabled>Select Doctor:</option>
                        {selection}
                    </select>
                    <button type="button" className="btn btn-primary" onClick={() => filter_handler(0)} style={{marginLeft: '15px'}}>Filter</button>
                </div>
            </div>
        );
    } else if (temp.value == "month") {
        element = (
            <div style={{margin: '15px'}}>
                <div style={{margin: '15px'}}>
                    <label htmlFor="month_filter" style={{fontSize: '20px', marginLeft: '15px'}}>Select Month:</label>
                    <select id="month_filter" name="date_filter" style={{marginLeft: '15px', fontSize: '15px'}}>
                        <option value='0' disabled>Select Month:</option>
                        <option value='01-31' >January</option>
                        <option value='02-28' >February</option>
                        <option value='03-31' >March</option>
                        <option value='04-30' >April</option>
                        <option value='05-31' >May</option>
                        <option value='06-30' >June</option>
                        <option value='07-31' >July</option>
                        <option value='08-31' >August</option>
                        <option value='09-30' >September</option>
                        <option value='10-31' >October</option>
                        <option value='11-30' >November</option>
                        <option value='12-31' >December</option>
                    </select>
                    <button type="button" className="btn btn-primary" onClick={() => filter_handler("1")} style={{marginLeft: '15px'}}>Filter</button>
                </div>
            </div>
        );
    } else if (temp.value == "patient") {
        element = (
            <div style={{margin: '15px'}}>
                <div style={{margin: '15px'}}>
                    <label htmlFor="patient_quick_search" style={{fontSize: '20px', marginLeft: '15px'}}>Patient Quick Search:</label>
                    <input type='text' placeholder='Search Name' id='patient_quick_search' style={{marginLeft: '15px', fontSize: '15px'}}></input>
                    <button type="button" className="btn btn-primary" onClick={() => filter_handler('2')} style={{marginLeft: '15px'}}>Search</button>
                </div>
            </div>
        );
    }
    ReactDOM.render(<div> {element} </div>, document.getElementById('filter_field'));
}
/*
   Used to handle the button click on the generated search results of the patient search
*/
function search_load(val) {
    location.href = 'appointments?p_id=' + val;
}
/*
   Forms the URL with the filtering parameters in it to be able to filter by those values
*/
function filter_handler(f) {
    var filterVars = 0;
    if (f == '0') {
        filterVars = document.getElementById("doctor_filter");
        location.href = 'appointments?d_id=' + filterVars.value;
    } else if (f == '1') {
        filterVars = document.getElementById("month_filter");
        var result = filterVars.value.split("-", 2);
        location.href = "appointments?start=" + "2021" + "-" + result[0] + "-" + "01" + "&end="  + "2021" + "-" + result[0] + "-" + result[1];
    } else if (f == '2') {
        filterVars = document.getElementById("patient_quick_search");
        searchByName(filterVars.value);
    } else if (f == '3') {
        location.href = "appointments";
    }
}
/*
    Generates the filter selector to let the user choose what to filter by
*/
function filter_input() {
    return (
        <div style={{marginLeft: '15px', marginTop: '15px'}}>
                <div style={{marginLeft: '15px', marginTop: '15px'}}>
                    <h3 style={{marginLeft: '15px',}}>Filter Appointments:</h3>
                </div>
            <div style={{marginLeft: '15px', marginTop: '10px'}}>
                <label htmlFor="filter_list" style={{fontSize: '20px', marginLeft: '15px'}}>Select Filter:</label>
                <select id="filter_list" name="filter_list" style={{marginLeft: '15px', fontSize: '15px'}}>
                    <option value="0" disabled>Select Option</option>
                    <option value="doctor">Doctor</option>
                    <option value="month">Month</option>
                    <option value="patient">Patient</option>
                </select>
                <button type="button" className="btn btn-primary" onClick={() => user_input()} style={{marginLeft: '15px'}}>Select Filter Type</button>
                <button type="button" className="btn btn-primary" onClick={() => filter_handler("3")} style={{marginLeft: '30px'}}>Reset</button>
            </div>
        </div>
    );
}