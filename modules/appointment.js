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
        delay = "Wating for delay approval..."
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
                        <td>{delay}</td>
                    </tr>
                    <tr>
                        <td>
                            <button className="btn btn-success btn-sm" style={{margin: "5px"}} onClick={() => delay_request(this.id)}>Delay</button>
                            <button className="btn btn-primary btn-sm" style={{margin: "5px"}} onClick={() => reschedule(this.id)}>Reschedule</button>
                        </td>
                    </tr>
                </tbody>
            </table>
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