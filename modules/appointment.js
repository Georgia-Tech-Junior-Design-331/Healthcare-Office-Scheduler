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

function open_appointment(id) {
    location.href = 'appointment?id=' + id;
}