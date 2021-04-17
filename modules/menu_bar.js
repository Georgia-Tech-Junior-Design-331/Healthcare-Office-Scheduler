//Module for the menu bar at the top of each page. Contains both the bar for patients and for office side.
ReactDOM.render(<Menu />, document.getElementById('menu'));

function Menu() {
    var user = window.location.pathname.split('/')
    if (user[1] == 'office') {
        return (
            <div className="container-fluid"> 
                <div className="container-fluid">
                    <div className="row justify-content-between mt-3">
                        <div className="card col-8" style={{backgroundColor: "#e5e5e5"}}>
                            <nav className="navbar nav-fill">
                                <a href="./home" className="nav-link">Home</a>
                                <a href="./manage_patients" className="nav-link">Manage Accounts</a>
                                <a href="./requests" className="nav-link">Requests</a>
                                <a href="./new_appointment" className="nav-link">Add an Appointment</a>
                                <a href="./appointments" className="nav-link">Appointments</a>
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
                            <li><button className='sign-out'>Sign Out</button></li>
                        </ul>
                    </nav>
        
                </header>
            </div>
            );
    }
    
}