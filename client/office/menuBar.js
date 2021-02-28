ReactDOM.render(<Menu />, document.getElementById('menu'));

function Menu() {
    return (
    <div className="container-fluid">
        <div className="header text-center mt-3" id="main-header">
            <h1>Add an Appointment</h1>
        </div>
        <div className="container-fluid">
            <div className="row justify-content-between mt-3">
                <div className="card col-8" style={{backgroundColor: "#e5e5e5"}}>
                    <nav className="navbar nav-fill">
                        <a href="home" className="nav-link">Home</a>
                        <a href="appointments" className="nav-link">Contact Patients</a>
                        <a href="appointments" className="nav-link">Appointment Requests</a>
                        <a href="addAppointmentPage" className="nav-link">Add an Appointment</a>
                        <a href="appointments" className="nav-link">Cancelled Appointments</a>
                    </nav>
                </div>
                <div className="col-2">
                    <a href="profile"  class="nav-link">
                        <img alt="usericon" src="assets/images/person-icon.png" width="40" height="40"></img>
                    </a>
                </div>
            </div> 
        </div>
    </div>
    );
}