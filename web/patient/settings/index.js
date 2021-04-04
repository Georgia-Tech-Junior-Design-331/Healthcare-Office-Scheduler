var settings = {};
function update() {
    var body = {patient_id: 3};
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/getNotification', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function() {
        var response = JSON.parse(xhttp.responseText);
        settings = response[0];
        ReactDOM.render(
                render(settings)
            , document.getElementById('settings')
        );
    };
    xhttp.send(JSON.stringify(body));
}

function render(app) {
    function update_settings(e) {
        e.preventDefault();

        var email_setting = document.getElementById('email_check').checked;
        var text_setting = document.getElementById('text_check').checked;

        var request = {email_notif: email_setting, text_notif: text_setting};
        var body = {request, patient_id: 3}
        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/setNotification', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.onload = function() {
            alert("Updated Successfully!")          
        };
        xhttp.send(JSON.stringify(body));
    }

    return(
        <div className="container">
            <p className="appts text-center">Notification Setting</p>
            <div className="row justify-content-center">
                <div className="col-sm-6">
                    <div className="card-body">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" defaultChecked={app.email_notif == 1} id="email_check"/>
                            <label className="form-check-label" htmlFor="email_check">
                                Email Notification
                            </label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" defaultChecked={app.text_notif == 1} id="text_check"/>
                            <label className="form-check-label" htmlFor="text_check">
                                Text Notification
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <button type="button" className="btn btn-primary col-md-6 mt-2" onClick={update_settings}>Update</button>
            </div>
        </div>
    );
}

update();