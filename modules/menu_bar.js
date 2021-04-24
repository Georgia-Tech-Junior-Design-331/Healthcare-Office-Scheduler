//Module for the menu bar at the top of each page. Contains both the bar for patients and for office side.
ReactDOM.render(<Menu />, document.getElementById('menu'));

function Menu() {
    var user = window.location.pathname.split('/')


    function signOut() {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/signOut", true);
        xhttp.onload = function() {
            alert('Sign out');
            location.href = '/patient/home'
        }
        xhttp.send(null);
    }
    if (user[1] == 'office') {
        return (
            <div className="container-fluid"> 
                <div className="container-fluid">
                    <div className="row justify-content-between mt-3">
                        <div className="card col-8" style={{backgroundColor: "#e5e5e5"}}>
                            <nav className="nav nav-fill nav-pills mt-2">
                                {renderHomeButton()}
                                {renderManagePatients()}
                                {renderRequests()}
                                {renderNewAppt()}
                                {renderAppts()}
                            </nav>
                        </div>
                        <div className="col-2">
                            <a href="./profile"  className="nav-link">
                                <img alt="usericon" src="/images/person-icon.png" width="40" height="40"></img>
                            </a>
                        </div>
                    </div> 
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <header>
                    <div className="left-nave nav-links">
                        <a href="./home">
                        <ul>
                            <li><img className="logo-button" src="/images/logo.png" width="30px" height="30px" alt="logo"/></li>
                            <li><b className='apt-button'>AppointMEnt</b></li>
                        </ul>
                        </a>
                    </div>
                    <nav>
                        <ul className='right-links nav-links'>
                            <li><a href="./home"><button className='nav-img-button'><img src="/images/home.png" width="30px" height="30px" /></button></a></li>
                            <li><a href="./settings"><button className='nav-img-button'><img src="/images/profile.png" width="30px" height="30px" /></button></a></li>
                            <li><button className='sign-out' onClick={signOut}>Sign Out</button></li>
                        </ul>
                    </nav>
        
                </header>
            </div>
            );
    }
    
    function renderHomeButton() {
        let str = window.location.href.split("/");
        if (str[str.length - 1] == "home") {
            return (<a href="./home" className="nav-link active">Home</a>);
        }
        return (<a href="./home" className="nav-link">Home</a>);
    }

    function renderManagePatients() {
        let str = window.location.href.split("/");
        if (str[str.length - 1] == "manage_patients") {
            return (<a href="./manage_patients" className="nav-link active">Manage Accounts</a>);
        }
        return (<a href="./manage_patients" className="nav-link">Manage Accounts</a>);
    }

    function renderRequests() {
        let str = window.location.href.split("/");
        if (str[str.length - 1] == "requests") {
            return (<a href="./requests" className="nav-link active">Requests</a>);
        }
        return (<a href="./requests" className="nav-link">Requests</a>);
    }

    function renderNewAppt() {
        let str = window.location.href.split("/");
        if (str[str.length - 1] == "new_appointment") {
            return (<a href="./new_appointment" className="nav-link active">Add an Appointment</a>);
        }
        return (<a href="./new_appointment" className="nav-link">Add an Appointment</a>);
    }

    function renderAppts() {
        let str = window.location.href.split("/");
        if (str[str.length - 1] == "appointments") {
            return (<a href="./appointments" className="nav-link active">Appointments</a>);
        }
        return (<a href="./appointments" className="nav-link">Appointments</a>);
    }
}