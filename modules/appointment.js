function render_appointment_item() {
    return (
        <div className="row">
            <h6>Appointment {this.num}</h6>
            <table>
                <tbody>
                    <tr>
                        <td style={{width: '60%'}}>{this.p_lname + ', ' + this.p_fname}</td>
                        <td rowSpan="2">
                            <button className="btn btn-primary" onClick={() => open_appointment(this.id)}>View</button>
                        </td>
                    </tr>
                    <tr>
                        <td>{pretty_datetime(this.start)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function render_appointment_item_patient() {
    let delay;
    if (this.status == 4) {
        delay = "Wating for request approval..."
    }
    return (
        <div className="row">
            <h5>Appointment {this.num}</h5>
            <table>
                <tbody>
                    <tr>
                        <td>{this.d_lname + ', ' + this.d_fname}</td>
                    </tr>
                    <tr>
                        <td>{pretty_datetime(this.start)}</td>
                    </tr>
                    <tr>
                        <td><p className="mt-3 fw-bold fst-italic">{delay}</p></td>
                    </tr>
                    <tr>
                        <td>
                            <button className="btn btn-success btn-sm" style={{margin: "5px"}} onClick={() => delay_request(this.id)}>Delay</button>
                            <button className="btn btn-primary btn-sm" style={{margin: "5px"}} onClick={() => reschedule(this.id)}>Reschedule</button>
                            <button className="btn btn-danger btn-sm" id="cancel-btn" style={{margin: "5px"}} onClick={() => cancel_btn(this.id)}>Cancel</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="container">
                <div id="check-modal" className="modal">
                    <div className="modal-content col-sm-6">
                        <h5 className="text-center mt-2" id="check-label"></h5>
                        <div className="justify-content-sm-center d-sm-flex d-grid gap-2 mt-3">
                            <button type="button" id="request-btn" className="btn btn-danger btn-sm col-sm-4" onClick={() => request_cancel(this)}>Yes</button>
                            <button type="button" id="close-btn" className="btn btn-secondary btn-sm col-sm-4">No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function open_appointment(id) {
    location.href = 'appointment?id=' + id;
}

function delay_request(id) {
    location.href = 'delay?id=' + id;
}

function reschedule(id) {
    location.href = 'reschedule?id=' + id;
}